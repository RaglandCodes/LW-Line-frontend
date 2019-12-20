//React
import React from 'react';
import { Context } from '../Context';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Merriweather:300', 'Lora', 'serif', 'Playfair Display']
  }
});

const useStyles = createUseStyles({
  ArticleBox: {
    borderBottom: '1px solid #1565C0',
    backgroundColor: '#F5F5F5',
    width: '90%',
    margin: '5px auto',
    padding: 3

    //fontFamily: 'Lora',
  },
  title: { fontFamily: 'Merriweather', fontSize: 15 },
  description: { fontFamily: 'Merriweather', fontSize: 13, margin: { top: 3 } }
});
function ArticleBox(item) {
  const classes = useStyles();
  let { state, dispatch } = React.useContext(Context);

  return (
    <div
      className={classes.ArticleBox}
      onClick={() =>
        state.previewModal.openOnClick
          ? dispatch({
              type: 'togglePreview',
              payload: {
                title: item.title,
                description: item.description,
                image: item.image,
                link: item.link
              }
            })
          : window.open(item.link)
      }
    >
      <div className={classes.title}>{item.title}</div>
      <div className={classes.description}>{item.metaDescription}</div>
    </div>
  );
}

export default ArticleBox;
