import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const ProgressBar = ({ progress }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gridArea: 'progress-bar',
      }}
    >
      <Box sx={{ width: '85%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 30, borderRadius: 5 }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>{progress}%</Box>
    </Box>
  );
};

export default ProgressBar;
