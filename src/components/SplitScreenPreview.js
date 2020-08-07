//React
import React, { useEffect, useRef } from 'react';
import { Context } from '../Context';
import { DeviceContext } from '../Context/DeviceContext';

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
    gridColumnStart: 'preview-start',
    gridColumnEnd: 'preview-end',
    gridRowEnd: orientation === 'potrait' ? 2 : 3,

    // display: 'flex',
  }),
});

function SplitScreenPreview(props) {
  let { state, dispatch } = React.useContext(Context);
  let { deviceState, deviceDispatch } = React.useContext(DeviceContext);

  const classes = useStyles(deviceState.orientation);
  const previewElement = useRef(null);

  useEffect(() => {
    if (!deviceState.previewWidth) {
      deviceDispatch({
        type: 'setPreviewWidth',
        payload: previewElement.current.offsetWidth,
      });
    }
  }, [deviceState.previewWidth]);

  useEffect(() => {
    return () => {
      //TODO fix this
      console.log('cleaned up');
    };
  }, []);

  return (
    <div className={classes.SplitScreenPreview} ref={previewElement}>
      {state.itemPreview.currentPreview.id === '' ? (
        <p>Please choose an item to view it here</p>
      ) : (
        <PreviewItem />
      )}
    </div>
  );
}

export default SplitScreenPreview;
