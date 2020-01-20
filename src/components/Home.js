//React
import React, { useEffect, useState } from 'react';
import { Context } from '../Context';
import { useHistory } from 'react-router-dom';

//Components
import GeneralFeed from './GeneralFeed';
import ChooseSources from './ChooseSources';
import Sheet from './Sheet';

//utils
import { dataFetch } from '../modules/dataFetch';

//Styles
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
  welcomeMessage: {
    padding: 10
  }
});

function Home(props) {
  let { state, dispatch } = React.useContext(Context);
  let [showFeed, setShowFeed] = useState(false);
  const classes = useStyles();
  let history = useHistory();
  useEffect(() => {
    if (showFeed && state.subscriptions.length && state.currentFeed.name !== 'Feed') {
      dispatch({
        type: 'setCurrentFeed',
        payload: { name: 'Feed', items: [] }
      });
    }
  }, [showFeed, state.subscriptions]);

  useEffect(() => {
    if (!props.newUser && state.subscriptions.length) {
      setShowFeed(true);
    }
  }, [props.newUser]);
  return showFeed ? (
    state.currentFeed.name === 'Feed' ? (
      <GeneralFeed />
    ) : null
  ) : (
    <Sheet>
      <div className={classes.welcomeMessage}>
        <p>
          Welcome! <br />
          Please choose your interestes / search for publishers to get started. <br />
          You can customise{' '}
          <u>
            <span onClick={() => history.push('/settings')}>more in the settings</span>
          </u>
          .
        </p>

        <ChooseSources />
        <button
          className={classes.button}
          onClick={() => {
            if (state.subscriptions.length) {
              setShowFeed(true);
            }
          }}
        >
          Done
        </button>
      </div>
    </Sheet>
  );
}

export default Home;
