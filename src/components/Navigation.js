//React
import React from 'react';
import { Context } from '../Context';

//Assets
import settingIcon from '../assets/cogs-solid.svg';
// import searchIcon from '../assets/search-solid.svg';
import homeIcon from '../assets/home2.png';

//Styles
import { createUseStyles } from 'react-jss';
import { colours } from '../styles';

//import WebFont from 'webfontloader';

const useStyles = createUseStyles({
  Navigation: {
    backgroundColor: colours.blue,
    color: 'white',
    display: 'flex',
    justifyContent: 'space-evenly',

    bottom: 0,
    position: 'fixed',
    width: '100%',
    padding: '0',
    textAlign: 'center',
    zIndex: 2
    //alignItems: 'stretch'
  },
  navButton: {
    display: 'inline',
    padding: {
      right: 16
    }
  },
  navIcon: {
    width: 20,
    height: 20,
    padding: {
      top: 8,
      bottom: 8
    }
  }
});

function Navigation() {
  const classes = useStyles();
  let { state, dispatch } = React.useContext(Context);

  return (
    <div className={classes.Navigation}>
      {/* <div
        className={classes.navButton}
        onClick={() => {
          dispatch({ type: 'change_page', payload: '' });
        }}
      > */}
      <img
        className={classes.navIcon}
        src={homeIcon}
        alt="Feed"
        onClick={() => dispatch({ type: 'change_page', payload: 'home' })}
      />
      {/* <img
        className={classes.navIcon}
        src={searchIcon}
        alt="Search"
        onClick={() => dispatch({ type: 'change_page', payload: 'search' })}
      /> */}
      <img
        className={classes.navIcon}
        src={settingIcon}
        alt="Settings"
        onClick={() => dispatch({ type: 'change_page', payload: 'settings' })}
      />
      {/* </div> */}
    </div>
  );
}

export default Navigation;
