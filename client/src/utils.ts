import { HeroInterface } from "./api/heroInterface";

type AttackType = "mental"|"strong"|"fast";

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

export function chooseAttackType(): AttackType {
  const attackTypes: AttackType[] = ["mental", "strong", "fast"];
  const index = randomIntFromInterval(0, 2);
  return attackTypes[index];
}