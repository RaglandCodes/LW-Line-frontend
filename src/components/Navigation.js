//React
import React from 'react';
import { Context } from '../Context';

//Assets
import settingIcon from '../assets/material_settings.png';
import searchIcon from '../assets/material_search.png';
import bookmarkIcon from '../assets/material_bookmarks.png';
import homeIcon from '../assets/material_home.png';

//Styles
import { createUseStyles } from 'react-jss';
import { colours } from '../styles';

//import WebFont from 'webfontloader';

const useStyles = createUseStyles({
  Navigation: {
    backgroundColor: colours.blue900,
    color: 'white',
    display: 'flex',
    justifyContent: 'space-evenly',
    bottom: 0,
    position: 'fixed',
    width: '100%',
    padding: '0',
    textAlign: 'center',
    zIndex: 2
  },

  navIcon: {
    width: 20,
    height: 20,
    padding: {
      top: 5,
      bottom: 5
    }
  }
});

function Navigation() {
  const classes = useStyles();
  let { state, dispatch } = React.useContext(Context);

  return (
    <div className={classes.Navigation}>
      <img
        className={classes.navIcon}
        src={homeIcon}
        alt="Feed"
        onClick={() => dispatch({ type: 'change_page', payload: 'home' })}
      />
      <img
        className={classes.navIcon}
        src={searchIcon}
        alt="Search"
        onClick={() => dispatch({ type: 'change_page', payload: 'search' })}
      />
      <img
        className={classes.navIcon}
        src={bookmarkIcon}
        alt="Bookmarks"
        onClick={() => dispatch({ type: 'change_page', payload: 'search' })}
      />
      <img
        className={classes.navIcon}
        src={settingIcon}
        alt="Settings"
        onClick={() => dispatch({ type: 'change_page', payload: 'settings' })}
      />
    </div>
  );
}

export default Navigation;
