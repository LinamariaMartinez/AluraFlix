import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.header`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  flex: 1;
`;

const LogoText = styled.h1`
  color: #61dafb;
  font-size: 1.8rem;
  margin-right: 2rem;
  cursor: pointer;
  font-weight: bold;
`;

const Nav = styled.nav`
  box-shadow: 0px 0px 0.75rem 0.25rem #2271d1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 4rem;
  background-color: #262626;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    flex-direction: column;
    gap: 1rem;
  }

  &:hover {
    background-color: #21a1f1;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;

  &.active button {
    background: #000000e5;
    border: 0.125rem solid #2271d1;
    box-shadow: 0px 0px 0.75rem 0.25rem #2271d1 inset;
    color: #2271d1;
  }
`;

const Button = styled.button`
  width: 11.26rem;
  height: 3.375rem;
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.5rem;
  text-align: center;
  background-color: transparent;
  color: #ffffff;
  border: 0.125rem solid #f5f5f5;
  border-radius: 0.9375rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #2271d1;
  }

  @media (max-width: 768px) {
    width: 9rem;
    height: 2.5rem;
    font-size: 1rem;
  }
`;

function Header() {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <Nav>
        <LogoText onClick={() => navigate("/")}>AluraFlix</LogoText>
        <NavContainer>
          <StyledNavLink to="/" end>
            <Button>Home</Button>
          </StyledNavLink>
          <StyledNavLink to="/new-video">
            <Button>Nuevo Video</Button>
          </StyledNavLink>
        </NavContainer>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
