import React, { useState, useEffect } from "react";
import axios from 'axios';
import LoginForm from "./components/LoginForm";
import Covid from "./components/Covid";
import './App.css';

function App() {
  // set a static username and password
  const adminUser = {
    username: "nttglobal",
    password: "nttglobal123"
  }

  const [user, setUser] = useState({ username: "" });
  const [error, setError] = useState("");

  const [covids, setCovid] = useState([]);
  const [search, setSearch] = useState('');


  const Login = details => {
    // check if the username and password match the adminUser (just a simple authentication).
    if (details.username == adminUser.username && details.password == adminUser.password) {
      setUser({ username: details.username });
    } else {
      setError("Username or Password Incorrect!")
    }
  }

  // a function that set the username to initial state.
  const Logout = () => {
    setUser({ username: "" });
  }

  // fetch the data from the corona-api
  useEffect(() => {
    axios.get('https://corona.lmao.ninja/v2/countries') // used an alternative corona-api (https://corona.lmao.ninja/)
      .then(res => {
        setCovid(res.data);
        console.log(res.data);
      }).catch(error => console.log(error))
  }, []);

  // set a new state for search input
  const handleChange = e => {
    setSearch(e.target.value)
  }

  // filter all inputs to be lower case.
  const filteredCovid = covids.filter(covid =>
    covid.country.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="App">
      {(user.username != "") ? (
        <div className="covid-app">
          <nav>
            <ul>
              <li><h1>COVID TRACKER</h1></li>  
              <li><button onClick={Logout} className="logout" >LOG OUT</button></li>
            </ul>       
          </nav>
          <div className='covid-search'>
            <h1 className='covid-text'>Search a Country</h1>
            <form className="search">
              <input type="text" placeholder='Search' className='covid-input' onChange={handleChange} />
            </form>
          </div>
          <div className='covid-container'>
            <div className="covid-row">
              <div className="covid">
                <p>Country</p>
                <p className="covid-code"></p>
              </div>
              <div className="covid-data">
                <p className="covid-active">Active Cases</p>
                <p className="covid-cases">Total Cases</p>
                <p className="covid-deaths">Total Deaths</p>
                <p className="covid-recovered">Total Recovered</p>
              </div>
            </div>
          </div>

          {/* displaying specific data from API */}
          {filteredCovid.map(covid => {
            return (
              <Covid
                country={covid.country}
                flag={covid.countryInfo.flag}
                code={covid.countryInfo.iso3}
                active={covid.active}
                cases={covid.cases}
                deaths={covid.deaths}
                recovered={covid.recovered}
              />
            )
          })}
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
