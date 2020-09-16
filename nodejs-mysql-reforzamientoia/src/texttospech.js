const textToSpeech = require('@google-cloud/text-to-speech');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  keyFilename: path.join(__dirname, '../apikeys/reforzamientoalgebraia-017aa4b76248.json'),
  projectId: 'reforzamientoalgebraia'
});
const audioaibucket = storage.bucket('audios-ai');
const fs = require('fs');
const util = require('util');
const client = new textToSpeech.TextToSpeechClient();





const x = async function textoavoz(arg) {
  const text = arg;
   const request = {
    input: { text: text },
    voice: { languageCode: 'es-ES', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' },
  };
  const [response] = await client.synthesizeSpeech(request);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(path.join(__dirname, '/public/audios/bienvenida.mp3'), response.audioContent, 'binary');
  audioaibucket.upload(path.join(__dirname, '/public/audios/bienvenida.mp3'));
  
}



const y = function geturlaudio(){

const file = audioaibucket.file('bienvenida.mp3');
const config = {
  action: 'read',
  expires: '03-17-2025'
};
return Promise.resolve(file.getSignedUrl(config));

}
y();
module.exports = {x,y};