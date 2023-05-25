import React, {FunctionComponent} from 'react'
import styled from '@emotion/styled'
import {Link} from 'gatsby'
import {PostFrontmatterType} from '../../types/PostItem.types'
import { GatsbyImage } from 'gatsby-plugin-image'


type PostItemProps = PostFrontmatterType & {link: string}

const PostItemWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-bottom: 3em;
  padding: 1em;

  &:hover {
    background-color: #CCF8B820;
    color: #000000;
}
`

const TitleDateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`

const ThumbnailImage = styled(GatsbyImage)`
  width: 100%;
  height: 200px;
  border-radius: 10px 10px 0 0;
`

// const PostItemContent = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   padding: 15px;
// `

const Title = styled.div`
  display: -webkit-box;
  overflow: hidden;
  margin-bottom: 3px;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 1.7em;
  font-weight: 700;
  padding: 0.4em 0;
  margin-right: 0.3em;
`

const Date = styled.div`
  font-size: 0.8em;
  font-weight: 300;
  opacity: 0.7;
`

const Category = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin: 10px -5px;
`

const CategoryItem = styled.div`
  margin: 2.5px 5px;
  font-size: 0.8em;
  font-weight: 400;
`

const Summary = styled.div`
  display: -webkit-box;
  overflow: hidden;
  margin-top: auto;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 16px;
  opacity: 0.8;
`

const PostItem: FunctionComponent<PostItemProps> = function({
    title, date, categories, summary, link
}) {
    return <PostItemWrapper to={link}>
        {/* <ThumbnailImage image={gatsbyImageData} alt="Post Item Image" /> */}
        {/* <PostItemContent> */}
            <TitleDateWrapper>
                <Title>{title}</Title>
                <Date>{date}</Date>
               
            </TitleDateWrapper>
            
            
            <Summary>{summary}</Summary>
            <Category>
                {categories.map(item => (
                    <CategoryItem key={item}># {item}</CategoryItem>
                ))}
            </Category>

        {/* </PostItemContent> */}
    </PostItemWrapper>
}

export default PostItem