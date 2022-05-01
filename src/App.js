import React, { useState } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import axios from 'axios';
import Popup from './components/Popup';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'



function App()
{
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });

  const apiUrl = "http://www.omdbapi.com/?apikey=715289b";



  const search = (e) =>
  {
    if (e.key === "Enter")
    {
      axios(apiUrl + "&s=" + state.s).then(({ data }) =>
      {
        let results = data.Search;
        //console.log(data);
        setState(prevState =>
        {
          return { ...prevState, results: results }
        });
      });
    }
  }



  const handleInput = (e) =>
  {
    let s = e.target.value;
    setState(prevState =>
    {
      return { ...prevState, s: s }
    });
  }

  
  let openPopup = id =>
  {
    axios(apiUrl + "&i=" + id).then(({ data }) =>
    {
      let result = data;
      setState(prevState =>
      {
        return { ...prevState, selected: result }
      });
    });
  }


  const closePopup = () =>
  {
    setState(prevState =>
    {
      return { ...prevState, selected: {} }
    });
  }

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Movie List</h1>
        </header>
        <main>
          <Search handleInput={handleInput} search={search} />
          <Results results={state.results} openPopup={openPopup} />

          {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
          

        </main>
      </div>
    </Router>
    
  );
}

export default App;
