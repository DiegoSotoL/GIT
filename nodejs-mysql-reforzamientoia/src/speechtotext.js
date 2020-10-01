const path = require('path');
const x = async function vozatexto() {
    // Imports the Google Cloud client library
const fs = require('fs');
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const filename = 'Local path to audio file, e.g. /path/to/audio.raw';
// const encoding = 'Encoding of the audio file, e.g. LINEAR16';
// const sampleRateHertz = 16000;
// const languageCode = 'BCP-47 language code, e.g. en-US';

const config = {
  encoding: 'MP3',
  sampleRateHertz: 16000,
  languageCode: 'es-ES',
};
const audio = {
  content: fs.readFileSync(path.join(__dirname, '/public/audios/p2-u2-6.mp3')).toString('base64'),
};

const request = {
  config: config,
  audio: audio,
};

// Detects speech in the audio file
const [response] = await client.recognize(request);
const transcription = response.results
  .map(result => result.alternatives[0].transcript)
  .join('\n');
console.log('Transcription: ', transcription);
}
x();

