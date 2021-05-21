import React from 'react'
import styled, { keyframes } from 'styled-components';
import {AiOutlineClose} from 'react-icons/ai';

import { graphql, useStaticQuery } from 'gatsby';
import { AnchorLink } from "gatsby-plugin-anchor-links";

const SideDrawer = (props) => {
    const data = useStaticQuery(graphql`
        query {
            allContentfulSection {
                edges {
                    node {
                        sectionTitle
                    }
                }
            }
        }
    `)
    return (
        <SideDrawerContainer display={props.display}>
            <CloseButton onClick={() => props.closeDrawer()}/>
            <SiteTitle to="/">{props.title}</SiteTitle>
            <NavList>
                {data.allContentfulSection.edges.map((edge) => {
                    return <NavItem key={edge.node.sectionTitle} to={`/${edge.node.sectionTitle}`}>{edge.node.sectionTitle.toUpperCase()}</NavItem>
                })}
                <Divider />
                <NavItem to="/about/" style={{color: 'white'}}>About</NavItem>
                <NavItem to="/about#contact" style={{color: 'white'}}>Contact</NavItem>
            </NavList>
        </SideDrawerContainer>
    )
}

export default SideDrawer;

const slideInAnimation = keyframes`
    0% { transform: translateX(-30rem) }
    100% { transform: translateX(0rem) }
`


const SideDrawerContainer = styled.div`
    display: ${({display}) => display ? 'flex' : 'none'};
    position: absolute;
    flex-wrap: wrap;
    animation: ${slideInAnimation} 0.5s ease forwards;

    width: 30rem;
    z-index: 30;
    background-color: #ff6200;
    color: white;

    @media (max-width: 800px) {
        width: 100%
    };


`

const CloseButton = styled(AiOutlineClose)`
    height: 2em;
    width: 2em;
    margin: 1rem 0 0 1rem;
    z-index: 30;
    color: #8c8c8c;

    &:hover {
        cursor: pointer;
        color: white;
    }
`

const SiteTitle = styled(AnchorLink)`
    text-decoration: none;
    font-size: 2.2rem;
    font-family: 'Monoton', cursive;
    font-weight: 400;
    margin: auto;
    color: white;
    padding-top: 2rem;
`

const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    list-style-type: none;
    justify-content: space-between;
    padding: 0 2rem;
    width: 100%;

    & a {
        padding: 1rem 0;
    }
`

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #eee;
    margin: 1rem auto;
`

const NavItem = styled(AnchorLink)`
    text-decoration: none;
    font-size: 1.2rem;
    color: white;
    font-weight: 600;
    font-family: 'Open Sans', sans-serif;
`

