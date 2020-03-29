//React
import React, { useReducer, useEffect } from 'react';

function appReducer(state, action) {
  switch (action.type) {
    case 'setFeed': {
      return {
        ...state,
        feedItems: [...action.payload]
      };
    }

    case 'setCurrentFeed': {
      return {
        ...state,
        currentFeed: {
          ...action.payload
        }
      };
    }
    case 'appendFeed': {
      return {
        ...state,
        feedItems: [...state.feedItems, ...action.payload]
      };
    }

    case 'appendCurrentFeed': {
      return {
        ...state,
        currentFeed: {
          ...state.currentFeed,
          items: [...state.currentFeed.items, ...action.payload]
        }
      };
    }
    case 'setPreview': {
      return {
        ...state,
        itemPreview: { ...state.itemPreview, currentPreview: { ...action.payload } }
      };
    }

    case 'setOrientation': {
      return {
        ...state,
        orientation: action.payload
      };
    }
    case 'setInnerHeight': {
      return {
        ...state,
        innerHeight: action.payload
      };
    }
    case 'setAfter': {
      return {
        ...state,
        after: action.payload
      };
    }

    case 'setCurrentFeedAfter': {
      return {
        ...state,
        currentFeed: {
          ...state.currentFeed,
          after: action.payload
        }
      };
    }
    case 'appendSubscription': {
      return {
        ...state,
        feedItems: [],
        currentFeed: {
          ...state.currentFeed,
          items: []
          // Remove items from feed when subscriptions chage to trigger fetch to get items for the new subscriptions
        },
        subscriptions: [...state.subscriptions, action.payload]
      };
    }
    case 'removeSubscription': {
      let oldSubscriptions = state.subscriptions;
      oldSubscriptions.splice(oldSubscriptions.indexOf(action.payload), 1);
      return {
        ...state,
        feedItems: [],
        currentFeed: {
          ...state.currentFeed,
          items: []
          // Remove items from feed when subscriptions chage to trigger fetch to get items for the new subscriptions
        },
        subscriptions: [...oldSubscriptions]
      };
    }
    case 'setChosenTopics': {
      return { ...state, chosenTopics: action.payload };
    }
    case 'change_page': {
      return {
        ...state,
        currentPage: action.payload
      };
    }
    case 'toggleTheme': {
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };
    }
    case 'toggleShowPreview': {
      return {
        ...state,
        itemPreview: {
          ...state.itemPreview,
          openOnClick: !state.itemPreview.openOnClick
        }
      };
    }
    case 'toggleSplitScreen': {
      return {
        ...state,
        itemPreview: {
          ...state.itemPreview,
          showInSplitScreen: !state.itemPreview.showInSplitScreen
        }
      };
    }
    // case 'togglePreview': {
    //   return {
    //     ...state,
    //     previewModal: {
    //       open: !state.previewModal.open,
    //       ...action.payload
    //     }
    //   };
    // }
    default: {
      return state;
    }
  }
}

let Context = React.createContext();

function ContextProvider(props) {
  const [state, dispatch] = useReducer(appReducer, {
    currentPage: '', // home | settings | search | bookmarks
    theme: 'light',
    fontSize: 'medium',
    subscriptions: [],
    feedItems: [],
    orientation: 'potrait',
    currentFeed: {
      name: '',
      items: []
    },
    mutePhrases: [],
    chosenTopics: [],
    itemPreview: {
      openOnClick: true,
      showInSplitScreen: true,
      currentPreview: {
        type: '', // 'preview' | 'fullSite'
        id: '' // item id | URL
      }
    }
  });

  useEffect(() => {
    console.dir(state);
    console.log('⬆ Latest global state');
  }, [state]);

  useEffect(() => {
    localStorage.setItem('theme', state.theme);
    localStorage.setItem('mutePhrases', state.mutePhrases.join('AnNdDd'));
  }, [state.theme, state.mutePhrases]);

  useEffect(() => {
    localStorage.setItem('showInSplitScreen', state.itemPreview.showInSplitScreen);
  }, [state.itemPreview.showInSplitScreen]);

  useEffect(() => {
    localStorage.setItem('showPreview', state.itemPreview.openOnClick);
  }, [state.itemPreview.openOnClick]);

  useEffect(() => {
    localStorage.setItem('subscriptions', state.subscriptions.join('AnNdDd'));

    // dispatch({
    //   type: 'setCurrentFeed',
    //   payload: { name: state.currentFeed.name, items: [] }
    // });
  }, [state.subscriptions]);

  return (
    <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>
  );
}

let ContextConsumer = Context.Consumer;

export { Context, ContextProvider, ContextConsumer };
