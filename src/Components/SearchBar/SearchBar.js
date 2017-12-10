import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {searchTerm :""};

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.keyDown = this.keyDown.bind(this);
    }

    search() {
        if(this.state.searchTerm) {
            this.props.onSearch(this.state.searchTerm);
        }
    }

    handleTermChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    keyDown(e) {
        if(e.keyCode === 13) {
            this.search();
        }
    }
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onKeyDown={this.keyDown} onChange={this.handleTermChange}/>
                <a onClick={this.search}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;