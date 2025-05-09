import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Artists from './components/Artists';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const sessionId = uuidv4();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Artists />
    </ThemeProvider>
  );
}

export default App;
