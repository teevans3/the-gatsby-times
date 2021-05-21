import React from 'react'

import styled from 'styled-components';

import { Link } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";


const ArticleCard = (props) => {
    return (
        <ArticleCardContainer to={props.link} big={props.big}>
            <ArticleImage image={props.image} alt={props.imageAlt} big={props.big}/>
            <ArticleInfo>
                <ArticleSection big={props.big}>{props.section.toUpperCase()}</ArticleSection>
                <ArticleTitle big={props.big}>{props.title}</ArticleTitle>
                <ArticleAuthor big={props.big}>{props.author}</ArticleAuthor>
            </ArticleInfo>
        </ArticleCardContainer>
    )
}

export default ArticleCard;


const ArticleCardContainer = styled(Link)`
    display: flex;
    text-decoration: none;
    margin-bottom: ${({big}) => big ? '3rem': '3rem'};
    height: ${({big}) => big ? '20rem': '16rem'};

    &:first-child {
        width: 100%;
    }

    &:not(:first-child) {
        width: ${({big}) => big ? '100%' : '50%'};
    }

    &:hover {
        & div {
           & p {
                color: #ff6200 !important;
            }
        } 
    }

    @media (max-width: 1000px) {
       width: 100% !important; 
    }

    @media (max-width: 800px) {
        height: 12rem;
    }
`

const ArticleImage = styled(GatsbyImage)`
    width: 50%;
    height: ${({big}) => big ? '20rem': '16rem'};

    @media (max-width: 800px) {
        height: 12rem;
    }
`

const ArticleInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    width: 50%;
    
    & p {
        text-decoration: none;
        margin: 0.5rem 0.5rem;
        text-wrap: wrap;
    }
`

const ArticleSection = styled.p`
    font-size: ${({big}) => big ? '1.4em' : '0.8em'};
    font-family: 'Open Sans', sans-serif;
    color: #ff6200;

    @media (max-width: 1000px) {
        font-size: 0.8em;  
     }

     @media (max-width: 800px) {
        display: none;
    }
`

const ArticleTitle = styled.p`
    font-size: ${({big}) => big ? '2em' : '1.2em'};
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    color: black;

    @media (max-width: 1000px) {
        font-size: 1.2em;  
     }

     @media (max-width: 800px) {
        font-size: 1em;
    }
`

const ArticleAuthor = styled.p`
    font-size: ${({big}) => big ? '1em' : '0.8em'};
    font-family: 'Open Sans', sans-serif;
    color: black;

    @media (max-width: 1000px) {
        font-size: 0.8em;  
     }

     @media (max-width: 800px) {
        display: none;
    }
`