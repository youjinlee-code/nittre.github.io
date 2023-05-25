import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { FooterArticle } from '../../templates/post_template'
import { Link } from 'gatsby'


type PostFooterProps = {
    previous: FooterArticle | null
    next: FooterArticle | null
}

const PostFooterWrapper = styled.div`
    display: flex;
    margin-bottom: 40px;
    

    position: relative;
    box-sizing: border-box;
    width: 100%;
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;

    @media screen and (max-width: 768px) {
        flex-wrap: wrap;
    }
`

const Article = styled(Link)`
flex: 1 1 50%;

display: flex;
flex-direction: column;
padding: 12px;
border-radius: 6px;
border: 1px solid #eaebec;

text-decoration: none;

&:first-child {
  margin-right: 8px;
}

&:last-child {
  margin-left: 8px;
  text-align: right;
}

&:first-child:last-child {
  margin: 0;
}

@media screen and (max-width: 768px) {
  flex-basis: 100%;

  &:first-child,
  &:last-child {
    margin: 6px 1em;
  }
}
`

const ArticleLabel = styled.div`
  font-size: 0.825em;
  margin-bottom: 8px;
`;

const ArticleTitle = styled.strong``;

const PostFooter: FunctionComponent<PostFooterProps> = function ({
  previous, next
}) {
  return (
    <PostFooterWrapper>
        {
           [previous, next].map((article, i) =>
                article != null ? (
                    <Article key={article.fields.slug} to={article.fields.slug}>
                        <ArticleLabel>
                            {i === 0 ? "이전 글" : "다음 글"}
                        </ArticleLabel>
                        <ArticleTitle>
                            {article.frontmatter.title}
                        </ArticleTitle>
                    </Article>
                ) : null
           )
        }
    </PostFooterWrapper>
            
  )
}

export default PostFooter