//React
import React, { useState, useEffect } from 'react';
import { Context } from '../Context';
import { useParams } from 'react-router-dom';

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
  let [metaDescription, setMetaDescription] = useState(
    'Description is loading'
  );
  let [description, setDescription] = useState('Description is loading');
  let [link, setLink] = useState('');

  useEffect(() => {
    if (state.feedItems.length > 0) {
      let itemToShow = state.feedItems.filter(item => item.id === id)[0];

      setTitle(itemToShow.title);
      setMetaDescription(itemToShow.metaDescription);
      setDescription(itemToShow.description);
      setLink(itemToShow.link);
    } else {
      // TODO get from server
      setTitle('Not found');
      setMetaDescription('Not found');
      setDescription('Not found');
      setLink('Not found');
    }
  }, [state.feedItems]);
  return (
    <>
      <div className={classes.Preview}>
        <h1 className={classes.header1}>{title}</h1>
        <p className={classes.metaDescription}>{metaDescription}</p>
        <p className={classes.description}>{description}</p>
        <p onClick={() => window.open(link)}> Read full story</p>
      </div>
      <Navigation />
    </>
  );
}

export default PreviewItem;
