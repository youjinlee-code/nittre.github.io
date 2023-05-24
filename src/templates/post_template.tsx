import React, {FunctionComponent} from 'react'
import {graphql} from 'gatsby';
import Template from '../components/Common/Template';
import {PostPageItemType} from '../types/PostItem.types'
import PostHead from '../components/Post/PostHead';
import PostContent from '../components/Post/PostContent';
import CommentWidget from '../components/Post/CommentWidget';

type PostTemplateProps = {
    data: {
      allMarkdownRemark: {
        edges: PostPageItemType[] // 존재하지 않는 타입이므로 에러가 발생하지만 일단 작성해주세요
      }
    }
    location: {
        href: string
    }
  }
const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
    data: {
      allMarkdownRemark: { edges },
    },
    location: {href}
  }) {
    const {
      node: {
        html,
        frontmatter: {
          title,
          summary, // 나중에 사용할 예정입니다!
          date,
          categories,
          thumbnail: {
            childImageSharp: { gatsbyImageData },
            publicURL
          },
        },
      },
    } = edges[0]
  
    return (
      <Template title={title} description={summary} url={href} image={publicURL}>
        <PostHead
          title={title}
          date={date}
          categories={categories}
          thumbnail={gatsbyImageData}
        />
        <PostContent html={html} />
        <CommentWidget />
      </Template>
    )
  }

export default PostTemplate

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
              publicURL
            }
          }
        }
      }
    }
  }
`

export type PostPageItemType = {
    node: {
      html: string
      frontmatter: PostFrontmatterType
    }
  }