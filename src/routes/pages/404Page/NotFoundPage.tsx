import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h1">404 - Page Not Found</Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
        <Link to={'/'}>Go to Home</Link>
      </Typography>
    </div>
  );
};

export default NotFoundPage;
