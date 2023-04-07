import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


const apiKey = process.env.API_KEY;


const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`,
};
const createResponse = async (req, res) => {
  try {
    const input = req.body.text;

    console.log('input:', input);

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{role: 'user', content: `${input}`}],
      },
      { headers }
    );

    const chatGptResponse = response.data.choices[0].message.content;

    console.log(chatGptResponse);
    res.status(200).json({ message: chatGptResponse });
  } catch (err) {
    console.log('Error: ' + err);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};


export { createResponse };
