import fetch from 'node-fetch';
import { evillestOfVillains, superheroApiUrl } from './superheroVariables.js';

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function calculateMentalAttack(intelligence, speed, combat) {
  return intelligence * 0.7 + speed * 0.2 + combat * 0.1;
}

export function calculateStrongAttack(strength, power, combat) {
  return strength * 0.6 + power * 0.2 + combat * 0.2;
}

export function calculateFastAttack(speed, durability, strength) {
  return speed * 0.55 + durability * 0.25 + strength * 0.2;
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

export function buildHeroActualStamina(powerStats) {
  const powerStatsKeys = Object.keys(powerStats);
  const actualStaminaStats = {};
  powerStatsKeys.forEach((powerKey) => {
    actualStaminaStats[powerKey] = randomIntFromInterval(0, 10);
  });
  return actualStaminaStats;
}

export function buildHeroAttacks(powerstats) {
  const {
    intelligence,
    strength,
    speed,
    durability,
    power,
    combat,
  } = powerstats;

  // Transform to Number:
  return {
    mental: calculateMentalAttack(
      Number(intelligence), Number(speed), Number(combat)
    ),
    strong: calculateStrongAttack(
      Number(strength), Number(power), Number(combat)
    ),
    fast: calculateFastAttack(
      Number(speed), Number(durability), Number(strength)
    ),
  }
}

export async function buildHeroFinalForm(heroId) {
  try {
    const heroApiJson = await fetch(`${superheroApiUrl}/${heroId}`);
    const heroResponse = await heroApiJson.json();
    
    // Clean the object:
    const {response, ...parsedHeroData} = heroResponse;
    
    // Build new Stats:
    const heroActualStamina = buildHeroActualStamina(heroResponse.powerstats);
    const heroAttacks = buildHeroAttacks(heroResponse.powerstats);

    parsedHeroData.actualStamina = heroActualStamina;
    parsedHeroData.attacks = heroAttacks;
    return parsedHeroData;
  } catch (error) {
    console.error(error)
    return evillestOfVillains;
  }
}

export function calculateTeamAlignment(team) {
  let goodCount = 0;
  let badCount = 0;

  team.forEach((hero) => {
    if (hero.biography.alignment === "good") goodCount ++;
    if (hero.biography.alignment === "bad") badCount ++;
  })

  if (goodCount > badCount) return "good";
  return "bad";
}

export function buildTeamFinalForm(team) {
  return {
    alignment: calculateTeamAlignment(team),
    members: [...team],
  };
}

export function buildFiliationCoefficient(heroAlignment, teamAlignment) {

}