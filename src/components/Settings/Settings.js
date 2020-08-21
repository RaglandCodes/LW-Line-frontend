//React
import React, { useState } from 'react';
import { Context } from '../../Context';
import { DeviceContext } from '../../Context/DeviceContext';

//utils
import { dataFetch } from '../../modules/dataFetch';

//Components
import SourceBox from '../SourceBox';
import Sheet from '../Layout/Sheet';
import Paginator from '../Paginator';
import ChooseSources from '../ChooseSources';
import AddYourOwnFeed from '../AddYourOwnFeed';
import MutePhraseChips from './MutePhraseChips/MutePhraseChips';
import Text from '../Text';

//Styles
import { createUseStyles } from 'react-jss';
import { ThemeContext } from '../../Context/ThemeContext';
import {
  button,
  settingContainer,
  settingsExplanation,
  input,
  inputSubmitButton,
} from '../../styles';

// WebFont.load({
//   google: {
//     families: [
//       `${header2.fontFamily}:${header2.fontWeight}`,
//       `${header3.fontFamily}:${header3.fontWeight}`,
//       `${header4.fontFamily}:${header4.fontWeight}`,
//       fonts.primary,
//     ],
//   },
// });

const padded = {
  padding: {
    left: 15,
    right: 15,
  },
};
const useStyles = createUseStyles({
  Settings: {
    ...padded,
  },

  checkboxSettingWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    //backgroundColor: '#F5F5F5',
    margin: {
      top: 5,
    },
  },
  inputButtonWrap: {
    display: 'flex',
    flexDirection: 'row',
    margin: {
      top: 3,
    },
  },
  settingsExplanation: {
    ...settingsExplanation,
  },
  form: {
    flexGrow: 1,
  },
  inputField: {
    flexGrow: 1,

    ...input,
  },
  inputSubmitButton: {
    ...inputSubmitButton,
  },
  checkBoxInput: {
    flexShrink: 1,
  },
  showMoreBtn: {
    ...button,
    color: 'black',
    float: 'right',
  },
  settingContainer: {
    ...settingContainer,
  },
  version: {},
});

function Settings() {
  let { state, dispatch } = React.useContext(Context);
  let { deviceState, deviceDispatch } = React.useContext(DeviceContext);
  let { themeState, themeDispatch } = React.useContext(ThemeContext);

  const classes = useStyles({ ...themeState });

  let [feedSearchResults, setFeedSearchResults] = useState([]);
  let [feedSearchInput, setFeedSearchInput] = useState('');
  let [feedSearchWarning, setFeedSearcWarning] = useState(null);
  const [fetchingFeeds, setFetchingFeeds] = useState(false);

  const [muteInput, setMuteInput] = useState('');

  let searchSources = e => {
    e.preventDefault();

    if (!feedSearchInput.length || feedSearchInput.length < 2) {
      setFeedSearcWarning('Please enter a longer search');
      return;
    }
    if (fetchingFeeds) {
      // prevent  multiple fetches
      setFeedSearcWarning('Please wait... Already searching');
      return;
    }
    setFetchingFeeds(true);
    dataFetch('getFeeds', { searchTerm: feedSearchInput })
      .then(jsonRes => {
        setFeedSearchResults(jsonRes);
        setFetchingFeeds(false);
        setFeedSearcWarning(null);
      })
      .catch(searchError => {
        console.log(`${searchError} <== searchError\n\n`);
        if (searchError === 'Nothing found') {
          // TODO fix this
          setFeedSearcWarning(
            `Nothing found for ${feedSearchInput}. You can add your own feed tough.`,
          );
          return;
        }
        setFeedSearcWarning(`Couldn't search for ${feedSearchInput}`);
        setFetchingFeeds(false);
      });
  };

  let addNewMutePhrase = e => {
    e.preventDefault();
    dispatch({ type: 'appendMutePhrase', payload: [muteInput] });
    setMuteInput('');
  };

  return (
    <Sheet page="Settings" className={classes.Settings}>
      <div className={classes.Settings}>
        <Text component="h2" text="Content" />
        {/* ------ ----- ----- Feeds ----- ----- ----- */}
        <div className={classes.settingContainer}>
          <form onSubmit={e => searchSources(e)} className={classes.form} role="search">
            <Text
              component="label"
              styleClass="header3"
              for="searchFeeds"
              text="Search for feeds"
            />
            <div className={classes.inputButtonWrap}>
              <input
                type="text"
                id="searchFeeds"
                className={classes.inputField}
                onChange={e => setFeedSearchInput(e.target.value)}
                onFocus={() => deviceDispatch({ type: 'setInputFocused', payload: true })}
                onBlur={() => deviceDispatch({ type: 'setInputFocused', payload: false })}
              />
              <input
                type="submit"
                value="Search"
                className={classes.inputSubmitButton}
                disabled={fetchingFeeds}
              />
            </div>
          </form>
          {feedSearchWarning}
          <Paginator
            items={feedSearchResults
              //.filter(result => )
              .map(result => {
                let subscribed = state.subscriptions.indexOf(result.name) > -1;
                return (
                  <SourceBox
                    name={result.name}
                    subscribed={subscribed}
                    key={result.name}
                    custom={false}
                  />
                );
              })}
            showMoreMessage="More feeds"
          />
        </div>
        <ChooseSources />
        <AddYourOwnFeed />
        {/* ))} */}
        {/* ------ ----- ----- Mute ----- ----- ----- */}
        <div className={classes.settingContainer}>
          <Text component="label" styleClass="header3" for="mutePhrases" text="Mute phrases" />
          <form onSubmit={e => addNewMutePhrase(e)}>
            <div className={classes.inputButtonWrap}>
              <input
                type="text"
                id="mutePhrases"
                className={classes.inputField}
                onChange={e => setMuteInput(e.target.value)}
                onFocus={() => deviceDispatch({ type: 'setInputFocused', payload: true })}
                onBlur={() => deviceDispatch({ type: 'setInputFocused', payload: false })}
              />
              <input type="submit" value="Mute" className={classes.inputSubmitButton} />
            </div>
          </form>
          <div className={classes.inputButtonWrap}></div>
          <p className={classes.settingsExplanation}>
            You will not be shown articles containing those phrases. (This setting is still in{' '}
            <a href="https://github.com/raglandcodes/lw-line-frontend">development</a>)
          </p>
          <MutePhraseChips />
        </div>
        {/* <hr /> */}
        <Text component="h2" text="Display" />
        {/* <div className={classes.settingContainer}>
          <div className={classes.checkboxSettingWrap}>
            <label htmlFor="darkThemecb" className={classes.header3}>
              Dark Theme
            </label>
            <input
              type="checkbox"
              id="darkThemecb"
              aria-describedby="darktheme-instructions"
              checked={state.theme === 'dark'}
              onChange={() => dispatch({ type: 'toggleTheme', action: '' })}
              className={classes.checkBoxInput}
            />
          </div>
          <p className={classes.settingsExplanation} id="darktheme-instructions">
            Only light theme is available for now. You can{' '}
            <a href="https://github.com/RaglandCodes/LW-Line-frontend">fork this project</a> and
            make your own theme.
          </p>
        </div> */}
        <div className={classes.settingContainer}>
          <div className={classes.checkboxSettingWrap}>
            <Text
              component="label"
              styleClass="header3"
              for="show-preview-cb"
              text="Show preview"
            />
            <input
              type="checkbox"
              id="show-preview-cb"
              aria-describedby="show-preview-instructions"
              className={classes.checkBoxInput}
              onChange={() => dispatch({ type: 'toggleShowPreview', action: '' })}
              checked={state.itemPreview.openOnClick}
            />
          </div>
          <p className={classes.settingsExplanation} id="show-preview-instructions">
            Check this to see just a part of the story before choosing to view the entire site.
          </p>
        </div>
        <div className={classes.settingContainer}>
          <div className={classes.checkboxSettingWrap}>
            <Text
              component="label"
              styleClass="header3"
              for="split-screen-cb"
              text="Split screen"
            />
            <input
              type="checkbox"
              id="split-screen-cb"
              aria-describedby="split-screen-instructions"
              className={classes.checkBoxInput}
              onChange={() => dispatch({ type: 'toggleSplitScreen', action: '' })}
              checked={state.itemPreview.showInSplitScreen}
            />
          </div>
          <p className={classes.settingsExplanation} id="split-screen-instructions">
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
        <span className={classes.version}>Version 0.2.2</span>
      </div>
    </Sheet>
  );
}

export default Settings;
