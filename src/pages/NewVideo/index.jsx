import React, { useState } from 'react';
import styled from 'styled-components';
import { useVideo } from '../../hooks/useVideos';

const FormContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #20232a;
  border-radius: 10px;
  color: white;
`;

const Title = styled.h2`
  color: #61dafb;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #61dafb;
  border-radius: 5px;
  background-color: #282c34;
  color: white;

  &:focus {
    outline: none;
    border-color: #21a1f1;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #61dafb;
  border-radius: 5px;
  background-color: #282c34;
  color: white;
  resize: none;

  &:focus {
    outline: none;
    border-color: #21a1f1;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:first-child {
    background-color: #61dafb;
    color: #20232a;
  }

  &:last-child {
    background-color: #e74c3c;
    color: white;
  }

  &:hover {
    opacity: 0.9;
  }
`;

function NewVideo() {
  const { addVideo } = useVideo();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVideo = {
      id: Date.now(), // O algún ID generado automáticamente
      title,
      category,
      imageUrl,
      videoUrl,
      description,
    };
    addVideo(newVideo); // Llamamos a la función para agregar el video
    // Redirigir a la página de inicio
  };

  return (
    <FormContainer>
      <Title>Agregar Nuevo Video</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Título del video"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="category"
          placeholder="Categoría"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <Input
          type="url"
          name="videoUrl"
          placeholder="Enlace del video"
          value={formData.videoUrl}
          onChange={handleChange}
          required
        />
        <Input
          type="url"
          name="thumbnail"
          placeholder="Enlace de la miniatura"
          value={formData.thumbnail}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Descripción del video"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />
        <ButtonGroup>
          <Button type="submit">Guardar</Button>
          <Button type="button" onClick={handleReset}>
            Limpiar
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
}

export default NewVideo;
