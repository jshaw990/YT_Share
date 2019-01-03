import React from 'react';

export default class Greeting extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            member: {
                username: ''
            }
        };
        this.setUser = this.setUser.bind(this);
    }

    setUser(event) {
        let member = Object.assign({}, this.state.member);
        member.username = '';
        this.setState({ member: event.target.value })
        this.setUser.bind(this)
    }

    onSubmit(event) {
        // alert('A name was submitted: ' + this.state.currentMember);
        event.preventDefault();
    }

    render() {
        return( 
            <form onSubmit={this.setUser}>
                <input
                    type="text" placeholder="Enter your Username"
                    value={this.state.username}
                    onChange={this.setUser}
                />
                <button onClick={() => {this.onSubmit()}}>Submit</button>
            </form>
        )
    }
}