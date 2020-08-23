//React
import React, { useState, useEffect } from 'react';
import { Context } from '../Context';

import { dataFetch } from '../modules/dataFetch';

//Components
import SourceBox from './SourceBox';
import Paginator from './Paginator';
import Text from './Text';

//Styles
import { createUseStyles } from 'react-jss';
import { ThemeContext } from '../Context/ThemeContext';
import { fonts, colours } from '../styles';

const SourceTopicStyles = {
  display: 'inline-block',
  padding: 4,
  margin: 3,
  border: 0,
  backgroundColor: colours.surface,
  fontFamily: fonts.secondary,
  fontSize: 16,
};

const useStyles = createUseStyles({
  ChooseSources: { overflow: 'auto' },
  SourceTopic: styleState => ({
    ...SourceTopicStyles,
    '&:focus': {
      outline: `2px dashed ${styleState.themeState.colours.lessDark}`,
    },
  }),
  chosenSourceTopic: styleState => ({
    ...SourceTopicStyles,
    backgroundColor: '#1A237E',
    color: 'white',
    '&:focus': {
      outline: `2px solid ${styleState.themeState.colours.accentBright}`,
      border: 0,
    },
  }),

  settingContainer: styleState => ({
    ...styleState.themeState.settingContainer,
  }),
});

function ChooseSources() {
  let { themeState, themeDispatch } = React.useContext(ThemeContext);
  const classes = useStyles({ themeState });
  let { state, dispatch } = React.useContext(Context);
  let [topics, setTopics] = useState([]);

  let [searchedFeeds, setSearchedFeeds] = useState([]);
  let [getFeedsErrorMessage, setGetFeedsErrorMessage] = useState(null);
  let [getFeedsLoading, setGetFeedsLoading] = useState(false);
  //let [showing, setShowing] = useState(5);
  let [errorMessage, setErrorMessage] = useState(null);

  const toggleChosenState = topic => {
    let i = topics.indexOf(topic);
    let newTopics = topics;
    newTopics[i]['chosen'] = !newTopics[i]['chosen'];
    setTopics([...newTopics]);

    dispatch({
      type: 'setChosenTopics',
      payload: topics.filter(topic => topic.chosen).map(topic => topic.topic),
    });
  };

  useEffect(() => {
    dataFetch('feedTopics')
      .then(topics => {
        setErrorMessage(null);
        setTopics(
          topics.map(topic => ({
            topic: topic,
            chosen: state.chosenTopics.includes(topic),
          })),
        );
      })
      .catch(feedTopicsError => {
        console.error(feedTopicsError);
        setErrorMessage("Couldn't get topics");
      });
  }, []);

  useEffect(() => {
    if (state.chosenTopics.length) {
      setGetFeedsLoading(true);
      dataFetch('getFeeds', { searchTopics: JSON.stringify(state.chosenTopics) })
        .then(feeds => {
          setGetFeedsLoading(false);
          setSearchedFeeds(feeds);
        })
        .catch(getFeedsError => {
          setGetFeedsLoading(false);
          setGetFeedsErrorMessage("Could't get search results");
          console.log(`${getFeedsError} <== getFeedsError\n\n`);
        });
    }
  }, [topics]);

  return (
    <div className={classes.ChooseSources}>
      <div className={classes.settingContainer}>
        <Text component="div" styleClass="header3" text="Search by topic" />
        {topics.length ? (
          topics.map(topic => (
            <button
              className={!topic.chosen ? classes.SourceTopic : classes.chosenSourceTopic}
              key={topic.topic}
              onClick={() => toggleChosenState(topic)}
            >
              {topic.topic}
            </button>
          ))
        ) : (
          <>{errorMessage ? errorMessage : `Getting topics...  Please wait ...`}</>
        )}

        {getFeedsLoading && searchedFeeds.length === 0 ? (
          <>
            <br />
            Loaing... Please wait
          </>
        ) : null}
        {getFeedsErrorMessage ? (
          <>
            <br /> {getFeedsErrorMessage}
          </>
        ) : (
          <Paginator
            items={searchedFeeds.map(searchedFeed => {
              let subscribed = state.subscriptions.indexOf(searchedFeed.name) > -1;
              return (
                <SourceBox
                  key={searchedFeed.name}
                  subscribed={subscribed}
                  name={searchedFeed.name}
                  custom={false}
                />
              );
            })}
          />
        )}
        <br />
      </div>
      <div className={classes.settingContainer}>
        <Text
          component="div"
          styleClass="header4"
          text={`You're subscribed to ${state.subscriptions.length} feed${
            state.subscriptions.length === 1 ? '' : 's'
          }`}
        />

        {state.subscriptions.map(subscription => (
          <SourceBox name={subscription} key={subscription} subscribed={true} custom={false} />
        ))}
      </div>
    </div>
  );
}

export default ChooseSources;
