import React from 'react'

import { graphql, useStaticQuery, Link } from 'gatsby';
import { AnchorLink } from "gatsby-plugin-anchor-links";
import styled from 'styled-components';


const Footer = () => {
    const data = useStaticQuery(graphql`
    query {
        site {
            siteMetadata {
                title
                author
            } 
        }
    }
`)
    return (
        <FooterContainer>
            <FooterWebsite>
                <FooterTitle to="/">{data.site.siteMetadata.title}</FooterTitle>
                <FooterCreator>Created by {data.site.siteMetadata.author}, © 2021</FooterCreator>
            </FooterWebsite>
            <FooterInfo>
                <Link to="/about/">About</Link>
                <AnchorLink to="/about#contact">Contact</AnchorLink>
                <Link to="#">More...</Link>
            </FooterInfo>
            
        </FooterContainer>
    )

}

export default Footer;

const FooterContainer = styled.footer`
    display: flex;
    background-color: #ff6200;
    color: white;
    justify-content: center;
    width: 100%;
    padding: 0;
    height: 8rem;
    margin-top: 3rem;
    box-sizing: border-box;
`

const FooterWebsite = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 2rem;

    @media (max-width: 840px) {
        width: 70%;
        justify-content: flex-start;
    }

`

const FooterInfo = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    & a {
        text-decoration: none;
        font-size: 1.2rem;
        color: white;
        width: 4rem;
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;
    }

    @media (max-width: 840px) {
        width: 30%;
        & a {
            font-size: 1rem;
        }
    }
`

const FooterTitle = styled(Link)`
    font-size: 2rem;
    text-decoration: none;
    text-align: left;
    margin: 0;
    color: white;
    padding-top: 1rem;
    align-self: flex-end;
    font-family: 'Monoton', cursive;
    font-weight: 400;

    @media (max-width: 840px) {
        font-size: 1.4rem;
        align-self: center;
    }
`

const FooterCreator = styled.p`
    font-size: 1rem;
    text-align: left;
    margin: 0;
    padding-bottom: 1rem;
    display: flex;
    align-self: flex-end;
    font-family: 'Open Sans', sans-serif;

    @media (max-width: 840px) {
        font-size: 0.6rem;
        align-self: center;
    }
`