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
    padding: 3,
    fontFamily: 'Merriweather',
    //fontFamily: 'Lora',
    fontSize: 15
  }
});
function ArticleBox(item) {
  const classes = useStyles();
  console.log(`${item.image} <== item.image\n\n`);

  let { state, dispatch } = React.useContext(Context);

  return (
    <div
      className={classes.ArticleBox}
      onClick={() =>
        dispatch({
          type: 'togglePreview',
          payload: {
            title: item.title,
            description: item.description,
            image: item.image,
            link: item.link
          }
        })
      }
    >
      {item.title}
    </div>
  );
}

export default ArticleBox;
