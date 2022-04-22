import fs from 'fs';
import axios from 'axios';
let count = 0;
let errors = 0;
const mySet = new Set();
async function importData(fileName: string) {
  fs.readFile(`${fileName}.json`, async (err, data) => {
    if (err) throw err;
    const words = JSON.parse(data.toString());
    console.log(words.flashcard.length)
    for (const card of words.flashcard) {
      console.log(card.wordlist.length);
      if (card.wordlist.length) {
        for (const word of card.wordlist) {
          // count++;
          try {
            const headers = {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjYyZTg5MDE4OTRiNWRkYzU2MTljYzUiLCJpYXQiOjE2NTA2NDkyMzV9.bzfcxLVF8Pu0k4gGS97AxqkqGcksJyra_XWkEM47nSI'
            }
            // console.log(words[key].MEANINGS['1']);
            const payload = {
              defination: String(word.desc).toLocaleLowerCase(),
              isPrivate: false,
              name: String(word.en.split('-')[0]).toLocaleLowerCase(),
              tags: ['essential', 'essential1', card.en ? String(card.en).toLocaleLowerCase().replace(' ', '') : undefined]
            }
            // console.log(payload);  
            const response = await axios.post('https://api.mamadaliyev.uz/word', payload, { headers: headers });
            // console.log('success', response.status);
            count++;
          } catch (e: any) {
            console.log('error', e);
            errors++;
          }
        }

      }
    }
  })

}
importData('wordss')
// console.log(count);