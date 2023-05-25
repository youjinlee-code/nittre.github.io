import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import ExternalLink from './ExternalLink'

const FooterWrapper = styled.footer`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 1em;
  text-align: center;


  @media (max-width: 768px) {
    font-size: 13px;
  }
`

const Footer: FunctionComponent = function () {
  return (
    <FooterWrapper>
      <ExternalLink />
      <br />© 2023 유진, Powered By Gatsby.
    </FooterWrapper>
  )
}

export default Footer