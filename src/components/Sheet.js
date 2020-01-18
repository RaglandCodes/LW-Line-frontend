//React
import React from 'react';
import { Context } from '../Context';
import TopBox from './TopBox';

//Components
import Navigation from './Navigation';
import SplitScreenPreview from './SplitScreenPreview';

//Styles
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  Sheet: state => ({
    overflow: 'scroll',

    gridColumnStart: state.orientation === 'potrait' ? 1 : 2,
    gridColumnEnd:
      state.containsPreviewableContent && state.itemPreview.showInSplitScreen ? 3 : 4,
    gridRowStart: 1,
    gridRowEnd: state.orientation === 'potrait' ? 2 : 3

    //padding: '0 10px'
  })
});

function Sheet(props) {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles({ ...state, ...props });
  return (
    <>
      <div className={classes.Sheet}>
        <TopBox page={props.page} />
        {props.children}
      </div>

      {state.itemPreview.showInSplitScreen && props.containsPreviewableContent ? (
        <SplitScreenPreview />
      ) : null}
      <Navigation page={props.page} />
    </>
  );
}

export default Sheet;
