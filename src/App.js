import React, { useState } from 'react';

import { AppProvider } from './context/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from './Container';
import './App.css';

const App = () => {
 

    return (
        <AppProvider>
            <div className='container'>
             <Container />
            </div>
        </AppProvider>
    );
};

export default App;
