import { useState, useEffect } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

interface ProgressCircleProps {
  value: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ value }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= value) {
          clearInterval(timer);
          return value;
        }
        return Math.min(oldProgress + 10, value);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [value]);

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" value={progress} size={90}/>
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressCircle;
