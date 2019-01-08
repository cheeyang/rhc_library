import React from 'react';
import { withRouter } from 'react-router-dom';


//only Fade bottom of App Body when user is on the following routes:
const applyFadeRoutes = ['/browse','/users'];


const Fade = (props) =>
    applyFadeRoutes.includes(props.location.pathname)
    ?    <div className='fade'/>
    :   null

export default withRouter(Fade);
