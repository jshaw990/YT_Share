import React from 'react';

export default class Greeting extends React.Component {
    onSubmit(event) {
        event.preventDefault();
    }

    render() {
        return( 
            <form onSubmit={this.onSubmit}>
                <input
                    type="text" 
                    placeholder="Enter your Username"
                    value={this.props.username}
                    onChange={this.props.setUser}
                />
                <button>Submit</button>
            </form>
        )
    }
}