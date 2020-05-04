//React
import React, { useEffect } from 'react';
import { Context } from '../Context';

//Components
import PreviewItem from './PreviewItem';

//Styles
import { createUseStyles } from 'react-jss';
import { colours } from '../styles';

const useStyles = createUseStyles({
  SplitScreenPreview: orientation => ({
    overflowY: 'scroll',
    backgroundColor: colours.background,
    gridRowStart: 1,
    gridRowEnd: orientation === 'potrait' ? 2 : 3,
  }),
});

function SplitScreenPreview(props) {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles(state.orientation);
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
