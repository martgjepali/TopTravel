import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:8000';

export const getPackages = async (skip = 0, limit = 10) => {
    const response = await axios.get(`${API_URL}/packages`, {
        params: {
            skip,
            limit
        }
    });
    return {
        data: response.data,
    };
};

export const getPackagesByDestinationId = async (destinationId) => {
    try {
        const url = `${API_URL}/packages-by-destination/${destinationId}`;
        console.log("Request URL:", url);  
        const response = await axios.get(url);
        console.log("Response Data:", response.data);
        return response.data; 
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

export const getPackagesById = async (packageId) => {
    try {
        const response = await axios.get(`${API_URL}/packages/${packageId}`);
        return response.data; 
    } catch (error) {
        throw error;
    }
};