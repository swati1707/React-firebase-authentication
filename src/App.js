import React from 'react';
import './App.css';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

firebase.initializeApp({
  apiKey:"AIzaSyDtEF31ZsJu7GDfGr2BLttr-QkUBZBz3gg",
  authDomain:"fir-react-auth-eb41e.firebaseapp.com"
})

class App extends React.Component {
  state = { 
    isSignedIn: false
   }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
    })
  }

  render() { 
    return ( 
      <div className="data">
        {this.state.isSignedIn ?
          <div>
            <h6>Signed in !</h6>
            <button className="btn btn-primary logout" onClick={() => firebase.auth().signOut()}>Logout</button>
            <h4>Welcome {firebase.auth().currentUser.displayName}</h4>
            </div>
          :
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        }
      </div>
     );
  }
}
 
export default App;
