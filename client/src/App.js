import { useEffect, useState } from 'react';
import './App.css';


function App() {

  const [producers, setProducers] = useState([])

  useEffect(() => {
    fetch('/producers')
      .then(res => res.json())
      .then(data => setProducers(data))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>CheeseBook</h1>
        <ul>
          {producers.map(producer => <li key={producer.id}>{producer.name}</li>)}
        </ul>
      </header>
    </div>
  );
}

export default App;
