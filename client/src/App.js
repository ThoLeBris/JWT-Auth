import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Register from './pages/Register';
import Login from './pages/Login';
import User from './pages/User';
import Home from './pages/Home';
import { useMemo, useState, useEffect } from 'react';
import { UserContext } from './UserContext';

function App() {

  const [user,setUser] = useState(null);

  const value = useMemo(() => ({user,setUser}), [user,setUser]);

  useEffect(()=>{
      ( 
          async ()=> {
              const response = await fetch('http://localhost:8000/api/user/', 
              {
                  headers: {'Content-Type':'application/json'},
                  credentials:'include'
              })

              const content = await response.json();
              
              if(content._id){
                  setUser(content);
              }
          }
      )()
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={value}>
          <Nav/>
          <main className="form-signin">
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/register" exact component={Register}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/user" exact component={User}/>
            </Switch>
          </main>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
