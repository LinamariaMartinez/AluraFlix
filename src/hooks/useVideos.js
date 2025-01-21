import { useState, useEffect } from 'react';
import { getVideos, addVideo, updateVideo, deleteVideo } from '../services/api';

const useVideos = () => {
  const [videos, setVideos] = useState([]);
  
  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getVideos();
      setVideos(data);
    };
    
    fetchVideos();
  }, []);
  
  const addNewVideo = async (video) => {
    await addVideo(video);
    setVideos([...videos, video]);
  };
  
  const editVideo = async (id, updatedVideo) => {
    await updateVideo(id, updatedVideo);
    setVideos(videos.map(video => (video.id === id ? updatedVideo : video)));
  };
  
  const removeVideo = async (id) => {
    await deleteVideo(id);
    setVideos(videos.filter(video => video.id !== id));
  };

  return {
    videos,
    addNewVideo,
    editVideo,
    removeVideo
  };
};

export default useVideos;
