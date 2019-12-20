//React
import React from 'react';
import { Context } from '../Context';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';

const useStyles = createUseStyles({
  Preview: {
    zIndex: 4,
    width: '100%',
    height: '100%',
    //bottom: 0,
    //height: ' 100%',
    top: 0,
    borderRadius: '7px 7px 0 0 ',
    position: 'fixed',
    overflowX: 'scroll'
  },
  paddingDiv: {
    paddingTop: '30%'
  },
  previewContent: {
    bottom: 0,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 33,
    padding: 5
  },
  description: {
    padding: 4
  }
});

function Preview() {
  const classes = useStyles();
  let { state, dispatch } = React.useContext(Context);

  return (
    <div className={classes.Preview}>
      <div className={classes.paddingDiv}></div>
      <div className={classes.previewContent}>
        <div className={classes.title}>{state.previewModal.title}</div>
        <div className={classes.description}>
          {state.previewModal.description}
        </div>
      </div>
    </div>
  );
}

export default Preview;
