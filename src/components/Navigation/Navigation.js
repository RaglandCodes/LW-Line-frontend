//React
import React, { useEffect, useState } from 'react';
import { Context } from '../../Context';
import { DeviceContext } from '../../Context/DeviceContext';
import { useHistory } from 'react-router-dom';

//icons
import { ReactComponent as Home } from './icons/home.svg';
import { ReactComponent as HomeOutlined } from './icons/home-outlined.svg';
import { ReactComponent as OpenInNew } from './icons/launch.svg';
import { ReactComponent as SearchOutlined } from './icons/search.svg';
import { ReactComponent as SettingsApplications } from './icons/settings.svg';
import { ReactComponent as SettingsApplicationsOutlined } from './icons/settings-outlined.svg';
import { ReactComponent as Share } from './icons/share.svg';

//Styles
import { createUseStyles } from 'react-jss';
import { colours, fonts } from '../../styles';

import WebFont from 'webfontloader';
WebFont.load({
  google: {
    families: [fonts.secondary],
  },
});

const useStyles = createUseStyles({
  Navigation: state => ({
    backgroundColor: colours.surface2,
    color: 'white',

    display: state.inputFocused && state.recentHeigtJank ? 'none' : 'flex',
    justifyContent: 'spaceEvenly',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.85)',
    flexDirection: state.orientation === 'potrait' ? 'row' : 'column',
    alignItems: 'center',
    zIndex: 2,
    gridColumnStart: 1,
    gridColumnEnd: state.orientation === 'landscape' ? 2 : 'preview-end',
    gridRowStart: state.orientation === 'landscape' ? 1 : 2,
    gridRowEnd: 3,
  }),

  navIconContainer: state => ({
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    //flexDirection: state.orientation === 'potrait' ? 'column' : 'row'
    flexDirection: 'column',
    color: '#263238',
  }),
  navIcon: { alignSelf: 'center', width: 30, height: 30 },
  navIconActive: { fill: '#1A237E', alignSelf: 'center', width: 30, height: 30 },
  navLabel: {
    fontFamily: fonts.secondary,
    fontSize: 15,
    display: 'block',
    textAlign: 'center',
  },
  navLabelActive: {
    fontFamily: fonts.secondary,
    fontSize: 16,
    display: 'block',
    color: '#1A237E',
  },
});

function Navigation(props) {
  let { state, dispatch } = React.useContext(Context);
  let { deviceState, deviceDispatch } = React.useContext(DeviceContext);
  const history = useHistory();
  const classes = useStyles({ ...state, ...deviceState });
  const [showPreviewNavigation, setshowPreviewNavigation] = useState(false);

  useEffect(() => {
    if (props.fromPreviewItem) {
      setshowPreviewNavigation(true);
    } else {
      setshowPreviewNavigation(false);
    }
  }, [deviceState.orientation]);

  return (
    <div className={classes.Navigation}>
      <div className={classes.navIconContainer} onClick={() => history.push('/')}>
        {props.page === 'Feed' ? (
          <Home className={classes.navIconActive} />
        ) : (
          <HomeOutlined className={classes.navIcon} />
        )}
        <span className={props.page === 'Feed' ? classes.navLabelActive : classes.navLabel}>
          Home
        </span>
      </div>
      {showPreviewNavigation ? (
        <div className={classes.navIconContainer}>
          <Share className={classes.navIcon} />
          <span className={classes.navLabel}>Share</span>
        </div>
      ) : (
        <div className={classes.navIconContainer} onClick={() => history.push('/')}>
          <SearchOutlined className={classes.navIcon} />
          <span className={classes.navLabel}>Search</span>
        </div>
      )}

      {/* <div className={classes.navIconContainer} onClick={() => history.push('/')}>
        <BookmarkOutlined className={classes.navIcon} />
        <span className={classes.navLabel}>Saved</span>
      </div> */}

      {showPreviewNavigation ? (
        <div className={classes.navIconContainer} onClick={() => window.open(props.storyLink)}>
          <OpenInNew className={classes.navIcon} />
          <span className={classes.navLabel}>Read story</span>
        </div>
      ) : (
        <div className={classes.navIconContainer} onClick={() => history.push('/settings')}>
          {props.page === 'Settings' ? (
            <SettingsApplications className={classes.navIconActive} />
          ) : (
            <SettingsApplicationsOutlined className={classes.navIcon} />
          )}
          <span className={props.page === 'Settings' ? classes.navLabelActive : classes.navLabel}>
            Settings
          </span>
        </div>
      )}
    </div>
  );
}

export default Navigation;
