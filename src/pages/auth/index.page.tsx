import { Box, Paper, Typography } from '@mui/material';

const Auth = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
      }}
    >
      <Paper sx={{ padding: '20px' }}>
        <Typography>Регистрация</Typography>
      </Paper>
    </Box>
  );
};

export default Auth;
