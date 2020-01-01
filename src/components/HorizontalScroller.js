//React
import React from 'react';
import { Context } from '../Context';

//Styles
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
  HorizontalScroller: {
    //display: 'flex',
    //flexDirection: 'row',

    overflowX: 'scroll',
    overflowY: 'hidden',
    padding: 0
  }
});

function HorizontalScroller(props) {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles();

  return <div className={classes.HorizontalScroller}>{props.children}</div>;
}

export default HorizontalScroller;
