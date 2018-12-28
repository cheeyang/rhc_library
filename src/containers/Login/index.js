import React, { Component } from 'react';
import firebase from 'config/firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from './actions';
import { Link, withRouter } from 'react-router-dom';
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebaseui from 'firebaseui';

class Login extends Component {
    constructor(props) {
        super(props);

        this.uiConfig = {
            signInFlow: 'redirect',
            callbacks: {
                signInSuccessWithAuthResult: (authResult) => {
                    this.props.history.push('/browse');
                }
            },
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
            ],
            // callbacks: {
            //     signInSuccessWithAuthResult: (authResult, redirectUrl) => {
            //         return true;
            //     }
            // }
        }

        firebase.auth().onAuthStateChanged((user)=>{
            console.log('auth state changed', user);
            this.props.updateUser(user);
        })
    }

    render() {
        return (
            <div className='formWrapper'>
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        )
    }
}

export default connect((state)=>({session:state.session}), (dispatch)=>(bindActionCreators({updateUser}, dispatch)))(withRouter(Login));
