// services/smsActivateService.js
const axios = require('axios');

const SMS_ACTIVATE_API_KEY = process.env.SMS_ACTIVATE_API_KEY;
const BASE_URL = 'https://api.sms-activate.org/stubs/handler_api.php';

exports.buyNumber = async (service, country = '0') => {
  try {
    const response = await axios.get(`${BASE_URL}?api_key=${SMS_ACTIVATE_API_KEY}&action=getNumber&service=${service}&country=${country}`);
    
    if (response.data.includes('ACCESS_NUMBER')) {
      const parts = response.data.split(':');
      return {
        id: parts[1],
        number: parts[2],
      };
    } else {
      throw new Error(response.data); // Will throw if not successful
    }
  } catch (error) {
    throw new Error(error.message || 'SMS-Activate: Failed to buy number');
  }
};

exports.getStatus = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}?api_key=${SMS_ACTIVATE_API_KEY}&action=getStatus&id=${id}`);
    return { status: response.data };
  } catch (error) {
    throw new Error(error.message || 'SMS-Activate: Failed to get status');
  }
};
