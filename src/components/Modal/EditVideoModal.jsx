import React from 'react';
import styled from 'styled-components';
import { useVideo } from '../../context/VideoContext';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #20232a;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
`;

const ModalTitle = styled.h2`
  color: #61dafb;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #61dafb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #21a1f1;
  }
`;

const CloseButton = styled.button`
  padding: 10px 15px;
  background-color: #e74c3c;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: #c0392b;
  }
`;

function EditVideoModal({ onClose, onSubmit, videoData }) {
  const { editVideo } = useVideo();
  const [title, setTitle] = useState(videoData.title);
  const [category, setCategory] = useState(videoData.category);
  const [imageUrl, setImageUrl] = useState(videoData.imageUrl);
  const [videoUrl, setVideoUrl] = useState(videoData.videoUrl);
  const [description, setDescription] = useState(videoData.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedVideo = { ...videoData, title, category, imageUrl, videoUrl, description };
    editVideo(updatedVideo);
    onClose(); // Cerrar el modal después de editar
  };
  
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>Editar Video</ModalTitle>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="title"
            value={videoData.title}
            onChange={(e) => onSubmit(e, 'title')}
            required
          />
          <input
            type="text"
            name="category"
            value={videoData.category}
            onChange={(e) => onSubmit(e, 'category')}
            required
          />
          <input
            type="url"
            name="videoUrl"
            value={videoData.videoUrl}
            onChange={(e) => onSubmit(e, 'videoUrl')}
            required
          />
          <input
            type="url"
            name="thumbnail"
            value={videoData.thumbnail}
            onChange={(e) => onSubmit(e, 'thumbnail')}
            required
          />
          <textarea
            name="description"
            value={videoData.description}
            onChange={(e) => onSubmit(e, 'description')}
          />
          <Button type="submit">Guardar</Button>
          <CloseButton type="button" onClick={onClose}>Cerrar</CloseButton>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default EditVideoModal;
