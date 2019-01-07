import React from 'react';

export default class Greeting extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         member: {
    //             username: this.props.member
    //         }
    //     };
    //     this.setUser = this.setUser.bind(this);
    // }

    // setUser(event) {
    //     let member = Object.assign({}, this.state.member);
    //     member.username = '';
    //     this.setState({ member: { username: event.target.value }})
    //     // this.setUser.bind(this)
    // }

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