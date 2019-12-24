//React
import React, { useEffect } from 'react';
import { Context } from './Context';

//Styles
import './App.css';

//Components
import TopBox from './components/TopBox';
import Feed from './components/Feed';
import Settings from './components/Settings';
import Navigation from './components/Navigation';

function App() {
  let { state, dispatch } = React.useContext(Context);

  // let handleScreenSize = () => {
  //   let { innerWidth: screenWidth, innerHeight: screenHeight } = window;
  //   console.log('resizing');
  //   console.log(`${innerHeight} <== innerWidth\n\n`);
  // };
  useEffect(() => {
    // Check if user is using for the first time

    if (localStorage.getItem('currentPage')) {
      console.log('come back');
      console.log(localStorage.getItem('currentPage'));

      let subscriptions = localStorage.getItem('subscriptions').split('AnNdDd');
      console.log(`${subscriptions} <== subscriptions\n\n`);

      subscriptions.forEach(subscription => {
        if (subscription !== '') {
          dispatch({ type: 'appendSubscription', payload: subscription });
        }
      });

      dispatch({
        type: 'change_page',
        payload: localStorage.getItem('currentPage')
      });
    } else {
      console.log('new');
      dispatch({
        type: 'change_page',
        payload: 'home'
      });
    }

    dispatch({
      type: 'setOrientation',
      payload:
        //window.screen.width > window.screen.height ? 'landscape' : 'potrait'
        window.innerWidth > window.innerHeight ? 'landscape' : 'potrait'
    });
    //     console.log(`${window.scrollY} <==
    // window.scr\n\n`);

    window.addEventListener('resize', () => {
      dispatch({
        type: 'setOrientation',
        payload:
          window.innerWidth > window.innerHeight ? 'landscape' : 'potrait'
      });
    });
  }, []);
  return (
    <div className="App">
      <TopBox />
      {state.currentPage === 'home' ? (
        state.subscriptions.length === 0 ? (
          'Please subscribe to something'
        ) : (
          <Feed />
        )
      ) : null}

      {state.currentPage === 'settings' ? <Settings /> : null}

      <Navigation />
    </div>
  );
}

export default App;
