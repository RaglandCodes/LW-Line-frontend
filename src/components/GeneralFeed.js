//React
import React, { useEffect, useState } from 'react';
import { Context } from '../Context';

//Components
import Sheet from './Sheet';
import ArticleBox from './ArticleBox';
import SplitScreenPreview from './SplitScreenPreview';

//utils
import { dataFetch } from '../modules/dataFetch';

//Styles
import { createUseStyles } from 'react-jss';
import { button } from '../styles';
const useStyles = createUseStyles({
  Feed: {},
  showMoreButton: {
    ...button
  }
});

function GeneralFeed(props) {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles();

  let [errorMessage, setErrorMessage] = useState(null);
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
            dispatch({ type: 'appendCurrentFeed', payload: items.data });
            dispatch({ type: 'setAfter', payload: items.after });
          }
        );
      }
    } else if (state.currentFeed.name !== '') {
      console.log('Fetchinh for' + state.currentFeed.name);

      dataFetch('previewSource', { source: state.currentFeed.name }).then(jsonRes => {
        if (jsonRes.items === 'ERROR') {
          setErrorMessage(
            `An error occured when getting information for ${state.currentFeed.name}`
          );
        } else {
          dispatch({ type: 'appendCurrentFeed', payload: jsonRes.items.data });
        }
      });
    }
  }, [state.currentFeed.name]);

  return (
    <Sheet page={state.currentFeed.name} containsPreviewableContent>
      {errorMessage ? (
        errorMessage
      ) : (
        <>
          <div className={classes.Feed}>
            {state.currentFeed.items.length === 0 ? (
              <>
                Getting items for your feed
                <br />
                Please wait ...
              </>
            ) : (
              state.currentFeed.items.map(item => <ArticleBox key={item.id} {...item} />)
            )}
          </div>
          <button onClick={() => showMore()} className={classes.showMoreButton}>
            Show more{' '}
          </button>
        </>
      )}
    </Sheet>
  );
}

export default GeneralFeed;
