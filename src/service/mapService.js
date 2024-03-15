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
  return await response.json(); // Retorna os dados completos
}

export async function post(uid, mapName, data) {
  const response = await fetch(`${API_URL}/map/${uid}/${mapName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // Aqui estamos enviando todo o objeto data, que inclui limites, ruas e descarte
  });
  if (!response.ok) {
    throw new Error(`POST request failed with status ${response.status}`);
  }
  return 'ok';
}