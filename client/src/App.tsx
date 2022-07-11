import { useCallback, useState } from "react";
import image from "./super_logo.png";
import "./App.css";
import Button from '@mui/material/Button';
import TeamGrid from "./components/TeamGrid";
import { HeroApiInterface, TeamInterface } from "./api/heroInterface";
import superheroApi from "./api";

function App() {
  const [teamA, setTeamA] = useState<TeamInterface>({});
  const [teamB, setTeamB] = useState<TeamInterface>({});

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
        <Button
          variant="contained"
          size="large"
          onClick={ getHeroes }
        >
          CALL YOUR SUPER TEAMS!!
        </Button>
        {teamA?.members && teamB?.members ?
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
