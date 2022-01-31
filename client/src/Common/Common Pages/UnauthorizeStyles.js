import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  topAndBottomMargin: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));
