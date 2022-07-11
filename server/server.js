import express from 'express';
import { 
  generateBothTeamIds,
  buildHeroFinalForm,
  buildTeamFinalForm,
} from './superheroUtils.js';

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

  const teamAFinalForm = buildTeamFinalForm(teamAData);
  const teamBFinalForm = buildTeamFinalForm(teamBData);

  console.log("team A! -->", teamAFinalForm);
  console.log("team B! -->", teamBFinalForm);


  res.send(`Teams Assemble!!!: ${JSON.stringify(teamAFinalForm)}`);
})

app.listen(port, () => {
  console.log(`Superhero app ready to fly on port ${port}`)
})