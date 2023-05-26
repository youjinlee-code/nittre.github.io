import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

interface tableOfContentsProps {
  html: string
}

const ToC = styled.div`
    @media (min-width: 1100px) {
      position: absolute;
      top: 0;
      left: calc(50% + 400px);
      height: 100%;
      margin: 6em 2em 0 1em;
      max-width: 20em;
      
      color: #888888;
      font-size: 0.85em;
  
      > ul, > div {
        position: sticky;
        top: 6em;
        border-left: 2px solid #eeeeee;
        padding-left: 0.7em;
        
        
      }

      li, p {
        margin: 0.25em 0;
        list-style-type: none;
        &:hover:not(:has( ul  li)){
            color: black;
        }
      }

      ul ul {
            margin-left: 0.5em;
            padding-left: 0.7em;
            
        }
    }
  }
`


const TableOfContents: FunctionComponent<tableOfContentsProps> = function ({ html }) {

  return <ToC dangerouslySetInnerHTML={{ __html: html }} />
  
    
}

export default TableOfContents