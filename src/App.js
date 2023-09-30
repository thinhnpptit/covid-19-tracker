import { Container, Typography } from '@material-ui/core';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getCountries, getReportByCountry } from './apis';
import CountrySelector from './components/CountrySelector';
import Hightlight from './components/Highlight';
import Summary from './components/Summary';
import 'moment/locale/vi';
import '@fontsource/roboto';
import sortBy from 'lodash/sortBy';

moment.locale('vi');

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      // console.log({res});
      const countries = sortBy(res.data, 'Country');
      setCountries(countries);
      setSelectedCountryId('vn');
    });
  }, []);

  const handleOnChange = (e) => {
    setSelectedCountryId(e.target.value);
  };

  useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = countries.find(
        (country) => country.ISO2.toLowerCase() === selectedCountryId
      );

      // console.log({ selectedCountryId, Slug });
      // call api
      getReportByCountry(Slug).then((res) => {
        // xoa data ngay cuoi cung trong report
        res.data.pop();
        setReport(res.data);
      });
    }
  }, [countries, selectedCountryId]);

  return (
    <Container sytle={{ marginTop: 20 }}>
      <Typography variant="h2" component="h2">
        Số liệu COVID-19
      </Typography>
      <Typography>{moment().format('LLL')}</Typography>
      <CountrySelector
        countries={countries}
        handleOnChange={handleOnChange}
        value={selectedCountryId}
      ></CountrySelector>

      <Hightlight report={report} />

      <Summary report={report} selectedCountryId={selectedCountryId} />
    </Container>
  );
}

export default App;
