// components/Banner/Banner.jsx
import React from "react";
import styled from "styled-components";
import { theme } from '../../styles/Theme';


const BannerContainer = styled.section`
  position: relative;
  width: 100%;
  height: 400px; /* Altura del banner */
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
    flex-direction: column;
  }
`;

const BannerBackground = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.5);
`;

const BannerContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  width: 90%;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextContainer = styled.div`
  max-width: 50%;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const BannerTitle = styled.h1`
  font-size: 2.5rem;
  background-color: ${({ theme, category }) =>
    theme.colors.categoryColors[category]};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BannerDescription = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BannerImg = styled.img`
  width: 600px;
  border-radius: 15px;
  box-shadow: 0px 0px 0.75rem 0.25rem #2271d1;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 1rem;
  }
`;

const Banner = ({ video }) => {

  if (!video) return null;

  return (
    <BannerContainer>
      <BannerBackground src={video.img} alt={`Fondo del banner: ${video.titulo}`} />
      <BannerContent>
        <TextContainer>
          <BannerTitle category={video.categoria}>{video.categoria}</BannerTitle>
          <BannerDescription>{video.descripcion}</BannerDescription>
        </TextContainer>
        <BannerImg src={video.img} alt={`Imagen del video: ${video.titulo}`} />
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;
