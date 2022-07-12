import { useCallback, useState, useMemo, useEffect } from "react";
import { HeroInterface, TeamInterface } from "./../api/heroInterface";
import { reduceHeroHP, randomHeroFromTeam, chooseAttackType } from "./../utils";

interface HeroFightArgs {
  teamA: TeamInterface,
  teamB: TeamInterface,
  setTeamA: React.Dispatch<React.SetStateAction<TeamInterface>>,
  setTeamB: React.Dispatch<React.SetStateAction<TeamInterface>>,
}

interface HeroFightReturn {
  fighting: Boolean,
  setFighting: React.Dispatch<React.SetStateAction<Boolean>>,
  handleStartFight: () => void,
  attackMessage: string,
  HPTracker: Record<string, number>,
  fightCount: number,
  setFightCount: React.Dispatch<React.SetStateAction<number>>,
}

export default function useHeroFight({
  teamA, teamB, setTeamA, setTeamB,
}: HeroFightArgs): HeroFightReturn {
  // * States
  const [fighting, setFighting] = useState<Boolean>(false);
  const [attackingTeam, setAttackingTeam] = useState<string|null>(null);
  const [HPTracker, setHPTracker] = useState<Record<string, number>>({});
  const [attackMessage, setAttackMessage] = useState<string>("");
  const [fightCount, setFightCount] = useState<number>(0);
  const [teamADeaths, setTeamADeaths] = useState<number>(0);
  const [teamBDeaths, setTeamBDeaths] = useState<number>(0);

  const allHeroes = useMemo(() => {
    const allHeroes: HeroInterface[] = [];
    return allHeroes.concat(teamA.members).concat(teamB.members);
  }, [teamA.members, teamB.members]);

  // * Memoized team IDs:
  const teamAIds = useMemo(() => {
    // Here, we will filter the dead heroes,
    // so we don't have zombi attacks:
    const onlyAliveTeam = teamA.members.filter(({id}) => {
      const heroRealHP = HPTracker[id];
      return heroRealHP > 0;
    })
    return onlyAliveTeam.map(({id}) => id);
  }, [teamA.members, HPTracker]);

  const teamBIds = useMemo(() => {
    // Filter dead heros:
    const onlyAliveTeam = teamB.members.filter(({id}) => {
      const heroRealHP = HPTracker[id];
      return heroRealHP > 0;
    })
    return onlyAliveTeam.map(({id}) => id);
  }, [teamB.members, HPTracker]);

  // * Handler Functions
  const handleAttack = useCallback((
    attackerID: string,
    attackedID: string,
    attackingTeam: string
  ) => {
    // Choose attack type:
    const attackType = chooseAttackType();
    console.log("Attack Log: ");
    if (attackingTeam === "A") {
      const attacker = teamA.members.find((hero) => hero.id === attackerID);
      const attacked = teamB.members.find((hero) => hero.id === attackedID);
      
      // choose the attacker attack:
      const attack = attacker?.attacks[attackType] || 0;

      // Take the HP from the attacked's HP:
      console.log(attacked?.name, " started with ", HPTracker[attackedID], " HP");
      const newHP = HPTracker[attackedID] - attack;
      const newHPTracker = {...HPTracker};
      newHPTracker[attackedID] = newHP;
      setHPTracker(newHPTracker);

      // Set the attack message
      const newMessage = `${attacker?.name} has attacked ${attacked?.name} with ${attackType} (${attacker?.attacks[attackType]})!! ${attacked?.name} now has ${newHP} HP.`;
      console.log(newMessage);
      setAttackMessage(newMessage);
    } else {
      const attacker = teamB.members.find((hero) => hero.id === attackerID);
      const attacked = teamA.members.find((hero) => hero.id === attackedID);
      
      // choose the attacker attack:
      const attack = attacker?.attacks[attackType] || 0;

      // Take the HP from the attacked's HP:
      console.log(attacked?.name, " started with ", HPTracker[attackedID], " HP");
      const newHP = HPTracker[attackedID] - attack;
      const newHPTracker = {...HPTracker};
      newHPTracker[attackedID] = newHP;
      setHPTracker(newHPTracker);

      // Set the attack message
      const newMessage = `${attacker?.name} has attacked ${attacked?.name} with ${attackType} (${attacker?.attacks[attackType]})!! ${attacked?.name} now has ${newHP} HP.`;
      console.log(newMessage);
      setAttackMessage(newMessage);
    }
  }, [HPTracker, teamA.members, teamB.members])

  const handleStartFight = useCallback(() => {
    if (!allHeroes.length) return;
    // Set the HP tracker with all the base HPs from heroes:
    const auxHP = reduceHeroHP(allHeroes);
    setHPTracker(auxHP);
    console.log(auxHP);

    // Start the fight
    setFighting(true);
    setAttackingTeam("A");
    setAttackMessage("The fighting has started!!");

  }, [allHeroes]);

  // The attack simulation will run on the useEffect, to trigger the card re-renders:
  useEffect(() => {
    // 10 iterations to test it out:
    console.log("Fight Number ", fightCount);
    console.log("HP Tracker on handleFight: ", HPTracker);
    console.log("---");  
    
    if (attackingTeam === "A") {
      const attackerID = randomHeroFromTeam(teamAIds);
      const attackedID = randomHeroFromTeam(teamBIds);
      
      // Call the Attack Handler:
      handleAttack(attackerID, attackedID, "A");
      setAttackingTeam("B");
    } else {
      const attackerID = randomHeroFromTeam(teamBIds);
      const attackedID = randomHeroFromTeam(teamAIds);
      
      // Call the Attack Handler:
      handleAttack(attackerID, attackedID, "B");
      setAttackingTeam("A");
    }
  
  }, [fightCount])

  // This useEffect will check for casualties...
  useEffect(() => {
    const dead = 0;
  }, [HPTracker]);


  return {
    fighting,
    setFighting,
    handleStartFight,
    attackMessage,
    HPTracker,
    fightCount,
    setFightCount,
  }
}