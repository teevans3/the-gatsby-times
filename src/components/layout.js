import React from 'react';

import styled from 'styled-components';

import Header from './header';
import Footer from './footer';

const Layout = ({children}) => (
    <LayoutContainer>
        <Header />
        <LayoutContent>
            {children}
        </LayoutContent>
        <Footer />
    </LayoutContainer>
)


export default Layout;

const LayoutContainer = styled.div`
    position: relative;
`

const LayoutContent = styled.div`
    flex-grow: 1;
    max-width: 1200px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    min-height: 100vh;
`