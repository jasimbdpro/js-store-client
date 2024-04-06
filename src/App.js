import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [nayok, setNayok] = useState([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setNayok(data))
      .catch(error => console.error('Data Failed to Load'))
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <Nayoks></Nayoks>
        <ul>
          {nayok.map(nk => <li>{nk.name}</li>)}
        </ul>
      </header>
    </div>
  );
}

function Nayoks(props) {
  return (
    <div>
      <h1> Ami nayok: {props.nameki} </h1>
      <p>tui amake chinis?</p>

    </div>
  )
}

export default App;
