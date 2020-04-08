//React
import React, { useEffect } from 'react';
import { Context } from '../Context';

//Components
import PreviewItem from './PreviewItem';

//Styles
import { createUseStyles } from 'react-jss';
import { colours } from '../styles';

const useStyles = createUseStyles({
  SplitScreenPreview: {
    height: '100%',

    overflowY: 'scroll',
    //gridArea: `1/3/4/4`,
    backgroundColor: colours.background
  }
});

function SplitScreenPreview(props) {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles();
  useEffect(() => {
    return () => {
      dispatch({ type: 'setPreview', payload: { type: '', id: '' } });
    };
  }, []);
  return (
    <div className={classes.SplitScreenPreview}>
      {state.itemPreview.currentPreview.id === '' ? (
        <p>Please choose an item to view it here</p>
      ) : (
        <PreviewItem />
      )}
    </div>
  );
}

export default SplitScreenPreview;
