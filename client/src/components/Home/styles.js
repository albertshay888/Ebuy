import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
    position: 'relative',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  searchButton: {
    color: 'white',
    backgroundColor: 'black',
    fontFamily: 'Montserrat',
  },
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 1,
    color: 'black',
  },
}));
