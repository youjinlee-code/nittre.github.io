import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'


const ELink = styled.a`
  font-size: 0.8rem;
  text-decoration: underline;
  margin-right: 0.5em;
`

const LinkWrapper = styled.div`
  display: flex;
  
`

const ExternalLink: FunctionComponent = function () {
  return (
    <LinkWrapper>
        <ELink href="https://github.com/nittre">🐙 github</ELink>
        <ELink href="mailto:youjinlee1997@gmail.com">✉️ youjinlee1997@gmail.com</ELink>
    </LinkWrapper>    
  )
}

export default ExternalLink