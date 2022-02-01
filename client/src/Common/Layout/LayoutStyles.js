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
  userNameInAppBar: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(10),
  },
}));

export default useStyles;
