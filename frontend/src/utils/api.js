
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/generate-response`;

export const sendMessage = async (message) => {
  try {
    const response = await axios.post(BASE_URL, { text: message }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BASE_URL}`,
      },
    });
    console.log('response:', response);
    return response.data.message;
  } catch (error) {
    console.error(error);
    return 'Sorry, there was an error processing your request.';
  }
};



