//React
import React from 'react';
import { Context } from '../../../Context';

//Components
import MutePhraseChip from './MutePhraseChip';

//Styles
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({});

function MutePhraseChips() {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles();

  return (
    <>
      {state.mutePhrases.map(mutePhrase => (
        <MutePhraseChip mutePhrase={mutePhrase} key={mutePhrase} />
      ))}
    </>
  );
}

export default MutePhraseChips;
