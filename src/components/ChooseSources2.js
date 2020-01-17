//React
import React, { useState, useEffect } from 'react';
import { Context } from '../Context';

import { dataFetch } from '../modules/dataFetch';

//Components
import SourceBox from './SourceBox';
//Styles
import { createUseStyles } from 'react-jss';

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
  }
});

function ChooseSources2() {
  const classes = useStyles();
  let { state, dispatch } = React.useContext(Context);
  let [topics, setTopics] = useState([]);
  let [sources, setSources] = useState([]);
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
      console.log(`${JSON.stringify(topics, null, 2)} <= topics`);
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
      {sources.map(source => (
        <SourceBox key={source.title} name={source.title} />
      ))}
    </div>
  );
}

export default ChooseSources2;
