import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
SEARCH_USERS,
SET_LOADING,
CLEAR_USERS,
GET_SINGLEUSER,
GET_REPOS
} from '../types';

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production'){
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}else{
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}
const GithubState = props => {
const initialState = {
  users: [],
  singleUser: {},
  repos: [],
  loading: false
}

const [state, dispatch] = useReducer(GithubReducer, initialState);

// Search Users
const searchUsers = async (text) => {
  setLoading();
  
  const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);

  dispatch({
    type: SEARCH_USERS,
    payload: res.data.items
  })

  // setUsers(res.data.items);
  // setLoading(false);
  
}
// Get SingleUser
const getSingleUser = async (username) => {
  setLoading();
  
  const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);

  dispatch({
    type:GET_SINGLEUSER,
    payload:res.data
  })
  // setSingleUser(res.data);
  // setLoading(false);
}

// Get Repos
const getSingleUserRepos = async username => {
  setLoading();
  const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);

  dispatch({
    type: GET_REPOS,
    payload: res.data
  })
  // setRepos(res.data);
  // setLoading(false);
  
}
// Clear Users
const clearUsers = () => dispatch({type: CLEAR_USERS});
  


// Set Loading
const setLoading = () => dispatch({type: SET_LOADING})

return <GithubContext.Provider value = {{
  users: state.users,
  singleUser: state.singleUser,
  repos: state.repos,
  loading: state.loading,
  searchUsers,
  clearUsers,
  getSingleUser,
  getSingleUserRepos
}} >
{props.children}
</GithubContext.Provider>
}

export default GithubState;