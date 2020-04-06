// Contains theme data

const colours = {
  blue: '#1565C0',
  blue900: '#0D47A1',
  background: '#f5f5f5',
  //surface: '#ECEFF1'
  surface: 'white',
  surface2: 'white'
};

const fonts = {
  //primary: 'PT Serif',
  primary: 'Merriweather',
  secondary: 'Lato'
};
const header1 = {
  fontSize: 29,
  fontFamily: fonts.primary,
  fontWeight: 400,
  margin: {
    top: 18
  }
};

const header2 = {
  fontSize: 24,
  fontFamily: fonts.primary,
  fontWeight: 400,
  margin: {
    top: 18
  }
};

const header3 = {
  fontSize: 20,
  fontFamily: fonts.primary,
  fontWeight: 300,
  margin: {
    top: 11
  }
};

const header4 = {
  fontSize: 16,
  fontFamily: fonts.primary,
  fontWeight: 300,
  margin: {
    top: 11
  }
};

const box = {
  borderBottom: '1px solid #455A64'
  //backgroundColor: '#F5F5F5'
};

const button = {
  //color: '#FAFAFA',
  borderRadius: 3,
  border: 0,
  padding: 5,
  margin: 3,
  fontSize: 14
};

const settingContainer = {
  margin: {
    top: 13
  },
  borderBottom: '1px solid #B0BEC5',
  //backgroundColor: '#FAFAFA',
  padding: {
    top: 6,
    bottom: 6,
    left: 4,
    right: 4
  }
};

module.exports = {
  colours,
  header1,
  header2,
  header3,
  header4,
  box,
  button,
  fonts,
  settingContainer
};
