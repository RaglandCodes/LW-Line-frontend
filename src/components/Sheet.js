//React
import React, { useEffect } from 'react';
import { Context } from '../Context';
import TopBox from './TopBox';

//Components
import Navigation from './Navigation';

//Styles
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  Sheet: state => ({
    overflow: 'scroll',

    gridColumnStart: state.orientation === 'potrait' ? 1 : 2,
    gridColumnEnd: 3,
    gridRowStart: 1,
    gridRowEnd: state.orientation === 'potrait' ? 2 : 3

    //padding: '0 10px'
  })
});

function Sheet(props) {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles(state);
  return (
    <>
      <div className={classes.Sheet}>
        <TopBox page={props.page} />
        {props.children}
      </div>
      <Navigation page={props.page} />
    </>
  );
}

export default Sheet;
