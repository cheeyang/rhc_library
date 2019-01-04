import React, { Component } from 'react';
import firebase from 'config/firebase';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'
import Select from 'react-select';

const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});

const options = [
    {value: 'suffering', label: 'Suffering'},
    {value: 'hermeneutics', label: 'Hermeneutics'},
    {value: 'joy', label: 'Joy'},
    {value: 'prayer', label: 'Prayer'},
    {value: 'apologetics', label: 'Apologetics'},
    {value: 'fiction', label: 'Fiction'}
];
const selectStyles = {
    valueContainer: (presets)=>({...presets,height:20})
}
const INITIAL_STATE = {
    title: '',
    author: '',
    isbn: '',
    tags: [],
    addBookSuccess: false,
}

class AddBook extends Component {
    constructor(props) {
        super(props);

        this.state = INITIAL_STATE;
    }

    _updateInput = event => {
        this.setState({[event.target.name] : event.target.value}, ()=>console.log('updated state :: ',this.state));
    }

    // verifyUser = async (event) => {
    //     event.preventDefault(); //prevents page from refreshing
    //
    //     const { fullName, email, password } = this.state;
    //
    //     const querySnap = await db.collection('users').where('email','==',this.state.email).get();
    //     console.log('query Snapshot :: ', querySnap);
    //     try {
    //         const user = querySnap.docs[0].data();
    //         console.log('first user retrieved :: ',user);
    //         if (this.state.password===user.password) {
    //             this.props.userLogin(user);
    //             console.log('User logged in successfully :: ', user.email);
    //             this.setState({
    //                 email: '',
    //                 password: '',
    //             })
    //         } else {
    //             throw 'wrong password';
    //         }
    //     } catch (err) {
    //         console.error('user is not defined, login failed :: ', err);
    //         switch (err) {
    //             case 'wrong password':
    //                 this.setState((prevState)=>({...prevState,displayWrongPasswordError:true}));
    //                 break;
    //             case 'invalid email':
    //                 this.setState((prevState)=>({...prevState,displayWrongEmailError:true}));
    //                 break;
    //             default:
    //                 this.setState((prevState)=>({...prevState,displayWrongEmailError:true}));
    //         }
    //     }
    // }

    _addToLibrary = async (event) => {
        event.preventDefault(); //stop refresh
        const { title, author, isbn, tags } = this.state;
        console.log('user :: ',this.props.session.user);
        const { displayName, email, uid } = this.props.session.user;
        const addedBy = {
            uid,
            displayName,
            email,
        }

        const docSnapshot = await db.collection('books').add({title, author, isbn, tags, addedBy});
        this.setState({...INITIAL_STATE, addBookSuccess:true},()=>{
            setTimeout(()=>{
                this.setState({addBookSuccess:false});
            },3000)});
    }

    _updateTags =  selectedTags => {
        this.setState({tags: selectedTags}, ()=>console.log('updated state :: ',this.state));
    }

    render() {
        return (
            <div className='formWrapper'>
                <form id='addBookForm' className='addBookForm' onSubmit={this._addToLibrary}>
                    <div>
                        <label htmlFor='title'>Title</label><br/>
                        <input type='text' required name='title' placeholder="e.g. The Pilgrim's Progress" value={this.state.title} onChange={this._updateInput}/>
                    </div>
                    {this.state.displayWrongEmailError && <p className='errorMsg'>You have entered an invalid email address</p>}
                    <div>
                        <label htmlFor='author'>Author</label><br/>
                        <input type='text' required name='author' placeholder="e.g. John Bunyan" value={this.state.author} onChange={this._updateInput}/>
                    </div>
                    {this.state.displayWrongPasswordError && <p className='errorMsg'>You have entered an invalid password</p>}
                    <div>
                        <label htmlFor='isbn'>ISBN</label><br/>
                        <input type='text' pattern='\d*' title='Please input the 13 digit ISBN of the book, without dashes. You may locate it on the first few pages of the book.' maxLength='13' name='isbn' placeholder="e.g. 7783161484100" value={this.state.isbn} onChange={this._updateInput}/>
                    </div>
                    <div>
                        <label htmlFor='tags'>Tags</label><br/>
                        <Select className='reactSelect' styles={selectStyles} isMulti name='tags' options={options} placeholder="e.g. Fiction, Suffering" value={this.state.tags} onChange={this._updateTags}/>
                    </div>
                    <div className='formButtonGroup'>
                        <button className='addButton' type='submit'>Add To Library</button>
                        <div><hr/> OR <hr/></div>
                        <Link to='./browse'><button className='browseButton'>Browse</button></Link>
                    </div>
                    {this.state.addBookSuccess && <p className='successMsg'>Book has been added successfully! Thank you!</p>}
                </form>
            </div>
        )
    }
}

export default connect((state)=>({session:state.session}))(AddBook);
