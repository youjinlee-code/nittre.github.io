import React, {FunctionComponent} from 'react'
import {graphql} from 'gatsby';
import Template from '../components/Common/Template';
import PostHead from '../components/Post/PostHead';
import PostContent from '../components/Post/PostContent';
import CommentWidget from '../components/Post/CommentWidget';
import PostFooter from '../components/Post/PostFooter';

export type FooterArticle = {
    fields: {
        slug: string
    }
    frontmatter : {
        title: string
    }
    id: string
} 
type PostTemplateProps = {
    data: {
      allMarkdownRemark: {
        edges: PostPageItemType[] // 존재하지 않는 타입이므로 에러가 발생하지만 일단 작성해주세요
      }
    }
    location: {
        href: string
    },
    pageContext:{
        previous: FooterArticle | null
        next: FooterArticle | null
        tableOfContents: string
    }
  }



const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
  location: {href},
  pageContext: {
      previous, next, tableOfContents
  }
}) {
    
    const {
      node: {
        html,
        frontmatter: {
          title,
          summary, // 나중에 사용할 예정입니다!
          date,
          categories,
        },
      },
    } = edges[0]
    
    return (
      <Template title={title} description={summary} url={href}>

          <PostHead
            title={title}
            date={date}
            categories={categories}
            summary={summary}
          />
          
          <PostContent html={html} tableOfContents={tableOfContents} />
            
          <PostFooter previous={previous} next={next} />

          <CommentWidget />
        
          

      </Template>
    )
  }

export default PostTemplate

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug(
    $slug: String
    ) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY-MM-DD")
            categories
            
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