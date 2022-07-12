import Alert from '@mui/material/Alert';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

interface AttackAlertProps {
  attackMessage: string,
}

export default function AttackAlert({ attackMessage }: AttackAlertProps) {
  return (
    <Alert
      icon={<LocalFireDepartmentIcon fontSize="inherit" />}
      severity="error"
      variant="standard"
    >
      { attackMessage }
    </Alert>
  );
}
