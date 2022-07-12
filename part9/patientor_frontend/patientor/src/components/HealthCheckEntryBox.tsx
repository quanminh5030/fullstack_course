import { MedicalServices, Favorite } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { HealthCheckEntry } from '../types';

const HealthCheckEntryBox = ({ entry }: { entry: HealthCheckEntry }) => {
  const HealthRating = ({ health }: { health: number }) => {
    switch (health) {
      case 0:
        return <Favorite color="success" />;
      case 1:
        return <Favorite color="info" />;
      case 2:
        return <Favorite color="warning" />;
      case 3:
        return <Favorite color="error" />;
      default:
        return <div></div>;
    }
  };

  return (
    <Box
      sx={{
        border: '1px solid black',
        borderRadius: '5px',
        margin: '10px 0',
        padding: '0 5px',
      }}
    >
      <Typography variant="body1">
        {entry.date}
        <MedicalServices sx={{ marginLeft: '3px' }} />
      </Typography>
      <Typography variant="body2" fontStyle="italic">
        {entry.description}
      </Typography>
      <HealthRating health={entry.healthCheckRating} />
      <Typography variant="body2">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default HealthCheckEntryBox;
