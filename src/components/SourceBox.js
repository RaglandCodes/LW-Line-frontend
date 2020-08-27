//React
import React from 'react';
import { Context } from '../Context';
import { Link, useHistory } from 'react-router-dom';

//components
import Button from './Button';

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

      <Button
        component="button"
        value="Preview"
        onClick={() => history.push(`/source/${source.name}`)}
        styleClass="primary"
      />

            {source.subscribed ? (
        <Button
          component="button"
          value="Remove"
          styleClass="primaryLigher"
          onClick={() => {
            dispatch({ type: 'removeSubscription', payload: source.name });
          }}
        />
      ) : (
        <Button
          component="button"
          onClick={() => {
            if (source.custom) {
              dispatch({ type: 'appendCustomSubscription', payload: source.name });
            } else {
              console.log('doing regular subscription');
              dispatch({ type: 'appendSubscription', payload: source.name });
            }
          }}
          styleClass="primaryDarker"
          value="Follow"
        />
      )}
    </div>
  );
}

export default SourceBox;
