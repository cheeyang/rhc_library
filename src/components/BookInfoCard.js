import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectBook } from 'containers/Browse/actions';
import { withRouter } from 'react-router-dom';

class BookInfoCard extends Component {
    _selectedStyle = (isHighlighted) => {
        if (isHighlighted){
            return {backgroundColor:'#FFFFFF12'};
        } else {
            return null;
        }
    }
    render() {
        const { book, key } = this.props;
        const isHighlighted = this.props.browse.bookIdsSelected.includes(book.id) && this.props.location.pathname!=='/confirmation'
        return (
            <div style={this._selectedStyle(isHighlighted)} className='listItem' onClick={()=>this.props.selectBook(book.id)} key={key}>
                <p>Title:</p>
                <p>{book.title}</p>
                <p>Author:</p>
                <p>{book.author}</p>
                <p>Tags:</p>
                <p>{book.tags.map(obj=>obj.label).join(', ')}</p>
                <p>ISBN:</p>
                <p>{book.isbn}</p>
                {isHighlighted
                    ? <img className='borrowedIcon' src={require('resources/images/tickIcon.png')}/>
                    : null
                }
            </div>
        )
    }
}

export default withRouter(connect(({browse})=>({browse}),(dispatch)=>bindActionCreators({selectBook},dispatch))(BookInfoCard));
