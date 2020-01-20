//React
import React, { useEffect, useState } from 'react';
import { Context } from './Context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Components
import Home from './components/Home';
import Settings from './components/Settings';
import PreviewSource from './components/PreviewSource';
import PreviewItem from './components/PreviewItem';

//Styles
import './App.css';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  App: state => ({
    display: 'grid',
    height: state.innerHeight,
    gridTemplateColumns: '[nav-start] 60px [nav-end] 1fr 1fr',
    gridTemplateRows: 'auto 50px'
  })
});

function App() {
  let { state, dispatch } = React.useContext(Context);
  let [newUser, setNewUser] = useState(true);
  const classes = useStyles(state);

  useEffect(() => {
    // Check if user is using for the first time

    if (localStorage.getItem('theme')) {
      console.log('come back');
      setNewUser(false);
      // ** local storage => React state **

      // * subscriptions *
      let subscriptions = localStorage.getItem('subscriptions').split('AnNdDd');

      subscriptions.forEach(subscription => {
        if (subscription !== '') {
          dispatch({ type: 'appendSubscription', payload: subscription });
        }
      });

      // * display preferences *
      if (localStorage.getItem('showPreview') === 'false') {
        // state.itemPreview.openOnClick is initialised to be true. So dispatch only iff localStorage is false
        dispatch({ type: 'toggleShowPreview', action: '' });
      }

      if ('false' === localStorage.getItem('showInSplitScreen')) {
        // state.itemPreview.showInSplitScreen is initialised to be true. So dispatch only iff localStorage is false
        dispatch({ type: 'toggleSplitScreen', action: '' });
      }
    } else {
      console.log('new');
      setNewUser(true);
    }

    dispatch({
      type: 'setOrientation',
      payload: window.innerWidth > window.innerHeight ? 'landscape' : 'potrait'
    });
    dispatch({
      type: 'setInnerHeight',
      payload: window.innerHeight
    });

    //     console.log(`${window.scrollY} <==
    // window.scr\n\n`);

    window.addEventListener('resize', () => {
      console.log(`${window.innerHeight} <== window.innerHeight\n\n`);
      console.log(`${window.innerWidth} <== window.innerWidth\n\n`);

      dispatch({
        type: 'setOrientation',
        payload: window.innerWidth > window.innerHeight ? 'landscape' : 'potrait'
      });
      dispatch({
        type: 'setInnerHeight',
        payload: window.innerHeight
      });
    });
  }, []);
  return (
    <div className={`App ${classes.App}`}>
      <Router>
        <Route exact path="/" render={props => <Home newUser={newUser} />}></Route>
        <Route exact path="/settings" render={props => <Settings />}></Route>
        <Route
          exact
          path="/source/:sourceName"
          render={props => <PreviewSource />}
        ></Route>
        <Route
          path="/item/:id"
          render={props => <PreviewItem sheetType="tag" {...props} />}
        ></Route>
      </Router>
    </div>
  );
}

export default App;
