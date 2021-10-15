import React, { useState, useEffect } from 'react';

import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import silkroadText from '../../images/silkroadLogo.png';
import silkroad from '../../images/silkroad.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import ModalUnstyledDemo from '../Modal/Modal';

// import TriggerButton from '../TriggerButton/TriggerButton';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  //  const showModal = () => {
  //     setIsShown(true), () => {
  //       closeButton.focus();
  //     }};
  //     toggleScrollLock();
  //   };
  //   const closeModal = () => {
  //    setIsShown(false );
  //     TriggerButton.focus();
  //     toggleScrollLock();
  //   };
  //  const onKeyDown = (event) => {
  //     if (event.keyCode === 27) {
  //       this.closeModal();
  //     }
  //   };
  //   onClickOutside = (event) => {
  //     if (modal && modal.contains(event.target)) return;
  //     this.closeModal();
  //   };

  //   toggleScrollLock = () => {
  //     document.querySelector('html').classList.toggle('scroll-lock');
  //   };

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
  <img component={Link} to='/' src={silkroadText} alt='icon' height='45px' />;
  return (
    <AppBar className={classes.appBar} position='sticky' color='inherit'>
      <Link to='/' className={classes.brandContainer}>
        <img
          component={Link}
          to='/'
          src={silkroadText}
          alt='icon'
          height='45px'
        />
      </Link>
      <div className={classes.brandContainer}></div>

      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.black}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>

            <Typography className={classes.userName} variant='h6'>
              {user?.result.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            className={classes.logout}
            to='/auth'
            variant='contained'
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
