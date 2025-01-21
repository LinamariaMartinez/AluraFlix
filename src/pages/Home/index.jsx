// Components/Home/Home.jsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Banner from '../../components/Banner';
import { useVideo } from '../../context/VideoContext';

const HomeContainer = styled.div`
  padding: 20px;
`;

const Category = styled.div`
  margin-bottom: 30px;
`;

const CategoryTitle = styled.h2`
  color: #61dafb;
  margin-bottom: 10px;
`;

const VideoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Home = () => {
  const { videos, modalVisible, videoData, handleCloseModal } = useVideo();

  // Agrupamos los videos por categoría
  const groupedVideos = videos.reduce((groups, video) => {
    const category = video.categoria || 'Sin categoría';
    if (!groups[category]) groups[category] = [];
    groups[category].push(video);
    return groups;
  }, {});

  return (
    <HomeContainer>
      {modalVisible && (
        <EditVideoModal
          onClose={handleCloseModal}
          videoData={videoData}
        />
      )}
      {videos.length > 0 && <Banner video={videos[0]} />}
      {Object.entries(groupedVideos).map(([category, videos]) => (
        <Category key={category}>
          <CategoryTitle>{category}</CategoryTitle>
          <VideoGrid>
            {videos.map((video) => (
              <Card key={video.id} video={video} />
            ))}
          </VideoGrid>
        </Category>
      ))}
      <Footer />
    </HomeContainer>
  );
};

export default Home;
