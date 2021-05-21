import React from 'react'

import styled from 'styled-components';


const ArticlesContainer = (props) => {
    return (
        <Articles homePage={props.homePage}>
            {props.children}
        </Articles>
    )
}

export default ArticlesContainer;

const Articles = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    box-sizing: border-box;

    @media (max-width: 1000px) {
        flex-direction: column;
        padding: 0 2rem;
    }
`