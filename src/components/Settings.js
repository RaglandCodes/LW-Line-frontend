//React
import React, { useState } from 'react';
import { Context } from '../Context';

//utils
import { dataFetch } from '../modules/dataFetch';

//Components
import SourceBox from './SourceBox';
import Sheet from './Sheet';
import Paginator from './Paginator';
import ChooseSources from './ChooseSources';
import AddYourOwnFeed from './AddYourOwnFeed';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';
import {
  header2,
  header3,
  header4,
  button,
  fonts,
  settingContainer,
  settingsExplanation,
  input,
  inputSubmitButton
} from '../styles';

WebFont.load({
  google: {
    families: [
      `${header2.fontFamily}:${header2.fontWeight}`,
      `${header3.fontFamily}:${header3.fontWeight}`,
      `${header4.fontFamily}:${header4.fontWeight}`,
      fonts.primary
    ]
  }
});
const padded = {
  padding: {
    left: 15,
    right: 15
  }
};
const useStyles = createUseStyles({
  Settings: {
    ...padded
  },
  header2: {
    ...header2
    //...padded
  },
  header3: {
    ...header3
    //...padded
  },
  header4: {
    ...header4,
    margin: {
      top: 35
    }
  },
  checkboxSettingWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    //backgroundColor: '#F5F5F5',
    margin: {
      top: 5
    }
  },
  inputButtonWrap: {
    display: 'flex',
    flexDirection: 'row',
    margin: {
      top: 3
    }
  },
  settingsExplanation: {
    ...settingsExplanation
  },
  form: {
    flexGrow: 1
  },
  inputField: {
    flexGrow: 1,

    ...input
  },
  inputSubmitButton: {
    ...inputSubmitButton
  },
  checkBoxInput: {
    flexShrink: 1
  },
  showMoreBtn: {
    ...button,
    color: 'black',
    float: 'right'
  },
  settingContainer: {
    ...settingContainer
  },
  version: {}
});

function Settings() {
  let { state, dispatch } = React.useContext(Context);
  const classes = useStyles(state);

  let [sourceSearchResults, setSourceSearchResults] = useState([]);
  let [sourceSearchInput, setsourceSearchInput] = useState('');
  const [muteInput, setMuteInput] = useState('');
  const [fetchingFeeds, setFetchingFeeds] = useState(false);

  let searchSources = e => {
    e.preventDefault();

    // Call server with  sourceSearchInput and setSourceSearchResults

    if (!sourceSearchInput.length) {
      return;
    }
    if (fetchingFeeds) {
      return;
    }
    setFetchingFeeds(true);
    dataFetch('getSources', { searchTerm: sourceSearchInput })
      .then(jsonRes => {
        setSourceSearchResults(jsonRes);
        setFetchingFeeds(false);
      })
      .catch(searchError => {
        console.log(`${searchError} <== searchError\n\n`);
        setFetchingFeeds(false);
      });
  };

  let addNewMutePhrase = e => {
    e.preventDefault();
  };

  return (
    <Sheet page="Settings" className={classes.Settings}>
      <div className={classes.Settings}>
        <div className={classes.header2}>Content</div>
        {/* ------ ----- ----- Feeds ----- ----- ----- */}
        <div className={classes.settingContainer}>
          <form onSubmit={e => searchSources(e)} className={classes.form}>
            <label htmlFor="searchFeeds" className={classes.header3}>
              Search for feeds
            </label>
            <div className={classes.inputButtonWrap}>
              <input
                type="text"
                id="searchFeeds"
                className={classes.inputField}
                onChange={e => setsourceSearchInput(e.target.value)}
                onFocus={() => dispatch({ type: 'setInputFocused', payload: true })}
                onBlur={() => dispatch({ type: 'setInputFocused', payload: false })}
              />
              <input
                type="submit"
                value="Search"
                className={classes.inputSubmitButton}
                disabled={fetchingFeeds}
              />
            </div>
          </form>
          <Paginator
            items={sourceSearchResults
              .filter(result => state.subscriptions.indexOf(result.feed) === -1)
              .map(result => (
                <SourceBox name={result.feed} subscribed={false} key={result.feed} />
              ))}
            showMoreMessage="More feeds"
          />
        </div>
        <ChooseSources />
        <AddYourOwnFeed />
        {/* ))} */}
        {/* ------ ----- ----- Mute ----- ----- ----- */}
        <div className={classes.settingContainer}>
          <label htmlFor="mutePhrases" className={classes.header3}>
            Mute phrases
          </label>
          <form onSubmit={e => addNewMutePhrase(e)}>
            <div className={classes.inputButtonWrap}>
              <input
                type="text"
                id="mutePhrases"
                className={classes.inputField}
                onChange={e => setMuteInput(e.target.value)}
                onFocus={() => dispatch({ type: 'setInputFocused', payload: true })}
                onBlur={() => dispatch({ type: 'setInputFocused', payload: false })}
              />
              <input type="submit" value="Mute" className={classes.inputSubmitButton} />
            </div>
          </form>
          <div className={classes.inputButtonWrap}></div>
          <p className={classes.settingsExplanation}>
            You will not be shown articles containing those phrases. (This setting is still in{' '}
            <a href="https://github.com/raglandcodes/lw-line-frontend">development</a>)
          </p>
        </div>
        {/* <hr /> */}
        <div className={classes.header2}>Display</div>
        <div className={classes.settingContainer}>
          <div className={classes.checkboxSettingWrap}>
            <label htmlFor="darkThemecb" className={classes.header3}>
              Dark Theme
            </label>
            <input
              type="checkbox"
              id="darkThemecb"
              checked={state.theme === 'dark'}
              onChange={() => dispatch({ type: 'toggleTheme', action: '' })}
              className={classes.checkBoxInput}
            />
          </div>
          <p className={classes.settingsExplanation}>
            Only light theme is available for now. You can{' '}
            <a href="https://github.com/RaglandCodes/LW-Line-frontend">fork this project</a> and
            make your own theme.
          </p>
        </div>
        <div className={classes.settingContainer}>
          <div className={classes.checkboxSettingWrap}>
            <label htmlFor="show-preview-cb" className={classes.header3}>
              Show preview
            </label>
            <input
              type="checkbox"
              id="show-preview-cb"
              className={classes.checkBoxInput}
              onChange={() => dispatch({ type: 'toggleShowPreview', action: '' })}
              checked={state.itemPreview.openOnClick}
            />
          </div>
          <p className={classes.settingsExplanation}>
            Check this to see just a part of the story before choosing to view the entire site
          </p>
        </div>
        <div className={classes.settingContainer}>
          <div className={classes.checkboxSettingWrap}>
            <label htmlFor="split-screen-cb" className={classes.header3}>
              Split screen
            </label>
            <input
              type="checkbox"
              id="split-screen-cb"
              className={classes.checkBoxInput}
              onChange={() => dispatch({ type: 'toggleSplitScreen', action: '' })}
              checked={state.itemPreview.showInSplitScreen}
            />
          </div>
          <p className={classes.settingsExplanation}>
            Read the story without leaving the page. Recomended to use only on larger screens.
          </p>
        </div>
        {/* <div className={classes.checkboxSettingWrap}>
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
        </div> */}
        <br />
        <br />
        <br />
        <br />
        <span className={classes.version}>Version 0.1.15</span>
      </div>
    </Sheet>
  );
}

export default Settings;
