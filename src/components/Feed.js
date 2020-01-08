//React
import React, { useEffect } from 'react';
import { Context } from '../Context';
import { useHistory } from 'react-router-dom';

//Components
import ArticleBox from './ArticleBox';
import Sheet from './Sheet';
import ChooseSources from './ChooseSources';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';
import { button } from '../styles';

const useStyles = createUseStyles({
  getMoreItemsBtn: {
    ...button,
    color: 'black',
    margin: 'auto',
    display: 'block'
  },
  doneBtn: state => ({
    ...button,
    display: state.subscriptions.length === 0 ? 'none' : 'block'
  })
});

function Feed() {
  let { state, dispatch } = React.useContext(Context);
  let history = useHistory();
  const classes = useStyles(state);

  useEffect(() => {
    let queryString = `https://lw-line.glitch.me/getItems/?subscriptions=${state.subscriptions.join(
      'AaNnDd'
    )}`;
    if (state.subscriptions.length > 0 && state.feedItems.length === 0) {
      fetch(queryString)
        .then(res => res.json())
        .then(jsonRes => {
          dispatch({ type: 'setFeed', payload: jsonRes.data });
          dispatch({ type: 'setAfter', payload: jsonRes.after });
        })
        .catch(feedFetchError => {
          console.log(`${feedFetchError} <== feedFetchError\n\n`);
        });
    } else {
      console.log('Deciding not to make network call');
    }
  }, [state.subscriptions]);

  let getMoreItems = () => {
    let queryString = `https://lw-line.glitch.me/getItems/?subscriptions=${state.subscriptions.join(
      'AaNnDd'
    )}&afterRef=${state.after.ref}&afterTs=${state.after.ts}`;

    fetch(queryString)
      .then(res => res.json())
      .then(jsonRes => {
        dispatch({ type: 'appendFeed', payload: jsonRes.data });
        dispatch({ type: 'setAfter', payload: jsonRes.after });
      });
  };
  return (
    <Sheet page="Feed">
      {state.subscriptions.length === 0 ? (
        <>
          <p>
            Welcome! <br />
            You aren't subscribed to anything.
            <br />
            Please subscribe in the{' '}
            <a onClick={() => history.push('/settings')}>settings</a>
          </p>
        </>
      ) : (
        <>
          {state.feedItems.map(item => (
            <ArticleBox key={item.id} {...item} />
          ))}
          <button className={classes.getMoreItemsBtn} onClick={() => getMoreItems()}>
            Load more stories
          </button>
        </>
      )}

      {/* <button className={classes.getMoreItemsBtn} onClick={() => getMoreItems()}>
        Load more stories
      </button> */}
      <br />
      <br />
      <br />
      <br />
    </Sheet>
  );
}

export default Feed;
