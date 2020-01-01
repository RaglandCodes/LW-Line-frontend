//React
import React, { useEffect, useState } from 'react';
import { Context } from '../Context';

//Styles
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
  Paginator: {}
});

function Paginator(props) {
  let { state, dispatch } = React.useContext(Context);
  let [propsChildren, setPropsChildren] = useState([]);

  const classes = useStyles();
  useEffect(() => {
    console.log(`${props.children.length} <== props.children.length\n\n`);
    console.log(`${props.children} <== props.children\n\n`);
  }, []);
  return <div className={classes.Paginator}>{props.children}</div>;
}

export default Paginator;
