import React from "react";
import { Country, State, City }  from 'country-state-city';

const Address = () => {
  let countries = Country.getAllCountries();
  const [myCountry, setMyCountry] = useState({ code: "", name: "" });
  let states = State.getStatesOfCountry(myCountry.code);
  const [myState, setMyState] = useState({ code: "", name: "" });
  let cities = City.getCitiesOfState(myCountry.code, myState.code);
  const [myCity, setMyCity] = useState("");

  const handleCountryChange = (e) => {
    const { name, code } = JSON.parse(e.target.value);
    setMyCountry({ ...myCountry, code, name });
  };
  const handleStateChange = (e) => {
    const { name, code } = JSON.parse(e.target.value);
    setMyState({ ...myState, code, name });
  };

  return (
    <div>
      <form>
        <label>Delivery Address:</label>
        <br />
        <textarea
          rows={5}
          cols={20}
          placeholder="Enter delivery address..."
        ></textarea>
        <br />

        <label>Select country:</label>
        <br />
        <select onChange={(e) => handleCountryChange(e)}>
          <option value="">Select country</option>
          {countries.map((country) => {
            let cName = JSON.stringify(country.name);
            let cCode = JSON.stringify(country.isoCode);
            return (
              <option value={`{"name":${cName},"code":${cCode}}`}>
                {country.name}
              </option>
            );
          })}
        </select>
        <br />
        <label>Select state:</label>
        <br />
        <select onChange={(e) => handleStateChange(e)}>
          <option value="">Select state</option>
          {states.map((state) => {
            let sName = JSON.stringify(state.name);
            let sCode = JSON.stringify(state.isoCode);
            return (
              <option value={`{"name":${sName},"code":${sCode}}`}>
                {state.name}
              </option>
            );
          })}
        </select>
        <br />
        <label>Select city:</label>
        <br />
        <select onChange={(e) => setMyCity(e.target.value)}>
          <option value="">Select city</option>
          {cities.map((city) => {
            return <option value={city.name}>{city.name}</option>;
          })}
        </select>
        <br />
      </form>
    </div>
  );
};

export default Address;
