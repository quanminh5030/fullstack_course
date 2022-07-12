import { Box, Typography } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import { OccupationalEntry } from '../types';

const OccupationalEntryBox = ({ entry }: { entry: OccupationalEntry }) => {
  console.log(entry);

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
        <WorkIcon sx={{ marginLeft: '3px' }} />
        {entry.employerName}
      </Typography>
      <Typography variant="body2" fontStyle="italic">
        {entry.description}
      </Typography>
      <Typography variant="body2">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default OccupationalEntryBox;
