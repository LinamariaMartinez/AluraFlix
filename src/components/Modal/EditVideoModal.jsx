import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useVideo } from "../../context/VideoContext";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContainer = styled.div`
  background-color: #20232a;
  padding: 2rem;
  border-radius: 15px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0px 0px 2rem 0.5rem rgba(97, 218, 251, 0.3);
  border: 2px solid #61dafb;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem;
  }
`;

const ModalTitle = styled.h2`
  color: #61dafb;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #61dafb;
  font-weight: 600;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1rem;
  border: 2px solid #61dafb;
  border-radius: 8px;
  background-color: #282c34;
  color: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #21a1f1;
    box-shadow: 0 0 8px rgba(33, 161, 241, 0.4);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const Select = styled.select`
  padding: 12px;
  font-size: 1rem;
  border: 2px solid #61dafb;
  border-radius: 8px;
  background-color: #282c34;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #21a1f1;
    box-shadow: 0 0 8px rgba(33, 161, 241, 0.4);
  }

  option {
    background-color: #282c34;
    color: white;
  }
`;

const Textarea = styled.textarea`
  padding: 12px;
  font-size: 1rem;
  border: 2px solid #61dafb;
  border-radius: 8px;
  background-color: #282c34;
  color: white;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #21a1f1;
    box-shadow: 0 0 8px rgba(33, 161, 241, 0.4);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: -5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;

  &.primary {
    background-color: #61dafb;
    color: #20232a;

    &:hover {
      background-color: #21a1f1;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(97, 218, 251, 0.3);
    }
  }

  &.secondary {
    background-color: #6c757d;
    color: white;

    &:hover {
      background-color: #5a6268;
      transform: translateY(-2px);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const PreviewContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #282c34;
  border-radius: 8px;
  border: 1px solid #61dafb;
`;

const PreviewImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 8px;
  margin-top: 0.5rem;
`;

function EditVideoModal({ onClose }) {
  const { videoData, editVideo } = useVideo();

  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    img: "",
    url: "",
    descripcion: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["FRONT END", "BACK END", "MOBILE"];

  // Cargar datos del video cuando el modal se abre
  useEffect(() => {
    if (videoData) {
      setFormData({
        titulo: videoData.titulo || videoData.title || "",
        categoria: videoData.categoria || videoData.category || "",
        img: videoData.img || videoData.image || videoData.thumbnail || "",
        url: videoData.url || videoData.videoUrl || "",
        descripcion: videoData.descripcion || videoData.description || "",
      });
    }
  }, [videoData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = "El título es requerido";
    }

    if (!formData.categoria) {
      newErrors.categoria = "La categoría es requerida";
    }

    if (!formData.url.trim()) {
      newErrors.url = "El enlace del video es requerido";
    } else if (!/^https?:\/\/.+/.test(formData.url)) {
      newErrors.url = "El enlace debe ser una URL válida";
    }

    if (!formData.img.trim()) {
      newErrors.img = "El enlace de la imagen es requerido";
    } else if (!/^https?:\/\/.+/.test(formData.img)) {
      newErrors.img = "El enlace debe ser una URL válida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedVideo = {
        ...videoData,
        titulo: formData.titulo,
        categoria: formData.categoria,
        img: formData.img,
        url: formData.url,
        descripcion: formData.descripcion,
      };

      editVideo(updatedVideo);
      onClose();
    } catch (error) {
      console.error("Error al editar video:", error);
      alert("Error al editar el video. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalTitle>Editar Video</ModalTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="titulo">Título del Video *</Label>
            <Input
              id="titulo"
              type="text"
              name="titulo"
              placeholder="Ingresa el título del video"
              value={formData.titulo}
              onChange={handleChange}
            />
            {errors.titulo && <ErrorMessage>{errors.titulo}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="categoria">Categoría *</Label>
            <Select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
            {errors.categoria && (
              <ErrorMessage>{errors.categoria}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="url">Enlace del Video *</Label>
            <Input
              id="url"
              type="url"
              name="url"
              placeholder="https://youtube.com/watch?v=..."
              value={formData.url}
              onChange={handleChange}
            />
            {errors.url && <ErrorMessage>{errors.url}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="img">Enlace de la Imagen *</Label>
            <Input
              id="img"
              type="url"
              name="img"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={formData.img}
              onChange={handleChange}
            />
            {errors.img && <ErrorMessage>{errors.img}</ErrorMessage>}

            {formData.img && (
              <PreviewContainer>
                <Label>Vista previa:</Label>
                <PreviewImage
                  src={formData.img}
                  alt="Vista previa"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                  onLoad={(e) => {
                    e.target.style.display = "block";
                  }}
                />
              </PreviewContainer>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              placeholder="Descripción opcional del video..."
              rows="4"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </FormGroup>

          <ButtonGroup>
            <Button type="submit" className="primary" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar Cambios"}
            </Button>
            <Button
              type="button"
              className="secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
}

// Validación de PropTypes
EditVideoModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default EditVideoModal;
