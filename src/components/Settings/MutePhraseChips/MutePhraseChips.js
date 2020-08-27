//React
import React from 'react';
import { Context } from '../../../Context';

//Components
import MutePhraseChip from './MutePhraseChip';

function MutePhraseChips() {
  let { state, dispatch } = React.useContext(Context);

  return (
    <>
      {state.mutePhrases.map(mutePhrase => (
        <MutePhraseChip mutePhrase={mutePhrase} key={mutePhrase} />
      ))}
    </>
  );
}

export default MutePhraseChips;
