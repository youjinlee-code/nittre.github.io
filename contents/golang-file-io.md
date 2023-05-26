---
date: "2023-05-26"
title: "[Go] 파일 입출력 패키지 4종 정리(os, io, ioutil, bufio)"
categories: ["Golang"]
summary: os, io, ioutil, bufio 패키지에 대해 가볍게 살펴보고, 각 패키지의 차이점을 확인합니다.
---

## 파일 시스템 패키지 - `os`, `io`, `ioutil`, `bufio`

Go언어어는 파일 I/O와 관련된 다양한 패키지들이 있다. 무려 네 가지나 있는 바람에 한번 짚고 넘어가면 좋을 것 같아 정리해둔다.

주요 패키지는 아래와 같다.

<br/>

- `os` 패키지: 운영체제와 상호작용하는 패키지로, 파일을 열고, 생성하고, 삭제하는 등의 파일 시스템 작업을 수행한다.
- `io` 패키지: 파일 입출력 연산을 위한 인터페이스를 제공한다.
- `ioutil` 패키지: 파일 작업을 편리하게 처리하기 위한 유틸리티 함수를 제공한다.
- `bufio` 패키지: I/O 작업 시 버퍼 방식을 사용할 수 있도록 함수를 제공한다.

### `os` 패키지

> Package os provides a platform-independent interface to operating system functionality.
>
> os 패키지는 운영체제 기능에 대한 플랫폼 독립적인 인터페이스를 제공한다.

다음과 같이 파일을 열 수 있다.

```go
file, err := os.Open("file.go") // For read access.

if err != nil {
	log.Fatal(err)
}
```

`os.Open()`으로 파일을 열면, 바이트 조각 단위로 파일 데이터를 읽을 수 있다. 읽기 및 쓰기 작업 시, 인자로 주어진 슬라이스의 길이만큼 작업한다. (예를 들어, 슬라이스의 길이가 100이면 100byte만 읽는다.)

```go
data := make([]byte, 100) // 읽어들인 파일 데이터를 저장하는 공간
count, err := file.Read(data) // 읽어들인 파일 데이터의 길이를 반환한다
if err != nil {
	log.Fatal(err)
}
fmt.Printf("read %d bytes: %q\n", count, data[:count])
```

그 외에도 `Create`, `Remove` 등의 함수를 사용해 파일을 다룰 수 있다.

### `io` 패키지

> Package io provides basic interfaces to I/O primitives. Its primary job is to wrap existing implementations of such primitives, such as those in package os, into shared public interfaces that abstract the functionality, plus some other related primitives.
>
> io 패키지는 I/O Primitives에 대한 기본 인터페이스를 제공한다. io 패키지는 주로 (os 패키지에 있는 것과 같이) primitives들의 구현체를 공용 퍼블릭 인터페이스와 다른 관련된 primitives로 감싸 기능을 추상화하는 것이다.

<br/>

- 파일 입출력과 관련된 인터페이스와 함수를 제공하는 패키지
- io 패키지의 함수와 메서드를 사용해 데이터를 읽고 쓰는 작업을 수행할 수 있다.
- 파일 입출력에 사용되는 일반적인 인터페이스인 `io.Reader`와 `io.Writer`를 정의한다.
  - 다른 패키지들은 io 패키지에 정의된 인터페이스를 구현하여 표준화된 입출력 작업을 수행한다.

<br/>

예시 - `io.ReadFull`

```go
file, err := os.Open("res.txt")

byteSlice := make([]byte, 245)
numBytesRead, err := io.ReadFull(file, byteSlice) // file에서 len(byteSlice)만큼만 읽어들여서 byteSlice에 저장
if err == io.EOF {
    fmt.Println(err)
} else if err != nil {
    panic(err)
}
log.Printf("io - Number of Bytes Read: %d\n", numBytesRead)
log.Printf("Data Read: %s\n", byteSlice)
```

### `ioutil` 패키지

> Package ioutil implements some I/O utility functions.
>
> ioutil 패키지는 I/O 유틸리티 함수를 구현한다.

> Deprecated: As of Go 1.16, the same functionality is now provided by package io or package os, and those implementations should be preferred in new code.
>
> Deprecated: Go 1.16부터, 동일한 기능은 io 패키지와 os 패키지에서 제공하며, 새롭게 코드를 작성할 때는 두 패키지를 사용하는 것을 권장한다.

<br/>

- I/O 작업을 편리하게 처리하기 위한 유틸리티 함수를 제공한다.
  - 예를 들어, ReadFile, WriteFile 함수를 통해 파일 내용을 한번에 읽거나 쓸 수 있다.
- 그러나 1.16 버전부터 deprecated 되었으며, 기존 ioutil 함수들은 os 패키지와 io 패키지에 구현되었다.

<br/>

예시 - ioutil.ReadFile (파일을 열고 한꺼번에 읽는다.)

```go
func readByIoutil(filename string) {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		log.Panicf("failed reading data from file: %s", err)
	}
	fmt.Printf("\nSize: %d bytes", len(data))
	fmt.Printf("\nData: %s", data)
}
```

ioutil 패키지의 ReadFile 함수 구현 모습을 보면, 실제로 `os.ReadFile()`을 내부적으로 호출하는 것을 볼 수 있다.

```go
func ReadFile(filename string) ([]byte, error) {
	return os.ReadFile(filename)
}
```

### `bufio` 패키지

> Package bufio implements buffered I/O. It wraps an io.Reader or io.Writer object, creating another object (Reader or Writer) that also implements the interface but provides buffering and some help for textual I/O.
>
> bufio 패키지는 버퍼링된 I/O를 구현한다. io.Reader와 io.Writer 인터페이스를 래핑하여 Reader, Writer 객체를 만들고, 버퍼 및 텍스트 I/O와 관련된 기능을 제공한다.

<br/>

- bufio는 버퍼 방식을 사용해, 청크 단위로 I/O 작업을 하는 과정에서 발생하는 오버헤드를 줄여 성능을 향상시킨다.
  - 따라서, 파일 크기가 크거나, 데이터 양이 많은 경우 유용하다.
- `bufio.Reader`와 `bufio.Writer` 타입을 사용해 입출력 작업을 처리한다.

<br/>

실제로, `bufio.Reader` 구조체는 다음과 같다.

```go
type Reader struct {
	buf          []byte
	rd           io.Reader // reader provided by the client
	r, w         int       // buf read and write positions
	err          error
	lastByte     int // last byte read for UnreadByte; -1 means invalid
	lastRuneSize int // size of last rune read for UnreadRune; -1 means invalid
}
```

클라이언트로부터 reader를 받을 때, `io.Reader` 인터페이스를 구현한 reader 객체를 받는다.

```go
// bufio.NewReader()
func NewReader(rd io.Reader) *Reader {
	return NewReaderSize(rd, defaultBufSize)
}
```

bufio 패키지를 사용해 아래와 같이 read, write 작업을 수행할 수 있다.

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

## 정리

os, io, ioutil, bufio 패키지 각각이 유사한 작업들을 수행하기 때문에, 각 패키지가 무슨 역할을 집중적으로 수행하는지 구별할 필요가 있다.

<br/>

- `os`
  - **파일 시스템** 작업에 집중 (파일 생성, 수정, 삭제)
  - 운영체제와 밀접한 관련이 있는 작업(e.g. 파일시스템)
- `io`
  - 파일 입출력을 위한 **인터페이스**를 제공
  - 파일 입출력과 관련된 기본적인 함수(구현체)를 제공
- `ioutil`
  - 파일 입출력과 관련된 여러 기능을 제공했지만, deprecated
  - ioutil 패키지의 기능들은 io, os 패키지에 흡수되었다.
- `bufio`
  - 버퍼 방식으로 파일 입출력을 할수 있게 해준다.
  - 성능 굿!!

## 무엇을 써야할까?

정답은 없다.

- os.Open() 후 io.ReadFull()을 써도 되고,
- os.ReadFile()을 써도 되고,
- os.Open() 후 bufio.NewReader()와 bufio.Read()를 써도 된다.

다만 나라면 파일 입출력이 필요할 때는 **bufio 패키지**를 적극적으로 사용할 것 같다.

파일 입출력은 디스크라는 물리적인 공간을 방문하는 행위이기 때문에 성능이 중요하고, 따라서 버퍼 방식으로 처리해 조금이라도 방문 횟수를 줄이는 것이 좋을 것 같다.
