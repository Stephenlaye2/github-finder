import React, { useEffect, Fragment, useContext } from 'react';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';


const SingleUser = ({ match}) => {
  const githubContext = useContext(GithubContext);
  const {getSingleUser, loading, singleUser, getSingleUserRepos, repos} = githubContext;

  useEffect(() =>{
    getSingleUser(match.params.login);
    getSingleUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  
    const {
      name, 
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
      company,
    } = singleUser;

    if(loading){
     return <Spinner />
    }else{
    return (
      <Fragment>
       <Link to='/' className = 'btn btn-dark'>Back to Search</Link>
       Hireable: {''}
       {hireable? <i className = 'fas fa-check text-success'/>: <i className = 'fas fa-times-circle text-danger'/>}

       <div className = "card grid-2">
         <div className = "all-center">
           <img className = "round-img" src = {avatar_url} alt = {login} style = {{width: '150px'}} />
           <h1>{name}</h1>
            <p>Location: {location}</p>
         </div>
         <div>
         {bio && (<Fragment>
         <h3>Bio</h3>
       <p>{bio}</p>
         </Fragment>)}
         <a className = "btn btn-dark my-1" href = {html_url} >Visit Github Profile</a>
         <ul>
           <li>
             {login && <Fragment>
               <strong>Username:</strong> {login}
             </Fragment> }
           </li>
           <li>
             {company && <Fragment>
               <strong>Company:</strong> {company}
             </Fragment> }
           </li>
           <li>
             {blog && <Fragment>
               <strong>Website:</strong> {blog}
             </Fragment> }
           </li>
         </ul>
         </div>
       </div>
       <div className = "card text-center" >
         <div className = "badge badge-primary" >Followers: {followers} </div>
         <div className = "badge badge-success" >Following: {following} </div>
         <div className = "badge badge-light" >Public Repos: {public_repos} </div>
         <div className = "badge badge-dark" >Public Gists: {public_gists} </div>
       </div>

       <Repos repos= {repos} />
      </Fragment>
    )
    }
  }


export default SingleUser
