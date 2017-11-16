import React from 'react';
import axios from 'axios';
import Navigator from './components/Navigator';

axios.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});

export default () => <Navigator />;
