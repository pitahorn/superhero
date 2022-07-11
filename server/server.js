import fetch from 'node-fetch';
import express from 'express';

const superheroApiUrl = "https://superheroapi.com/api/2183127771827858";

const app = express()
const port = 3030

app.get('/', (req, res) => {
  res.send('Superheroes Assemble!!!')
})

app.get('/teams', (req, res) => {

  /* fetch(superheroApiUrl)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.error(err)); */
  
  res.send('Teams Assemble!!!')
})

app.listen(port, () => {
  console.log(`Superhero app ready to fly on port ${port}`)
})