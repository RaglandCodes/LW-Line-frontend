//React
import React, { useEffect } from 'react';
import { Context } from '../Context';

//Components
import ArticleBox from './ArticleBox';
import Sheet from './Sheet';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';

const useStyles = createUseStyles({
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
    console.log(`${queryString} <== queryString\n\n`);
    if (state.subscriptions.length > 0) {
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

        console.dir(jsonRes);
      });

    console.log(`${queryString} <== queryString\n\n`);
  };
  return (
    // <div className={classes.Feed}>
    <Sheet page="Feed">
      {state.feedItems.map(item => (
        <ArticleBox key={item.id} {...item} />
      ))}

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
    </Sheet>
    // </div>
  );
}

export default Feed;
