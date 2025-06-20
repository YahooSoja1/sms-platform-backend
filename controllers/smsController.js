// controllers/smsController.js
const fiveSimService = require('../services/fiveSimService');
const smsActivateService = require('../services/smsActivateService');

// Buy number from selected platform
exports.buyNumber = async (req, res) => {
  const { platform, service, country } = req.body;

  try {
    let response;
    if (platform === '5sim') {
      response = await fiveSimService.buyNumber(service, country);
    } else if (platform === 'sms-activate') {
      response = await smsActivateService.buyNumber(service, country);
    } else {
      return res.status(400).json({ error: 'Invalid platform' });
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
};

// Get SMS status/code by ID
exports.getSmsStatus = async (req, res) => {
  const { platform, id } = req.params;

  try {
    let response;
    if (platform === '5sim') {
      response = await fiveSimService.getStatus(id);
    } else if (platform === 'sms-activate') {
      response = await smsActivateService.getStatus(id);
    } else {
      return res.status(400).json({ error: 'Invalid platform' });
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to get status' });
  }
};
