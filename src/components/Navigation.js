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

import WebFont from 'webfontloader';
WebFont.load({
  google: {
    families: ['Lato']
  }
});

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
    gridColumnEnd: state.orientation === 'landscape' ? 2 : 4,
    gridRowStart: state.orientation === 'landscape' ? 1 : 2,
    gridRowEnd: 3
  }),
  navIconContainer: state => ({
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    //flexDirection: state.orientation === 'potrait' ? 'column' : 'row'
    flexDirection: 'column',
    color: '#263238'
  }),

  navIconActive: { color: '#1A237E' },
  navLabel: { fontFamily: 'Lato', fontSize: 15, display: 'block' },
  navLabelActive: {
    fontFamily: 'Lato',
    fontSize: 16,
    display: 'block',
    color: '#1A237E'
  }
});

function Navigation(props) {
  let { state, dispatch } = React.useContext(Context);
  const history = useHistory();
  const classes = useStyles(state);

  return (
    <div className={classes.Navigation}>
      <div className={classes.navIconContainer} onClick={() => history.push('/')}>
        {props.page === 'Feed' ? (
          <Home className={classes.navIconActive} />
        ) : (
          <HomeOutlined className={classes.navIcon} />
        )}
        <span
          className={props.page === 'Feed' ? classes.navLabelActive : classes.navLabel}
        >
          Home
        </span>
      </div>
      <div className={classes.navIconContainer} onClick={() => history.push('/')}>
        <SearchOutlined className={classes.navIcon} />
        <span className={classes.navLabel}>Search</span>
      </div>

      <div className={classes.navIconContainer} onClick={() => history.push('/')}>
        <BookmarkOutlined className={classes.navIcon} />
        <span className={classes.navLabel}>Saved</span>
      </div>

      <div className={classes.navIconContainer} onClick={() => history.push('/settings')}>
        {props.page === 'Settings' ? (
          <SettingsApplications className={classes.navIconActive} />
        ) : (
          <SettingsApplicationsOutlined className={classes.navIcon} />
        )}
        <span
          className={
            props.page === 'Settings' ? classes.navLabelActive : classes.navLabel
          }
        >
          Settings
        </span>
      </div>
    </div>
  );
}

export default Navigation;
