import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  BottomNavigation,
  TextField,
  Button,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
// import ChipInput from 'material-ui-chip-input';
import {
  getPosts,
  getPostsBySearch,
  getPostsByUser,
} from '../../actions/posts';
import Pagination from '../Pagination';
import Posts from '../Posts/Posts';
import ChipInput from 'material-ui-chip-input';
import Form from '../Form/Form';
import ModalUnstyledDemo from '../Modal/Modal';
import useStyles from './styles';
import AddBoxIcon from '@mui/icons-material/AddBox';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
const Home = () => {
  const [show, setShow] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState('');
  const myRef = useRef(null);
  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  const searchPost = () => {
    if (search.trim()) {
      //to have something to dispatch we need to create the action 'getPostsBySearch
      //dispatch -> fetch search post
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      // history.push(`/posts/search?searchQuery=${search || 'none'}`);
      history.push(
        `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`
      );
    } else {
      history.push('/');
    }
  };

  const searchByUser = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user) dispatch(getPostsByUser(user.result._id));
    history.push(`/posts/user/`);
    console.log(user);
  };
  const handleKeyPress = (e) => {
    if (e.keycode === 13) {
      searchPost();
      // search post
    }
  };
  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  const showHideClassName = show
    ? classes.inputFormShow
    : classes.inputFormHide;

  const executeScroll = () => scrollToRef(myRef);
  const showModal = () => {
    setShow(!show);
    executeScroll();
  };

  // const hideModal = () => {
  //   setShow(false);
  // };
  return (
    <>
      <div ref={myRef} className={showHideClassName}>
        <Grid item xs={16} sm={9} md={12} className={classes.centerForm}>
          <Form
            currentId={currentId}
            setCurrentId={setCurrentId}
            showModal={showModal}
            location={location}
            setLocation={setLocation}
          />
        </Grid>
      </div>
      <AppBar
        className={classes.addBar}
        position='fixed'
        color='inherit'
        elevation={0}
      >
        <AddBoxIcon
          className={classes.addIcon}
          type='button'
          fontSize='large'
          onClick={showModal}
        />
      </AppBar>
      <Grow in>
        <Container maxWidth='xl' position='center'>
          <Grid
            item
            container
            justify='space-between'
            alignItems='stretch'
            spacing={3}
            className={classes.gridContainer}
          >
            <Grid item xs={16} sm={9} md={12}>
              <Posts setCurrentId={setCurrentId} showModal={showModal} />
            </Grid>

            {/*
          <Grid item xs={12} sm={6} md={9}>
            <AppBar
              className={classes.appBarSearch}
              position='static'
              color='inherit'
            >
              <TextField
                name='search'
                variant='outlined'
                label='Search listings'
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  style: { fontSize: 12 },
                }}
                InputLabelProps={{
                  style: { fontSize: 12 },
                }}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label='Search price'
                variant='outlined'
                InputProps={{
                  style: { fontSize: 12 },
                }}
                InputLabelProps={{
                  style: { fontSize: 12 },
                }}
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color='primary'
                variant='contained'
              >
                Search
              </Button>
            </AppBar>
              </Grid> */}
          </Grid>
          <br />
          <Grid item xs={16} sm={9} md={12}>
            {!searchQuery && !tags.length && (
              <Pagination page={page} className={classes.pagination} />
            )}
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Home;
