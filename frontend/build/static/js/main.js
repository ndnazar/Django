// DealMover/frontend/js/main.js
import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar';
import './styles.css';

const App = () => (
    <div className="app">
        <h1>Search</h1>
        <SearchBar />
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));