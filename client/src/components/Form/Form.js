import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  FormControl,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useHistory, Link } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import AlgoliaPlaces from 'algolia-places-react';
import { createPost, updatePost } from '../../actions/posts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import places from 'places.js';
import UploadIcon from './UploadIcon';
import useStyles from './styles';

const config = {
  addId: process.env.REACT_APP_ALOGLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALOGLIA_API_KEY,
  language: 'en',
  countries: ['us'],
};
const Form = ({ showModal, currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    location: '',
    tags: [],
    selectedFile: '',
  });
  const [location, setLocation] = useState('');

  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const notify = () => toast('Please select image');
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: '',
      message: '',
      location: '',
      tags: [],
      selectedFile: '',
    });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(
        createPost(
          {
            ...postData,
            name: user?.result?.name,
          },
          history
        )
      );
      clear();
    } else {
      dispatch(
        updatePost(currentId, {
          ...postData,
          name: user?.result?.name,
        })
      );
      clear();
      showModal();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={0}>
        <Typography variant='h7' align='center' component={Link} to='/auth'>
          Sign in to buy & sell products
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };
  <Grid item xs={16} sm={9} md={12}>
    <Form
      currentId={currentId}
      setCurrentId={setCurrentId}
      showModal={showModal}
    />
  </Grid>;

  return (
    <Grid item xs={12} sm={6} md={9}>
      <Paper className={classes.paper} elevation={10}>
        <form
          autoComplete='off'
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant='h7'>
            {currentId ? `Editing "${post?.title}"` : 'Add new product'}
          </Typography>
          <TextField
            required={true}
            name='title'
            variant='outlined'
            label='Title'
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            InputProps={{ classes: { root: classes.inputRoot } }}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused,
              },
            }}
            margin='normal'
          />
          <TextField
            required={true}
            name='message'
            variant='outlined'
            label='Description'
            fullWidth
            multiline
            rows={4}
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
            InputProps={{ classes: { root: classes.inputRoot } }}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused,
              },
            }}
            margin='normal'
          />

          {/* <TextField
            name='message'
            variant='outlined'
            label='location'
            fullWidth
            option={config}
            rows={1}
            value={postData.message}
            onChange={(e) => {
              if (e.target.value === '') {
                navigator.geolocation.getCurrentPosition(function (position) {
                  console.log('Latitude is :', position.coords.latitude);
                  console.log('Longitude is :', position.coords.longitude);
                  location = position;
                });
              }
              setPostData({
                ...postData,
                location: location
                  ? { ...postData, location: location }
                  : { ...postData, location: e.target.value },
              });
            }}
            InputProps={{ classes: { root: classes.inputRoot } }}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused,
              },
            }}
            margin='normal'
          /> */}
          {/*   <ChipInput
            name='tags'
            variant='outlined'
            label='Price'
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
        />*/}
          <FormControl>
            <AlgoliaPlaces
              placeholder='Location'
              defaultValue={location}
              options={config}
              onChange={(e) => setLocation(e.suggestion.value)}
              style={{ height: '50px', width: '100%' }}
              className={classes.locationAlgolia}
            />
          </FormControl>
          <input
            label='Location'
            name='location'
            className={classes.location}
            style={{ fontFamily: 'Montserrat' }}
            placeholder='  Location*'
            value={postData.location}
            onChange={(e) => setPostData({ ...postData, location: location })}
          />

          <TextField
            required={true}
            name='tags'
            variant='outlined'
            label='Price'
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(',') })
            }
            InputProps={{ classes: { root: classes.inputRoot } }}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused,
              },
            }}
            margin='normal'
          />

          <div className={classes.fileInput}>
            <FileBase
              type='file'
              className={classes.fileInput}
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
              label={UploadIcon}
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant='contained'
            color='primary'
            size='large'
            type='submit'
          >
            Submit
          </Button>
          <ToastContainer />
          {/*  <Button
            variant='contained'
            color='secondary'
            size='small'
            onClick={clear}
            fullWidth
          >
            Clear
        </Button>*/}
        </form>
      </Paper>
      <br />
    </Grid>
  );
};

export default Form;
