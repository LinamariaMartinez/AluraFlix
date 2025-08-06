import React from "react";
import styled from "styled-components";

const BannerContainer = styled.section`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  margin-bottom: 2rem;

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
    margin-bottom: 1rem;
  }
`;

// Función para obtener el color de la categoría
const getCategoryColor = (category) => {
  const colors = {
    "FRONT END": "#6bd1ff",
    "BACK END": "#00c86f",
    MOBILE: "#ffba05",
  };
  return colors[category] || "#61dafb";
};

const BannerTitle = styled.h1`
  font-size: 2.5rem;
  background-color: ${({ category }) => getCategoryColor(category)};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  display: inline-block;
  color: #000;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BannerDescription = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BannerImg = styled.img`
  width: 400px;
  height: 225px;
  border-radius: 15px;
  box-shadow: 0px 0px 0.75rem 0.25rem #2271d1;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    height: auto;
    margin-top: 1rem;
  }
`;

const Banner = ({ video }) => {
  if (!video) return null;

  return (
    <BannerContainer>
      <BannerBackground
        src={video.img || video.image || video.thumbnail}
        alt={`Fondo del banner: ${video.titulo || video.title}`}
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/800x400/282c34/61dafb?text=Banner";
        }}
      />
      <BannerContent>
        <TextContainer>
          <BannerTitle category={video.categoria || video.category}>
            {video.categoria || video.category || "Video"}
          </BannerTitle>
          <BannerDescription>
            {video.descripcion ||
              video.description ||
              "Video destacado de AluraFlix"}
          </BannerDescription>
        </TextContainer>
        <BannerImg
          src={video.img || video.image || video.thumbnail}
          alt={`Imagen del video: ${video.titulo || video.title}`}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x225/282c34/61dafb?text=Video";
          }}
        />
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;
