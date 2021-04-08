import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Nav from './components/Nav';
import Register from './pages/Register';
import Login from './pages/Login';
import User from './pages/User';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
        <main className="form-signin">
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/user" exact component={User}/>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
