//React
import React, { useState, useEffect } from 'react';
import { Context } from '../Context';

import { dataFetch } from '../modules/dataFetch';

//Components
import SourceBox from './SourceBox';

//Styles
import { createUseStyles } from 'react-jss';
import { header4, button } from '../styles';

const SourceTopicStyles = {
  display: 'inline-block',
  padding: 3,
  margin: 3,
  backgroundColor: '#F5F5F5',
  fontFamily: 'Merriweather',
  fontSize: 14
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
  }
});

function ChooseSources() {
  const classes = useStyles();
  let { state, dispatch } = React.useContext(Context);
  let [topics, setTopics] = useState([]);
  let [sources, setSources] = useState([]);
  let [showing, setShowing] = useState(3);

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
    // TODO handle error in datafetch
    dataFetch('sourceTopics').then(topics => {
      setTopics(
        topics.map(topic => ({
          topic: topic,
          chosen: state.chosenTopics.includes(topic)
        }))
      );
    });
  }, []);

  useEffect(() => {
    //let chosenTopics = topics.filter(topic => topic.chosen).map(topic => topic.topic);
    if (state.chosenTopics.length) {
      dataFetch('getSources', { searchTopics: state.chosenTopics.join('AaNnDd') }).then(
        gs => {
          setSources(gs);
        }
      );
    }
  }, [topics]);

  return (
    <div className={classes.ChooseSources}>
      {topics.map(topic => (
        <div
          className={!topic.chosen ? classes.SourceTopic : classes.chosenSourceTopic}
          key={topic.topic}
          onClick={() => toggleChosenState(topic)}
        >
          {topic.topic}
        </div>
      ))}
      {sources
        .filter(source => !state.subscriptions.includes(source.title))
        .slice(0, showing)
        .map(source => (
          <SourceBox key={source.title} name={source.title} />
        ))}
      {showing < sources.length ? (
        <button
          className={classes.showMoreBtn}
          onClick={() => {
            setShowing(showing + 3);
          }}
        >
          Show more
        </button>
      ) : null}
      <br />
      <div className={classes.header4}>
        You're subscribed to {state.subscriptions.length} source
        {state.subscriptions.length === 1 ? '' : 's'}
      </div>
      {state.subscriptions.map(subscription => (
        <SourceBox name={subscription} key={subscription} subscribed={true} />
      ))}
    </div>
  );
}

export default ChooseSources;
