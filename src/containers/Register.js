import React, { Component } from 'react';
import firebase from '../config/firebase';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            fullName: '',
            password: '',
        }
    }

    updateInput = event => {
        this.setState({[event.target.name] : event.target.value}, ()=>console.log('updated state :: ',this.state));
    }

    addUser = event => {
        event.preventDefault(); //prevents page from refreshing

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
        })
    }

    render() {
        return (
            <div className='loginWrapper'>
                <form className='loginForm' onSubmit={this.addUser}>
                    <div>
                        <label for='fullname'>Full Name</label><br/>
                        <input type='fullname' name='fullName' placeholder='Enter Your Full Name' value={this.state.fullName} onChange={this.updateInput}/>
                    </div>
                    <div>
                        <label for='email'>Email Address</label><br/>
                        <input type='email' name='email' placeholder='Enter Your Email Address' value={this.state.email} onChange={this.updateInput}/>
                    </div>
                    <div>
                        <label for='password'>Password</label><br/>
                        <input type='password' name='password' placeholder='Enter Password' value={this.state.password} onChange={this.updateInput}/>
                    </div>
                    <button className='register' type='submit'>Register</button>
                </form>
                <br/><br/>
            </div>
        )
    }
}
