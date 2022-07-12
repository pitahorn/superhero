import Alert from '@mui/material/Alert';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

interface AttackAlertProps {
  attackMessage?: string,
}

export default function AttackAlert({ attackMessage }: AttackAlertProps) {
  if (!attackMessage) return (<></>);
  return (
    <Alert
      icon={<LocalFireDepartmentIcon fontSize="inherit" />}
      severity="error"
      variant="standard"
      sx={{ margin: 4 }}
    >
      { attackMessage }
    </Alert>
  );
}
