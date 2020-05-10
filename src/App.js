//React
import React, { useEffect, useState } from 'react';
import { Context } from './Context';
import { DeviceContext } from './Context/DeviceContext';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Components
import Home from './components/Home';
import Settings from './components/Settings';
import PreviewSource from './components/PreviewSource';
import PreviewItem from './components/PreviewItem';

//Styles
import { createUseStyles } from 'react-jss';
import { navigationWidth, draggerWidth } from './styles';

const useStyles = createUseStyles({
  App: state => {
    let navWidth = `${navigationWidth}px`;
    let feedWidth = '1fr';
    let previewWidth = '1fr';

    if ((state.inputFocused && state.recentHeigtJank) || state.orientation === 'potrait') {
      navWidth = '0';
    }

    if (state.feedWidth && state.previewWidth) {
      feedWidth = `${state.feedWidth}px`;
      previewWidth = `${state.previewWidth}px`;
    }

    return {
      display: 'grid',
      height: state.innerHeight,
      gridTemplateColumns: `[nav-start] ${navWidth} [nav-end] ${feedWidth} [dragger-start] ${draggerWidth}px [preview-start] ${previewWidth} [preview-end]`,

      // state.inputFocused && state.recentHeigtJank
      //   ? '[nav-start] 0px [nav-end] 1fr [dragger-start] 17px [preview-start] 1fr [preview-end]'
      //   : `[nav-start] ${
      //       state.orientation === 'potrait' ? '0' : '60px'
      //     } [nav-end] 1fr [dragger-start] 17px [preview-start] 1fr [preview-end]`,

      gridTemplateRows: `[screen-start] auto [nav-start] ${
        state.orientation === 'potrait' ? '50px' : '0'
      } [nav-end]`,
    };
  },
});

function App() {
  let { state, dispatch } = React.useContext(Context);
  let { deviceState, deviceDispatch } = React.useContext(DeviceContext);
  let [newUser, setNewUser] = useState(true);
  const classes = useStyles({ ...state, ...deviceState });

  useEffect(() => {
    // Check if user is using for the first time

    if (localStorage.getItem('theme')) {
      console.log('come back');
      setNewUser(false);
      // ** from local storage to React state **

      // * subscriptions *
      let subscriptions = localStorage.getItem('subscriptions').split('AnNdDd');

      subscriptions.forEach(subscription => {
        if (subscription !== '') {
          dispatch({ type: 'appendSubscription', payload: subscription });
        }
      });

      let mutePhrases = JSON.parse(localStorage.getItem('mutePhrases'));
      if (mutePhrases.length) {
        dispatch({ type: 'appendMutePhrase', payload: mutePhrases });
      }

      // * display preferences *
      if (localStorage.getItem('showPreview') === 'false') {
        // state.itemPreview.openOnClick is initialised to be true. So dispatch iff localStorage is false
        dispatch({ type: 'toggleShowPreview', action: '' });
      }

      if ('false' === localStorage.getItem('showInSplitScreen')) {
        // state.itemPreview.showInSplitScreen is initialised to be true. So dispatch iff localStorage is false
        dispatch({ type: 'toggleSplitScreen', action: '' });
      }
    } else {
      console.log('new');
      setNewUser(true);

      // Set default settings based on device
      if (window.innerWidth < 1000) {
        dispatch({ type: 'toggleSplitScreen', action: '' });
        // default split screen is true. So toggling will make it false on smaller screens
      }
    }

    // dispatch({
    //   type: 'setOrientation',
    //   payload: window.innerWidth > window.innerHeight ? 'landscape' : 'potrait',
    // });

    // dispatch({
    //   type: 'setInnerHeight',
    //   payload: window.innerHeight,
    // });

    deviceDispatch({
      type: 'setOrientation',
      payload: window.innerWidth > window.innerHeight ? 'landscape' : 'potrait',
    });

    deviceDispatch({
      type: 'setInnerHeight',
      payload: window.innerHeight,
    });

    deviceDispatch({
      type: 'setInnerWidth',
      payload: window.innerWidth,
    });

    // deviceDispatch({
    //   type: 'setFeedWidth',
    //   payload: (window.innerWidth - navigationWidth) / 2 - draggerWidth,
    // });

    // deviceDispatch({
    //   type: 'setPreviewWidth',
    //   payload: (window.innerWidth - navigationWidth) / 2,
    // });

    window.addEventListener('resize', () => {
      // dispatch({
      //   type: 'setOrientation',
      //   payload: window.innerWidth > window.innerHeight ? 'landscape' : 'potrait',
      // });

      // dispatch({
      //   type: 'setInnerHeight',
      //   payload: window.innerHeight,
      // });

      deviceDispatch({
        type: 'setInnerHeight',
        payload: window.innerHeight,
      });

      deviceDispatch({
        type: 'setInnerWidth',
        payload: window.innerWidth,
      });

      deviceDispatch({
        type: 'setOrientation',
        payload: window.innerWidth > window.innerHeight ? 'landscape' : 'potrait',
      });
    });
  }, []);

  return (
    <div className={`App ${classes.App}`}>
      <Router>
        <Route
          exact
          path="/"
          render={props => <Home newUser={newUser} setNewUser={setNewUser} />}
        ></Route>
        <Route exact path="/settings" render={props => <Settings />}></Route>
        <Route exact path="/source/:sourceName" render={props => <PreviewSource />}></Route>
        <Route
          path="/item/:id"
          render={props => <PreviewItem sheetType="tag" {...props} />}
        ></Route>
      </Router>
    </div>
  );
}

export default App;
