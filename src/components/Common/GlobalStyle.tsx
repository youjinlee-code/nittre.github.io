import React, { FunctionComponent } from 'react'
import { Global, css } from '@emotion/react'


const defaultStyle = css`
    // @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap');

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: Pretendard Variable,Apple SD Gothic Neo,Nanum Barun Gothic,Nanum Gothic,Verdana,Arial,Malgun Gothic,Dotum,sans-serif;
        font-size: 1em;
    }

    html, 
    body,
    #___gatsby {
        height: 100%;
        color: rgb(52,58,64);
    }

    a, 
    a:hover {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
    }
`

const GlobalStyle: FunctionComponent = function () {
    return <Global styles={defaultStyle} />
}

export default GlobalStyle