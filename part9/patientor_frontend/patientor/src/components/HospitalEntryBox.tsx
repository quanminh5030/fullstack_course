import { MedicalServices, Favorite } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { Entry } from '../types';

const HospitalEntryBox = ({ entry }: { entry: Entry }) => {
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
      <Favorite color="success" />
      <Typography variant="body2">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default HospitalEntryBox;
