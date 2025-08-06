import styled from "styled-components";
import Card from "../../components/Card";
import Banner from "../../components/Banner";
import EditVideoModal from "../../components/Modal/EditVideoModal";
import { useVideo } from "../../context/VideoContext";

const HomeContainer = styled.div`
  min-height: calc(100vh - 200px);
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Category = styled.section`
  margin-bottom: 40px;
`;

const CategoryTitle = styled.h2`
  color: #61dafb;
  margin-bottom: 20px;
  font-size: 2rem;
  text-align: center;
  border-bottom: 3px solid #61dafb;
  padding-bottom: 10px;
  display: inline-block;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }
`;

const NoVideosMessage = styled.div`
  text-align: center;
  color: #61dafb;
  font-size: 1.2rem;
  margin: 40px 0;
  padding: 40px;
  background-color: rgba(34, 113, 209, 0.1);
  border-radius: 10px;
  border: 2px dashed #61dafb;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #61dafb;
`;

const Home = () => {
  const {
    videos,
    modalVisible,
    handleEdit,
    deleteVideo,
    handleCloseModal,
    loading,
  } = useVideo();

  // Función para manejar la edición
  const handleEditVideo = (id) => {
    handleEdit(id);
  };

  // Función para manejar la eliminación
  const handleDeleteVideo = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este video?")) {
      try {
        await deleteVideo(id);
      } catch (error) {
        console.error("Error al eliminar video:", error);
        alert("Error al eliminar el video");
      }
    }
  };

  // Mostrar loading solo si realmente está cargando
  if (loading) {
    return (
      <HomeContainer>
        <LoadingContainer>Cargando videos...</LoadingContainer>
      </HomeContainer>
    );
  }

  // Agrupamos los videos por categoría
  const groupedVideos = videos.reduce((groups, video) => {
    const category = video.categoria || "Sin categoría";
    if (!groups[category]) groups[category] = [];
    groups[category].push(video);
    return groups;
  }, {});

  return (
    <HomeContainer>
      {/* Modal de edición */}
      {modalVisible && <EditVideoModal onClose={handleCloseModal} />}

      {/* Banner con el primer video disponible */}
      {videos.length > 0 && <Banner video={videos[0]} />}

      {/* Mostrar mensaje si no hay videos */}
      {videos.length === 0 ? (
        <NoVideosMessage>
          <h3>¡No hay videos disponibles!</h3>
          <p>
            Agrega tu primer video usando el botón ´Nuevo Video´ en el menú.
          </p>
        </NoVideosMessage>
      ) : (
        /* Renderizar categorías con videos */
        Object.entries(groupedVideos).map(([category, categoryVideos]) => (
          <Category key={category}>
            <CategoryTitle>{category}</CategoryTitle>
            <VideoGrid>
              {categoryVideos.map((video) => (
                <Card
                  key={video.id}
                  video={{
                    id: video.id,
                    title: video.titulo || video.title,
                    thumbnail: video.img || video.image || video.thumbnail,
                    videoUrl: video.url || video.videoUrl,
                    description: video.descripcion || video.description,
                  }}
                  onEdit={handleEditVideo}
                  onDelete={handleDeleteVideo}
                />
              ))}
            </VideoGrid>
          </Category>
        ))
      )}
    </HomeContainer>
  );
};

export default Home;
