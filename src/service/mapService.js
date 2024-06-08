const API_URL = 'http://localhost:3001/api';

export async function get(uid, mapName) {
  const response = await fetch(`${API_URL}/${uid}/${mapName}`);
  if (!response.ok) {
    throw new Error(`GET request failed with status ${response.status}`);
  }
  return await response.json();
}

export async function getMapsByUser(uid) {
  const response = await fetch(`${API_URL}/maps/${uid}`);
  if (!response.ok) {
    throw new Error(`GET request failed with status ${response.status}`);
  }
  return await response.json();
}

export async function post(uid, mapName, data) {
  const response = await fetch(`${API_URL}/map/${uid}/${mapName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error(`POST request failed with status ${response.status}`);
  }
  return 'ok';
}

export async function addRating(mapId, rating, comment, user) {
  const response = await fetch(`${API_URL}/rating/${mapId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ map: mapId, stars: rating, comment, user })
  });
  if (!response.ok) {
    throw new Error(`POST request failed with status ${response.status}`);
  }
  return 'ok';
}

export async function getRatings(mapId) {
  const response = await fetch(`${API_URL}/ratings/${mapId}`);
  console.log(response);
  if (!response.ok) {
    throw new Error(`GET request failed with status ${response.status}`);
  }
  const data = await response.json();
  console.log(data)
  return Object.values(data);
}