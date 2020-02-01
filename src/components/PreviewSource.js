//React
import React, { useEffect } from 'react';
import { Context } from '../Context';
import { useParams } from 'react-router-dom';

//Components
import GeneralFeed from './GeneralFeed';

//Styles
import { createUseStyles } from 'react-jss';

function PreviewSource(props) {
  console.log('in preview source');

  let { state, dispatch } = React.useContext(Context);

  let { sourceName } = useParams();

  useEffect(() => {
    if (
      sourceName !== state.currentFeed.name ||
      state.currentFeed.name === 'Feed' ||
      state.currentFeed.name === ''
    ) {
      dispatch({
        type: 'setCurrentFeed',
        payload: { name: sourceName, items: [] }
      });
      console.log(`clearing items from the PreviewSource dispatch`);
      console.log(`${state.currentFeed.items.length} <= state.currentFeed.items.length`);
      console.log(`${state.currentFeed.name} <= state.currentFeed.nn`);
    }
  }, []);

  return state.currentFeed.name !== '' &&
    state.currentFeed.name !== 'Feed' &&
    state.currentFeed.name === sourceName ? (
    <GeneralFeed />
  ) : null;
  // return state.currentFeed.name !== '' && state.currentFeed.name !== 'Feed' ? (
  //   <GeneralFeed />
  // ) : null;
}

export default PreviewSource;
