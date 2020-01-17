//React
import React, { useEffect } from 'react';
import { Context } from './Context';
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';

//Components
import Feed from './components/Feed';
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
  const classes = useStyles(state);

  useEffect(() => {
    // Check if user is using for the first time

    if (localStorage.getItem('theme')) {
      console.log('come back');

      let subscriptions = localStorage.getItem('subscriptions').split('AnNdDd');
      console.log(`${subscriptions} <== subscriptions\n\n`);

      subscriptions.forEach(subscription => {
        if (subscription !== '') {
          dispatch({ type: 'appendSubscription', payload: subscription });
        }
      });
    } else {
      console.log('new');
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
        {/* <ScrollMemory /> */}
        <Route exact path="/" render={props => <Feed />}></Route>
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
