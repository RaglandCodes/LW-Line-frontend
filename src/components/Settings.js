//React
import React, { useState } from 'react';
import { Context } from '../Context';

//utils
import { dataFetch } from '../modules/dataFetch';

//Components
import SourceBox from './SourceBox';
import Sheet from './Sheet';
import ChooseSources from './ChooseSources';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';
import { header2, header3, header4, button } from '../styles';

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
const padded = {
  padding: {
    left: 10,
    right: 10
  }
};
const useStyles = createUseStyles({
  Settings: {
    ...padded
  },
  header2: {
    ...header2
  },
  header3: { ...header3 },
  header4: {
    ...header4,
    margin: {
      top: 35
    }
  },
  checkboxSettingWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    margin: {
      top: 5
    }
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
  },
  showMoreBtn: {
    ...button,
    color: 'black',
    float: 'right'
  }
});

function Settings() {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles(state);

  let [sourceSearchResults, setSourceSearchResults] = useState([]);
  let [sourceSearchInput, setsourceSearchInput] = useState('');

  let searchSources = () => {
    // Call server with  sourceSearchInput and setSourceSearchResults

    dataFetch('getSources', { searchTerm: sourceSearchInput })
      .then(jsonRes => {
        setSourceSearchResults(jsonRes);
      })
      .catch(searchError => {
        console.log(`${searchError} <== searchError\n\n`);
      });
  };
  return (
    <Sheet page="Settings" className={classes.Settings}>
      <div className={classes.Settings}>
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
            <SourceBox name={result.title} subscribed={false} key={result.title} />
          ))}
        <ChooseSources />
        {/* ------ ----- ----- Mute ----- ----- ----- */}

        <div className={classes.header3}>Mute phrases</div>

        <div className={classes.inputButtonWrap}>
          <input type="text" className={classes.inputField} />

          <button>Mute</button>
        </div>

        <div className={classes.inputButtonWrap}></div>
        <p className={classes.settingsExplanation}>
          You will not be shown articles containing those phrases
        </p>

        <hr />
        <div className={classes.header2}>Display</div>

        <div className={classes.checkboxSettingWrap}>
          <div className={classes.header3}>Dark Theme</div>
          <input
            type="checkbox"
            checked={state.theme === 'dark'}
            onChange={() => dispatch({ type: 'toggleTheme', action: '' })}
            className={classes.checkBoxInput}
          />
        </div>
        <p className={classes.settingsExplanation}>
          Only light theme is available for now. You can{' '}
          <a href="https://github.com/RaglandCodes/LW-Line-frontend">fork this project</a>{' '}
          and make your own theme.
        </p>

        <div className={classes.checkboxSettingWrap}>
          <div className={classes.header3}>Show preview</div>
          <input
            type="checkbox"
            className={classes.checkBoxInput}
            onChange={() => dispatch({ type: 'toggleShowPreview', action: '' })}
            checked={state.itemPreview.openOnClick}
          />
        </div>
        <p className={classes.settingsExplanation}>
          Check this to see just a part of the story before choosing to view the entire
          site
        </p>

        <div className={classes.checkboxSettingWrap}>
          <div className={classes.header3}>Split screen</div>
          <input
            type="checkbox"
            className={classes.checkBoxInput}
            onChange={() => dispatch({ type: 'toggleSplitScreen', action: '' })}
            checked={state.itemPreview.showInSplitScreen}
          />
        </div>
        <p className={classes.settingsExplanation}>
          Read the story without leaving the page. Recomended to use only on larger
          screens
        </p>

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
    </Sheet>
  );
}

export default Settings;
