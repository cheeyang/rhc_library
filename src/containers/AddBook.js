import React, { Component } from 'react';
import firebase from 'config/firebase';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
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
                <form className='addBookForm' onSubmit={this.verifyUser}>
                    <div>
                        <label htmlFor='title'>Title</label><br/>
                        <input type='text' name='title' placeholder="e.g. The Pilgrim's Progress" value={this.state.title} onChange={this.updateInput}/>
                    </div>
                    {this.state.displayWrongEmailError && <p className='errorMsg'>You have entered an invalid email address</p>}
                    <div>
                        <label htmlFor='author'>Author</label><br/>
                        <input type='text' name='author' placeholder="e.g. John Bunyan" value={this.state.author} onChange={this.updateInput}/>
                    </div>
                    {this.state.displayWrongPasswordError && <p className='errorMsg'>You have entered an invalid password</p>}
                    <div className='formButtonGroup'>
                        <button className='addButton' type='submit'>Add To Library</button>
                        <div><hr/> OR <hr/></div>
                        <Link to='./register'><button className='browseButton'>Browse</button></Link>
                    </div>
                </form>
                {this.props.session.isLoggedIn && <Redirect to='/browse'/>}
            </div>
        )
    }
}

export default connect((state)=>({session:state.session}))(Login);
