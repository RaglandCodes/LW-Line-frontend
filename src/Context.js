import React, { useReducer, useEffect } from 'react';

function appReducer(state, action) {
  switch (action.type) {
    case 'appendFeed': {
      return {
        ...state,
        feedItems: [...state.feedItems, ...action.payload]
      };
    }
    case 'change_page': {
      return {
        ...state,
        currentPage: action.payload
      };
    }
    case 'togglePreview': {
      return {
        ...state,
        previewModal: {
          open: !state.previewModal.open,
          ...action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
}

let Context = React.createContext();

function ContextProvider(props) {
  const [state, dispatch] = useReducer(appReducer, {
    currentPage: 'home', // home | settings | search | bookmarks
    theme: 'light',
    fontSize: 'medium',
    subscriptions: ['The Verge', 'Vox'],
    feedItems: [],
    mutePhrases: [],
    previewModal: {
      open: false,
      title: '',
      description: '',
      link: '',
      image: ''
    }
  });

  useEffect(() => {
    console.dir(state);
    console.log('⬆ Latest global state');
  }, [state]);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
}

let ContextConsumer = Context.Consumer;

export { Context, ContextProvider, ContextConsumer };
