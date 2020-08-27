//React
import React, { useEffect, useRef } from 'react';
import { Context } from '../Context';
import { DeviceContext } from '../Context/DeviceContext';

//Components
import PreviewItem from './PreviewItem';
import Text from './Text';

//Styles
import { createUseStyles } from 'react-jss';
import { colours } from '../styles';

//images
import logo from './images/logo192.png';

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
  blankPreview: {
    height:'100%',
    display: 'flex',
    //backgroundColor: 'cyan',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center'
  },
  logo:{
    opacity:0.4,
    maxWidth: '90%'
  }
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
      // Remove old preview on unmount
      dispatch({ type: 'setPreview', payload: { type: 'preview', id: '' } });
    };
  }, []);

  return (
    <div className={classes.SplitScreenPreview} ref={previewElement}>
      {state.itemPreview.currentPreview.id === '' ? (
        <div className={classes.blankPreview}>
        <img src={logo} alt="LW Line Logo" className={classes.logo}/>
          <Text component="paragraph" text="Please choose an item from the feed to see the preview here" styleClass="uninitialisedPreview"/>
        </div>
      ) : (
        <PreviewItem />
      )}
    </div>
  );
}

export default SplitScreenPreview;
