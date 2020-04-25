//React
import React, { useState, useEffect } from 'react';
import { Context } from '../Context';

import { dataFetch } from '../modules/dataFetch';

//Components
import SourceBox from './SourceBox';
import Paginator from './Paginator';
//Styles
import { createUseStyles } from 'react-jss';
import { header4, button, fonts, colours, settingContainer } from '../styles';

const SourceTopicStyles = {
  display: 'inline-block',
  padding: 4,
  margin: 3,
  backgroundColor: colours.surface,
  fontFamily: fonts.primary,
  fontSize: 15
};
const useStyles = createUseStyles({
  ChooseSources: { overflow: 'auto' },
  SourceTopic: {
    ...SourceTopicStyles
  },
  chosenSourceTopic: {
    ...SourceTopicStyles,
    backgroundColor: '#1A237E',
    color: 'white'
  },
  header4: {
    ...header4
  },
  showMoreBtn: {
    ...button,
    color: 'black',
    float: 'right'
  },
  settingContainer: {
    ...settingContainer
  }
});

function ChooseSources() {
  const classes = useStyles();
  let { state, dispatch } = React.useContext(Context);
  let [topics, setTopics] = useState([]);
  let [sources, setSources] = useState([]);
  //let [showing, setShowing] = useState(5);
  let [errorMessage, setErrorMessage] = useState(null);
  const toggleChosenState = topic => {
    let i = topics.indexOf(topic);
    let newTopics = topics;
    newTopics[i]['chosen'] = !newTopics[i]['chosen'];
    setTopics([...newTopics]);

    dispatch({
      type: 'setChosenTopics',
      payload: topics.filter(topic => topic.chosen).map(topic => topic.topic)
    });
  };

  useEffect(() => {
    dataFetch('feedTopics')
      .then(topics => {
        setErrorMessage(null);
        setTopics(
          topics.map(topic => ({
            topic: topic,
            chosen: state.chosenTopics.includes(topic)
          }))
        );
      })
      .catch(sourceTopicsDataFetchError => {
        setErrorMessage("Couldn't get topics");
      });
  }, []);

  useEffect(() => {
    if (state.chosenTopics.length) {
      dataFetch('getSources', { searchTopics: state.chosenTopics.join('AaNnDd') }).then(gs => {
        setSources(gs);
      });
    }
  }, [topics]);

  return (
    <div className={classes.ChooseSources}>
      <div className={classes.settingContainer}>
        <div className={classes.header3}>Search by topic</div>
        {topics.length ? (
          topics.map(topic => (
            <div
              className={!topic.chosen ? classes.SourceTopic : classes.chosenSourceTopic}
              key={topic.topic}
              onClick={() => toggleChosenState(topic)}
            >
              {topic.topic}
            </div>
          ))
        ) : (
          <>{errorMessage ? errorMessage : `Getting topics...  Please wait ...`}</>
        )}

        <Paginator
          items={sources
            .filter(source => !state.subscriptions.includes(source.feed))
            .map(source => (
              <SourceBox key={source.feed} name={source.feed} />
            ))}
        />
        {/* {sources
          .filter(source => !state.subscriptions.includes(source.feed))
          .slice(0, showing)
          .map(source => (
            <SourceBox key={source.feed} name={source.feed} />
          ))}
        {showing < sources.length ? (
          <button
            className={classes.showMoreBtn}
            onClick={() => {
              setShowing(showing + 4);
            }}
          >
            Show more
          </button>
        ) : null} */}
        <br />
      </div>
      <div className={classes.settingContainer}>
        <div className={classes.header4}>
          You're subscribed to {state.subscriptions.length} feed
          {state.subscriptions.length === 1 ? '' : 's'}
        </div>
        {state.subscriptions.map(subscription => (
          <SourceBox name={subscription} key={subscription} subscribed={true} />
        ))}
      </div>
    </div>
  );
}

export default ChooseSources;
