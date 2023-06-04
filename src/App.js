import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Homepage from './App/Pages/HomePage/Homepage';
import LocationWeather from './App/Pages/LocationWeather/LocationWeather';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} exact></Route>
          <Route path="/:location" element={<LocationWeather />} exact></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
