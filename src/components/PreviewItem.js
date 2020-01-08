//React
import React, { useState, useEffect } from 'react';
import { Context } from '../Context';
import { useParams } from 'react-router-dom';

//utils
import { dataFetch } from '../modules/dataFetch';

//Components
import Navigation from './Navigation';

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
    // maxWidth: 440,
    // margin: 'auto',
    gridColumnStart: state.orientation === 'potrait' ? 1 : 2,
    gridColumnEnd: 3,
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
  }
});

function PreviewItem() {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles(state);

  let { id } = useParams();
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
      console.log(`${itemToShow} <= itemToShow`);
    } else {
      getFromDatabase();
    }
  }, [state.feedItems]);
  return (
    <>
      <div className={classes.Preview}>
        {metaImage ? (
          <img src={metaImage} alt={title} className={classes.metaImage} />
        ) : null}

        <h1 className={classes.header1}>{title}</h1>
        <p className={classes.metaDescription}>{metaDescription}</p>
        <p className={classes.description}>{description}</p>
        <a onClick={() => window.open(link)}> Read full story</a>
      </div>
      <Navigation />
    </>
  );
}

export default PreviewItem;
