import { useState } from 'react';
import './App.css';

function App() {

  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState({
    name: '',
    capital: '',
    coatOfArms: '',
    continent: '',
    currencyName: '',
    currencySymbol: '',
    flag: '',
    languages: '',
    population: ''
  });

  const getCountry = () => {
    fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
    .then(response => response.json())
    .then(data => {
      setCountryData({
        name: data[0].name.common,
        capital: data[0].capital,
        coatOfArms: data[0].coatOfArms.svg,
        continent: data[0].continents,
        currencyName: Object.values(data[0].currencies)[0].name,
        currencySymbol: Object.values(data[0].currencies)[0].symbol,
        flag: data[0].flags.png,
        languages: Object.values(data[0].languages).join(', '),
        population: data[0].population.toLocaleString("en-US")
      })
      
      // console.log(data[0])
      // console.log(countryData)
      // console.log(countryData.currencyName)
      console.log(Object.values(data[0].languages).join(', '))
    })
  .catch(error => alert('invalid country name'));
  };

  return (
    <div className="container">
      <div className="top">
      <div className="searchDiv">
        <input type="text" placeholder="Search a country here..." onChange={(e) => {setCountry(e.target.value)}} 
        onKeyPress={(e) => {
          if(e.key === "Enter"){
            getCountry()
            
          } else {
              return
          }
          }}
          />
        <button onClick={() => {
          getCountry()
          
          }}>Search</button>
      </div>
      <h1 className="countryName">{countryData.name}</h1>
      </div>
      <div className="bottom">
      <div className="leftContainer">
        <img src={countryData.flag} alt={countryData.name + ' flag'} className="flag" />
        <img src={countryData.coatOfArms} alt={countryData.name + ' coat of arms'} className="coatOfArms" />
      </div>
      <div className="rightContainer">
        <div className="text"><p>Capital: </p><span>{countryData.capital}</span></div>
        <div className="text"><p>Continent: </p><span>{countryData.continent}</span></div>
        <div className="text"><p>Population: </p><span>{countryData.population}</span></div>
        <div className="text"><p>Languages: </p><span>{countryData.languages}</span></div>
        <div className="text"><p>Currencies: </p><span>{countryData.currencyName + ' '}{countryData.currencySymbol}</span></div>
      </div>
      </div>
    </div>
  );
}

export default App;
