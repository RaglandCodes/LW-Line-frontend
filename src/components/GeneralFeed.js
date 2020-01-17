//React
import React, { useEffect } from 'react';
import { Context } from '../Context';

//Components
import Sheet from './Sheet';
import ArticleBox from './ArticleBox';
import SplitScreenPreview from './SplitScreenPreview';

//Styles
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
  Feed: {}
});

function GeneralFeed(props) {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles();
  useEffect(() => {
    return () => {
      dispatch({ type: 'setCurrentFeed', payload: { name: '', items: [] } });
    };
  }, []);
  return (
    <Sheet page={state.currentFeed.name} containsPreviewableContent>
      <div className={classes.Feed}>
        {state.currentFeed.name === '' ? (
          <>Loading Please wait</>
        ) : (
          state.currentFeed.items.map(item => <ArticleBox key={item.id} {...item} />)
        )}
      </div>
    </Sheet>
  );
}

export default GeneralFeed;
