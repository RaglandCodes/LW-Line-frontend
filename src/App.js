//React
import React from 'react';
import { Context } from './Context';

//Styles
import './App.css';

//Components
import TopBox from './components/TopBox';
import Feed from './components/Feed';
import Settings from './components/Settings';
import Navigation from './components/Navigation';

function App() {
  let { state, dispatch } = React.useContext(Context);

  return (
    <div className="App">
      <TopBox />
      {state.currentPage === 'home' ? <Feed /> : <Settings />}

      <Navigation />
    </div>
  );
}

export default App;
