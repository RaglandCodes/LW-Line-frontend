//React
import React, { useEffect, useState } from 'react';
import { Context } from '../Context';
import { useHistory } from 'react-router-dom';

//Components
import GeneralFeed from './GeneralFeed';
import ChooseSources from './ChooseSources';
import Sheet from './Sheet';

//Styles
import { createUseStyles } from 'react-jss';
import { button } from '../styles';

const useStyles = createUseStyles({
  doneButton: {
    ...button,
    width: '100%'
  },
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
          Welcome to <b>LW Line.</b> <br />
          <br />
          Get started by choosing your interestes and subscribing to feeds. <br />
          You can customise{' '}
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
  );
}

export default Home;
