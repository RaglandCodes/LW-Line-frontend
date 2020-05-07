//React
import React, { useState, useEffect } from 'react';
import { Context } from '../Context';
import { useHistory } from 'react-router-dom';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';
import { fonts, colours } from '../styles';

WebFont.load({
  google: {
    families: [fonts.primary, fonts.secondary],
  },
});

const useStyles = createUseStyles({
  ArticleBox: {
    borderBottomWidth: isActive => (isActive ? 2 : 1),
    borderBottomStyle: 'solid',
    borderBottomColor: isActive => (isActive ? colours.blue900 : '#455A64'),
    backgroundColor: colours.surface,
    boxSizing: 'border-box',
    padding: {
      top: 6,
      bottom: 6,
      left: 8,
      right: 8,
    },
    '&:hover': {
      borderBottom: `2px solid ${colours.blue900}`,
      paddingBottom: 5, // prevenet jumping around caused by increased border-width,
    },
    '&:hover $title': {
      //  color: colours.blue900,
      textDecoration: 'underline',
    },
    display: 'flex',
    flexDirection: 'column',
    // margin: 6
    // maxHeight: 88,
    // overflowY: 'hidden',
    // textOverflow: 'ellipsis'
    // whiteSpace: 'nowrap'
  },
  title: {
    fontFamily: fonts.primary,
    fontSize: 15,
    padding: { top: 3 },
    color: isActive => (isActive ? colours.blue900 : '#000'),
  },
  source: {
    fontFamily: fonts.secondary,
    fontSize: 12,
    padding: { top: 2, bottom: 3 },
    color: '#424242',
  },
  description: {
    fontFamily: fonts.primary,
    fontSize: 13,
    margin: { top: 0 },
    color: '#263238',
  },
});
function ArticleBox(item) {
  let { state, dispatch } = React.useContext(Context);
  const [isActive, setIsActive] = useState(false);

  const classes = useStyles(isActive);

  let history = useHistory();

  function trimmedMetaDescription(metaDescription) {
    const metaDescMaxLen = 150;
    if (!metaDescription) {
      return '';
    }
    if (metaDescription.length < metaDescMaxLen) {
      return metaDescription;
    }
    return metaDescription.slice(0, metaDescMaxLen) + '...';
  }

  useEffect(() => {
    if (state.itemPreview.currentPreview.id === item.id) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [state.itemPreview.currentPreview.id, item.id]);

  return (
    <div
      className={classes.ArticleBox}
      onClick={() => {
        if (state.itemPreview.openOnClick) {
          // Show a preview
          if (state.itemPreview.showInSplitScreen) {
            // Show a preview in split screen
            dispatch({ type: 'setPreview', payload: { type: 'preview', id: item.id } });
          } else {
            // Show a preview in new window
            dispatch({ type: 'setPreview', payload: { type: 'preview', id: item.id } });
            history.push(`/item/${item.id}`);
          }
        } else {
          // Show the full site

          if (state.itemPreview.showInSplitScreen) {
            // Show the full site in split screen
            // TODO
          } else {
            // Show the full site in new window
            window.open(item.link);
          }
        }
      }}
    >
      <div className={classes.title}>{item.title}</div>
      <div className={classes.source}>{item.source}</div>
      <div className={classes.description}>{trimmedMetaDescription(item.metaDescription)}</div>
    </div>
  );
}

export default ArticleBox;
