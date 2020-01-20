//React
import React, { useEffect } from 'react';
import { Context } from '../Context';

//Components
import Sheet from './Sheet';
import ArticleBox from './ArticleBox';
import SplitScreenPreview from './SplitScreenPreview';

//utils
import { dataFetch } from '../modules/dataFetch';

//Styles
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
  Feed: {}
});

function GeneralFeed(props) {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles();
  const showMore = () => {
    if (state.currentFeed.name === 'Feed') {
      dataFetch('getItems', {
        subscriptions: state.subscriptions.join('AaNnDd'),
        afterRef: state.after.ref,
        afterTs: state.after.ts
      }).then(res => {
        dispatch({ type: 'appendCurrentFeed', payload: res.data });
        dispatch({ type: 'setAfter', payload: res.after });
      });
    } else {
    }
  };

  useEffect(() => {
    if (state.currentFeed.name === 'Feed') {
      if (!state.currentFeed.items.length) {
        // Add items automatically only if it's empty
        dataFetch('getItems', { subscriptions: state.subscriptions.join('AaNnDd') }).then(
          items => {
            // dispatch({
            //   type: 'setCurrentFeed',
            //   payload: { name: 'Feed', items: items.data }
            // });
            dispatch({ type: 'appendCurrentFeed', payload: items.data });
            dispatch({ type: 'setAfter', payload: items.after });
          }
        );
      }
    } else if (state.currentFeed.name !== '') {
      dataFetch('previewSource', { source: state.currentFeed.name }).then(jsonRes => {
        // dispatch({
        //   type: 'setCurrentFeed',
        //   payload: { name: jsonRes.title, items: jsonRes.items.data }
        // });
        dispatch({ type: 'appendCurrentFeed', payload: jsonRes.items.data });
        if (jsonRes.items === 'ERROR') {
          // TODO
        }
      });
    }
  }, [state.currentFeed.name]);

  return (
    <Sheet page={state.currentFeed.name} containsPreviewableContent>
      <div className={classes.Feed}>
        {state.currentFeed.items.length === 0 ? (
          <>Loading Please wait</>
        ) : (
          state.currentFeed.items.map(item => <ArticleBox key={item.id} {...item} />)
        )}
      </div>
      <button onClick={() => showMore()}>Show more </button>
    </Sheet>
  );
}

export default GeneralFeed;
