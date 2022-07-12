import { useCallback, useState, useMemo } from "react";
import image from "./super_logo.png";
import "./App.css";
import Button from '@mui/material/Button';
import TeamGrid from "./components/TeamGrid";
import useHeroFight from "./hooks/useHeroFight";
import { Paper } from "@mui/material";
import { HeroApiInterface, TeamInterface } from "./api/heroInterface";
import superheroApi from "./api";
import AttackAlert from "./components/AttackAlert";

function App() {
  const [teamA, setTeamA] = useState<TeamInterface>({ alignment: "", members: [] });
  const [teamB, setTeamB] = useState<TeamInterface>({ alignment: "", members: [] });

  // * Call custom hooks:
  const {
    fighting,
    handleStartFight,
    attackMessage,
    fightCount,
    setFightCount,
    HPTracker,
  } = useHeroFight({ teamA, teamB, setTeamA, setTeamB });

  // * Memoized variables
  const areTeamsArrived = useMemo(() => {
    return teamA?.members.length && teamB?.members.length;
  }, [teamA, teamB]);
  
  const buttonMessage = useMemo(() => {
    if (fighting) return "NEXT ATTACK!!";
    if (!areTeamsArrived) return "CALL YOUR SUPER TEAMS!!";
    return "START FIGHT!!";
  }, [areTeamsArrived, fighting]);
  
  // * Handler Functions
  const getHeroes = useCallback(async () => {
    const { getSuperheroes } = superheroApi;
    const { data } = await getSuperheroes();
    const heroesTeams = data as HeroApiInterface;
    
    setTeamA(heroesTeams.teamA);
    setTeamB(heroesTeams.teamB);
  }, []);

  const handleButtonClick = useCallback(() => {
    if (fighting) {
      setFightCount(fightCount + 1);
    } else {
      if (!areTeamsArrived) {
        getHeroes();
      } else {
        handleStartFight();
      }
    }
  }, [
    areTeamsArrived,
    fightCount,
    fighting,
    getHeroes,
    handleStartFight,
    setFightCount
  ]);

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <div className="App-header">
        <img src={image} className="App-logo" alt="logo" />
        <Button
          variant="contained"
          size="large"
          onClick={ handleButtonClick }
        >
          { buttonMessage }
        </Button>
        <AttackAlert attackMessage={attackMessage}/>
        {areTeamsArrived ?
          <Paper
            sx={{
              backgroundColor: "#282c34",
              width: "100%",
              display: "flex",
              marginBottom: 8,
            }}
          >
              <>
                <TeamGrid
                  members={ teamA.members }
                  alignment={ teamA.alignment }
                  HPTracker={HPTracker}
                  teamName="A"
                  /> 
                <h2 style={{color: "white"}}>
                  VS
                </h2>
                <TeamGrid
                  members={ teamB.members }
                  alignment={ teamB.alignment }
                  HPTracker={HPTracker}
                  teamName="B"
                /> 
              </>
          </Paper>
        : <></>}
      </div>
    </div>
  );
}

export default App;
