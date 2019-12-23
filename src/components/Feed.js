//React
import React, { useEffect } from 'react';
import { Context } from '../Context';

//Components
import ArticleBox from './ArticleBox';
import Preview from './Preview';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';

const useStyles = createUseStyles({
  getMoreItemsBtn: {
    margin: 'auto'
  }
});

function Feed() {
  const classes = useStyles();

  let { state, dispatch } = React.useContext(Context);
  useEffect(() => {
    console.log(`${state.subscriptions} <== state.subscriptions\n\n`);
    let queryString = `https://lw-line.glitch.me/getItems/?subscriptions=${state.subscriptions.join(
      'AaNnDd'
    )}`;
    console.log('Feed mounted');

    fetch(queryString)
      .then(res => res.json())
      .then(jsonRes => {
        dispatch({ type: 'setFeed', payload: jsonRes.data });
        dispatch({ type: 'setAfter', payload: jsonRes.after });

        //console.dir(jsonRes);
      })
      .catch(feedFetchError => {
        console.log(`${feedFetchError} <== feedFetchError\n\n`);
      });
  }, []);

  let getMoreItems = () => {
    let queryString = `https://lw-line.glitch.me/getItems/?subscriptions=${state.subscriptions.join(
      'AaNnDd'
    )}&afterRef=${state.after.ref}&afterTs=${state.after.ts}`;

    fetch(queryString)
      .then(res => res.json())
      .then(jsonRes => {
        dispatch({ type: 'appendFeed', payload: jsonRes.data });
        dispatch({ type: 'setAfter', payload: jsonRes.after });

        console.dir(jsonRes);
      });

    console.log(`${queryString} <== queryString\n\n`);
  };
  return (
    <div>
      {state.feedItems.map(item => (
        <ArticleBox key={item.id} {...item} />
      ))}
      {state.previewModal.open ? <Preview /> : null}
      <button
        className={classes.getMoreItemsBtn}
        onClick={() => getMoreItems()}
      >
        Load more stories
      </button>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Feed;
