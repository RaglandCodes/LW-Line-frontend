//React
import React from 'react';
import { DeviceContext } from '../../Context/DeviceContext';

//Components
import Text from '../Text';

//Styles
import { ThemeContext } from '../../Context/ThemeContext';
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
  IconButton: styleState => ({
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 0,
    color: styleState.props.active ? styleState.colours.accent : styleState.colours.text2,
    fill: styleState.props.active ? styleState.colours.accent : styleState.colours.text2,
    backgroundColor: 'inherit',
    border: 'none',
    transition: '0.5s',
    '&:focus': {
      //   backgroundColor: 'pink',
    },
    '&:hover': {
      // backgroundColor: 'pink',
    },
    '& svg': {
      alignSelf: 'center',
      width: styleState.smallDevice ? 18 : 30,
      height: styleState.smallDevice ? 18 : 30,
      fill: 'inherit',
    },
  }),
});

function NavIcon(props) {
  let { deviceState, deviceDispatch } = React.useContext(DeviceContext);
  let { themeState, themeDispatch } = React.useContext(ThemeContext);
  const classes = useStyles({ ...themeState, ...deviceState, props });

  return (
    <button className={classes.IconButton} onClick={props.onClick} aria-label={props.label}>
      {props.icon}
      <Text component="span" text={props.label} styleClass={'navIconLabel'} />
    </button>
  );
}

export default NavIcon;
