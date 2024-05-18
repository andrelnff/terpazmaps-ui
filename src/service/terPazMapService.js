export const getAllRegions = async () => {
    const response = await fetch('/public/api/v5/geojson/region');
    if (!response.ok) {
        throw new Error(`GET request failed with status ${response.status}`);
    }
    return await response.json();
};

export const getStreetData = async (regionId) => {
    const response = await fetch(`/public/api/v5/geojson/region/${regionId}/streets`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

export const getStreetConditions = async () => {
    const response = await fetch('/public/api/v5/geojson/street_condition');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};
