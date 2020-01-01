//React
import React from 'react';
import { Context } from '../Context';
import { Link, useHistory, useLocation } from 'react-router-dom';

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
import {
  Bookmark,
  BookmarkOutlined,
  Search,
  SearchOutlined,
  SettingsApplications,
  SettingsApplicationsOutlined,
  Home,
  HomeOutlined
} from '@material-ui/icons';
import { colours } from '../styles';

//import WebFont from 'webfontloader';

const useStyles = createUseStyles({
  Navigation: state => ({
    //backgroundColor: '#263238',
    backgroundColor: '#ECEFF1',
    color: 'white',
    display: 'flex',
    justifyContent: 'spaceEvenly',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.85)',
    flexDirection: state.orientation === 'potrait' ? 'row' : 'column',
    alignItems: 'center',
    zIndex: 2,
    gridColumnStart: 1,
    gridColumnEnd: state.orientation === 'landscape' ? 2 : 3,
    gridRowStart: state.orientation === 'landscape' ? 1 : 2,
    gridRowEnd: 3
    // position: 'fixed',
    // bottom: 0,
    // left: 0,
    // width: state.orientation === 'potrait' ? '100%' : 'auto',
    // height: state.orientation === 'potrait' ? 'auto' : '100%'
  }),
  navIconContainer: state => ({
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: state.orientation === 'potrait' ? 'column' : 'row'
  }),
  navIcon: {
    // width: 23,
    // height: 23,
    color: '#263238',
    // padding: {
    //   top: 6,
    //   bottom: 5
    // }

    padding: 11
  }
});

function Navigation(props) {
  let { state, dispatch } = React.useContext(Context);
  const history = useHistory();
  const classes = useStyles(state);

  return (
    <div className={classes.Navigation}>
      <div
        className={classes.navIconContainer}
        onClick={() => history.push('/')}
      >
        {/* <Link to="/"> */}
        {/* <img
            className={classes.navIcon}
            src={props.page === 'Feed' ? homeIcon : homeLineIcon}
            alt="Feed"
            // onClick={() => dispatch({ type: 'change_page', payload: 'home' })}
          /> */}
        <Home className={classes.navIcon} />
        {/* </Link> */}
      </div>
      <div className={classes.navIconContainer}>
        <Link to="/">
          {/* <img
          
            className={classes.navIcon}
            src={searchIcon}
            alt="Search"
            // onClick={() => dispatch({  type: 'change_page', payload: 'search' })}
          /> */}
          <Search className={classes.navIcon} />
        </Link>
      </div>

      <div className={classes.navIconContainer}>
        <Link to="/">
          {/* <img
            className={classes.navIcon}
            src={props.page === 'bookmarks' ? bookmarkIcon : bookmarksLineIcon}
            alt="Bookmarks"
            // onClick={() => dispatch({ type: 'change_page', payload: 'search' })}
          /> */}
          <Bookmark className={classes.navIcon} />
        </Link>
      </div>

      <div
        className={classes.navIconContainer}
        onClick={() => history.push('/settings')}
      >
        {/* <Link to="/settings"> */}
        {/* <img
            className={classes.navIcon}
            src={props.page === 'Settings' ? settingIcon : settingsLineIcon}
            alt="Settings"
            // onClick={() =>
            //   dispatch({ type: 'change_page', payload: 'settings' })
            // }
          /> */}
        <SettingsApplications className={classes.navIcon} />
        {/* </Link> */}
      </div>
    </div>
  );
}

export default Navigation;
