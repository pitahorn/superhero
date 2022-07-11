import fetch from 'node-fetch';
import { evillestOfVillains, superheroApiUrl } from './superheroVariables.js';

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateBothTeamIds() {
  const teamIds = [];
  while (teamIds.length < 10) {
    const newTeamMemberId = randomIntFromInterval(0, 731);
    // avoid repeated superhero ids:
    if (!teamIds.includes(newTeamMemberId)) {
      teamIds.push(newTeamMemberId);
    }
  }
  return teamIds;
}

export function buildActualStamina(powerStats) {
  const powerStatsKeys = Object.keys(powerStats);
  const actualStaminaStats = {};
  powerStatsKeys.forEach((powerKey) => {
    actualStaminaStats[powerKey] = randomIntFromInterval(0, 10);
  });
  return actualStaminaStats;
}

export async function buildHeroFinalForm(heroId) {
  console.log("hero id: ", heroId);

  try {
    const heroApiJson = await fetch(`${superheroApiUrl}/${heroId}`);
    const heroResponse = await heroApiJson.json();
    
    // Clean the object:
    const {response, ...parsedHeroData} = heroResponse;
    
    // Build new Stats:
    const heroActualStamina = buildActualStamina(heroResponse.powerstats);
    parsedHeroData.actualStamina = heroActualStamina;
    return parsedHeroData;
  } catch (error) {
    console.error(error)
    return evillestOfVillains;
  }
}