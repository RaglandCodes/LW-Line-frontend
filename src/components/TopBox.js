//React
import React from 'react';
import { Context } from '../Context';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';
import { colours } from '../styles';

WebFont.load({
  google: {
    families: [
      'Merriweather',
      'Lato:700',
      'Playfair Display:400 ',
      'Lora',
      'PT Serif',
      'serif'
    ]
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
    fontFamily: 'Merriweather',
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
