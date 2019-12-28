//React
import React, { useState } from 'react';
import { Context } from '../Context';

//Components

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';

// WebFont.load({
//   google: {
//     families: ['Merriweather']
//   }
// });

const useStyles = createUseStyles({
  PreviewSource: {
    zIndex: 4,
    width: '100%',
    height: '100%',
    //bottom: 0,
    //height: ' 100%',
    top: 0,
    borderRadius: '7px 7px 0 0 ',
    position: 'fixed',
    overflowX: 'scroll'
  }
});

function PreviewSource() {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles(state);
  return <div className={classes.PreviewSource}>Preview Source</div>;
}

export default PreviewSource;
