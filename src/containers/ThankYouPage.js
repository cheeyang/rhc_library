import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BookInfoCard from 'components/BookInfoCard';

class ThankYouPage extends Component {
    _onBrowseClick = (booksSelected) => {
        this.props.history.push('/browse');
    }

    render() {
        const { noOfBooks } = this.props.location.state;
        return (
            <div className='thankYouPage'>
                <div className='thankYouMessage'>
                    You have successfully borrowed {noOfBooks} {noOfBooks>1?'books':'book'}!<br/>
                </div>
                <div>
                    <button className='browseButton' onClick={this._onBrowseClick}>Browse More</button>
                </div>
            </div>
        )
    }
}

export default withRouter(connect( ({browse})=>({browse}) )(ThankYouPage));
