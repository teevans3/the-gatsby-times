import React from 'react'

import styled from 'styled-components';
import { Link } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";

const ArticleHeader = (props) => {
    return (
        /* if we are on the article page, then we want the article header image to take up entire viewport height  (fancy) */
        <ArticleHeaderContainer to={props.link} articlePage={props.articlePage}>
            <ArticleImage image={props.image} alt={props.imageAlt} articlePage={props.articlePage}/>
            <ArticleInfo>
                <ArticleTitle >{props.title}</ArticleTitle>
                <ArticleAuthor>{props.author}</ArticleAuthor>
            </ArticleInfo>
        </ArticleHeaderContainer>
    )
}

export default ArticleHeader;

const ArticleHeaderContainer = styled(Link)`
    position: absolute;
    top: 0;
    left: 0;
    height: ${({articlePage}) => articlePage ? '100vh' : '420px'};
    width: 100%;
    box-sizing: border-box;
    pointer-events: ${({articlePage}) => articlePage ? 'none' : 'auto'}

    &:hover {
        cursor: ${({articlePage}) => articlePage ? 'default !important' : 'pointer'}
    }
`

const ArticleImage = styled(GatsbyImage)`
    width: 100%;
    height: ${({articlePage}) => articlePage ? '100vh' : '420px'};
    object-fit: cover;

    &:after {
        z-index: 10;
        content: '';
        width: 100%;
        height: 100%;
        display: block;
        top: 0;
        left: 0;
        position: absolute;
        background: ${
            ({articlePage}) => articlePage ? 
            'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7))':
            'rgba(0, 0, 0, 0.5)'
        };
    }
`

const ArticleInfo = styled.div`
    position: absolute;
    bottom: 0;
    z-index: 20;
    padding: 0 2rem 2rem 2rem;
    padding-right: 2rem;
`

const ArticleTitle = styled.p`
    color: white;
    z-index: 20;
    text-wrap: wrap;
    font-size: 3em;
    z-index: 40;
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    margin: 0 auto;

    @media (max-width: 800px) {
        font-size: 1.4em;
    }
`

const ArticleAuthor = styled.p`
    color: white;
    font-family: 'Open Sans', sans-serif;
    
    @media (max-width: 800px) {
        font-size: 0.8em;
    }
`