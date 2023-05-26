import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

interface PostContentProps {
  html: string
}

const MarkdownRenderer = styled.div`
// Renderer Style
display: flex;
flex-direction: column;
width: 768px;
margin: 0 auto;
padding: 4em 0;
word-break: break-all;

// Markdown Style
line-height: 1.8;
font-size: 16px;
font-weight: 400;

// Apply Padding Attribute to All Elements
p {
  padding: 3px 0;
}

// Adjust Heading Element Style
h1,
h2,
h3 {
  font-weight: 700;
  margin-bottom: 0.5em;
}

* + h1,
* + h2 {
  margin-top: 3em;
}
* + h3 {
  margin-top: 3em;
}
* + h4 {
  margin-top: 0.8em;
}


hr + h1,
hr + h2,
hr + h3 {
  margin-top: 0;
}

h1 + h2,
h2 + h3,
h3 + h4 {
  margin-top: 0;
}

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.7em;
  }

  h3 {
    font-size: 1.4em;
  }

  h4 {
    font-size: 1.1em;
  }

  // Adjust Quotation Element Style
  blockquote {
    margin: 1em 0;
    padding: 5px 15px;
    border-left: 2px solid #000000;
  }

  // Adjust List Element Style
  ol,
  ul {
    margin-left: 1em;
    padding: 0.1em 0;
  }

  // Adjust Horizontal Rule style
  hr {
    border: 1px solid #000000;
    margin: 100px 0;
  }

  // Adjust Link Element Style
  a {
    color: #4263eb;
    text-decoration: underline;
  }

  // Adjust Code Style
  pre[class*='language-'] {
    margin: 1em 0 2em 0;
    font-size: 0.9em;
    padding: 1em 1.5em;

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.5);
      border-radius: 1px;
    }
  }

  code[class*='language-'],
  pre[class*='language-'] {
    // tab-size: 2;
    border-radius: 0.5em;
    // padding: 1em;
   
  }

  code[class='language-text'] {
    padding: 0.2em 0.4em 0.2em 0.5em;
    font-size: 0.9em;
    margin-right: 1px;
    color: #DD4A68;
  }

  h2 > code[class='language-text'],
  h3 > code[class='language-text'] {
    font-size: 0.8em;
  }

  // Markdown Responsive Design
  @media (max-width: 768px) {
    width: 100%;
    padding: 2em 1em;
    line-height: 1.6;
    font-size: 1em;

    h1 {
      font-size: 23px;
    }

    h2 {
      font-size: 20px;
    }

    h3 {
      font-size: 17px;
    }

    img {
      width: 100%;
    }

    hr {
      margin: 50px 0;
    }
  }

`

const PostContent: FunctionComponent<PostContentProps> = function ({ html }) {
  return <MarkdownRenderer dangerouslySetInnerHTML={{ __html: html }} />
}

export default PostContent