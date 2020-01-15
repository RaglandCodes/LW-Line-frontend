//React
import React, { useState, useEffect } from 'react';
import { Context } from '../Context';

import { dataFetch } from '../modules/dataFetch';

//Components
import SourceTopic from './SourceTopic';
//Styles
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  SourceTopic: {
    display: 'inline',
    padding: 3,
    margin: 3,
    backgroundColor: '#F5F5F5',
    fontFamily: 'Merriweather',
    fontSize: 11
  }
});

function ChooseSources2() {
  let { state, dispatch } = React.useContext(Context);
  let [topics, setTopics] = useState([]);
  let [chosenTopics, setChosenTopics] = useState([]);

  useEffect(() => {
    dataFetch('sourceTopics').then(topics => {
      setTopics(topics);
    });
  }, []);

  useEffect(() => {
    if (chosenTopics.length) {
      dataFetch('getSources', { searchTopics: chosenTopics.join('AaNnDd') }).then(gs =>
        console.log(`${JSON.stringify(gs, null, 2)} <= gs`)
      );
    }
  }, [chosenTopics]);
  const classes = useStyles();
  return (
    <div>
      {chosenTopics.map(topic => (
        <div topic={topic} key={topic} className={classes.SourceTopic}>
          {topic}
        </div>
      ))}
      <br />
      {topics
        .filter(topic => !chosenTopics.includes(topic))
        .map(topic => (
          <div
            className={classes.SourceTopic}
            key={topic}
            onClick={() => setChosenTopics([...chosenTopics, topic])}
          >
            {topic}
          </div>
        ))}
    </div>
  );
}

export default ChooseSources2;
