//React
import React from 'react';
import { Context } from '../Context';
import { useHistory } from 'react-router-dom';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Merriweather:300', 'Lato', 'serif', 'Playfair Display']
  }
});

const useStyles = createUseStyles({
  ArticleBox: {
    //borderBottom: '1px solid #1565C0',263238
    borderBottom: '1px solid #455A64',
    backgroundColor: '#F5F5F5',
    width: '95%',
    margin: '5px auto',
    padding: 4
  },
  title: { fontFamily: 'Merriweather', fontSize: 15, padding: { top: 3 } },
  source: {
    fontFamily: 'Lato',
    fontSize: 12,
    padding: { top: 2, bottom: 3 },
    color: '#424242'
  },
  description: {
    fontFamily: 'Merriweather',
    fontSize: 13,
    margin: { top: 0 },
    color: '#263238'
  }
});
function ArticleBox(item) {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles();
  let history = useHistory();
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
            history.push(`/item/${item.id}`);
          }
        } else {
          // Show the full site

          if (state.itemPreview.showInSplitScreen) {
            // Show the full site in split screen
          } else {
            // Show the full site in new window
            window.open(item.link);
          }
        }
      }}
    >
      <div className={classes.title}>{item.title}</div>
      <div className={classes.source}>{item.source}</div>
      <div className={classes.description}>{item.metaDescription}</div>
    </div>
  );
}

export default ArticleBox;
