//React
import React from 'react';
import { Context } from '../Context';

//Components

//Styles
import { settingContainer } from '../styles';
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
  settingContainer: {
    ...settingContainer
  }
});

function AddYourOwnFeed(props) {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles();

  return <div className={classes.settingContainer}></div>;
}

export default AddYourOwnFeed;
