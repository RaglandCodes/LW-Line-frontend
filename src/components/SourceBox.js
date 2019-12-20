//React
import React from 'react';
import { Context } from '../Context';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Roboto']
  }
});

const useStyles = createUseStyles({
  SourceBox: {
    backgroundColor: '#CFD8DC',
    width: '100%',
    boxSizing: 'border-box',
    padding: 5,
    margin: {
      bottom: 5
    },
    fontFamily: 'Roboto'
  },
  followButton: {
    float: 'right',
    border: '1px solid #1E88E5',
    borderRadius: 3,
    backgroundColor: '#1E88E5'
  },
  removeButton: { float: 'right', border: '1px solid #1E88E5' }
});

function SourceBox(source) {
  const classes = useStyles();

  let { state, dispatch } = React.useContext(Context);
  return (
    <div className={classes.SourceBox}>
      {source.name}
      {source.subscribed ? (
        <button
          className={classes.removeButton}
          onClick={() =>
            dispatch({ type: 'removeSubscription', payload: source.name })
          }
        >
          {' '}
          Remove
        </button>
      ) : (
        <button
          className={classes.followButton}
          onClick={() =>
            dispatch({ type: 'appendSubscription', payload: source.name })
          }
        >
          {' '}
          Follow
        </button>
      )}
    </div>
  );
}

export default SourceBox;
