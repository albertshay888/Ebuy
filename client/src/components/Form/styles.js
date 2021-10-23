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
    color: 'black',
    fontFamily: 'Montserrat',
    icon: { UploadIcon },
    position: 'center',
    // display: 'none',
  },
  buttonSubmit: {
    borderRadius: 10,
    marginBottom: 10,
    color: 'white',
    backgroundColor: 'black',
    fontFamily: 'Montserrat',
  },

  buttonClear: {
    marginBottom: 10,
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
  labelFocused: {},
  inputLocation: {
    fontSize: 12,
    fontFamily: 'Montserrat',
  },
  inputPrice: {
    fontSize: 12,
    height: '10px',
  },
  inputLocation: {
    color: 'black',
    fontSize: 12,

    // display: 'flex',
    fontFamily: 'Montserrat',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
}));
