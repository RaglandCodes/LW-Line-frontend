//React
import React, { useState } from 'react';
import { Context } from '../Context';

//Components

//Styles
import { settingContainer, header3 } from '../styles';
import { createUseStyles } from 'react-jss';

import { dataFetch } from '../modules/dataFetch';

const useStyles = createUseStyles({
  settingContainer: {
    ...settingContainer,
  },
  header3: {
    ...header3,
  },
  form: {
    flexGrow: 1,
  },
  inputField: {
    flexGrow: 1,
  },
  inputButtonWrap: {
    display: 'flex',
  },
});

function AddYourOwnFeed(props) {
  //let { state, dispatch } = React.useContext(Context);
  const classes = useStyles();
  const [feedLinkInput, setFeedLinkInput] = useState('');
  const [message, setMessage] = useState('');

  // Get the feed items, and updtate states.
  async function addNewFeed(e) {
    e.preventDefault();
    dataFetch('feedFromLink', { feedLink: feedLinkInput })
      .then((feedData) => {
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
      })
      .catch((feedFromLinkError) => {
        console.log(`${feedFromLinkError} <== feedFromLinkError`);
        setMessage('Something went wrong in finding the feed');
      });
  }
  return (
    <div className={classes.settingContainer}>
      <form className={classes.form} onSubmit={(e) => addNewFeed(e)}>
        <label htmlFor="feedUrl" className={classes.header3}>
          Add your own feed
        </label>
        <p className={classes.settingsExplanation}>Enter the URL of an RSS feed</p>
        <div className={classes.inputButtonWrap}>
          <input
            type="text"
            id="feedUrl"
            className={classes.inputField}
            onChange={(e) => setFeedLinkInput(e.target.value)}
          />
          <input type="submit" value="Add" />
        </div>
        <div className={classes.message}>{message}</div>
      </form>
    </div>
  );
}

export default AddYourOwnFeed;
