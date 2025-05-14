import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Artists from './components/Artists';
import './App.css';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Artists />
    </ThemeProvider>
  );
}

export default App;
