// STOP USING THIS AND ADD ANY NEW STYLES TO THEME_CONTEXT './Context/ThemeContext.js'

// Contains theme data

const colours = {
  blue: '#1565C0',
  blue900: '#0D47A1',
  background: '#f5f5f5',
  background2: '#E0E0E0',
  //surface: '#ECEFF1'
  surface: 'white',
  surface2: 'white',
  dark: '#37474F',
};

const fonts = {
  //primary: 'PT Serif',
  primary: 'Merriweather',
  secondary: 'Lato',
};
const header1 = {
  fontSize: 29,
  fontFamily: fonts.primary,
  fontWeight: 400,
  margin: {
    top: 18,
  },
};

const header2 = {
  fontSize: 24,
  fontFamily: fonts.primary,
  fontWeight: 400,
  margin: {
    top: 18,
  },
};

const header3 = {
  fontSize: 20,
  fontFamily: fonts.primary,
  fontWeight: 300,
  // margin: {
  //   top: 11
  // }
};

const header4 = {
  fontSize: 16,
  fontFamily: fonts.primary,
  fontWeight: 300,
  margin: {
    top: 11,
  },
};

const box = {
  borderBottom: '1px solid #455A64',
  //backgroundColor: '#F5F5F5'
};

const button = {
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
};

const settingContainer = {
  margin: {
    top: 13,
  },
  borderBottom: '1px solid #B0BEC5',
  //backgroundColor: '#FAFAFA',
  padding: {
    top: 6,
    bottom: 6,
    left: 0,
    right: 0,
  },
};

const settingsExplanation = {
  fontFamily: fonts.primary,
  fontSize: 15,

  fontWeight: 300,
  //...padded
};
const input = {
  fontSize: 14,
  padding: 2,
  borderRadius: '4px 0 0 4px',
  //border: 0,
  border: `1px solid ${colours.dark}`,
  '&:focus': {
    outline: 'none',
    border: `2px solid ${colours.dark}`,
  },
};
const inputSubmitButton = {
  borderRadius: '0 4px 4px 0 ',
  border: 0,
  padding: 7,
  fontSize: 14,
  margin: 0,
  backgroundColor: colours.dark,
  color: 'white',
};

const navigationWidth = 60;
const draggerWidth = 11;

module.exports = {
  colours,
  header1,
  header2,
  header3,
  header4,
  box,
  button,
  fonts,
  settingContainer,
  settingsExplanation,
  input,
  inputSubmitButton,
  navigationWidth,
  draggerWidth,
};
