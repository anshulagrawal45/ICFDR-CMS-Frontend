import React, { useState } from 'react';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const AutocompleteCities = () => {
  const [cities, setCities] = useState([]);

  const fetchCities = async () => {
    try {
      const response = await axios.get('https://api.postalpincode.in/postoffice/');
      const data = response.data[0]?.PostOffice || [];
      const cityNames = data.map((city) => city.Name);
      setCities(cityNames);
    } catch (error) {
      console.log('Error fetching cities:', error);
    }
  };

  useState(() => {
    fetchCities();
  }, []);

  return (
    <Autocomplete
      options={cities}
      renderInput={(params) => (
        <TextField {...params} label="Indian Cities" variant="outlined" />
      )}
    />
  );
};

export default AutocompleteCities;
