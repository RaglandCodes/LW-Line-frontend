//React
import React, { useRef, useEffect } from 'react';
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
    fontSize: 17,
    fontFamily: fonts.secondary,
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'stretch',

    margin: 3,
    padding: 3,

    overflow: 'hidden',
    whiteSpace: 'nowrap',

    animationName: '$fadeIn',
    animationDuration: 1000,
    animationFillMode: 'forwards',
  },
  cancelIcon: {
    margin: {
      left: 3,
      top: 2,
    },
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
});

function MutePhraseChip({ mutePhrase }) {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles();
  const chipElement = useRef(null);
  const removeMutePhrase = () => {
    let currentWidth = chipElement.current.offsetWidth - 6;
    let fadeOut = chipElement.current.animate([{ width: `${currentWidth}px` }, { width: '0' }], {
      duration: 333,
      fill: 'forwards',
    });

    fadeOut.onfinish = () => {
      dispatch({
        type: 'removeMutePhrase',
        payload: mutePhrase,
      });
    };
  };

  return (
    <div className={classes.MutePhraseChip} ref={chipElement}>
      <span className={classes.mutePhrase}>{mutePhrase}</span>

      <CancelIcon
        onClick={() => removeMutePhrase()}
        className={classes.cancelIcon}
        width={cancelIconSize}
        height={cancelIconSize}
        fill={colours.dark}
      />
    </div>
  );
}

export default MutePhraseChip;
