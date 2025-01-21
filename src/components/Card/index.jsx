import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useVideo } from "../../context/VideoContext";
import Home from "../../pages/Home";

const CardContainer = styled.div`
  position: relative;
  width: 18.75rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardThumbnail = styled.img`
  width: 100%;
  height: auto;
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  color: white;
  margin: 10px 0;
  text-align: center;
`;

const CardActions = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.25rem;

  &:hover {
    color: #2271d1;
  }
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #e74c3c;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

const Card = ({ video, onEdit, onDelete }) => {
  return (
    <CardContainer>
      <CardThumbnail src={video.thumbnail} alt={video.title} />
      <CardTitle>{video.title}</CardTitle>
      <CardActions>
        <Button onClick={() => window.open(video.videoUrl, "_blank")}>
          Ver Video
        </Button>
        <Button onClick={() => onEdit(video.id)}>Editar</Button>
        <DeleteButton onClick={() => onDelete(video.id)}>Eliminar</DeleteButton>
      </CardActions>
    </CardContainer>
  );
};

Card.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Card;
