//React
import React from 'react';
import { Context } from '../Context';

//Assets
import settingIcon from '../assets/material_settings.png';
import searchIcon from '../assets/material_search.png';
import bookmarkIcon from '../assets/material_bookmarks.png';
import homeIcon from '../assets/material_home.png';

import homeLineIcon from '../assets/line_home.png';
import bookmarksLineIcon from '../assets/line_bookmarks.png';
import settingsLineIcon from '../assets/line_settings.png';

//Styles
import { createUseStyles } from 'react-jss';
import { colours } from '../styles';

//import WebFont from 'webfontloader';

const useStyles = createUseStyles({
  Navigation: state => ({
    backgroundColor: '#263238',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-evenly',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.85)',
    position: 'fixed',
    flexDirection: state.oritentation === 'potrait' ? 'row' : 'column',
    bottom: 0,
    left: 0,
    width: state.oritentation === 'potrait' ? '100%' : 'auto',
    height: state.oritentation === 'potrait' ? 'auto' : '100%'
  }),

  navIcon: {
    width: 23,
    height: 23,
    padding: {
      top: 6,
      bottom: 5
    }
  }
});

function Navigation() {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles(state);

  return (
    <div className={classes.Navigation}>
      <img
        className={classes.navIcon}
        src={state.currentPage === 'home' ? homeIcon : homeLineIcon}
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
        src={
          state.currentPage === 'bookmarks' ? bookmarkIcon : bookmarksLineIcon
        }
        alt="Bookmarks"
        onClick={() => dispatch({ type: 'change_page', payload: 'search' })}
      />
      <img
        className={classes.navIcon}
        src={state.currentPage === 'settings' ? settingIcon : settingsLineIcon}
        alt="Settings"
        onClick={() => dispatch({ type: 'change_page', payload: 'settings' })}
      />
    </div>
  );
}

export default Navigation;
