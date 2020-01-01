//React
import React from 'react';
import { Context } from '../Context';
import { Link, useHistory } from 'react-router-dom';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';
import { box, button } from '../styles';

WebFont.load({
  google: {
    families: ['Roboto']
  }
});

const useStyles = createUseStyles({
  SourceBox: {
    // backgroundColor: '#CFD8DC',
    ...box,
    //display: 'inline-block',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',

    //flexDirection: 'column',
    width: '100%',
    padding: 5,
    margin: {
      bottom: 5,
      right: 5
    },
    fontFamily: 'Roboto'
  },
  followButton: {
    backgroundColor: '#263238',
    ...button
  },
  removeButton: {
    backgroundColor: '#455A64',
    borderRadius: 3,
    border: 0,
    color: '#FAFAFA'
  },
  previewButton: {
    backgroundColor: '#37474F',
    ...button
  },
  sourceName: {
    flexGrow: 1
  }
});

function SourceBox(source) {
  const classes = useStyles();

  let { state, dispatch } = React.useContext(Context);
  let history = useHistory();

  return (
    <div className={classes.SourceBox}>
      <div className={classes.sourceName}>{source.name}</div>
      {/* <Link to={{ pathname: `/source/${source.name}` }}> */}
      <button
        className={classes.previewButton}
        onClick={() => history.push(`/source/${source.name}`)}
      >
        Preview
      </button>
      {/* </Link> */}
      {source.subscribed ? (
        <button
          className={classes.removeButton}
          onClick={() =>
            dispatch({ type: 'removeSubscription', payload: source.name })
          }
        >
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
