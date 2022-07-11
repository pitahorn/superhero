import express from 'express';
import { generateBothTeamIds, buildHeroFinalForm } from './superheroUtils.js';

const app = express()
const port = 3030

app.get('/', (req, res) => {
  res.send('Superheroes Assemble!!!')
})

app.get('/teams', async (req, res) => {
  const teamIds = generateBothTeamIds();
    
  let teamRequests = teamIds.map(heroId => {
    return new Promise((resolve, reject) => {
      buildHeroFinalForm(heroId).then((builtHero) => resolve(builtHero));
    })
  })
  
  Promise.all(teamRequests).then((teamsData) => {
    console.log(teamsData);
    res.send(`Teams Assemble!!!: ${JSON.stringify(teamsData)}`);
  });
})

app.listen(port, () => {
  console.log(`Superhero app ready to fly on port ${port}`)
})