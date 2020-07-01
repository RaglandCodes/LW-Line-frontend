//React
import React, { useState, useEffect } from 'react';
import { Context } from '../Context';
import { DeviceContext } from '../Context/DeviceContext';

//Components
import SourceBox from './SourceBox';

//Styles
import {
  settingContainer,
  settingsExplanation,
  input,
  inputSubmitButton,
  header3,
  header4,
} from '../styles';
import { createUseStyles } from 'react-jss';

import { dataFetch } from '../modules/dataFetch';

const useStyles = createUseStyles({
  settingContainer: {
    ...settingContainer,
  },
  settingsExplanation: {
    ...settingsExplanation,
  },
  message: {
    ...settingsExplanation,
  },
  header3: {
    ...header3,
  },
  header4: {
    ...header4,
  },
  form: {
    flexGrow: 1,
  },
  inputField: {
    flexGrow: 1,
    ...input,
  },
  inputButtonWrap: {
    display: 'flex',
  },
  inputSubmitButton: {
    ...inputSubmitButton,
  },
});

function AddYourOwnFeed(props) {
  let { state, dispatch } = React.useContext(Context);
  let { deviceState, deviceDispatch } = React.useContext(DeviceContext);

  const classes = useStyles();
  const [feedLinkInput, setFeedLinkInput] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Get the feed items, and updtate states.
  async function addNewFeed(e) {
    e.preventDefault();
    if (loading) {
      // Don't do another fetch when previous one hasn't returned.
      console.log('Prevented another fetch');
      return;
    }
    if (feedLinkInput.length < 4) {
      setMessage('Invalid feed link.');
      return;
    }
    setLoading(true);
    dataFetch('feedFromLink', { feedLink: feedLinkInput })
      .then(feedData => {
        setLoading(false);
        if (!feedData.items) {
          if (feedData['message'] === 'Normal Exists') {
            setMessage('Please subscribe to this feed by searching for it. ^');
            return;
          }
          setMessage('Something went wrong in finding the feed');
          return;
        }
        setMessage('');
        dispatch({
          type: 'setCustomPreview',
          payload: {
            name: feedData.title,
            link: feedData.link,
            items: feedData.items,
          },
        });
      })
      .catch(feedFromLinkError => {
        setLoading(false);
        console.log(`${feedFromLinkError} <== feedFromLinkError`);
        setMessage('Something went wrong in finding the feed');
      });
  }
  return (
    <div className={classes.settingContainer}>
      <form className={classes.form} onSubmit={e => addNewFeed(e)}>
        <label htmlFor="feedUrl" className={classes.header3}>
          Add your own feed
        </label>
        <p className={classes.settingsExplanation}>
          Enter the URL of an RSS feed. (This setting is still in{' '}
          <a href="https://github.com/raglandcodes/lw-line-frontend">development</a>)
        </p>
        <div className={classes.inputButtonWrap}>
          <input
            type="text"
            id="feedUrl"
            onFocus={() => deviceDispatch({ type: 'setInputFocused', payload: true })}
            onBlur={() => deviceDispatch({ type: 'setInputFocused', payload: false })}
            className={classes.inputField}
            onChange={e => setFeedLinkInput(e.target.value)}
          />
          <input type="submit" value="Add" className={classes.inputSubmitButton} />
        </div>
        <p className={classes.message}>{message}</p>
        <div>
          {state.customPreview.items ? (
            <SourceBox name={state.customPreview.name} subscribed={false} custom={true} />
          ) : null}
        </div>
        <div className={classes.settingContainer}>
          <div className={classes.header4}>
            You're subscribed to {state.customFeeds.length} custom feed
            {state.subscriptions.length === 1 ? '' : 's'}
          </div>
          {state.customFeeds.map(subscription => (
            <SourceBox
              name={subscription.name}
              key={subscription.name}
              subscribed={true}
              custom={true}
            />
          ))}
        </div>
      </form>
    </div>
  );
}

export default AddYourOwnFeed;
