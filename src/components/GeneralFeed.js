//React
import React, { useEffect, useState, useRef } from 'react';
import { Context } from '../Context';
import { DeviceContext } from '../Context/DeviceContext';

//Components
import Sheet from './Layout/Sheet';
import ArticleBox from './ArticleBox';

//utils
import { dataFetch } from '../modules/dataFetch';

//Styles
import { createUseStyles } from 'react-jss';
import { button } from '../styles';
const useStyles = createUseStyles({
  Feed: {},
  ArticleBoxGrid: styleProps => {
    let gridColWidth = 300;
    if (styleProps.feedWidth < 333) {
      gridColWidth = styleProps.feedWidth - 16;
    }
    return {
      padding: 0,
      maring: 0,
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(${gridColWidth}px, 1fr))`,
      gridGap: 6,
    };
  },
  showMoreButton: {
    ...button,
  },
});

function GeneralFeed(props) {
  let { state, dispatch } = React.useContext(Context);
  let { deviceState, deviceDispatch } = React.useContext(DeviceContext);
  const classes = useStyles({ feedWidth: deviceState.feedWidth });

  let [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const feedElement = useRef(null);
  const showMore = () => {
    console.log('show more clicked');

    setLoading(true);
    if (state.currentFeed.name === 'Feed') {
      // This happens when user clicks the "Show more" button when reading from HOME feed
      dataFetch('getItems', {
        subscriptions: JSON.stringify(state.subscriptions.concat(state.customSubscriptions)),
        after: JSON.stringify(state.after),
      })
        .then(res => {
          setLoading(false);
          dispatch({ type: 'appendCurrentFeed', payload: res.data });
          dispatch({ type: 'setAfter', payload: res.after });
        })
        .catch(e => {
          setLoading(false);
          console.error(e);
        });
    } else {
      // This happens when user clicks the "Show more" button when reading from 1 feed (preview Feed)
      dataFetch('getItems', {
        subscriptions: JSON.stringify([state.currentFeed.name]),
        after: JSON.stringify(state.currentFeed.after),
      })
        .then(res => {
          setLoading(false);
          dispatch({ type: 'appendCurrentFeed', payload: res.data });
          dispatch({ type: 'setCurrentFeedAfter', payload: res.after });
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
          setErrorMessage(`An error occured when getting more items for ${state.currentFeed.name}`);
        });
    }
  };

  useEffect(() => {
    if (state.currentFeed.name === 'Feed') {
      if (!state.currentFeed.items.length) {
        setLoading(true);
        // Add items automatically only if it's empty
        dataFetch('getItems', {
          subscriptions: JSON.stringify(state.subscriptions.concat(state.customSubscriptions)),
        })
          .then(items => {
            setLoading(false);
            dispatch({ type: 'appendCurrentFeed', payload: items.data });
            console.dir(items.after);
            console.log('^items.after^');

            dispatch({ type: 'setAfter', payload: items.after });
          })
          .catch(e => {
            setLoading(false);
            setErrorMessage("Couldn't get items for your feed");
            console.error(e);
          });
      }
    } else if (state.currentFeed.name !== '' && !state.currentFeed.items.length) {
      setLoading(true);

      dataFetch('previewFeed', { feed: state.currentFeed.name })
        .then(jsonRes => {
          setLoading(false);
          dispatch({
            type: 'appendCurrentFeed',
            payload: jsonRes.feed.items,
          });
          dispatch({
            type: 'setCurrentFeedAfter',
            payload: jsonRes.feed.after,
          });
        })
        .catch(e => {
          setLoading(false);
          console.error(e);
          setErrorMessage(
            `An error occured when getting information for ${state.currentFeed.name}`,
          );
        });
    }
  }, [state.currentFeed.name]);

  useEffect(() => {
    if (!deviceState.feedWidth) {
      deviceDispatch({
        type: 'setFeedWidth',
        payload: feedElement.current.offsetWidth,
      });
    }
  }, [deviceState]);
  return (
    <Sheet page={state.currentFeed.name} containsPreviewableContent>
      {errorMessage ? (
        errorMessage
      ) : (
        <>
          <div className={classes.Feed} ref={feedElement}>
            {state.currentFeed.items.length === 0 ? (
              <>
                Getting items for your feed
                <br />
                Please wait ...
              </>
            ) : (
              <div className={classes.ArticleBoxGrid}>
                {state.currentFeed.items.map(item => (
                  <ArticleBox key={item.id} {...item} />
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => showMore()}
            className={classes.showMoreButton}
            disabled={loading}
            //disable button when loading to prevent fetching same thing more than once
          >
            Show more
          </button>
        </>
      )}
    </Sheet>
  );
}

export default GeneralFeed;
