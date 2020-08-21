//React
import React, { useEffect, useState } from 'react';
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
import { ReactComponent as Facebook } from './icons/facebook.svg';
import { ReactComponent as Twitter } from './icons/twitter.svg';
import { ReactComponent as Close } from './icons/close.svg';

//utils
import { share } from '../../modules/share';

//components
import NavIcon from './NavIcon';

//Styles
import { createUseStyles } from 'react-jss';
import { ThemeContext } from '../../Context/ThemeContext';

const useStyles = createUseStyles({
  Navigation: state => {
    return {
      backgroundColor: state.colours.surface2,
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
    };
  },

  navIcon: { alignSelf: 'center', width: 30, height: 30 },
});

function Navigation(props) {
  let { deviceState, deviceDispatch } = React.useContext(DeviceContext);
  let { themeState, themeDispatch } = React.useContext(ThemeContext);
  const history = useHistory();
  const classes = useStyles({ ...deviceState, ...themeState });
  const [showPreviewNavigation, setshowPreviewNavigation] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    if (props.fromPreviewItem) {
      setshowPreviewNavigation(true);
    } else {
      setshowPreviewNavigation(false);
    }
  }, [deviceState.orientation]);

  if (showPreviewNavigation) {
    if (showShareMenu) {
      return (
        <div className={classes.Navigation}>
          <NavIcon
            icon={<Twitter />}
            label="Twitter"
            onClick={() => share('twitter', props.story, setShowShareMenu)}
          />
          <NavIcon
            icon={<Facebook />}
            label="FB"
            onClick={() => share('facebook', props.story, setShowShareMenu)}
          />
          <NavIcon icon={<Close />} label="Back" onClick={() => setShowShareMenu(false)} />
        </div>
      );
    }
    return (
      <div className={classes.Navigation}>
        <NavIcon icon={<HomeOutlined />} label="Home" onClick={() => history.push('/')} />
        <NavIcon
          icon={<Share />}
          label="Share"
          onClick={() => share('native', props.story, setShowShareMenu)}
        />
        <NavIcon
          icon={<OpenInNew />}
          label="Read story"
          onClick={() => window.open(props.storyLink)}
        />
      </div>
    );
  } else {
    return (
      <div className={classes.Navigation}>
        <NavIcon
          icon={props.page === 'Feed' ? <Home /> : <HomeOutlined />}
          label="Home"
          onClick={() => history.push('/')}
          active={props.page === 'Feed'}
          className={classes.Home}
        />
        <NavIcon icon={<SearchOutlined />} label="Search" onClick={() => history.push('/')} />
        <NavIcon
          icon={
            props.page === 'Settings' ? <SettingsApplications /> : <SettingsApplicationsOutlined />
          }
          label="Settings"
          onClick={() => history.push('/settings')}
          active={props.page === 'Settings'}
        />
      </div>
    );
  }
}

export default Navigation;
