import React, { Component } from 'react';
import firebase from 'config/firebase';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearSelected } from 'containers/Browse/actions';
import { bindActionCreators } from 'redux';
import BookInfoCard from 'components/BookInfoCard';

const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});

class Confirmation extends Component {
    _onConfirmClick = () => {
        const { bookIdsSelected } = this.props.location.state;
        // const { books } = this.props.browse;
        // const updatedBooks = books.filter(book=>!bookIdsSelected.includes(book.id));
        //update firebase store
        const booksRef=db.collection('books');
        bookIdsSelected.forEach(id=>{
            booksRef.doc(id).set({
                loanData: {
                    borrowedBy: this.props.user.uid,
                    dateBorrowed: moment().format(),
                }
            }, {merge: true});
        })
        //go to thankyou page
        this.props.history.push({
            pathname: '/thankyou',
            state: {
                noOfBooks: this.props.location.state.bookIdsSelected.length
            }
        });
        //clear array of selected books
        this.props.clearSelected();
    }

    _onBackClick = () => {
        this.props.history.goBack();
    }

    render() {
        const { bookIdsSelected } = this.props.location.state;
        const booksSelected = this.props.browse.books.filter(book=>{
            return bookIdsSelected.includes(book.id)
        })
        return (
            <div className='listContainer confirmation'>
                <div>
                    You will be borrowing the following books:
                    {booksSelected && booksSelected.map((book, i)=>
                        <BookInfoCard book={book} key={i}/>
                    )}
                </div>
                <div>
                    <button className='confirmButton' onClick={this._onConfirmClick}>Confirm</button>
                    <button className='goBackButton' onClick={this._onBackClick}>Back</button>
                </div>
            </div>
        )
    }
}

export default withRouter(connect( ({browse,session})=>({browse,user:session.user}), (dispatch)=>bindActionCreators({clearSelected},dispatch))(Confirmation));
