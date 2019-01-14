import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BookInfoCard from 'components/BookInfoCard';

class Confirmation extends Component {
    render() {
        const { bookIdsSelected } = this.props.location.state;
        const booksSelected = this.props.browse.books.filter(book=>{
            return bookIdsSelected.includes(book.id)
        })
        return (
            <div className='listContainer'>
                You will be borrowing the following books:
                {booksSelected && booksSelected.map((book, i)=>
                    <BookInfoCard book={book} key={i}/>
                )}
            </div>
        )
    }
}

export default withRouter(connect( ({browse})=>({browse}) )(Confirmation));
