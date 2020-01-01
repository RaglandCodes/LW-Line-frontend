//React
import React, { useState, useEffect } from 'react';
import { Context } from '../Context';

//Components
import SourceBox from './SourceBox';
import Sheet from './Sheet';
import Paginator from './Paginator';

//Styles
import { createUseStyles } from 'react-jss';
import WebFont from 'webfontloader';
import { header2, header3, header4, button } from '../styles';

//const HOST = 'http://localhost:5151';
const HOST = 'https://lw-line.glitch.me';

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
    // ...padded
  },
  header3: { ...header3, ...padded },
  header4: {
    ...header4,
    // ...padded,
    margin: {
      top: 35
    }
  },
  checkboxSettingWrap: {
    display: 'flex',
    justifyContent: 'space-between'
    // ...padded
  },
  inputButtonWrap: {
    display: 'flex'
    //  ...padded
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
  let [techSources, setTechSources] = useState([]);
  let [newsSources, setNewsSources] = useState([]);
  let [designSources, setDesignSources] = useState([]);
  let [techShowing, setTechShowing] = useState(3);
  let [newsShowing, setNewsShowing] = useState(3);
  // let [initSources, setInitSources] = useState();

  useEffect(() => {
    // TODO do only one fetch on mount not on state.subscriptions
    let initSourceSearchQuery = `${HOST}/getSources/?searchTerm=I_N_I_T`;

    console.log(`${initSourceSearchQuery} <== initSourceSearchQuery\n\n`);

    fetch(initSourceSearchQuery)
      .then(res => res.json())
      .then(jsonRes => {
        setTechSources(
          jsonRes.tech.filter(source => state.subscriptions.indexOf(source.title) === -1)
        );
        setNewsSources(
          jsonRes.news.filter(source => state.subscriptions.indexOf(source.title) === -1)
        );
        setDesignSources(
          jsonRes.design.filter(
            source => state.subscriptions.indexOf(source.title) === -1
          )
        );
      })
      .catch(e => console.log(`${e} <== e\n\n`));
  }, [state.subscriptions]);
  let searchSources = () => {
    // Call server with  sourceSearchInput and setSourceSearchResults

    let searchQuery = `${HOST}/getSources/?searchTerm=${sourceSearchInput}`;
    //let searchQuery = `https://lw-line.glitch.me/getSources/?searchTerm=${sourceSearchInput}`;

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
        <h4 className={classes.header4}>Tech</h4>
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

        <div className={classes.settingsExplanation}>Opens AMP page if available</div>
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
        <div>Leaving this unchecked will open a model with some more information.</div>
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
