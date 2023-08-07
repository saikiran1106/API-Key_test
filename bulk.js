// app.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// API endpoint for sending bulk message
app.post('/send-bulk-message', async (req, res) => {
  const { numbers, message } = req.body;

  try {
    const sentMessages = await Promise.all(
      numbers.map((number) =>
        client.messages.create({
          body: message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: number,
        })
      )
    );

    res.json({ success: true, sentMessages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'An error occurred while sending messages.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
