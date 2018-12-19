import React from 'react';

export default class Greeting extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            userID: ''
        };
        this.setUser = this.setUser.bind(this);
    }

    setUser(value) {
        this.setState({
            username: value,
            userID: Math.random.toString(36).substring(7)
        })
    }

    render() {
        const { username, userID } = this.state;
        return( 
            <form onSubmit={this.setUser}>
                <input
                    type="text" placeholder="Enter your Username"
                    onChange={(event) => {this.setUser(event.target.value)}}
                    value={this.state.username}
                />
                <button onClick={() => {this.submit()}}>Submit</button>
            </form>
        )
    }
}