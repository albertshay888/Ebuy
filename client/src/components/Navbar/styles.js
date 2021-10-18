import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: '10px 50px',
    height: '64px',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-around',
    },
  },
  heading: {
    color: 'white',
    fontFamily: 'Montserrat',
    // color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  image: {
    marginRight: '0px',

    display: 'flex',
    justifyContent: 'flex-start',

    alignItems: 'center',
    marginLeft: '0px',

    color: 'white',
    fontFamily: 'Montserrat',
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    height: '35px',

    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      // marginTop: 20,
      justifyContent: 'center',
    },
  },
  userName: {
    display: 'flex',

    alignItems: 'center',
    marginLeft: '10px',
    marginRight: '10px',
    color: 'white',
    fontFamily: 'Montserrat',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  brand: {
    display: 'flex',
    alignItems: 'left',
    marginLeft: '0px',
    marginTop: '5px',
    justifyContent: 'flex-start',
  },

  black: {
    display: 'flex',
    marginLeft: '5px',

    backgroundColor: 'black',
    fontFamily: 'Montserrat',
  },
  logout: {
    backgroundColor: 'white',

    marginRight: '0px',

    fontFamily: 'Montserrat',
    color: 'black',
    fontSize: '10px',
    display: 'flex',
    justifyContent: 'flex-end',

    width: '75px',
    fontWeight: '900',
  },
  logo: {
    display: 'flex',
    cursor: 'pointer',
  },
}));
