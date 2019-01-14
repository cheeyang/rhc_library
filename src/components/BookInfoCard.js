import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectBook } from 'containers/Browse/actions';

class Book extends Component {
    _selectedStyle = (bookId) => {
        if (this.props.browse.bookIdsSelected.includes(bookId)){
            return {backgroundColor:'#FFFFFF12'};
        } else {
            return null;
        }
    }
    render() {
        const { book, key } = this.props;
        return (
            <div style={this._selectedStyle(book.id)} className='listItem' onClick={()=>this.props.selectBook(book.id)} key={key}>
                <p>Title:</p>
                <p>{book.title}</p>
                <p>Author:</p>
                <p>{book.author}</p>
                <p>Tags:</p>
                <p>{book.tags.map(obj=>obj.label).join(', ')}</p>
                <p>ISBN:</p>
                <p>{book.isbn}</p>
                {this.props.browse.bookIdsSelected.includes(book.id)
                    ? <img className='borrowedIcon' src={require('resources/images/tickIcon.png')}/>
                    : null
                }
            </div>
        )
    }
}

export default connect(({browse})=>({browse}),(dispatch)=>bindActionCreators({selectBook},dispatch))(Book)
