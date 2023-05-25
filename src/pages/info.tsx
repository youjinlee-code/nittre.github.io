import React, {FunctionComponent} from 'react'
import {graphql} from 'gatsby'
import {Global, css} from '@emotion/react'
import styled from '@emotion/styled'
import Template from '../components/Common/Template'



type InfoPageProps = {
    data: {
        site: {
            siteMetadata: {
                title: string
                author: string
                description: string
            }
        }
    }
}

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 750px;
    padding: 1em;
    margin: 6em auto 0 auto;

    @media (max-width: 768px){
    width: 85%;
    padding: 1em;
    margin: 5em 2em 0 2em;
    }
`
const InfoPage: FunctionComponent<InfoPageProps> = function ({
    data: {
        site:{
            siteMetadata: {title, description, author, siteUrl}
        }
    }
}) {
    return(
        <Template
            title={title}
            description={description}
            url={siteUrl}
        >
           <InfoWrapper>
                공사중...🚧
           </InfoWrapper>
        </Template>
    )
}

export default InfoPage

export const metadataQuery = graphql`
    {
        site {
            siteMetadata{
                title
                author
                description
            }
        }
    }
`;

