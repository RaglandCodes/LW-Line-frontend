//React
import React, { useState, useEffect } from 'react';
import { Context } from '../Context';
import { useParams } from 'react-router-dom';

//Components
import Sheet from './Sheet';
import ArticleBox from './ArticleBox';
//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';

// WebFont.load({
//   google: {
//     families: ['Merriweather']
//   }
// });

const HOST = 'http://localhost:5151';
//const HOST = 'https://lw-line.glitch.me';

const useStyles = createUseStyles({
  PreviewSource: {
    zIndex: 4,
    width: '100%',
    height: '100%',
    //bottom: 0,
    //height: ' 100%',
    top: 0,
    borderRadius: '7px 7px 0 0 ',
    position: 'fixed',
    overflowX: 'scroll'
  }
});

function PreviewSource(props) {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles(state);

  let [title, setTitle] = useState('Title');
  let [description, setDescription] = useState('Descriprion');
  let [feedItems, setFeedItems] = useState([]);

  let { sourceName } = useParams();
  console.log(`${sourceName} <= sourceName`);
  useEffect(() => {
    console.log('effected');

    let previewSourceQuery = `${HOST}/previewSource/?source=${sourceName}`;
    fetch(previewSourceQuery)
      .then(res => res.json())
      .then(jsonRes => {
        setTitle(jsonRes.title);
        setDescription(jsonRes.about);
        setFeedItems(jsonRes.items.data);
        console.dir(jsonRes);
      });
  }, []);

  return (
    <Sheet>
      <div className={classes.PreviewSource}>
        <h1>{title}</h1>
        <p>{description}</p>
        {feedItems.map(item => (
          <ArticleBox key={item.id} {...item} />
        ))}
      </div>
    </Sheet>
  );
}

export default PreviewSource;
