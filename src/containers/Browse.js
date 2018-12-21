import React, { Component } from 'react';
import firebase from '../config/firebase';

export default class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookIdsSelected: [],
            books: null,
        }
    }

    componentDidMount(){
        this.fetchBooks();
    }

    fetchBooks = () => {
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const booksRef = db.collection('books')
        booksRef.get().then( querySnapshot => {
            const booksCollection = querySnapshot.docs;
            console.log('booksCollection :: ', booksCollection);
            const books = booksCollection.map((doc) => doc.data())
            this.setState({books: books}, ()=>console.log(this.state));
        })
    }

    updateInput = event => {
        this.setState({[event.target.name] : event.target.value}, ()=>console.log('updated state :: ',this.state));
    }

    render() {
        return (
            <div className='bookListContainer'>
                {this.state.books && this.state.books.map((book, i)=>
                    <div className='bookInfo' key={i}>
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
