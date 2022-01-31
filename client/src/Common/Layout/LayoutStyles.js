import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  layoutContainer: {
    display: 'flex',
  },
  headerLinkText: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default useStyles;
