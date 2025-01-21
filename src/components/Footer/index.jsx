import React from "react";
import { styled } from "styled-components";
import logo from "../../assets/logo.png";

const FooterContainer = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-top: 4px solid var(--Blue, #2271D1);
    background: rgba(0, 0, 0, 0.90);
    box-shadow: 0px 5px 29px 0px rgba(34, 113, 209, 0.70);
    width: 100%;
`;

const Logo = styled.img`
  height: 3.125rem; /* 50px */
`;

const FooterText = styled.p`
  font-size: 0.875rem;
  margin: 0.5rem 0 0;
`;


const Footer = () => {
    return (
        <FooterContainer>
            <Logo src={logo} alt="AluraFlix logo" />
            <FooterText>Developer by Linamaría Martínez &copy; 2025</FooterText>
        </FooterContainer>
    );
};

export default Footer;