//React
import React, { useState, useEffect } from 'react';
import { Context } from '../Context';
import { useParams } from 'react-router-dom';

//utils
import { dataFetch } from '../modules/dataFetch';

//Components
import Sheet from './Sheet';
import ArticleBox from './ArticleBox';

//Styles
import { createUseStyles } from 'react-jss';

//import WebFont from 'webfontloader';

// WebFont.load({
//   google: {
//     families: ['Merriweather']
//   }
// });

const useStyles = createUseStyles({
  PreviewSource: {
    //zIndex: 4,
    //width: '100%',
    //height: '100%',
    //bottom: 0,
    //height: ' 100%',
    //top: 0,
    //borderRadius: '7px 7px 0 0 ',
    //position: 'fixed',
    //overflowX: 'scroll'
    padding: '0 10px'
  }
});

function PreviewSource(props) {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles(state);

  let [title, setTitle] = useState('Title is loading');
  let [description, setDescription] = useState('Descriprion is loading');
  let [feedItems, setFeedItems] = useState([]);

  let { sourceName } = useParams();
  console.log(`${sourceName} <= sourceName`);
  useEffect(() => {
    dataFetch('previewSource', { source: sourceName }).then(jsonRes => {
      setTitle(jsonRes.title);
      setDescription(jsonRes.about);
      setFeedItems(jsonRes.items.data);
      console.dir(jsonRes);
    });
  }, []);

  return (
    <Sheet page={sourceName}>
      <div className={classes.PreviewSource}>
        <p>{description}</p>
        {feedItems
          ? feedItems.map(item => <ArticleBox key={item.id} {...item} />)
          : feedItems}
      </div>
    </Sheet>
  );
}

export default PreviewSource;
