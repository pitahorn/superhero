import express from 'express';
import { generateBothTeamIds, buildHeroFinalForm } from './superheroUtils.js';

const app = express()
const port = 3030

app.get('/', (req, res) => {
  res.send('Superheroes Assemble!!!')
})

app.get('/teams', async (req, res) => {
  const teamIds = generateBothTeamIds();
  const teamA = [...teamIds].slice(0, 5);
  const teamB = [...teamIds].slice(5, 10);
    
  let teamARequests = teamA.map(heroId => {
    return new Promise((resolve, reject) => {
      buildHeroFinalForm(heroId).then((builtHero) => resolve(builtHero));
    })
  })
  let teamBRequests = teamB.map(heroId => {
    return new Promise((resolve, reject) => {
      buildHeroFinalForm(heroId).then((builtHero) => resolve(builtHero));
    })
  })
  
  const teamAData = await Promise.all(teamARequests);
  const teamBData = await Promise.all(teamBRequests);

  console.log("team A! -->", teamAData);
  console.log("team B! -->", teamBData);
  res.send(`Teams Assemble!!!: ${JSON.stringify(teamAData)}`);
})

app.listen(port, () => {
  console.log(`Superhero app ready to fly on port ${port}`)
})