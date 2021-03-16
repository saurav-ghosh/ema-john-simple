import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user , setUser] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  });

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const githubProvider = new firebase.auth.GithubAuthProvider();

  const handleGoogleSignIn = () => {
    firebase.auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      setUser(user);
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorCode, errorMessage, email, credential);
    });
  }
  const handleFacebookSignIn = () => {
    firebase.auth()
      .signInWithPopup(facebookProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log('fb', user);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const handleGithubSignIn = () => {
    firebase.auth()
      .signInWithPopup(githubProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log('github', user);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log('error', errorCode, errorMessage, email, credential);
      });
  };

  // email password user
  const handleFormSubmit = (e) => {
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name);
      })
      .catch((error) => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }

    //sign in user
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log('sign in user info', res.user);
        })
        .catch((error) => {
          const newUserInfo = {...user};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };

  const updateUserName = (name) => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('user name updated');
    }).catch(function(error) {
      console.log(error);
    });
  }

  //checking a valid email and password
  const handleBlur = (e) => {
      let isFieldValid = true;
      if(e.target.name === 'email'){
        isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      }
      if(e.target.name === 'password'){
        const isPasswordValid = e.target.value.length > 6;
        const PasswordHasNum = /\d{1}/.test(e.target.value);
        isFieldValid = isPasswordValid && PasswordHasNum
      }
      if(isFieldValid){
        const newUserInfo = {...user};
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
      }
  }

  return (
    <div style={{textAlign: 'center'}}>
        <button onClick={handleGoogleSignIn}>sign in with google</button>
        <br/>
        <button onClick={handleFacebookSignIn}>sign in with facebook</button>
        <br/>
        <button onClick={handleGithubSignIn}>sign in with github</button>
        <p>user name: {user.displayName}</p>
        <p>user email: {user.email}</p>
        <p>user password: {user.password}</p>
        <img src={user.photoURL} alt=""/>
        <form onSubmit={handleFormSubmit}>
          <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
          <label htmlFor="newUser">new user sign up</label>
          <br/><br/> 
          {newUser && <input type="text" name="name" onBlur={handleBlur} id="" placeholder="enter your name"/>}
          <br/>
          <input type="text" name="email" onBlur={handleBlur} id="" placeholder="enter your email" required/>
          <br/>
          <input type="password" name="password" onBlur={handleBlur} id="" placeholder="enter your password" required/>
          <br/>
          <input type="submit" value={newUser ? 'sign up' : 'sign in'}/>
        </form>
        <p style={{color: 'red'}}>{user.error}</p>
        {
          user.success && <p style={{color: 'green'}}>user {newUser ? 'created' : 'logged in'} successfully</p>
        }
    </div>
  );
}

export default Login;
