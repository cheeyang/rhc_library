import React, { Component } from 'react';
import firebase from 'config/firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin } from './actions';
import { Redirect, Link } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            displayWrongPasswordError: false,
            displayWrongEmailError: false
        }
    }

    updateInput = event => {
        this.setState({[event.target.name] : event.target.value}, ()=>console.log('updated state :: ',this.state));
    }

    verifyUser = async (event) => {
        event.preventDefault(); //prevents page from refreshing

        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });

        const { fullName, email, password } = this.state;

        const querySnap = await db.collection('users').where('email','==',this.state.email).get();
        console.log('query Snapshot :: ', querySnap);
        try {
            const user = querySnap.docs[0].data();
            console.log('first user retrieved :: ',user);
            if (this.state.password===user.password) {
                this.props.userLogin(user);
                console.log('User logged in successfully :: ', user.email);
                this.setState({
                    email: '',
                    password: '',
                })
            } else {
                throw 'wrong password';
            }
        } catch (err) {
            console.error('user is not defined, login failed :: ', err);
            switch (err) {
                case 'wrong password':
                    this.setState((prevState)=>({...prevState,displayWrongPasswordError:true}));
                    break;
                case 'invalid email':
                    this.setState((prevState)=>({...prevState,displayWrongEmailError:true}));
                    break;
                default:
                    this.setState((prevState)=>({...prevState,displayWrongEmailError:true}));
            }
        }
    }

    render() {
        return (
            <div className='formWrapper'>
                <form className='loginForm' onSubmit={this.verifyUser} method='post'>
                    <div>
                        <label htmlFor='email'>Email Address</label><br/>
                        <input type='email' name='email' placeholder='Enter Your Email Address' value={this.state.email} onChange={this.updateInput}/>
                    </div>
                    {this.state.displayWrongEmailError && <p className='errorMsg'>You have entered an invalid email address</p>}
                    <div>
                        <label htmlFor='password'>Password</label><br/>
                        <input type='password' name='password' placeholder='Enter Password' value={this.state.password} onChange={this.updateInput}/>
                    </div>
                    {this.state.displayWrongPasswordError && <p className='errorMsg'>You have entered an invalid password</p>}
                    <div className='formButtonGroup'>
                        <button className='loginButton' type='submit'>Log In</button>
                        <div><hr/> OR <hr/></div>
                        <Link to='./register'><button className='registerButton' type='submit'>Sign Up</button></Link>
                    </div>
                </form>
                {this.props.session.isLoggedIn && <Redirect to='/browse'/>}
            </div>
        )
    }
}

export default connect((state)=>({session:state.session}), (dispatch)=>(bindActionCreators({userLogin}, dispatch)))(Login);
