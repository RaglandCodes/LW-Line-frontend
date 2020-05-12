//React
import React, { useState, useEffect } from 'react';
import { Context } from '../Context';
import { DeviceContext } from '../Context/DeviceContext';
import { useParams } from 'react-router-dom';

//utils
import { dataFetch } from '../modules/dataFetch';

//Components
import Navigation from './Navigation/Navigation';

//icons
import { ReactComponent as OpenInNew } from './Navigation/icons/launch.svg';
import { ReactComponent as Share } from './Navigation/icons/share.svg';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';
import { header1, header2, fonts } from '../styles';

WebFont.load({
  google: {
    families: [`${header1.fontFamily}:${header1.fontWeight}`],
  },
});

const pagePadding = 11;

const getGridColumStart = (orientation, showInSplitScreen) => {
  if (orientation === 'potrait') {
    if (showInSplitScreen) {
      return 2;
    }
    return 1;
  }

  //landscape in split screen
  if (showInSplitScreen) {
    return 3;
  }

  //landscape in full screen
  return 2;
};
const useStyles = createUseStyles({
  Preview: state => ({
    overflowY: 'scroll',

    //gridColumnStart: getGridColumStart(state.orientation, state.itemPreview.showInSplitScreen),
    //gridColumnStart: 'preview-start',
    gridColumnStart: 'nav-end', // this may not be good
    gridColumnEnd: 'preview-end',
    gridRowStart: 1,
    gridRowEnd: 2,

    height: '100%',
    //width: '100%',

    display: 'flex',
    flexDirection: 'column',
  }),
  previewContent: {
    flexGrow: 1,
  },
  header1: {
    ...header1,
    padding: {
      left: pagePadding,
      right: pagePadding,
    },
  },
  header2: {
    ...header2,
    padding: { left: pagePadding, right: pagePadding },
  },
  metaDescription: {
    padding: { left: pagePadding, right: pagePadding },
    fontSize: 17,
    fontFamily: fonts.primary,
  },
  metaImage: { width: ' 100%' },
  description: {
    padding: { left: pagePadding, right: pagePadding },
    fontFamily: fonts.primary,
    fontSize: 14,
  },
  contentSnippet: {
    padding: { left: pagePadding, right: pagePadding },
  },
  previewActions: {
    display: 'flex',
    fontSize: 20,
  },
  actionIconContainer: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  actionLabel: { fontFamily: 'Lato', fontSize: 15 },
});

function PreviewItem() {
  let { state, dispatch } = React.useContext(Context);
  let { deviceState, deviceDispatch } = React.useContext(DeviceContext);

  const classes = useStyles({ ...state, ...deviceState });
  let { id } = useParams();

  if (state.itemPreview.showInSplitScreen) {
    id = state.itemPreview.currentPreview.id;
  }

  let [title, setTitle] = useState('Title is loading');
  let [metaDescription, setMetaDescription] = useState('Description is loading');
  let [metaImage, setMetaImage] = useState('');
  let [contentSnippet, setContentSnippet] = useState('');
  let [errorMessage, setErrorMessage] = useState(null);
  let [link, setLink] = useState('');

  let getFromDatabase = () => {
    console.log('Getting from DB');
    if (id === '') {
      // This is to prevent an unnecessary data fetch
      return;
    }
    dataFetch('singleItem', { id })
      .then(jsonRes => {
        if (jsonRes === 'ERROR') {
          setErrorMessage('Error in retriving item');
          return;
        }
        setTitle(jsonRes.title);
        setMetaDescription(jsonRes.metaDescription);
        setContentSnippet(jsonRes.contentSnippet);
        setLink(jsonRes['link']);
        setMetaImage(jsonRes.image);
      })
      .catch(error => {
        console.log(`${error} <== error in previewItem`);
      });
  };

  useEffect(() => {
    if (state.currentFeed.items.length > 0) {
      let itemToShow = state.currentFeed.items.filter(item => item.id === id)[0];
      if (itemToShow) {
        setTitle(itemToShow.title);

        setMetaDescription(itemToShow.metaDescription);
        setLink(itemToShow.link);
        setMetaImage(itemToShow.image);
      } else {
        getFromDatabase();
      }
    } else {
      getFromDatabase();
    }
    // TODO check the dependencies
  }, [state.feedItems, id]);

  return (
    <>
      <div className={classes.Preview}>
        <div className={classes.previewContent}>
          {metaImage ? <img src={metaImage} alt={title} className={classes.metaImage} /> : null}
          <h1 className={classes.header1}>{title}</h1>
          <p className={classes.metaDescription}>{metaDescription}</p>
          <div className={classes.contentSnippet}>
            {contentSnippet ? contentSnippet.split('\n').map(para => <p>{para}</p>) : null}
          </div>
          {errorMessage}
        </div>
        {state.itemPreview.showInSplitScreen ? (
          <div className={classes.previewActions}>
            <div className={classes.actionIconContainer} onClick={() => window.open(link)}>
              <OpenInNew />
              <span className={classes.actionLabel}>Read story</span>
            </div>
            <div
              className={classes.actionIconContainer}
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: title,
                      text: metaDescription,
                      url: link,
                    })
                    .then(() => console.log('Successful share'))
                    .catch(error => console.log('Error sharing', error));
                } else {
                  console.log("can't use native share");
                }
              }}
            >
              <Share />
              <span className={classes.actionLabel}>Share</span>
            </div>
            {/* <div className={classes.actionIconContainer}>
              <Bookmark />
              <span className={classes.actionLabel}>Save</span>
            </div> */}
          </div>
        ) : null}
      </div>

      {state.itemPreview.showInSplitScreen ? null : <Navigation fromPreviewItem storyLink={link} />}
    </>
  );
}

export default PreviewItem;
