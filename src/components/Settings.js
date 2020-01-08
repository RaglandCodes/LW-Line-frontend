//React
import React, { useState, useEffect } from 'react';
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
        {/* <h4 className={classes.header4}>Tech</h4>
        {techSources.slice(0, techShowing).map(source => (
          <SourceBox name={source.title} />
        ))}
        <button
          className={classes.showMoreBtn}
          style={{ display: techShowing > techSources.length ? 'none' : 'block' }}
          onClick={() => {
            setTechShowing(techShowing + 3);
          }}
        >
          Show more
        </button>
        <h4 className={classes.header4}>News</h4>

        {newsSources.slice(0, newsShowing).map(source => (
          <SourceBox name={source.title} />
        ))}
        <button
          className={classes.showMoreBtn}
          style={{ display: newsShowing > newsSources.length ? 'none' : 'block' }}
          onClick={() => {
            setNewsShowing(newsShowing + 3);
          }}
        >
          Show more
        </button>
        <h4 className={classes.header4}>Design</h4>
        {designSources.map(source => (
          <SourceBox name={source.title} />
        ))}

        <div className={classes.header4}>You're subscribed to</div>
        {state.subscriptions.map(subscription => (
          <SourceBox name={subscription} key={subscription} subscribed={true} />
        ))} */}
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
        <p className={classes.settingsExplanation}>
          Leaving this unchecked will open a model with some more information.
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
