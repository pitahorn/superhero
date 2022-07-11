import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface HealthPointsProps {
  healthPoints: number,
}

export default function HealthPointsButton({
  healthPoints,
}: HealthPointsProps) {
  return (
    <Button
      variant="outlined"
      color="error"
      startIcon={<FavoriteIcon />}
    >
      HP: {healthPoints}
    </Button>
  );
}