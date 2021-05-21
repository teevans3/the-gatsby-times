import React from 'react'
import { useState } from 'react';

import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import {FaBars} from 'react-icons/fa';

import SideDrawer from './side-drawer';

const Header = () => {
    const [displaySideDrawer, setDisplaySideDrawer] = useState(false);

    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                } 
            }
        }
    `)

    return (
        <NavHeader>
            <MenuButton onClick={() => setDisplaySideDrawer(true)} />
            <SideDrawer size="xl" display={displaySideDrawer} closeDrawer={() => setDisplaySideDrawer(false)} title={data.site.siteMetadata.title}/>
            <SiteTitle to="/">
                {data.site.siteMetadata.title}
            </SiteTitle>
        </NavHeader>
    );
}

export default Header;

const NavHeader = styled.header`
    width: 100%;
    height: 420px;
    position: relative;
    display: flex;
    background: transparent;
    align-items: baseline;
`

const SiteTitle = styled(Link)`
    text-decoration: none;
    font-size: 2rem;
    color: white;
    z-index: 20;
    font-family: 'Monoton', cursive;
    font-weight: 400;

    @media(max-width: 800px) {
        font-size: 1.6em;
    }
`

const MenuButton = styled(FaBars)`
    width: 2em;
    height: 2em;
    margin: 1rem 2rem 0 1rem;
    color: white;
    z-index: 20;

    &:hover {
        cursor: pointer;
    }

    @media(max-width: 800px) {
        width: 1.4em;
        height: 1.4em;
    }
`