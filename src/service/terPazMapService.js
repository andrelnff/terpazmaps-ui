const API_URL = '/public/api/v5/geojson/region';

export async function get() {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`GET request failed with status ${response.status}`);
    }
    return await response.json();
}
