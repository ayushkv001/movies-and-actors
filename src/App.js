import { Routes,HashRouter,Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Starred from './pages/Starred';
import Show from './pages/Show';
import { ThemeProvider } from 'styled-components';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    grey: '#c6c6c6',
    dark: '#353535',
  },
};

function App() {
  return <HashRouter>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route  exact path="/" element={<Home/>}/>
        <Route path="/starred" element={<Starred/>}/>
        <Route path="/show/:id" element={<Show/>}/>
      </Routes>
      </ThemeProvider>
    </HashRouter>
  
}

export default App;
