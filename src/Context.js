import React, { useReducer, useEffect } from 'react';

function appReducer(state, action) {
  switch (action.type) {
    case 'setFeed': {
      return {
        ...state,
        feedItems: [...action.payload]
      };
    }
    case 'appendFeed': {
      return {
        ...state,
        feedItems: [...state.feedItems, ...action.payload]
      };
    }
    case 'setAfter': {
      return {
        ...state,
        after: action.payload
      };
    }
    case 'appendSubscription': {
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.payload]
      };
    }
    case 'removeSubscription': {
      let oldSubscriptions = state.subscriptions;
      oldSubscriptions.splice(oldSubscriptions.indexOf(action.payload), 1);
      return {
        ...state,
        subscriptions: [...oldSubscriptions]
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
    subscriptions: ['The Atlantic', 'The Verge', 'Vox'],
    feedItems: [],
    mutePhrases: [],
    previewModal: {
      openOnClick: false,
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
