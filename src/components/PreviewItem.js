//React
import React, { useState, useEffect } from 'react';
import { Context } from '../Context';
import { useParams } from 'react-router-dom';

//utils
import { dataFetch } from '../modules/dataFetch';

//Components
import Navigation from './Navigation';

//icons
import { OpenInNew, Share, Bookmark } from '@material-ui/icons';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';
import { header1, header2 } from '../styles';

WebFont.load({
  google: {
    families: [`${header1.fontFamily}:${header1.fontWeight}`, 'Merriweather']
  }
});

const pagePadding = 11;
const useStyles = createUseStyles({
  Preview: state => ({
    overflow: 'scroll',
    gridColumnStart: state.orientation === 'potrait' ? 1 : 2,
    gridColumnEnd: 4,
    gridRowStart: 1,
    gridRowEnd: state.orientation === 'potrait' ? 2 : 3
  }),
  header1: {
    ...header1,
    padding: {
      left: pagePadding,
      right: pagePadding
    }
  },
  header2: {
    ...header2,
    padding: { left: pagePadding, right: pagePadding }
  },
  metaDescription: {
    padding: { left: pagePadding, right: pagePadding },
    fontSize: 17,
    fontFamily: 'Merriweather'
  },
  metaImage: { width: ' 100%' },
  description: {
    padding: { left: pagePadding, right: pagePadding },
    fontFamily: 'Merriweather',
    fontSize: 14
  },
  previewActions: {
    display: 'flex',
    fontSize: 20
  },
  actionIconContainer: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  actionLabel: { fontFamily: 'Lato', fontSize: 15 }
});

function PreviewItem() {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles(state);
  let { id } = useParams();
  if (state.itemPreview.showInSplitScreen) {
    id = state.itemPreview.currentPreview.id;
  }

  let [title, setTitle] = useState('Title is loading');
  let [metaDescription, setMetaDescription] = useState('Description is loading');
  let [metaImage, setMetaImage] = useState('');
  let [description, setDescription] = useState('Description is loading');
  let [link, setLink] = useState('');

  let getFromDatabase = () => {
    console.log('Getting from DB');

    dataFetch('singleItem', { id }).then(jsonRes => {
      setTitle(jsonRes.title);
      setMetaDescription(jsonRes.metaDescription);
      setDescription(jsonRes.description);
      setLink(jsonRes.link);
      setMetaImage(jsonRes.image);
    });
  };

  useEffect(() => {
    if (state.feedItems.length > 0) {
      let itemToShow = state.feedItems.filter(item => item.id === id)[0];
      if (itemToShow) {
        setTitle(itemToShow.title);

        setMetaDescription(itemToShow.metaDescription);
        setDescription(itemToShow.description);
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
        {metaImage ? (
          <img src={metaImage} alt={title} className={classes.metaImage} />
        ) : null}

        <h1 className={classes.header1}>{title}</h1>
        <p className={classes.metaDescription}>{metaDescription}</p>
        <p className={classes.description}>{description}</p>
        <div className={classes.previewActions}>
          <div className={classes.actionIconContainer} onClick={() => window.open(link)}>
            <OpenInNew />
            <span className={classes.actionLabel}>Read story</span>
          </div>
          <div className={classes.actionIconContainer}>
            <Share />
            <span className={classes.actionLabel}>Share</span>
          </div>
          <div className={classes.actionIconContainer}>
            <Bookmark />
            <span className={classes.actionLabel}>Save</span>
          </div>
        </div>
      </div>

      {state.itemPreview.showInSplitScreen ? null : <Navigation />}
    </>
  );
}

export default PreviewItem;
