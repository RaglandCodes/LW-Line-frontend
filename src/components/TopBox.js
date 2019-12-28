//React
import React from 'react';
import { Context } from '../Context';

//import Logo from '../assets/Logo.png';

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
  logo: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: colours.blue,
    padding: '4px 0',
    color: 'white',
    fontFamily: 'Playfair Display'
  },
  logoImg: {
    width: 33,
    height: 33
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
      <div className={classes.currentPage}>{props.page}</div>
    </div>
  );
}

export default TopBox;
