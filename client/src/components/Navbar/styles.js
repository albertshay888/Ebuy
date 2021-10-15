import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    marginTop: '0%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'Montserrat',
  },
  heading: {
    color: 'white',
    fontFamily: 'Montserrat',
    // color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  black: {
    backgroundColor: 'black',
    fontFamily: 'Montserrat',
  },
  logout: {
    backgroundColor: 'white',
    fontFamily: 'Montserrat',
    color: 'black',
    fontSize: '10px',
    alignText: 'center',
    width: '80px',
    fontWeight: '900',
  },
  logo: {
    cursor: 'pointer',
  },
}));
