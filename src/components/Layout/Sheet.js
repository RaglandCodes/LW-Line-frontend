//React
import React from 'react';
import { Context } from '../../Context';
import { DeviceContext } from '../../Context/DeviceContext';

//Components
import Navigation from '../Navigation/Navigation';
import SplitScreenPreview from '../SplitScreenPreview';
import TopBox from '../TopBox';
import Resizer from './Resizer';

//Styles
import { createUseStyles } from 'react-jss';
import { colours } from '../../styles';

const useStyles = createUseStyles({
  Sheet: state => ({
    backgroundColor: colours.background,
    overflow: 'scroll',
    //gridColumnStart: state.orientation === 'potrait' ? 1 : 2,
    gridColumnStart: 'nav-end',
    //gridColumnStart: 2,
    gridColumnEnd:
      state.containsPreviewableContent && state.itemPreview.showInSplitScreen
        ? 'dragger-start'
        : 'preview-end',
    gridRowStart: 1,
    gridRowEnd: 2,
  }),
});

function Sheet(props) {
  let { state, dispatch } = React.useContext(Context);
  let { deviceState, deviceDispatch } = React.useContext(DeviceContext);
  const classes = useStyles({ ...state, ...props, ...deviceState });
  return (
    <>
      <div className={classes.Sheet}>
        <TopBox page={props.page} />
        {props.children}
      </div>

      {state.itemPreview.showInSplitScreen && props.containsPreviewableContent ? (
        <>
          <Resizer />
          <SplitScreenPreview />
        </>
      ) : null}
      <Navigation page={props.page} />
    </>
  );
}

export default Sheet;
