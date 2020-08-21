/*
  Use this Context for device info like service worker, screen sizes, orientation, etc
 */

//React
import React, { useReducer, useEffect } from 'react';
import { Context } from '../Context';

function deviceReducer(deviceState, action) {
  switch (action.type) {
    case 'setOrientation': {
      return {
        ...deviceState,
        orientation: action.payload,
      };
    }

    case 'setInnerWidth': {
      return {
        ...deviceState,
        innerWidth: action.payload,
        feedWidth: 0, // this makes the component send updated width
        previewWidth: 0,
        smallDevice: action.payload < 400 || deviceState.innerHeight < 600,
      };
    }

    case 'setInnerHeight': {
      return {
        ...deviceState,
        recentHeigtJank: Math.abs(deviceState.innerHeight - action.payload) > 111, // used along with inputFocused to guess if mobile keyboard was opened
        innerHeight: action.payload,
        smallDevice: deviceState.innerWidth < 400 || action.payload < 600,
      };
    }

    case 'setFeedWidth': {
      return {
        ...deviceState,
        feedWidth: action.payload,
      };
    }

    case 'setPreviewWidth': {
      return {
        ...deviceState,
        previewWidth: action.payload,
      };
    }

    case 'setReisezerX': {
      if (!deviceState.resizerX) {
        return { ...deviceState, resizerX: action.payload };
      }
      let delta = action.payload - deviceState.resizerX;
      console.log(`${delta} <== delta   == ${action.payload} - ${deviceState.resizerX}`);
      return {
        ...deviceState,
        feedWidth: deviceState.feedWidth + delta,
        previewWidth: deviceState.previewWidth - delta,
        resizerX: action.payload,
      };
    }

    case 'setInputFocused': {
      return {
        ...deviceState,
        inputFocused: action.payload,
      };
    }
    default: {
      console.log(`${action.type} <== unknown action.type in Context`);
      return deviceState;
    }
  }
}

let DeviceContext = React.createContext();

function DeviceContextProvider(props) {
  let { state, dispatch } = React.useContext(Context);

  const [deviceState, deviceDispatch] = useReducer(deviceReducer, {
    orientation: 'potrait',
    smallDevice: false,
    inputFocused: false, // when an inputFocused  && recentHeigtJank, don't show the navigation menu.
    // That's to try to prevent ugly vertical navigation when typing on phones with the on screen keyboard.
  });

  // useEffect(() => {
  //   console.dir(deviceState);
  //   console.info('⬆ Latest global deviceState');
  // }, [deviceState]);

  useEffect(() => {
    deviceDispatch({ type: 'setFeedWidth', payload: 0 });

    deviceDispatch({ type: 'setPreviewWidth', payload: 0 });
  }, [state.itemPreview.showInSplitScreen]);
  return (
    <DeviceContext.Provider value={{ deviceState, deviceDispatch }}>
      {props.children}
    </DeviceContext.Provider>
  );
}

let DeviceContextConsumer = DeviceContext.Consumer;

export { DeviceContext, DeviceContextProvider, DeviceContextConsumer };
