import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_SINGLEUSER,
  GET_REPOS
  } from '../types';

  export default (state, action) =>{
    switch(action.type){
      case SEARCH_USERS:
        return {
          ...state,
          users: action.payload,
          loading: false
        };
      case GET_SINGLEUSER:
        return {
          ...state,
          singleUser: action.payload,
          loading: false
        };
      case GET_REPOS:
        return{
          ...state,
          repos: action.payload,
          loading: false
        };
      case CLEAR_USERS:
          return {
            ...state,
            users: [],
            loading: false
          };
      case SET_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }