/*
  Use this Context for style info like font size, theme preferences
 */

//React
import React, { useReducer, useEffect } from 'react';
import { Context } from '../Context';

function themeReducer(themeState, action) {
  switch (action.type) {
    default: {
      console.log(`${action.type} <== unknown action.type in ThemeContext`);
      return themeState;
    }
  }
}

let ThemeContext = React.createContext();

function ThemeContextProvider(props) {
  const [themeState, themeDispatch] = useReducer(themeReducer, {
    colours: {
      blue: '#1565C0',
      blue900: '#0D47A1',
      accent: '#0D47A1', //TODO replace blue900 with accent
      background: '#f5f5f5',
      background2: '#E0E0E0',
      surface: 'white',
      surface2: 'white',
      dark: '#37474F',
      text: '#000000',
      text2: '#455A64',
    },
    fonts: {
      primary: 'Merriweather',
      secondary: 'Lato',
    },
    header1: {
      fontSize: 29,
      fontWeight: 400,
      fontFamily: 'Merriweather',
      margin: {
        top: 18,
      },
    },
    header2: {
      fontSize: 24,
      fontWeight: 400,
      fontFamily: 'Merriweather',
      margin: {
        top: 18,
      },
    },
    header3: {
      fontSize: 20,
      fontWeight: 300,
      fontFamily: 'Merriweather',
    },
    header4: {
      fontSize: 16,
      fontWeight: 300,
      margin: {
        top: 11,
      },
    },
    box: {
      borderBottom: '1px solid #455A64',
    },
    button: {
      color: '#FAFAFA',
      borderRadius: 3,
      border: 0,
      padding: 5,
      margin: 3,
      fontSize: 14,
      backgroundColor: '#37474F',
      '&:disabled': {
        backgroundColor: '#78909C',
      },
    },
    settingContainer: {
      margin: {
        top: 13,
      },
      borderBottom: '1px solid #B0BEC5',
      padding: {
        top: 6,
        bottom: 6,
        left: 0,
        right: 0,
      },
    },
    settingsExplanation: {
      fontFamily: () => this.fonts.primary,
      fontSize: 15,
      fontWeight: 300,
    },
    input: {
      fontSize: 14,
      padding: 2,
      borderRadius: '4px 0 0 4px',
      border: `1px solid black`,
      '&:focus': {
        outline: 'none',
        border: () => `2px solid black`,
      },
    },
    inputSubmitButton: {
      borderRadius: '0 4px 4px 0 ',
      border: 0,
      padding: 7,
      backgroundColor: 'black',
      fontSize: 14,
      margin: 0,
      color: 'white',
    },

    navigationWidth: 60,
    draggerWidth: 11,
  });

  useEffect(() => {
    // console.dir(themeState);
    // console.log('⬆ Latest global themeState');
  }, [themeState]);

  return (
    <ThemeContext.Provider value={{ themeState, themeDispatch }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

let ThemeContextConsumer = ThemeContext.Consumer;

export { ThemeContext, ThemeContextProvider, ThemeContextConsumer };
