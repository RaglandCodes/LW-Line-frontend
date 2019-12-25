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
  Feed: state => ({
    height: '100%',
    overflow: 'auto',
    gridColumnStart: state.orientation === 'potrait' ? 1 : 2,
    gridColumnEnd: 3,
    gridRowStart: 1,
    gridRowEnd: state.orientation === 'potrait' ? 2 : 3
  }),
  getMoreItemsBtn: {
    margin: 'auto'
  }
});

function Feed() {
  let { state, dispatch } = React.useContext(Context);
  console.log(`${state.orientation} <== state.orientation\n\n`);

  const classes = useStyles(state);
  useEffect(() => {
    let queryString = `https://lw-line.glitch.me/getItems/?subscriptions=${state.subscriptions.join(
      'AaNnDd'
    )}`;
    // console.log('Feed mounted');

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
    <div className={classes.Feed}>
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
