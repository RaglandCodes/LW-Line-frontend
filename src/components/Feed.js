//React
import React, { useEffect } from 'react';
import { Context } from '../Context';

//Components
import ArticleBox from './ArticleBox';
import Preview from './Preview';

//Styles

function Feed() {
  let { state, dispatch } = React.useContext(Context);
  useEffect(() => {
    console.log(`${state.subscriptions} <== state.subscriptions\n\n`);
    let queryString = `http://192.168.1.108:5151/getItems/?subscriptions=${state.subscriptions.join(
      'AaNnDd'
    )}`;

    fetch(queryString)
      .then(res => res.json())
      .then(jsonRes => {
        dispatch({ type: 'setFeed', payload: jsonRes.data });
        dispatch({ type: 'setAfter', payload: jsonRes.after });

        //console.dir(jsonRes);
      });
  }, []);

  let getMoreItems = () => {
    let queryString = `http://192.168.1.108:5151/getItems/?subscriptions=${state.subscriptions.join(
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
      <button onClick={() => getMoreItems()}>Load more stories</button>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Feed;
