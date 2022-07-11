import { useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from '@mui/material/Button';
import superheroApi from "./api";

function App() {
  const getBatman = useCallback(async () => {
    const { getSuperheroes } = superheroApi;
    const heroes = await getSuperheroes();
    console.log("heroes body: ", heroes);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button
          variant="contained"
          onClick={ getBatman }
        >
          Batman!!
        </Button>
      </header>
    </div>
  );
}

export default App;
