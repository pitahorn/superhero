import Grid from '@mui/material/Grid';
import HeroCard from "./HeroCard";
import { TeamInterface } from "./../api/heroInterface";

interface TeamGridProps extends TeamInterface {
  HPTracker: Record<string, number>,
}

export default function TeamGrid({ alignment, members, HPTracker }: TeamGridProps) {
  return (
    <>
      <h2>
        {alignment === "bad" ? "Villain" : "Hero"} Team!!
      </h2>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 9, lg: 12 }}
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
    </>
  );
}
