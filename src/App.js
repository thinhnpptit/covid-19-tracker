import { useEffect, useState } from "react";
import { getCountries } from "./apis";
import CountrySelector from "./components/CountrySelector";
import Hightlight from "./components/Highlight";
import Summary from "./components/Summary";

function App() {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    getCountries()
      .then( res => {
      console.log({res});
      setCountries(res.data);
    })
  }, [])  

  return (
    <>
      <CountrySelector countries={countries}>

      </CountrySelector>

      <Hightlight />

      <Summary />
    </>
  );
}

export default App;
