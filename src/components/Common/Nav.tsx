import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

const NavWrapper = styled.div`
 
  z-index: 1000;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  padding: 0px 42px;
  height: 3em;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  background-color: #ffffffbb;
  

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 0px 21px;
  }

  
`

const HomeButton = styled(Link)`
  font-size: 1.2em;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1em;
  }
  &:hover {
    color: #6AB767
  }
`

const Nav: FunctionComponent = function () {
  return (
    <NavWrapper>
      <HomeButton to='/'>🌿 nittre.github.io</HomeButton>
    </NavWrapper>
  )
}

export default Nav