import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <main className="form-signin">
        <form>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
      </main>
    </div>
  );
}

export default App;
