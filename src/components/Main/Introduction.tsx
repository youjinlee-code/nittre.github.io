import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import ProfileImage from './ProfileImage'
import { IGatsbyImageData } from 'gatsby-plugin-image'

type IntroductionProps = {
    profileImage: IGatsbyImageData
}
const Background = styled.div`
  width: 100%;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 750px;
  padding: 1em;
  margin: 6em auto 0 auto;

  border: 1px solid #aaa;

  @media (max-width: 768px){
    width: 85%;
    padding: 1em;
    margin: 5em 2em 0 2em;
  }
`

const SubTitle = styled.div`
  font-size: 1em;
  font-weight: 400;
  
  margin-bottom: 0.5em;

  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`

const Title = styled.div`
  margin-bottom: 12px;
  font-size: 1.3em;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`

const ExternalLink = styled.a`
  font-size: 0.8em;
  text-decoration: underline;
  margin-right: 0.5em;
`

const LinkWrapper = styled.div`
  display: flex;
  
`

const Introduction: FunctionComponent<IntroductionProps> = function ({
    profileImage
}) {
  return (
    <Background>
      <Wrapper>
        {/* <ProfileImage profileImage={profileImage} /> */}

        
          <Title>유진의 하드디스크</Title>
          <SubTitle>환영합니다! <br/> 스스로 이해하고, 더 오래 기억하기 위해 만들어진 공간입니다. </SubTitle>
          <LinkWrapper>
            <ExternalLink href="https://github.com/nittre">🐙 github</ExternalLink>
            <ExternalLink href="mailto:youjinlee1997@gmail.com">✉️ youjinlee1997@gmail.com</ExternalLink>
          </LinkWrapper>
      </Wrapper>
    </Background>
  )
}

export default Introduction