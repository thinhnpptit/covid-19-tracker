import { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./apis";
import CountrySelector from "./components/CountrySelector";
import Hightlight from "./components/Highlight";
import Summary from "./components/Summary";

function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountryId, setSelectedCountryId] = useState('')
  const [report, setReport] = useState([])

  useEffect(() => {
    getCountries()
      .then( res => {
      // console.log({res});
      setCountries(res.data);
    })
  }, [])  

  const handleOnChange = (e) => {
    setSelectedCountryId(e.target.value);
    
  }

  useEffect(()=> {
    if (selectedCountryId) {
    const { Slug } = countries.find((country) => country.ISO2.toLowerCase() === selectedCountryId);

    // console.log({ selectedCountryId, Slug });
    // call api
    getReportByCountry(Slug)
      .then((res)=> {
        // xoa data ngay cuoi cung trong report
        res.data.pop();
        setReport(res.data)
      })
    }
  }, [countries, selectedCountryId])

  return (
    <>
      <CountrySelector countries={countries} handleOnChange={handleOnChange} >

      </CountrySelector>

      <Hightlight report={report} />

      <Summary report={report} />
    </>
  );
}

export default App;
