import React, { Component } from 'react';
import firebase from 'config/firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateBooks } from './actions';
import { selectBook } from './actions';
import BookInfoCard from 'components/BookInfoCard';

const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});

class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    componentDidMount(){
        this.fetchBooks();
    }

    fetchBooks = () => {
        //show loading indicator
        this.setState({isLoading: true});
        //fetch books data from firestore
        const booksRef = db.collection('books');
        booksRef.where('loanData','==',null).orderBy('title','asc').get().then( querySnapshot => {
            const booksCollection = querySnapshot.docs;
            console.log('booksCollection :: ', booksCollection);
            const books = booksCollection.map((doc) => {
                const bookData = doc.data();
                bookData.id = doc.id;
                return bookData;
            })
            //populate redux store
            this.props.updateBooks(books);
            //hide loading indicator
            this.setState({isLoading: false}, ()=>console.log(this.state));
        })
    }

    updateInput = event => {
        this.setState({[event.target.name] : event.target.value}, ()=>console.log('updated state :: ',this.state));
    }

    render() {
        const { books } = this.props.browse;
        return (
            <div className='listContainer'>
                { this.state.isLoading ?
                    <div className='fullScreen'>
                        <CircularProgress className='loadingIcon'/>
                    </div>
                : !!books && books.map((book, i)=>
                    <BookInfoCard book={book} key={i}/>
                )}
            </div>
        )
    }
}

export default connect(({browse})=>({browse}), (dispatch)=>bindActionCreators({updateBooks},dispatch))(Browse);
