//React
import React from 'react';
import { Context } from '';
import { DeviceContext } from '';
//Components

//Styles
import { ThemeContext } from '';
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({});

function NewComponent(props) {
  let { state, dispatch } = React.useContext(Context);
  let { deviceState, deviceDispatch } = React.useContext(DeviceContext);
  const classes = useStyles();

  return <>New Component</>;
}

export default NewComponent;
