import React from 'react';
import styled from "styled-components";

const NavbarContainer = styled.div`
    width: 100%;
    height: 60px;
    background: #FFF;
`;

const Left = styled.div`

`;

const Span = styled.span``;

const Center = styled.div``;

const Right = styled.div``;

function Navbar() {
  return (
    <NavbarContainer>

        <Left>
            <Span></Span>
        </Left>

    </NavbarContainer>
  )
}

export default Navbar