//React
import React from 'react';
import { Context } from '../Context';
import { DeviceContext } from '../Context/DeviceContext';
//Components

//Styles
import { ThemeContext } from '../Context/ThemeContext';
import { createUseStyles } from 'react-jss';

const defaultButton = {
  borderRadius: 4,
  border: 0,
  padding: 5,
  fontSize: 14,
  margin: 3,
  color: 'white',
};

const useStyles = createUseStyles({
  input: styleState => ({
    ...defaultButton,
    backgroundColor: styleState.themeState.colours.dark,
    borderRadius: '0 4px 4px 0 ',
    padding: 7,
    margin: 0,
    '&:focus': {
      padding: 5,
      border: `2px solid ${styleState.themeState.colours.accentBright}`,
      backgroundColor: styleState.themeState.colours.accent,
    },
  }),
  primary: styleState => ({
    ...defaultButton,
    backgroundColor: styleState.themeState.colours.dark,
    '&:focus': {
      padding: 3,
      border: `2px solid ${styleState.themeState.colours.accentBright}`,
      backgroundColor: styleState.themeState.colours.accent,
    },
  }),

  primaryDarker: styleState => ({
    ...defaultButton,
    backgroundColor: styleState.themeState.colours.darker,
    '&:focus': {
      padding: 3,
      border: `2px solid ${styleState.themeState.colours.accentBright}`,
      backgroundColor: styleState.themeState.colours.accent,
    },
  }),
  primaryLigher: styleState => ({
    ...defaultButton,
    backgroundColor: styleState.themeState.colours.lessDark,
    '&:focus': {
      padding: 3,
      border: `2px solid ${styleState.themeState.colours.accentBright}`,
      backgroundColor: styleState.themeState.colours.accent,
    },
  }),
});

function Button(props) {
  let { state, dispatch } = React.useContext(Context);
  let { deviceState, deviceDispatch } = React.useContext(DeviceContext);
  let { themeState, themeDispatch } = React.useContext(ThemeContext);
  const classes = useStyles({ themeState });

  if (props.component === 'input') {
    return (
      <input
        type={props.type}
        value={props.value}
        className={classes[props.styleClass]}
        disabled={props.disabled}
      />
    );
  }
  if (props.component === 'button') {
    return (
      <button
        className={classes[props.styleClass]}
        className={classes[props.styleClass]}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
  }
  return <>New Component</>;
}

export default Button;
