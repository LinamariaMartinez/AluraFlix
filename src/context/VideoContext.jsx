import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const VideoContext = createContext();

export const useVideo = () => {
  return useContext(VideoContext);
};

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoData, setVideoData] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:3001/videos')
      .then((response) => setVideos(response.data))
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  const addVideo = (newVideo) => {
    setVideos([...videos, newVideo]);
  };

  const deleteVideo = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

  const editVideo = (updatedVideo) => {
    setVideos(
      videos.map((video) =>
        video.id === updatedVideo.id ? updatedVideo : video
      )
    );
  };

  const handleEdit = (id) => {
    axios
      .get(`http://localhost:3001/videos/${id}`)
      .then((response) => {
        setVideoData(response.data);
        setModalVisible(true);
      })
      .catch((error) => console.error('Error fetching video:', error));
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <VideoContext.Provider
      value={{
        videos,
        modalVisible,
        videoData,
        addVideo,
        deleteVideo,
        editVideo,
        handleEdit,
        handleCloseModal,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoProvider;