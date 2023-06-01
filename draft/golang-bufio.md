---
date: "2023-06-01"
title: "[Go] bufio 패키지의 Write 함수로 버퍼 동작 방식 확인하기"
categories: ["Golang"]
summary: bufio.Write() 함수를 통해 실제로 어떻게 버퍼 방식으로 입출력을 하는지 확인합니다.
---

지난 포스트([Go - 파일 입출력 패키지 4종 정리](https://nittre.github.io/golang-file-io/))에서 bufio에 대해 설명하면서 아래와 같은 코드를 추가했다.

```go
func ReadWriteByBufio() {
	fi, err := os.Open("res.txt")
	if err != nil {
		panic(err)
	}
	defer func() {
		if err := fi.Close(); err != nil {
			panic(err)
		}
	}()

	// read buffer 만들기
	r := bufio.NewReader(fi)

	// Output 파일 만들기
	fo, err := os.Create("output.txt")
	if err != nil {
		panic(err)
	}

	defer func() {
		if err := fo.Close(); err != nil {
			panic(err)
		}
	}()

	// write buffer 만들기
	w := bufio.NewWriter(fo)

	buf := make([]byte, 64)
	for { // 무한루프
		// read a chunk

		// 1. 입력 파일에서 데이터를 읽어와 buf에 저장한다.
		//    읽은 바이트 수를 n에 할당한다
		n, err := r.Read(buf)

		// 2. 읽기 과정에서 에러 생긴 경우 && 오류가 파일의 끝(io.EOF)이 아닌 경우 패닉
		if err != nil && err != io.EOF {
			panic(err)
		}

		// 3. 읽은 바이트 수가 0, 즉 더 이상 읽을 게 없는 경우(=파일의 끝인 경우) 무한루프 종료
		if n == 0 {
			break
		}

		// 4. 읽은 데이터(buf)를 출력 파일에 쓴다
		//    중간에 에러 나면 패닉처리
		if _, err := w.Write(buf[:n]); err != nil {
			panic(err)
		}
	}
	// 5. w.Flush() = io.Writer에 남은 버퍼 데이터를 강제로 파일에 씀
	if err = w.Flush(); err != nil {
		panic(err)

	}
}
```

여기서 `w.Write(buf[:n])`가 실제로 어떻게 동작하는지 궁금해져서 코드를 까보았다.

## type Writer

Writer 타입은 다음과 같이 구현되어 있다.

```go
// Writer implements buffering for an io.Writer object.
// If an error occurs writing to a Writer, no more data will be
// accepted and all subsequent writes, and Flush, will return the error.
// After all data has been written, the client should call the
// Flush method to guarantee all data has been forwarded to
// the underlying io.Writer.
type Writer struct {
	err error
	buf []byte
	n   int
	wr  io.Writer
}
```

- Writer는 io.Writer 객체의 버퍼 기능을 구현한다.
- write 중간에 에러가 발생하면 더이상 데이터를 받아들이지 않고, 이후의 쓰기 작업이나 Flush 작업은 에러를 반환한다.
- **모든 데이터에 대한 쓰기 작업이 완료되면, 클라이언트는 Flush 메서드를 호출해서, 주어진 io.Writer에 모든 데이터가 들어갔음을 개런티해야 한다.**
  - `Flush` 메서드는 버퍼에 남아있는 데이터를 io.Writer에 기록하는 메서드이다.
  - bufio는 버퍼 방식, 즉 청크된 데이터를 모았다가 한꺼번에 입출력 작업을 하기 때문에 버퍼에 미처 입출력 되지 않은 청크 데이터가 남아있을 수 있다.
  - 따라서 Write 작업 후에는 `Flush` 메서드를 호출해 버퍼에 남아있는 데이터에 대해 마저 입출력 작업을 해주어야 한다.

## NewWriter()

bufio 패키지를 통해 파일 입력을 하기 위해서는 `NewWriter` 함수를 통해 파일에 대한 읽기 작업을 수행할 Writer 구조체를 생성해야 한다.

```go
func NewWriter(w io.Writer) *Writer {
	return NewWriterSize(w, defaultBufSize)
}
```

- NewWriter는 디폴트 사이즈의 버퍼를 가지는 새로운 Writer를 반환한다.
- 만약 인자로 주어진 io.Writer가 이미 충분한 버퍼 사이즈를 가지고 있다면, 기존 Writer를 반환한다.

`NewWriter()`는 내부적으로 `NewWriterSize()`를 호출한다.

### NewWriterSize()

`NewWriterSize()`는 다음과 같이 구현되어 있다.

```go
// NewWriterSize returns a new Writer whose buffer has at least the specified
// size. If the argument io.Writer is already a Writer with large enough
// size, it returns the underlying Writer.
func NewWriterSize(w io.Writer, size int) *Writer {
	// Is it already a Writer?
	b, ok := w.(*Writer)
	if ok && len(b.buf) >= size {
		return b
	}
	if size <= 0 {
		size = defaultBufSize
	}
	return &Writer{
		buf: make([]byte, size),
		wr:  w,
	}
}
```

- `NewWriterSize()` 메서드는 새로운 Writer 객체를 반환한다.
  - 이 때, Writer 객체는 기존에 정의된 size를 가진다.
- 만약 인자로 주어진 `io.Writer`가 이미 충분한 size를 가지고 있다면, 기존 Writer를 반환한다.

## bufio.Write() 함수 코드 까보기

```go
// Write writes the contents of p into the buffer.
// It returns the number of bytes written.
// If nn < len(p), it also returns an error explaining
// why the write is short.
func (b *Writer) Write(p []byte) (nn int, err error) {
	for len(p) > b.Available() && b.err == nil { // 버퍼에 남은 용량보다 입력된 용량이 큰 경우 반복
		var n int
		if b.Buffered() == 0 {
			// Large write, empty buffer.(만약 버퍼가 비어있다면)
			// Write directly from p to avoid copy.
			// 바로 쓰기 작업 수행. (copy를 피하기 위해.. 큰 데이터를 copy하는건 비싸니까)
			// (n: 쓰여진 바이트 수)
			n, b.err = b.wr.Write(p)
		} else { // 만약 버퍼가 비어있지 않다면 == 버퍼에 저장된 데이터가 있는 경우
			n = copy(b.buf[b.n:], p) // p를 버퍼의 마지막 위치(=현재위치)부터 복붙 (당연히 중간에 짤린다)
			b.n += n                 // 현재 위치 갱신
			b.Flush()                // 버퍼에 있는 데이터를 실제로 파일에 쓴다 (b.wr.Write(b.buf[0:b.n]))
		}
		nn += n   // 실제로 쓰여진 바이트 수를 누적하여 업데이트
		p = p[n:] // 처리되지 않은 나머지 데이터들을 p에 할당(다음 루프에서 처리하도록)
	}
	if b.err != nil {
		return nn, b.err
	}
	n := copy(b.buf[b.n:], p) // 남은 데이터 p를 버퍼에 쓴다
	b.n += n                  // 현재 위치 갱신
	nn += n                   // 쓰여진 바이트 수 누적 업데이트
	return nn, nil
}
```

한 줄씩 뜯어보자.

```go
func (b *Writer) Write(p []byte) (nn int, err error) { .. }
```

- `Write()` 메서드는 Writer 타입의 메서드이다.
- 인자로 바이트 슬라이스 p를 받는다.
- 쓰여진 바이트 수 nn과 에러를 반환한다.

<br />

```go
for len(p) > b.Available() && b.err == nil { .. }
```

- 입력된 데이터 p의 길이가 버퍼에 남은 용량보다 크고, 에러가 없는 경우 for문을 계속 반복한다

  - 즉, 이 for문은 버퍼에 남은 용량보다 큰 데이터를 처리할 때 사용한다.

- `b.Available()`: Writer의 버퍼에 남은 용량을 반환한다.

<br/>

```go
for len(p) > b.Available() && b.err == nil { // 버퍼에 남은 용량보다 입력된 용량이 큰 경우 반복
    var n int
    if b.Buffered() == 0 {
        // Large write, empty buffer.(만약 버퍼가 비어있다면)
        // Write directly from p to avoid copy.
        // 바로 쓰기 작업 수행. (copy를 피하기 위해.. 큰 데이터를 copy하는건 비싸니까)
        // (n: 쓰여진 바이트 수)
        n, b.err = b.wr.Write(p)
    }
    ...
}
```

- `if b.Buffered() == 0` : 만약 현재 버퍼에 저장된 데이터가 없다면, 즉 버퍼가 비어있는 상태라면
  - `n, b.err = b.wr.Write(p)` : 입력된 데이터 p에 대해 바로 쓰기 작업을 수행한다.
    - `n`: 실제로 쓰여진 데이터 길이
    - `b.err`: 발생한 에러 저장
  - 어차피 버퍼에 데이터를 고대로 넣고,

<br/>

```go
for len(p) > b.Available() && b.err == nil { // 버퍼에 남은 용량보다 입력된 용량이 큰 경우 반복
    var n int
    if b.Buffered() == 0 {
        // Large write, empty buffer.(만약 버퍼가 비어있다면)
        // Write directly from p to avoid copy.
        // 바로 쓰기 작업 수행. (copy를 피하기 위해.. 큰 데이터를 copy하는건 비싸니까)
        // (n: 쓰여진 바이트 수)
        n, b.err = b.wr.Write(p)
    } else { // 만약 버퍼가 비어있지 않다면 == 버퍼에 저장된 데이터가 있는 경우
        n = copy(b.buf[b.n:], p) // p를 버퍼의 마지막 위치(=현재위치)부터 복붙 (당연히 중간에 짤린다)
        b.n += n                 // 현재 위치 갱신
        b.Flush()                // 버퍼에 있는 데이터를 실제로 파일에 쓴다 (b.wr.Write(b.buf[0:b.n]))
    }
    ...
}
```

- `else { ... }` : 만약 버퍼가 비어있지 않다면 (= 버퍼에 데이터가 존재한다면)
  - `n = copy(b.buf[b.n:], p)`: 버퍼의 마지막 위치(=현재 위치)에 데이터 p를 복붙한다.
  - `b.n += n`: 버퍼의 마지막 위치를 갱신한다.
  - `b.Flush()`: 버퍼에 있는 데이터를 실제로 파일에 쓴다. 이 때 버퍼가 비워진다.

<br/>

```go
for len(p) > b.Available() && b.err == nil {
    var n int
    if b.Buffered() == 0 {
        n, b.err = b.wr.Write(p)
    } else {
        n = copy(b.buf[b.n:], p)
        b.n += n
        b.Flush()
    }
    nn += n   // 실제로 쓰여진 바이트 수를 누적하여 업데이트
    p = p[n:] // 처리되지 않은 나머지 데이터들을 p에 할당(다음 루프에서 처리하도록)
}
```

- `nn += n`: 실제로 쓰여진 바이트 수를 누적해 업데이트
- `p = p[n:]`: 이 for문은 입력된 데이터 p의 길이가 남은 버퍼 용량보다 큰 경우이다. 따라서 위의 if-else 문에서 데이터 p를 버퍼에 넣으면 다 넣지 못하고 남게 된다. 실제로 p는 인덱스 n까지만 버퍼에 들어가게 되고, n 이후의 데이터는 버퍼에 들어가지 못한 상태이다. 그래서 `p = p[n:]`을 통해 미처 쓰여지지 못한 남은 데이터를 다시 p에 넣어서 다음 for문이든 `Flush()`든 처리될 수 있게 해준다.

<br/>

정리하면, 이 for 문은 입력된 데이터 p를 순차적으로 버퍼에 넣고, 버퍼가 차면 쓰기 작업을 진행한다.

```go
func (b *Writer) Write(p []byte) (nn int, err error) {
	for len(p) > b.Available() && b.err == nil { // 버퍼에 남은 용량보다 입력된 용량이 큰 경우 반복
		var n int
		if b.Buffered() == 0 {
			// Large write, empty buffer.(만약 버퍼가 비어있다면)
			// Write directly from p to avoid copy.
			// 바로 쓰기 작업 수행. (copy를 피하기 위해.. 큰 데이터를 copy하는건 비싸니까)
			// (n: 쓰여진 바이트 수)
			n, b.err = b.wr.Write(p)
		} else { // 만약 버퍼가 비어있지 않다면 == 버퍼에 저장된 데이터가 있는 경우
			n = copy(b.buf[b.n:], p) // p를 버퍼의 마지막 위치(=현재위치)부터 복붙 (당연히 중간에 짤린다)
			b.n += n                 // 현재 위치 갱신
			b.Flush()                // 버퍼에 있는 데이터를 실제로 파일에 쓴다 (b.wr.Write(b.buf[0:b.n]))
		}
		nn += n   // 실제로 쓰여진 바이트 수를 누적하여 업데이트
		p = p[n:] // 처리되지 않은 나머지 데이터들을 p에 할당(다음 루프에서 처리하도록)
	}
```

예를 들어, p의 크기가 90이고, 버퍼의 크기가 30이라고 가정하자.

그리고 버퍼에 지금 10만큼의 데이터가 입력되어 있는 상태이다.

- for문을 처음 돌면서, else에 걸린다.
  - Writer의 버퍼 `b.buf[10]` 뒤에 데이터 p를 붙인다.
    - 이 때, 당연히 b.buf의 크기는 30이기 때문에, `p[0]`~`p[19]`까지의 데이터만 버퍼에 붙고 나머지는 짤리게 된다.
  - b.buf가 꽉 차게 되므로 `b.Flush()`를 호출해 버퍼에 있는 데이터를 파일에 쓰고, 버퍼를 비운다.
  - `b.n`은 20이 된다. (`p[0]`~`p[19]`까지 총 20개의 데이터가 쓰여졌으므로)
  - `p[19]`까지 쓰였으므로 `p`를 `p[20]~`로 할당한다.
- 아직 p의 전체 크기는 70이고, 버퍼 용량은 30이기 때문에 for문에 걸린다. 두번째 for 문을 돈다.
  - `b.Buffered()`(버퍼에 저장된 데이터의 크기)가 0이므로 if문에 걸린다.
    - 버퍼에 데이터를 복사하지 않고,
