import fetch from 'node-fetch';
import { evillestOfVillains, superheroApiUrl } from './superheroVariables.js';

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function calculateMentalAttack(intelligence, speed, combat, filiationCoefficient) {
  return intelligence * 0.7 + speed * 0.2 + combat * 0.1 * filiationCoefficient;
}

export function calculateStrongAttack(strength, power, combat, filiationCoefficient) {
  return strength * 0.6 + power * 0.2 + combat * 0.2 * filiationCoefficient;
}

export function calculateFastAttack(speed, durability, strength, filiationCoefficient) {
  return speed * 0.55 + durability * 0.25 + strength * 0.2 * filiationCoefficient;
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

export function buildHeroAttacks(powerstats, filiationCoefficient) {
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
      Number(intelligence), Number(speed), Number(combat), filiationCoefficient,
    ),
    strong: calculateStrongAttack(
      Number(strength), Number(power), Number(combat), filiationCoefficient,
    ),
    fast: calculateFastAttack(
      Number(speed), Number(durability), Number(strength), filiationCoefficient,
    ),
  }
}

export function buildHeroHealthPoints( powerstats, actualStamina) {
  // SUPUESTO 1: Se usará el promedio de AS para este cálculo,
  // a modo de escalar el vector:
  const ASAverage = (
    actualStamina.intelligence +
    actualStamina.strength +
    actualStamina.speed +
    actualStamina.durability +
    actualStamina.power +
    actualStamina.combat
  ) / 6;
  const { strength, durability, power } = powerstats;
  const statsWithCoefficients = (Number(strength) * 0.8 + Number(durability) * 0.7 + Number(power)) / 2;
  const flooredValue = Math.floor(statsWithCoefficients * (1 + ASAverage / 10));
  return flooredValue + 100;

}

export function buildHeroNewStats(powerstats, actualStamina, filiationCoefficient) {
  const newStats = {}
  const statsKeys = Object.keys(powerstats);
  return statsKeys.forEach((baseStat) => {
    const scaledStat = ((2 * powerstats[baseStat] + actualStamina[baseStat]) / 1.1) * filiationCoefficient;
    newStats[baseStat] = Math.floor(scaledStat);
  })
}

export async function buildHeroFinalForm(heroId) {
  try {
    const heroApiJson = await fetch(`${superheroApiUrl}/${heroId}`);
    const heroResponse = await heroApiJson.json();
    
    // Clean the object:
    const {response, ...parsedHeroData} = heroResponse;
    
    // Build new Stats:
    const heroActualStamina = buildHeroActualStamina(heroResponse.powerstats);

    parsedHeroData.actualStamina = heroActualStamina;
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

export function buildFiliationCoefficient(heroAlignment, teamAlignment) {
  const randomCoefficient = randomIntFromInterval(0, 9);
  if (heroAlignment === teamAlignment) return 1 + randomCoefficient;
  return 1 / (1 + randomCoefficient);
}

export function buildTeamFinalForm(team) {
  const teamAlignment = calculateTeamAlignment(team);
  const membersWithFinalInfo = [...team].map((hero) => {
    const filiationCoefficient = buildFiliationCoefficient(
      hero.biography.alignment,
      teamAlignment,
    );
    const attacks = buildHeroAttacks(hero.powerstats, filiationCoefficient);
    const healthPoints = buildHeroHealthPoints(
      hero.powerstats, hero.actualStamina,
    );
    const newStats = buildHeroNewStats(hero.powerstats, hero.actualStamina, filiationCoefficient);

    return { 
      filiationCoefficient,
      attacks,
      healthPoints,
      powerstats: newStats,
      ...hero };
  });

  return {
    alignment: teamAlignment,
    members: membersWithFinalInfo,
  };
}
