import { useState } from "react";
import styled from "styled-components";
import { useVideo } from "../../context/VideoContext";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 2rem auto;
  background-color: #20232a;
  border-radius: 10px;
  color: white;
  box-shadow: 0px 0px 0.75rem 0.25rem #2271d1;

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 15px;
  }
`;

const Title = styled.h2`
  color: #61dafb;
  margin-bottom: 20px;
  text-align: center;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #61dafb;
  border-radius: 5px;
  background-color: #282c34;
  color: white;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #21a1f1;
    box-shadow: 0 0 5px rgba(33, 161, 241, 0.3);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const Select = styled.select`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #61dafb;
  border-radius: 5px;
  background-color: #282c34;
  color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #21a1f1;
    box-shadow: 0 0 5px rgba(33, 161, 241, 0.3);
  }

  option {
    background-color: #282c34;
    color: white;
  }
`;

const Textarea = styled.textarea`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #61dafb;
  border-radius: 5px;
  background-color: #282c34;
  color: white;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #21a1f1;
    box-shadow: 0 0 5px rgba(33, 161, 241, 0.3);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;

  &:first-child {
    background-color: #61dafb;
    color: #20232a;

    &:hover {
      background-color: #21a1f1;
      transform: translateY(-2px);
    }
  }

  &:last-child {
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

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: -10px;
  margin-bottom: 5px;
`;

function NewVideo() {
  const { addVideo } = useVideo();
  const navigate = useNavigate();

  // Estado del formulario
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    imageUrl: "",
    videoUrl: "",
    description: "",
  });

  // Estado para errores
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Categorías disponibles
  const categories = ["FRONT END", "BACK END", "MOBILE"];

  // Manejar cambios en inputs
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

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido";
    }

    if (!formData.category) {
      newErrors.category = "La categoría es requerida";
    }

    if (!formData.videoUrl.trim()) {
      newErrors.videoUrl = "El enlace del video es requerido";
    } else if (!/^https?:\/\/.+/.test(formData.videoUrl)) {
      newErrors.videoUrl = "El enlace debe ser una URL válida";
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "El enlace de la imagen es requerido";
    } else if (!/^https?:\/\/.+/.test(formData.imageUrl)) {
      newErrors.imageUrl = "El enlace debe ser una URL válida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newVideo = {
        id: Date.now(),
        titulo: formData.title,
        categoria: formData.category,
        img: formData.imageUrl,
        url: formData.videoUrl,
        descripcion: formData.description || "Sin descripción",
      };

      await addVideo(newVideo);

      // Mostrar mensaje de éxito (opcional)
      alert("Video agregado exitosamente");

      // Redirigir a home
      navigate("/");
    } catch (error) {
      console.error("Error al agregar video:", error);
      alert("Error al agregar el video. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Limpiar formulario
  const handleReset = () => {
    setFormData({
      title: "",
      category: "",
      imageUrl: "",
      videoUrl: "",
      description: "",
    });
    setErrors({});
  };

  return (
    <FormContainer>
      <Title>Agregar Nuevo Video</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Título del video *"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}

        <Select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Selecciona una categoría *</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
        {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}

        <Input
          type="url"
          name="videoUrl"
          placeholder="Enlace del video (YouTube, Vimeo, etc.) *"
          value={formData.videoUrl}
          onChange={handleChange}
        />
        {errors.videoUrl && <ErrorMessage>{errors.videoUrl}</ErrorMessage>}

        <Input
          type="url"
          name="imageUrl"
          placeholder="Enlace de la imagen/thumbnail *"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        {errors.imageUrl && <ErrorMessage>{errors.imageUrl}</ErrorMessage>}

        <Textarea
          name="description"
          placeholder="Descripción del video (opcional)"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />

        <ButtonGroup>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar Video"}
          </Button>
          <Button type="button" onClick={handleReset} disabled={isSubmitting}>
            Limpiar Campos
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
}

export default NewVideo;
