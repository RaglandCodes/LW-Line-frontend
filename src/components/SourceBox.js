//React
import React from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';

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
    display: 'flex',
    padding: 5,
    margin: {
      bottom: 5
    },
    fontFamily: 'Roboto'
  },
  followButton: {
    //float: 'right',
    border: '1px solid #1E88E5',
    borderRadius: 3,
    backgroundColor: '#1E88E5'
  },
  sourceName: {
    flexGrow: 1
  },
  removeButton: { float: 'right', border: '1px solid #1E88E5' }
});

function SourceBox(source) {
  const classes = useStyles();

  let { state, dispatch } = React.useContext(Context);
  return (
    <div className={classes.SourceBox}>
      <div className={classes.sourceName}>{source.name}</div>
      <Link to={{ pathname: `/source/${source.name}` }}>
        <button className={classes.previewButton}>Preview</button>
      </Link>
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
          Follow
        </button>
      )}
    </div>
  );
}

export default SourceBox;
