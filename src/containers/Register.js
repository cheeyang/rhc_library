import React, { Component } from 'react';
import firebase from '../config/firebase';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            fullName: '',
            password: '',
            password2: '',
        }
    }

    updateInput = event => {
        this.setState({[event.target.name] : event.target.value}, ()=>console.log('updated state :: ',this.state));
    }

    onSubmit = event => {
        event.preventDefault(); //prevents page from refreshing

        if (this.state.password===this.state.password2) {
            this.addUser(event);
        } else {
            //do nothing
            console.log('passwords do not match')
        }
    }

    addUser = async event => {

        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });

        const { fullName, email, password } = this.state;

        const userRef = db.collection('users').add({
            fullName,
            email,
            password
        });

        this.setState({
            email: '',
            fullName: '',
            password: '',
            password2: '',
        })
    }

    render() {
        return (
            <div className='formWrapper'>
                <form className='registrationForm' onSubmit={this.onSubmit} method='post'>
                    <div>
                        <label htmlFor='fullname'>Full Name</label><br/>
                        <input type='fullname' name='fullName' required placeholder='Enter Your Full Name' value={this.state.fullName} onChange={this.updateInput}/>
                    </div>
                    <div>
                        <label htmlFor='email'>Email Address</label><br/>
                        <input type='email' name='email' required placeholder='Enter Your Email Address' value={this.state.email} onChange={this.updateInput}/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label><br/>
                        <input type='password' name='password' minLength='8' title='Password cannot contain certain symbols, such as [];:|><?\`"~()' pattern='[A-Za-z0-9!@#$%^&*]*' required placeholder='Enter Password' value={this.state.password} onChange={this.updateInput}/>
                    </div>
                    <div>
                        <label htmlFor='password'>Confirm Password</label><br/>
                        <input type='password' name='password2' minLength='8' required placeholder='Re-enter Password' value={this.state.password2} onChange={this.updateInput}/>
                    </div>
                    {this.state.password2 !== '' && this.state.password!==this.state.password2 && <p className='errorMsg'>Passwords do not match</p>}
                    <div className='formButtonGroup'>
                        <button className='registerButton' type='submit'>Register</button>
                    </div>
                </form>
                <br/><br/>
            </div>
        )
    }
}
