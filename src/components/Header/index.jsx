import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png"

const HeaderContainer = styled.header`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  flex: 1;
`;

const Logo = styled.img`
  height: 3.125rem;
  margin-right: 2rem;
`;

const Nav = styled.nav`
  box-shadow: 0px 0px 0.75rem 0.25rem #2271d1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 4rem;
  background-color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background-color: #21a1f1;
  }
`;

const LinkNav = styled(NavLink)`
  &.active button {
    background: #000000e5;
    border: 0.125rem solid #2271d1;
    box-shadow: 0px 0px 0.75rem 0.25rem #2271d1 inset;
    color: #2271d1;
  }
`;

const NavContainer = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLink = styled(NavLink)`
  &.active button {
    background: #000000e5;
    border: 0.125rem solid #2271d1;
    box-shadow: 0px 0px 0.75rem 0.25rem #2271d1 inset;
    color: #2271d1;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.light};
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.tertiary};
  }
`;

function Header() {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <Nav>
        <Logo onClick={() => navigate("/")}>AluraFlix</Logo>
        <NavContainer>
          <StyledLink to="/" end>
            <Button>Home</Button>
          </StyledLink>
          <StyledLink to="/new-video">
            <Button>Nuevo Video</Button>
          </StyledLink>
        </NavContainer>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;