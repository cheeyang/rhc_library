import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearSelected } from 'containers/Browse/actions';
import { bindActionCreators } from 'redux';
import BookInfoCard from 'components/BookInfoCard';

class Confirmation extends Component {
    _onConfirmClick = () => {
        this.props.history.push({
            pathname: '/thankyou',
            state: {
                noOfBooks: this.props.location.state.bookIdsSelected.length
            }
        });
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

export default withRouter(connect( ({browse})=>({browse}), (dispatch)=>bindActionCreators({clearSelected},dispatch))(Confirmation));
