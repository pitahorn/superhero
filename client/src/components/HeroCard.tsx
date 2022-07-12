import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import HealthPointsButton from "./HealthPoints";
import { HeroInterface } from '../api/heroInterface';
import placeholderHeroImage from "./../../src/hero_placeholder.png";

interface HeroCardProps {
  hero: HeroInterface,
  healthPoints?: number,
}

export default function HeroCard({
  hero,
  healthPoints,
}: HeroCardProps) {
  return (
    <Card
      elevation={8}
      sx={{ maxWidth: 345 }}
    >
      <CardMedia
        component="img"
        height="320"
        image={hero.image.url || placeholderHeroImage}
        sx={healthPoints && healthPoints <= 0 ? { filter: "grayscale(100%)" } : {}}
        alt="hero image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {hero.name} {`(${hero.biography.alignment})`}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.primary">
          {hero.work.occupation}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {hero.biography.publisher}
        </Typography>
        <HealthPointsButton
          healthPoints={healthPoints || hero.healthPoints}
        />
      </CardContent>
      <CardActions>
        <Typography variant="h6" color="secondary">
          <b>MENTAL:</b> {hero.attacks.mental}
        </Typography>
        <Typography variant="h6" color="secondary">
          <b>STRONG:</b> {hero.attacks.strong}
        </Typography>
        <Typography variant="h6" color="secondary">
          <b>FAST:</b> {hero.attacks.fast}
        </Typography>
      </CardActions>
    </Card>
  );
}
