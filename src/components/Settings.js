//React
import React, { useState } from 'react';
import { Context } from '../Context';

//Components
import SourceBox from './SourceBox';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';
import { header2, header3, header4 } from '../styles';

WebFont.load({
  google: {
    families: [
      `${header2.fontFamily}:${header2.fontWeight}`,
      `${header3.fontFamily}:${header3.fontWeight}`,
      `${header4.fontFamily}:${header4.fontWeight}`,
      'Merriweather'
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
  header4: { ...header4 },
  checkboxSettingWrap: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  inputButtonWrap: {
    display: 'flex'
  },
  settingsExplanation: {
    fontFamily: 'Merriweather',
    fontSize: 11,
    fontWeight: 300
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
  let [sourceSearchResults, setSourceSearchResults] = useState([]);
  let [sourceSearchInput, setsourceSearchInput] = useState('');

  let searchSources = () => {
    // Call server with  sourceSearchInput and setSourceSearchResults

    //let searchQuery = `http://localhost:5151/getSources/?searchTerm=${sourceSearchInput}`;
    let searchQuery = `https://lw-line.glitch.me/getSources/?searchTerm=${sourceSearchInput}`;

    fetch(searchQuery)
      .then(res => res.json())
      .then(jsonRes => {
        setSourceSearchResults(jsonRes);
      })
      .catch(searchError => {
        console.log(`${searchError} <== searchError\n\n`);
      });
  };
  return (
    <div className={classes.Navigation}>
      <div className={classes.header2}>Content</div>
      {/* ------ ----- ----- Sources ----- ----- ----- */}
      <div className={classes.header3}>Sources</div>

      <div className={classes.inputButtonWrap}>
        <input
          type="text"
          className={classes.inputField}
          onChange={e => setsourceSearchInput(e.target.value)}
        />
        <button onClick={() => searchSources()}>Search</button>
      </div>
      {sourceSearchResults
        .filter(result => state.subscriptions.indexOf(result.title) === -1)
        .map(result => (
          <SourceBox
            name={result.title}
            subscribed={false}
            key={result.title}
          />
        ))}

      <div className={classes.header4}>You're subscribed to</div>
      {state.subscriptions.map(subscription => (
        <SourceBox name={subscription} key={subscription} subscribed={true} />
      ))}

      {/* ------ ----- ----- Mute ----- ----- ----- */}
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
        <input
          type="checkbox"
          checked={state.theme === 'dark'}
          onClick={dispatch({ type: 'toggleTheme', action: '' })}
          className={classes.checkBoxInput}
        />
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
        <div className={classes.header3}>Show image</div>
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
