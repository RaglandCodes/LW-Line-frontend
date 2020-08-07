//React
import React from 'react';
import { Context } from '../Context';
import { Link, useHistory } from 'react-router-dom';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';
import { box, button, colours, fonts } from '../styles';

WebFont.load({
  google: {
    families: [fonts.secondary],
  },
});

const useStyles = createUseStyles({
  SourceBox: {
    ...box,

    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    backgroundColor: colours.surface,

    padding: 5,
    margin: '5px auto',
    fontFamily: fonts.secondary,
  },
  followButton: {
    ...button,
    backgroundColor: '#263238',
    color: 'white',
  },
  removeButton: {
    ...button,
    backgroundColor: '#455A64',
    color: '#FAFAFA',
  },
  previewButton: {
    ...button,
    color: 'white',
    backgroundColor: '#37474F',
  },
  sourceName: {
    flexGrow: 1,
    fontSize: 16,
  },
});

function SourceBox(source) {
  const classes = useStyles();
  let { state, dispatch } = React.useContext(Context);
  let history = useHistory();
  return (
    <div className={classes.SourceBox}>
      <div className={classes.sourceName}>{source.name}</div>

      <button
        className={classes.previewButton}
        onClick={() => history.push(`/source/${source.name}`)}
      >
        Preview
      </button>

      {source.subscribed ? (
        <button
          className={classes.removeButton}
          onClick={() => {
            dispatch({ type: 'removeSubscription', payload: source.name });
          }}
        >
          Remove
        </button>
      ) : (
        <button
          className={classes.followButton}
          onClick={() => {
            if (source.custom) {
              dispatch({ type: 'followCustomPreview', payload: {} });
              dispatch({ type: 'setCustomPreview', payload: {} });
            } else {
              console.log('doing regular subscription');
              dispatch({ type: 'appendSubscription', payload: source.name });
            }
          }}
        >
          Follow
        </button>
      )}
    </div>
  );
}

export default SourceBox;
