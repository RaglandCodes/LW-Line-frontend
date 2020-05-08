//React
import React from 'react';
import { Context } from '../../../Context';

//Components
import { ReactComponent as CancelIcon } from './CancelIcon.svg';

//Styles
import { createUseStyles } from 'react-jss';
import { colours, fonts } from '../../../styles';
const cancelIconSize = 17;
const useStyles = createUseStyles({
  MutePhraseChip: {
    backgroundColor: colours.surface,
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    margin: 3,
    padding: 3,
    fontSize: 17,
    fontFamily: fonts.secondary,
  },
  cancelIcon: {
    margin: {
      left: 3,
      top: 3,
    },
  },
});

function MutePhraseChip({ mutePhrase }) {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles();

  return (
    <div className={classes.MutePhraseChip}>
      <span className={classes.mutePhrase}>{mutePhrase}</span>

      <CancelIcon
        className={classes.cancelIcon}
        width={cancelIconSize}
        height={cancelIconSize}
        fill={colours.dark}
      />
    </div>
  );
}

export default MutePhraseChip;
