import { makeStyles } from '@material-ui/core/styles';
import UploadIcon from './UploadIcon';
export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      color: 'black',
      fontFamily: 'Montserrat',
    },
  },
  paper: {
    borderRadius: 30,
    padding: theme.spacing(2),
    color: 'black',
    fontFamily: 'Montserrat',
    fontSize: '20px',
    borderColor: 'black',
    borderWidth: '1px',
    height: '500px',
    backgroundColor: 'transparent',
    position: 'center',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    color: 'black',
    fontFamily: 'Montserrat',
  },

  displayBlock: {
    display: 'block',
    position: 'center',
  },

  displayNone: {
    display: 'none',
  },
  modelMain: {
    position: 'fixed',
    background: 'white',
    width: '80%',
    height: 'auto',
    top: '50%',
    left: '50%',
    transform: `translate(-50%,-50%)`,
  },
  fileInput: {
    width: '100%',
    margin: '10px 0',
    marginTop: '40px',
    color: 'black',
    fontFamily: 'Montserrat',
    icon: { UploadIcon },
    position: 'center',
    cursor: 'pointer',

    // display: 'none',
  },
  buttonSubmit: {
    marginTop: 5,
    borderRadius: 10,
    marginBottom: 10,
    color: 'white',
    backgroundColor: 'black',
    fontFamily: 'Montserrat',
    height: '60px',
    width: '100px',
  },

  buttonClear: {
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,

    color: 'white',
    backgroundColor: 'black',
    fontFamily: 'Montserrat',
  },
  input: {
    color: 'black',
    fontFamily: 'Montserrat',
  },
  inputRoot: {
    fontSize: 12,
    fontFamily: 'Montserrat',
  },
  labelRoot: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Montserrat',
    '&$labelFocused': {
      color: 'black',
    },
  },
  font: {
    color: 'black',
    fontFamily: 'Montserrat',
  },
  labelFocused: {},
  inputLocation: {
    fontSize: 12,
    fontFamily: 'Montserrat',
    borderColor: 'grey',
  },
  price: {
    fontSize: 12,
    fontFamily: 'Montserrat',
  },
  location: {
    borderRadius: 5,
    color: 'black',
    borderColor: 'grey',
    elevation: 13,
    marginBottom: '10px',
    height: '25px',
    width: '90%',
    marginTop: '5px',
    fontSize: 12,
    outlined: 'none',
    display: 'flex',
    fontFamily: 'Montserrat',
  },
  locationAlgolia: {
    width: '90%',
    fontSize: 12,
  },
}));
