//React
import React from 'react';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';
import { fonts } from '../styles';

WebFont.load({
  google: {
    families: [fonts.primary]
  }
});

const useStyles = createUseStyles({
  TopBox: {
    //textAlign: 'center',
  },

  currentPage: {
    padding: '85px 5px',
    fontSize: 39,
    width: '90%',
    margin: 'auto',
    fontFamily: fonts.primary,
    fontWeight: 400
  }
});
function TopBox(props) {
  const classes = useStyles();

  return (
    <div className={classes.TopBox}>
      <h1 className={classes.currentPage}>{props.page}</h1>
    </div>
  );
}

export default TopBox;
