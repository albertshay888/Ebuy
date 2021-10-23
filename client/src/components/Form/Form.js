// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Typography, Paper } from '@material-ui/core';
// import { useDispatch, useSelector } from 'react-redux';
// import FileBase from 'react-file-base64';
// import { useHistory } from 'react-router-dom';
// import { createPost, updatePost } from '../../actions/posts';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import UploadIcon from './UploadIcon';
// import useStyles from './styles';

// const Form = ({ currentId, setCurrentId }) => {
//   const [postData, setPostData] = useState({
//     title: '',
//     message: '',
//     tags: '',
//     selectedFile: '',
//   });

//   const history = useHistory();
//   const post = useSelector((state) =>
//     currentId
//       ? state.posts.posts.find((message) => message._id === currentId)
//       : null
//   );
//   const dispatch = useDispatch();
//   const classes = useStyles();
//   const user = JSON.parse(localStorage.getItem('profile'));
//   const notify = () => toast('Please select image');
//   useEffect(() => {
//     if (post) setPostData(post);
//   }, [post]);

//   const clear = () => {
//     setCurrentId(0);
//     setPostData({ title: '', message: '', tags: '', selectedFile: '' });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!postData.selectedFile) {
//       notify();
//       return;
//     }
//     if (currentId === 0) {
//       dispatch(createPost({ ...postData, name: user?.result?.name }, history));

//       clear();
//     } else {
//       dispatch(
//         updatePost(currentId, { ...postData, name: user?.result?.name })
//       );
//       clear();
//     }
//   };

//   if (!user?.result?.name) {
//     return (
//       <Paper className={classes.paper}>
//         <Typography variant='h7' align='center'>
//           Sign in to reserve and post listings.
//         </Typography>
//       </Paper>
//     );
//   }

//   return (
//     <Paper className={classes.paper} elevation={6}>
//       <form
//         autoComplete='off'
//         className={`${classes.root} ${classes.form}`}
//         onSubmit={handleSubmit}
//       >
//         <Typography variant='h7'>
//           {currentId ? `Editing "${post?.title}"` : 'Post your listing'}
//         </Typography>
//         <TextField
//           name='title'
//           variant='outlined'
//           label='Listing name'
//           fullWidth
//           value={postData.title}
//           onChange={(e) => setPostData({ ...postData, title: e.target.value })}
//           required={true}
//           InputLabelProps={{
//             style: { fontSize: 12 },
//           }}
//           InputProps={{
//             style: { fontSize: 12 },
//           }}
//         />
//         <TextField
//           name='message'
//           variant='outlined'
//           label='Listing description'
//           fullWidth
//           multiline
//           rows={8}
//           value={postData.message}
//           onChange={(e) =>
//             setPostData({ ...postData, message: e.target.value })
//           }
//           required={true}
//           InputLabelProps={{
//             style: { fontSize: 12 },
//           }}
//           InputProps={{
//             style: { fontSize: 12 },
//           }}
//         />
//         <TextField
//           name='tags'
//           variant='outlined'
//           label='Price'
//           fullWidth
//           value={postData.tags}
//           onChange={(e) =>
//             setPostData({ ...postData, tags: e.target.value.split(',') })
//           }
//           required={true}
//           type='number'
//           InputLabelProps={{
//             style: { fontSize: 12 },
//           }}
//           InputProps={{
//             style: { fontSize: 12 },
//             fontFamily: 'Montserrat',
//           }}
//         />
//         <div className={classes.fileInput} required={true}>
//           <FileBase
//             type='file'
//             multiple={true}
//             onDone={({ base64 }) =>
//               setPostData({ ...postData, selectedFile: base64 })
//             }
//             value={postData.selectedFile}
//             icon={<UploadIcon />}
//             className={classes.fileInput}

//             //required

//             // name='requiredField'
//             // ref={register({ required: true })}
//           />
//           {/*{errors.requiredField && <span>This field is required</span>}*/}
//           {/* <input
//             type='file'
//             multiple={false}
//             onDone={({ base64 }) =>
//               setPostData({ ...postData, selectedFile: base64 })
//             }
//             required={true}
//           />*/}
//         </div>
//         <Button
//           className={classes.buttonSubmit}
//           variant='contained'
//           color='primary'
//           size='large'
//           type='submit'
//           fullWidth
//         >
//           Submit
//         </Button>
//         <ToastContainer />
//         <Button
//           className={classes.buttonSubmit}
//           variant='contained'
//           color='secondary'
//           size='small'
//           onClick={clear}
//           fullWidth
//         >
//           Clear
//         </Button>
//       </form>
//     </Paper>
//   );
// };

// export default Form;

import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Typography, Paper, Grid } from '@material-ui/core';
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
const Form = ({
  showModal,
  currentId,
  setCurrentId,
  location,
  setLocation,
}) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    location: '',
    tags: [],
    selectedFile: '',
  });

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

  // const placesAutocomplete = places({
  //   addId: process.env.REACT_APP_ALOGLIA_APP_ID,
  //   apiKey: process.env.REACT_APP_ALOGLIA_API_KEY,
  //   container: document.querySelector('#address-input'),
  // });
  // let location;
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

          {/*  <AlgoliaPlaces
            placeholder='Location'
            // defaultValue={location}
            options={config}
            onChange={(e) =>
              e.preventDefault() &&
              setPostData({ ...postData, location: e.suggestion.value })
            }
            style={{ height: '50px' }}
          />*/}
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
              style={{ fontFamily: 'Montserrat', position: 'center' }}
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant='contained'
            color='primary'
            size='large'
            type='submit'
            fullWidth
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
