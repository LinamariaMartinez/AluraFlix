import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const VideoContext = createContext();

// Datos iniciales de ejemplo - movidos fuera del componente para evitar recreación
const initialVideos = [
  {
    id: 1,
    titulo: "Qué Significa Pensar Como Programador",
    categoria: "FRONT END",
    img: "https://i.ytimg.com/vi/ov7vA5HFe6w/maxresdefault.jpg",
    url: "https://youtube.com/embed/ov7vA5HFe6w",
    descripcion:
      "Principales características, habilidades y competencias de un programador",
  },
  {
    id: 2,
    titulo: "Introducción a React",
    categoria: "FRONT END",
    img: "https://i.ytimg.com/vi/6Jfk8ic3KVk/maxresdefault.jpg",
    url: "https://youtube.com/embed/6Jfk8ic3KVk",
    descripcion: "Conceptos básicos de React para principiantes",
  },
  {
    id: 3,
    titulo: "Node.js para Backend",
    categoria: "BACK END",
    img: "https://i.ytimg.com/vi/BhvLIzVL8_o/maxresdefault.jpg",
    url: "https://youtube.com/embed/BhvLIzVL8_o",
    descripcion: "Fundamentos de Node.js para desarrollo backend",
  },
];

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
};

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoData, setVideoData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar datos inmediatamente
    const loadVideos = async () => {
      try {
        setLoading(true);

        // Cargar desde localStorage si existe, sino usar datos iniciales
        const savedVideos = localStorage.getItem("aluraflix-videos");
        if (savedVideos) {
          setVideos(JSON.parse(savedVideos));
        } else {
          setVideos(initialVideos);
          localStorage.setItem(
            "aluraflix-videos",
            JSON.stringify(initialVideos),
          );
        }
      } catch (err) {
        setError("Error al cargar los videos");
        console.error("Error loading videos:", err);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []); // Sin dependencias - solo se ejecuta al montar

  // Guardar en localStorage cada vez que cambien los videos
  useEffect(() => {
    if (videos.length > 0) {
      localStorage.setItem("aluraflix-videos", JSON.stringify(videos));
    }
  }, [videos]);

  const addVideo = async (newVideo) => {
    try {
      const videoWithId = {
        ...newVideo,
        id: Date.now(),
      };
      setVideos((prevVideos) => [...prevVideos, videoWithId]);
      return videoWithId;
    } catch (error) {
      console.error("Error adding video:", error);
      throw error;
    }
  };

  const deleteVideo = async (id) => {
    try {
      setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
    } catch (error) {
      console.error("Error deleting video:", error);
      throw error;
    }
  };

  const editVideo = (updatedVideo) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === updatedVideo.id ? updatedVideo : video,
      ),
    );
    setModalVisible(false);
    setVideoData({});
  };

  const handleEdit = (id) => {
    const video = videos.find((v) => v.id === id);
    if (video) {
      setVideoData(video);
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setVideoData({});
  };

  const value = {
    videos,
    modalVisible,
    videoData,
    loading,
    error,
    addVideo,
    deleteVideo,
    editVideo,
    handleEdit,
    handleCloseModal,
  };

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
};

VideoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default VideoProvider;
