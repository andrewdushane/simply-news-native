import axios from 'axios';

export const getArticlesForSource = sourceUrl => axios.get(sourceUrl);
