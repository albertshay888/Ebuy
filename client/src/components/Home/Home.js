import React, { useState, useEffect } from 'react';
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
// import ChipInput from 'material-ui-chip-input';
import {
  getPosts,
  getPostsBySearch,
  // getPostsByUser,
} from '../../actions/posts';
import Pagination from '../Pagination';
import Posts from '../Posts/Posts';
import ChipInput from 'material-ui-chip-input';
import Form from '../Form/Form';
import ModalUnstyledDemo from '../Modal/Modal';
import useStyles from './styles';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

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
  // const searchByUser = () => {
  //   const user = JSON.parse(localStorage.getItem('profile'));
  //   if (user) dispatch(getPostsByUser(user.result._id));
  //   history.push(`/posts/user/`);
  //   console.log(user);
  // };
  const handleKeyPress = (e) => {
    if (e.keycode === 13) {
      searchPost();
      // search post
    }
  };
  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth='xl' position>
        <Grid
          container
          justify='space-between'
          alignItems='stretch'
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
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
              {/*  <Button onClick={searchByUser}>My listing</Button>*/}
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
        <br />
        <Grid item xs={12} sm={6} md={9}>
          {!searchQuery && !tags.length && (
            <Pagination page={page} className={classes.pagination} />
          )}
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
