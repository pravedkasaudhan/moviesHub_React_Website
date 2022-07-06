
import './App.css';
import Header from './Components/Header';
import SimpleBottomNavigation from './Components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Container } from '@mui/material';
import Trending from './Components/Pages/Trending/Trending';
import Movie from './Components/Pages/Movies/Movie';
import Series from './Components/Pages/Series/Series';
import Search from './Components/Pages/Search/Search';

function App() {
  return (
    <>
<BrowserRouter>
    <div className="App">
     <Header/>
     <div className="app">
        
       <Container>
         <Routes>
           <Route  path='/' element={<Trending/>}></Route>
           <Route  path='/movies' element={<Movie/>}></Route>
           <Route  path='/tvShow' element={<Series/>}></Route>
           <Route  path='/search' element={<Search/>}></Route>
         </Routes>
       </Container>
      <SimpleBottomNavigation/>
     </div>
    </div>
</BrowserRouter>
    </>
  );
}

export default App;
