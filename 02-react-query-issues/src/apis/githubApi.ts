import axios from 'axios';
const githubToken = import.meta.env.VITE_SOME_GITTOKEN;

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization: `Bearer ${githubToken}`,
  },
});
