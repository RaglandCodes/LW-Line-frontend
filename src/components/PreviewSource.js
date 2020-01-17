//React
import React, { useState, useEffect } from 'react';
import { Context } from '../Context';
import { useParams } from 'react-router-dom';

//utils
import { dataFetch } from '../modules/dataFetch';

//Components
import Sheet from './Sheet';
import ArticleBox from './ArticleBox';
import GeneralFeed from './GeneralFeed';

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

  let [errorMessage, setErrorMessage] = useState(null);

  let { sourceName } = useParams();
  useEffect(() => {
    dataFetch('previewSource', { source: sourceName }).then(jsonRes => {
      dispatch({
        type: 'setCurrentFeed',
        payload: { name: jsonRes.title, items: jsonRes.items.data }
      });
      if (jsonRes.items === 'ERROR') {
        setErrorMessage(
          `Couldn't load the preview for ${sourceName}. Sorry for the inconvinience`
        );
      }
    });
  }, []);

  return <GeneralFeed />;
}

export default PreviewSource;
