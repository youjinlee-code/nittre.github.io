import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

export type PostHeadInfoProps = {
  title: string
  date: string
  summary: string
  categories: string[]
}

const PostHeadInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 768px;
  height: 100%;
  margin: 6em auto 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1em 1em;
    margin: 4em auto 0 auto;

  }
`

// const PrevPageIcon = styled.div`
//   display: grid;
//   place-items: center;
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background: #ffffff;
//   color: #000000;
//   font-size: 22px;
//   cursor: pointer;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

//   @media (max-width: 768px) {
//     width: 30px;
//     height: 30px;
//     font-size: 18px;
//   }
// `

const Title = styled.div`
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: break-word;
  margin-bottom: 0.25em;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 2.4em;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`

const PostData = styled.div`
  display: flex;
//   justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 0.9em;
  font-weight: 400;

  &>div {
    margin-right: 1em;
    margin-bottom: 0.25em;

  }
`

const CategoryItem = styled(Link)`
margin-right: 0.5em;
text-decoration: underline;
cursor: pointer;

&:last-of-type {
  margin-right: 0;
}

&:hover {
    color: #6AB767;
    text-decoration: underline;
}
`
const PostHeadInfo: FunctionComponent<PostHeadInfoProps> = function ({
  title,
  date,
  summary,
  categories,
}) {
//   const goBackPage = () => window.history.back()

  return (
    <PostHeadInfoWrapper>
      {/* <PrevPageIcon onClick={goBackPage}>
        ↩️
      </PrevPageIcon> */}
      <Title>{title}</Title>
      <div>{summary}</div>
      <PostData>
        <div>{date}</div>
        <div>{categories.map(name => (<CategoryItem 
                    to={`/?category=${name}`} 
                    key={name}>
                        #{name}
                </CategoryItem>))}</div>
         
      </PostData>
    </PostHeadInfoWrapper>
  )
}

export default PostHeadInfo