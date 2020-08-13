//React
import React from 'react';
import { Context } from '../Context';
import { DeviceContext } from '../Context/DeviceContext';

//Styles
import { createUseStyles } from 'react-jss';
import { ThemeContext } from '../Context/ThemeContext';
const useStyles = createUseStyles({
  header1: styleState => ({
    ...styleState.header1,
  }),
  header2: styleState => ({
    ...styleState.header2,
  }),
  header3: styleState => ({
    ...styleState.header3,
  }),
  header4: styleState => {
    console.log(`${styleState.fonts.primary} <== styleState.fonts.primary\n\n`);

    return {
      ...styleState.header4,
      fontFamily: styleState.fonts.primary,
    };
  },
  pink: {
    color: 'pink',
  },
});

function Text(props) {
  let { state, dispatch } = React.useContext(Context);
  let { deviceState, deviceDispatch } = React.useContext(DeviceContext);
  let { themeState, themeDispatch } = React.useContext(ThemeContext);

  const classes = useStyles({ ...themeState });

  if (props.component === 'h1') {
    return <h1 className={classes[props.styleClass] || classes.header1}>{props.text}</h1>;
  }
  if (props.component === 'h2') {
    return <h2 className={classes[props.styleClass] || classes.header2}>{props.text}</h2>;
  }
  if (props.component === 'h3') {
    return <h3>{props.text}</h3>;
  }
  if (props.component === 'h4') {
    return <h4 className={classes[props.styleClass] || classes.header4}>{props.text}</h4>;
  }
  if (props.component === 'label') {
    return (
      <label className={classes[props.styleClass]} htmlFor={props.for}>
        {props.text}
      </label>
    );
  }

  if (props.component === 'div') {
    return <div className={classes[props.styleClass]}> {props.text}</div>;
  }
}

export default Text;
