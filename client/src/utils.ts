import { HeroInterface } from "./api/heroInterface";
export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function reduceHeroHP(heroes: HeroInterface[]) {
  const auxHP = heroes.reduce(
    (previousHeroes, { id, healthPoints }) => ({
      ...previousHeroes,
      [id]: healthPoints,
    }),
    {},
  );

  return auxHP;
}

export function randomHeroFromTeam(heroIDs: string[]) {
  return heroIDs[Math.floor(Math.random() * heroIDs.length)];
}