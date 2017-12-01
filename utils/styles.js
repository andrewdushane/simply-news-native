export const getThemeColors = theme => ({
  mainBackground: theme === 'light' ? 'white' : '#333',
  secondaryBackground: 'black',
  mainColor: theme === 'light' ? 'black' : 'white',
  secondaryColor: 'white',
  tertiaryColor: theme === 'light' ? '#555' : '#CCC',
  separatorColor: theme === 'light' ? '#DDD' : 'black',
});
