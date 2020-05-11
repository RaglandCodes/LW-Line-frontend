//React
import React, { useState, useEffect, useRef } from 'react';
import { Context } from '../../Context';
import { DeviceContext } from '../../Context/DeviceContext';

//Components

//Styles
import { colours } from '../../styles';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  Resizer: styleProps => ({
    gridColumnStart: 'dragger-start',
    gridColumnEmd: 'dragger-end',

    gridRowStart: 'screen-start',
    gridRowEnd: 'nav-start',

    cursor: 'col-resize',
    display: 'flex',
    backgroundColor: styleProps.dragging ? colours.dark : colours.background2,
  }),
});

function Resizer(props) {
  let { deviceState, deviceDispatch } = React.useContext(DeviceContext);
  const [dragging, setDragging] = useState(false);
  const classes = useStyles({ dragging });
  const resizerElement = useRef(null);

  const handleMouseMove = e => {
    deviceDispatch({
      type: 'setReisezerX',
      payload: e.clientX,
    });
  };
  const handleTouchMove = e => {
    deviceDispatch({
      type: 'setReisezerX',
      payload: Math.round(e.touches[0].clientX),
    });
  };

  useEffect(() => {
    resizerElement.current.addEventListener('mousedown', () => {
      setDragging(true);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', handleMouseMove);
        setDragging(false);
      });
    });

    resizerElement.current.addEventListener('touchstart', () => {
      setDragging(true);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', () => {
        window.removeEventListener('touchmove', handleTouchMove);
        setDragging(false);
      });
    });
  }, []);

  return <div className={classes.Resizer} ref={resizerElement} title="Drag to resize"></div>;
}

export default Resizer;
