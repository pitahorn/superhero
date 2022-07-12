import { useCallback, useState, useMemo } from "react";
import { HeroInterface, TeamInterface } from "./../api/heroInterface";
import { reduceHeroHP, randomHeroFromTeam } from "./../utils";

interface HeroFightArgs {
  teamA: TeamInterface,
  teamB: TeamInterface,
}

interface HeroFightReturn {
  fighting: Boolean,
  setFighting: React.Dispatch<React.SetStateAction<Boolean>>,
  handleStartFight: () => Promise<void>,
  attackMessage: string,
}

export default function useHeroFight({
  teamA, teamB,
}: HeroFightArgs): HeroFightReturn {
  // * States
  const [fighting, setFighting] = useState<Boolean>(false);
  const [attackingTeam, setAttackingTeam] = useState<string|null>(null);
  const [currAttacker, setCurrAttacker] = useState<string|null>(null);
  const [currAttacked, setCurrAttacked] = useState<string|null>(null);
  const [HPTracker, setHPTracker] = useState<Record<string, number>>({});
  const [attackMessage, setAttackMessage] = useState<string>("");

  const allHeroes = useMemo(() => {
    const allHeroes: HeroInterface[] = [];
    return allHeroes.concat(teamA.members).concat(teamB.members);
  }, [teamA.members, teamB.members]);

  const teamAIds = useMemo(() => {
    return teamA.members.map(({id}) => id);
  }, [teamA.members]);
  const teamBIds = useMemo(() => {
    return teamB.members.map(({id}) => id);
  }, [teamB.members]);

  // * Handler Functions
  const handleStartFight = useCallback(async () => {
    if (!allHeroes.length) return;
    // Set the HP tracker with all the base HPs from heroes:
    const auxHP = reduceHeroHP(allHeroes);
    setHPTracker(auxHP);

    // Start the fight
    setFighting(true);
    setAttackingTeam("A");
    setAttackMessage("The fighting has started!!");

    // 10 iterations to test it out:
    let count = 0;
    while (count < 10) {
      if (attackingTeam === "A") {
        const attackerID = randomHeroFromTeam(teamAIds);
        const attackedID = randomHeroFromTeam(teamBIds);
        setCurrAttacker(attackerID);
        setCurrAttacked(attackedID);
      }
      count ++;
    }

  }, [allHeroes]);


  return {
    fighting,
    setFighting,
    handleStartFight,
    attackMessage,
  }
}