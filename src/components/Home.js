//React
import React, { useEffect, useState } from 'react';
import { Context } from '../Context';
import { DeviceContext } from '../Context/DeviceContext';
import { useHistory } from 'react-router-dom';

//Components
import GeneralFeed from './GeneralFeed';
import ChooseSources from './ChooseSources';
import Sheet from './Sheet';
// import SplitFeeds from './SplitFeeds';

//Styles
import { createUseStyles } from 'react-jss';
import { button } from '../styles';

const useStyles = createUseStyles({
  doneButton: {
    ...button,
    width: '100%',
  },
  welcomeMessage: {
    padding: 10,
  },
});

function Home(props) {
  let { state, dispatch } = React.useContext(Context);
  let { deviceState, deviceDispatch } = React.useContext(DeviceContext);

  let [showFeed, setShowFeed] = useState(false);
  let [showSettings, setShowSettings] = useState(false);
  const classes = useStyles();
  let history = useHistory();
  useEffect(() => {
    if (showFeed && state.subscriptions.length && state.currentFeed.name !== 'Feed') {
      dispatch({
        type: 'setCurrentFeed',
        payload: { name: 'Feed', items: [] },
      });
    }
  }, [showFeed, state.subscriptions, state.currentFeed.name]);

  useEffect(() => {
    if (!props.newUser && state.subscriptions.length) {
      setShowFeed(true);
    }

    if (deviceState.innerHeight && (props.newUser || state.subscriptions.length === 0)) {
      /*
        This is to prevent the jarring effect of the settings (usually shown to new users)
        being shown to returning users for a few moments

        The understanding is that if state.innerHeight is not undefined, 
        the value of props.newUser is correct
      */

      // Even if returing user, show settings if no subscriptions
      setShowSettings(true);
    } else {
      setShowSettings(false);
    }
  }, [props.newUser, deviceState.innerHeight]);

  // TODO remove multiple complex ternary operators
  return showFeed ? (
    state.currentFeed.name === 'Feed' ? (
      <GeneralFeed />
    ) : null
  ) : showSettings ? (
    <Sheet>
      <div className={classes.welcomeMessage}>
        <p>
          Welcome to <b>LW Line.</b> <br />
          <br />
          Get started by choosing your interestes and subscribing to feeds. <br />
          You can customise
          <u>
            <span onClick={() => history.push('/settings')}>more in the settings</span>
          </u>
          .
        </p>

        <ChooseSources />
        <button
          className={classes.doneButton}
          onClick={() => {
            if (state.subscriptions.length) {
              setShowFeed(true);
              props.setNewUser(false);
            }
          }}
        >
          Done
        </button>
      </div>
    </Sheet>
  ) : null;
}

export default Home;
