//React
import React from 'react';
import { Context } from '../Context';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';
import { header2, header3 } from '../styles';

WebFont.load({
  google: {
    families: [
      `${header2.fontFamily}:${header2.fontWeight}`,
      `${header3.fontFamily}:${header3.fontWeight}`
    ]
  }
});

const useStyles = createUseStyles({
  Navigation: {
    width: '90%',
    margin: 'auto'
  },
  header2: { ...header2 },
  header3: { ...header3 },
  checkboxSettingWrap: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  inputButtonWrap: {
    display: 'flex'
  },
  inputField: {
    flexGrow: 1
  },
  checkBoxInput: {
    flexShrink: 1
  }
});

function Settings() {
  const classes = useStyles();

  let { state, dispatch } = React.useContext(Context);
  return (
    <div className={classes.Navigation}>
      <div className={classes.header2}>Content</div>

      <div className={classes.header3}>Sources</div>

      <div className={classes.inputButtonWrap}>
        <input type="text" className={classes.inputField} />
        <button>Search</button>
      </div>
      <div className={classes.settingsExplanation}>
        Opens AMP page if available
      </div>
      <div className={classes.header3}>Mute phrases</div>

      <div className={classes.inputButtonWrap}>
        <input type="text" className={classes.inputField} />
        <button>Mute</button>
      </div>

      <div className={classes.inputButtonWrap}></div>
      <div className={classes.settingsExplanation}>
        You will not be shown articles containing those phrases
      </div>
      <div className={classes.checkboxSettingWrap}>
        <div className={classes.header3}>Get AMP Page</div>
        <input type="checkbox" className={classes.checkBoxInput} />
      </div>

      <div className={classes.settingsExplanation}>
        Opens AMP page if available
      </div>
      <div className={classes.header2}>Display</div>

      <div className={classes.checkboxSettingWrap}>
        <div className={classes.header3}>Dark Theme</div>{' '}
        <input type="checkbox" className={classes.checkBoxInput} />
      </div>

      <div className={classes.checkboxSettingWrap}>
        <div className={classes.header3}>Directly open external site</div>{' '}
        <input type="checkbox" className={classes.checkBoxInput} />
      </div>
      <div>
        Leaving this unchecked will open a model with some more information.
      </div>
      <div className={classes.checkboxSettingWrap}>
        <div className={classes.header3}>Show descriptions</div>{' '}
        <input type="checkbox" className={classes.checkBoxInput} />
      </div>
      <div className={classes.checkboxSettingWrap}>
        <div className={classes.header3}>Show source</div>{' '}
        <input type="checkbox" className={classes.checkBoxInput} />
      </div>
      <div className={classes.checkboxSettingWrap}>
        <div className={classes.header3}>Show image</div>{' '}
        <input type="checkbox" className={classes.checkBoxInput} />
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Settings;
