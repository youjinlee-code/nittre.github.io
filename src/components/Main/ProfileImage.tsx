import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import {GatsbyImage, IGatsbyImageData} from 'gatsby-plugin-image'

// 자신이 원하는 프로필 이미지 링크로 설정해주세요.
const PROFILE_IMAGE_LINK =
  'https://file.notion.so/f/s/3cb3a9a8-4dda-456e-9c14-5ccdcf1498e0/Untitled.png?id=7f90ae26-1e3b-4c4b-994e-fa4f4dbed92a&table=block&spaceId=35723dae-672b-47fd-ad4f-4582386642f2&expirationTimestamp=1684930165226&signature=NMxQ8rnDaPnJWWsvN2rnBVyEg7c8MLbbMK5bTQcc2EU&downloadName=Untitled.png'

type ProfileImageProps = {
    profileImage: IGatsbyImageData
}

const ProfileImageWrapper = styled(GatsbyImage)`
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  border-radius: 50%;

  @media (max-width: 768px){
    width: 80px;
    height: 80px;
  }
`

const ProfileImage: FunctionComponent<ProfileImageProps> = function ({
    profileImage
}) {
  return <ProfileImageWrapper image={profileImage} alt="Profile Image" />
}

export default ProfileImage