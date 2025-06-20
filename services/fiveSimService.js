// services/fiveSimService.js
const axios = require('axios');

const FIVE_SIM_API_KEY = process.env.FIVE_SIM_API_KEY;
const BASE_URL = 'https://5sim.net/v1/user';

exports.buyNumber = async (service, country = 'usa') => {
  try {
    const response = await axios.get(`${BASE_URL}/buy/activation/${country}/any/${service}`, {
      headers: {
        Authorization: `Bearer ${FIVE_SIM_API_KEY}`
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '5sim: Failed to buy number');
  }
};

exports.getStatus = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/check/${id}`, {
      headers: {
        Authorization: `Bearer ${FIVE_SIM_API_KEY}`
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '5sim: Failed to get status');
  }
};
