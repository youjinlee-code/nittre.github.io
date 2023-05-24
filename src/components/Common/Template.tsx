import React, { FunctionComponent, ReactNode } from 'react'
import styled from '@emotion/styled'
import GlobalStyle from './GlobalStyle'
import Footer from './Footer'
import { Helmet } from 'react-helmet'

type TemplateProps = {
  title: string
  description: string
  url: string
  image: string
  children: ReactNode
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Template: FunctionComponent<TemplateProps> = function ({ 
    title,
    description,
    url,
    image,
    children, 
}) {
  return (
    <Container>
      <Helmet 
        meta={[
            {
                name: 'google-site-verification',
                content: "d41Ck2f3LnP0_Xf45nyyVlR-LssnymFKygTi8QFqV7A"
            }
        ]}
      >
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={title} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@이유진" />
        <meta name="twitter:creator" content="@이유진" />
      
        <meta name="google-site-verification" content="d41Ck2f3LnP0_Xf45nyyVlR-LssnymFKygTi8QFqV7A" />
        
        <html lang="ko" />
      </Helmet>
      <GlobalStyle />
      {children}
      <Footer />
    </Container>
  )
}

export default Template