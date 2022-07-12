import { useCallback, useState, useMemo } from "react";
import image from "./super_logo.png";
import "./App.css";
import Button from '@mui/material/Button';
import TeamGrid from "./components/TeamGrid";
import useHeroFight from "./hooks/useHeroFight";
import { HeroApiInterface, TeamInterface } from "./api/heroInterface";
import superheroApi from "./api";
import AttackAlert from "./components/AttackAlert";

function App() {
  const [teamA, setTeamA] = useState<TeamInterface>({ alignment: "", members: [] });
  const [teamB, setTeamB] = useState<TeamInterface>({ alignment: "", members: [] });

  // * Call custom hooks:
  const { fighting, handleStartFight, attackMessage } = useHeroFight({ teamA, teamB });

  const areTeamsArrived = useMemo(() => {
    return teamA?.members.length && teamB?.members.length;
  }, [teamA, teamB]);

  // * Handler Functions
  const getHeroes = useCallback(async () => {
    const { getSuperheroes } = superheroApi;
    const { data } = await getSuperheroes();
    const heroesTeams = data as HeroApiInterface;
    
    setTeamA(heroesTeams.teamA);
    setTeamB(heroesTeams.teamB);
  }, []);

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <header className="App-header">
        <img src={image} className="App-logo" alt="logo" />
        { fighting ?
          <AttackAlert attackMessage={attackMessage}/>
          : 
          <Button
            variant="contained"
            size="large"
            onClick={ !areTeamsArrived ? getHeroes : handleStartFight }
            disabled={Boolean(fighting)}
          >
            {!areTeamsArrived ?  "CALL YOUR SUPER TEAMS!!" : "START FIGHT!!"}
          </Button>
        }
        {areTeamsArrived ?
          <>
            <TeamGrid
              members={ teamA.members }
              alignment={ teamA.alignment }
              /> 
            <h2>
              VS
            </h2>
            <TeamGrid
              members={ teamB.members }
              alignment={ teamB.alignment }
              /> 
          </>
        : <></>}
      </header>
    </div>
  );
}

export default App;
