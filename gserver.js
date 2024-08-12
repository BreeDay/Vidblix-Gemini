const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/synthesize", async (req, res) => {
  console.log("in synthesize post req");

  const text = req.body.text;
  const apiKey = process.env.GOOGLE_SPEECH_TO_TEXT_API_KEY;
  const endpoint = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;
  const payload = {
    audioConfig: {
      audioEncoding: "MP3",
      effectsProfileId: ["small-bluetooth-speaker-class-device"],
      pitch: 0,
      speakingRate: 1,
    },
    input: {
      text: text,
    },
    voice: {
      languageCode: "en-US",
      name: "en-US-Standard-A",
    },
  };
  const response = await axios.post(endpoint, payload);
  res.json(response.data);
  console.log(response.data);
});

const port = 3001;
app.listen(port, () => {
  console.log(`G Server is listening on port ${port}`);
});
