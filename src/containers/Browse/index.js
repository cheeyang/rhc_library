import React, { Component } from 'react';
import firebase from 'config/firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectBook } from './actions';

const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});

class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: null,
            isLoading: false,
        }
    }

    componentDidMount(){
        this.fetchBooks();
    }

    fetchBooks = () => {
        this.setState({isLoading: true});

        const booksRef = db.collection('books')
        booksRef.get().then( querySnapshot => {
            const booksCollection = querySnapshot.docs;
            console.log('booksCollection :: ', booksCollection);
            const books = booksCollection.map((doc) => {
                const bookData = doc.data();
                bookData.id = doc.id;
                return bookData;
            })

            this.setState({books: books, isLoading: false}, ()=>console.log(this.state));
        })
    }

    updateInput = event => {
        this.setState({[event.target.name] : event.target.value}, ()=>console.log('updated state :: ',this.state));
    }

    _addToCart = bookId => {
        if (this.state.bookIdsSelected.includes(bookId)) {
            console.log('removing from cart');
            this.setState((prevState)=>({bookIdsSelected: prevState.bookIdsSelected.filter(id=> (id!==bookId))}), ()=>console.log('removed bookId from bookIdsSelected :: ', this.state))
        } else {
            this.setState((prevState)=>({bookIdsSelected: [...prevState.bookIdsSelected, bookId]}), ()=>{console.log('added bookId to bookIdsSelected :: ', this.state)});
        }
    }

    render() {
        return (
            <div className='listContainer'>
                { this.state.isLoading ?
                    <div className='fullScreen'>
                        <CircularProgress className='loadingIcon'/>
                    </div>
                : this.state.books && this.state.books.map((book, i)=>
                    <div className='listItem' onClick={()=>this.props.selectBook(book.id)} key={i}>
                        <p>Title:</p>
                        <p>{book.title}</p>
                        <p>Author:</p>
                        <p>{book.author}</p>
                        <p>Tags:</p>
                        <p>{book.tags.map(obj=>obj.label).join(', ')}</p>
                        <p>ISBN:</p>
                        <p>{book.isbn}</p>
                        {this.props.browse.bookIdsSelected.includes(book.id)
                            ? <img className='borrowedIcon' src={require('resources/images/rhcLogoSample.png')}/>
                            : null
                        }
                    </div>
                )}
            </div>
        )
    }
}

export default connect(({browse})=>({browse}),(dispatch)=>bindActionCreators({selectBook},dispatch))(Browse);
