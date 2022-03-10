import React from 'react'
import '../components/stylesheets/Covid.css'

const Covid = ({ country, flag, code, active, cases, deaths, recovered }) => {
  return (
    <div className='covid-container'>
      <div className='covid-row'>
        <div className="covid">
          <img src={flag} alt="flags" />
          <h1>{country}</h1>
          <p className='covid-code'>{code}</p>
        </div>
        <div className="covid-data">
          <p className="covid-active">{active}</p>
          <p className="covid-cases">{cases}</p>
          <p className="covid-deaths">{deaths}</p>
          <p className="covid-recovered">{recovered}</p>
        </div>
      </div>
    </div>
  )
}

export default Covid;