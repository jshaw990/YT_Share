import React from 'react';

export default class Greeting extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentMember: '',
            userID: ''
        };
    }

    setUser(event) {
        this.setState({currentMember: event.target.value})
        this.setState({ userID: Math.random.toString(36).substring(7) })
    }

    onSubmit(event) {
    }

    render() {
        const { currentMember, userID } = this.state;
        return( 
            <form onSubmit={this.setUser}>
                <input
                    type="text" placeholder="Enter your Username"
                    value={this.state.currentMember}
                    onChange={this.setUser.bind(this)}
                />
                <button onClick={() => {this.onSubmit()}}>Submit</button>
            </form>
        )
    }
}