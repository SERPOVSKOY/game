import { Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GetUsersDocument } from '@game/graphql';

const HomePage = () => {
  const { data } = useQuery(GetUsersDocument);
  console.log(data);
  return <Typography variant="h1">Добро пожаловать</Typography>;
};

export default HomePage;
