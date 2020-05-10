//React
import React, { useState, useEffect, useRef } from 'react';
import { Context } from '../../Context';
import { DeviceContext } from '../../Context/DeviceContext';

//Components

//Styles
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
  Resizer: {
    gridColumnStart: 'dragger-start',
    gridColumnEmd: 'dragger-end',

    gridRowStart: 'screen-start',
    gridRowEnd: 'nav-start',

    cursor: 'col-resize',
    display: 'flex',
    backgroundColor: 'cyan',
  },
});

function Resizer(props) {
  let { deviceState, deviceDispatch } = React.useContext(DeviceContext);
  const classes = useStyles();
  const resizerElement = useRef(null);

  const handleMouseMove = e => {
    deviceDispatch({
      type: 'setReisezerX',
      payload: e.clientX,
    });
  };

  useEffect(() => {
    resizerElement.current.addEventListener('mousedown', () => {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', handleMouseMove);
      });
    });
  }, []);

  return <div className={classes.Resizer} ref={resizerElement}></div>;
}

export default Resizer;
