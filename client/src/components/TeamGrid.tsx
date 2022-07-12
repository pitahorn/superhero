import Grid from '@mui/material/Grid';
import HeroCard from "./HeroCard";
import { TeamInterface } from "./../api/heroInterface";

interface TeamGridProps extends TeamInterface {
  HPTracker: Record<string, number>,
  teamName: string,
}

export default function TeamGrid({ alignment, members, HPTracker, teamName }: TeamGridProps) {
  return (
    <div>
      <h2 style={{color: "white"}}>
        Team {teamName}
      </h2>
      <h3 style={{color: "white"}}>
        {alignment === "bad" ? "Villain" : "Hero"} Team!!
      </h3>
      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 9, lg: 12 }}
        sx={{ 
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
         }}

      >
        {members?.map((hero) => (
          <Grid item xs={2} sm={4} md={3} lg={2} key={hero.id}>
            <HeroCard
              healthPoints={HPTracker[hero.id]}
              hero={hero}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
