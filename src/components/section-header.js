import React from 'react'

import styled from 'styled-components';

const SectionHeader = (props) => {
    return (
        <Header>
            <HeaderTitle>
                {props.title}
            </HeaderTitle>
        </Header>
    );
}

export default SectionHeader;

const Header = styled.div`
    box-sizing: border-box;
    margin: 1rem 0 3rem 0;
    border-bottom: 1px solid black;

    @media (max-width: 1200px) {
        margin: 1rem 2rem 3rem 2rem;
    }
`

const HeaderTitle = styled.p`
    font-size: 2rem;
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;

    @media (max-width: 1000px) {
        font-size: 1.4rem;
    }
`
