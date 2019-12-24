//React
import React, { useState, useEffect } from 'react';
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
  // lw: {
  //   display: 'inline',
  //   backgroundColor: 'indigo',
  //   height: 44,
  //   width: 44
  // },
  currentPage: {
    padding: '85px 5px',
    fontSize: 39,
    width: '90%',
    margin: 'auto',
    //fontFamily: 'Lora',
    //fontFamily: 'Playfair Display',
    fontFamily: 'Merriweather',
    //fontFamily: 'PT Serif',
    fontWeight: 400
  }
});
function TopBox() {
  let { state, dispatch } = React.useContext(Context);
  let [displayText, setDisplayText] = useState('LW Line');
  const classes = useStyles();

  useEffect(() => {
    switch (state.currentPage) {
      case 'home':
        setDisplayText('Feed');
        break;
      case 'settings':
        setDisplayText('Settings');
        break;
      default:
        setDisplayText('LW Line');
    }
  }, [state.currentPage]);
  
  return (
    <div className={classes.TopBox}>
      <div className={classes.currentPage}>{displayText}</div>
    </div>
  );
}

export default TopBox;
