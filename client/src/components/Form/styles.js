import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      color: 'black',
      fontFamily: 'Montserrat',
    },
  },
  paper: {
    padding: theme.spacing(2),
    color: 'black',
    fontFamily: 'Montserrat',
    fontSize: '20px',
    borderColor: 'black',
    borderWidth: '1px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    color: 'black',
    fontFamily: 'Montserrat',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
    color: 'black',
    fontFamily: 'Montserrat',
  },
  buttonSubmit: {
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
}));
