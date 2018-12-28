import React, { Component } from 'react';
import firebase from '../config/firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookIdsSelected: [],
            books: null,
            isLoading: false,
        }
    }

    componentDidMount(){
        this.fetchBooks();
    }

    fetchBooks = () => {
        this.setState({isLoading: true});
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const booksRef = db.collection('books')
        booksRef.get().then( querySnapshot => {
            const booksCollection = querySnapshot.docs;
            console.log('booksCollection :: ', booksCollection);
            const books = booksCollection.map((doc) => doc.data())
            this.setState({books: books, isLoading: false}, ()=>console.log(this.state));
        })
    }

    updateInput = event => {
        this.setState({[event.target.name] : event.target.value}, ()=>console.log('updated state :: ',this.state));
    }

    render() {
        return (
            <div className='listContainer'>
                { this.state.isLoading ?
                    <div className='fullScreen'>
                        <CircularProgress className='loadingIcon'/>
                    </div>
                : this.state.books && this.state.books.map((book, i)=>
                    <div className='listItem' key={i}>
                        <p>Title:</p>
                        <p>{book.title}</p>
                        <p>Author:</p>
                        <p>{book.author}</p>
                        <p>Genre:</p>
                        <p>{book.genres.join(', ')}</p>
                        <p>ISBN:</p>
                        <p>{book.ISBN}</p>
                    </div>
                )}
            </div>
        )
    }
}
