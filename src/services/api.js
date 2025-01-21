const API_URL = 'http://localhost:3000/videos';

export const getVideos = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addVideo = async (video) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(video),
  });
  return response.json();
};

export const updateVideo = async (id, updatedVideo) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedVideo),
  });
  return response.json();
};

export const deleteVideo = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
