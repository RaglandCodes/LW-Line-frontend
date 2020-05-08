//React
import React, { useState } from 'react';
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
  let { state, dispatch } = React.useContext(Context);
  let { deviceState, deviceDispatch } = React.useContext(Context);
  const [dragging, setDragging] = useState(false);
  const classes = useStyles();

  const handleMouseDown = e => {
    setDragging(true);
    console.dir(e);
    console.log('^md e');
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = e => {
    console.log(`${e.clientX} <== e.clientX`);
  };

  return (
    <div
      className={classes.Resizer}
      onMouseDown={e => handleMouseDown(e)}
      onMouseUp={() => handleMouseUp()}
      onMouseMove={e => handleMouseMove(e)}
    ></div>
  );
}

export default Resizer;
