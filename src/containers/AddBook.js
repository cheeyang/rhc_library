import React, { Component } from 'react';
import moment from 'moment';
import firebase from 'config/firebase';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'
import Select from 'react-select';
import './AddBook.css';

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
    {value: 'fiction', label: 'Fiction'},
    {value: 'worship', label: 'Worship'},
    {value: 'evangelism', label: 'Evangelism'},
    {value: 'ministry', label: 'Ministry'},
    {value: 'burnout', label: 'Burnout'},
    {value: 'gospel', label: 'Gospel'},
    {value: 'theology', label: 'Theology'},
    {value: 'sanctification', label: 'Sanctification'},
    {value: 'holiness', label: 'Holiness'},
    {value: 'sovereignty', label: `God's Sovereignty`},
    {value: 'work', label: 'Work'}
];
const selectStyles = {
    valueContainer: (presets)=>({...presets,height:20}),
    menu: (presets) => ({...presets,height:'150px',overflow:'scroll'})
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

    _addToLibrary = async (event) => {
        event.preventDefault(); //stop refresh
        const { title, author, isbn, tags } = this.state;
        console.log('user :: ',this.props.session.user);
        const { displayName, email, uid } = this.props.session.user;
        const addedBy = {
            uid,
            displayName,
            email,
            dateAdded: moment().format()
        }

        const docSnapshot = await db.collection('books').add({title, author, isbn, tags, addedBy, loanData:null});
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
            <div className='addBookForm'>
                <form id='addBookForm' onSubmit={this._addToLibrary}>
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
