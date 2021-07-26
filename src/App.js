import './App.css';
import Home from './component/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/home" component={Home}></Route>
      </Router>
    </div>
  );
}

export default App;
