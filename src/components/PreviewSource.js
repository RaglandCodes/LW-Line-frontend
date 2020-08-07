//React
import React, { useEffect } from 'react';
import { Context } from '../Context';
import { useParams } from 'react-router-dom';

//Components
import GeneralFeed from './GeneralFeed';

function PreviewSource(props) {
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
        payload: { name: sourceName, items: [] },
      });
    }
  }, []);

  return state.currentFeed.name !== '' &&
    state.currentFeed.name !== 'Feed' &&
    state.currentFeed.name === sourceName ? (
    <GeneralFeed />
  ) : null;
}

export default PreviewSource;
