//React
import React from 'react';
import { Context } from '../Context';

//Styles
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({});

function NewComponent(props) {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles();

  return <>New Component</>;
}

export default NewComponent;
