import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChurchIcon from '@mui/icons-material/Church';

interface HealthPointsProps {
  healthPoints: number,
}

export default function HealthPointsButton({
  healthPoints,
}: HealthPointsProps) {
  return (
    <Button
      variant="outlined"
      color={healthPoints > 0 ? "error" : "info"}
      startIcon={healthPoints > 0 ? <FavoriteIcon /> : <ChurchIcon />}
    >
      HP: {healthPoints > 0 ? healthPoints : "RIP"}
    </Button>
  );
}