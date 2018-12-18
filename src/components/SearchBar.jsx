import React from 'react';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = { term: '' };

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    onEnter(event) {
        if (event.key === "Enter") {
            this.props.onSearchTermChange(event.target.value);
            this.setState({ term: '' });
        }
    }

    render() {
        return (
            <div className="SearchBar">
                <input
                    placeholder="Search YouTube"
                    value={this.state.term}
                    onChange={this.onInputChange}
                    onKeyDown={this.onEnter.bind(this)}
                />
            </div>
        );
    }
}

export default SearchBar;