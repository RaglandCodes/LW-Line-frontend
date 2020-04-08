//React
import React, { useState, useEffect } from 'react';
import { Context } from '../Context';

//Components
import SourceBox from './SourceBox';

//Styles
import {
  settingContainer,
  settingsExplanation,
  input,
  inputSubmitButton,
  header3
} from '../styles';
import { createUseStyles } from 'react-jss';

import { dataFetch } from '../modules/dataFetch';

const useStyles = createUseStyles({
  settingContainer: {
    ...settingContainer
  },
  settingsExplanation: {
    ...settingsExplanation
  },
  message: {
    ...settingsExplanation
  },
  header3: {
    ...header3
  },
  form: {
    flexGrow: 1
  },
  inputField: {
    flexGrow: 1,
    ...input
  },
  inputButtonWrap: {
    display: 'flex'
  },
  inputSubmitButton: {
    ...inputSubmitButton
  }
});

function AddYourOwnFeed(props) {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles();
  const [feedLinkInput, setFeedLinkInput] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchedFeed, setSearchedFeed] = useState();

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
    console.log(`${feedLinkInput} <== feedLinkInput`);
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
        console.dir(feedData);
        console.log('^feedData');
        setSearchedFeed(feedData);
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
            onFocus={() => dispatch({ type: 'setInputFocused', payload: true })}
            onBlur={() => dispatch({ type: 'setInputFocused', payload: false })}
            className={classes.inputField}
            onChange={e => setFeedLinkInput(e.target.value)}
          />
          <input type="submit" value="Add" className={classes.inputSubmitButton} />
        </div>
        <p className={classes.message}>{message}</p>
        <div>
          {searchedFeed ? <SourceBox name={searchedFeed.title} subscribed={false} /> : null}
        </div>
      </form>
    </div>
  );
}

export default AddYourOwnFeed;
