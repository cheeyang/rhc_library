import React from 'react';

const PreLoginHeader = () =>
    <div className='preLoginHeader'>
        <img className='rhcLogo' src={require('resources/images/rhcLogoSample.png')}/>
        <div>window height: {window.innerHeight}</div>
        <div>available height: {window.availHeight}</div>
        <div>window width: {window.innerWidth}</div>
    </div>

export default PreLoginHeader;
