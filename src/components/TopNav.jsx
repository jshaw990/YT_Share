import '../style/App.css';
import React from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Input,
  Button
} from 'reactstrap';

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.createRoom = this.createRoom.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
    
    this.state = {
      isOpen: false,
      room: this.props.room,
      member: this.props.member
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  createRoom() {
    this.setState({room: this.state.member.username})
    console.log('room:' + this.state.room, 'member:' + this.state.member.username)
  }
  joinRoom(event) {
    if (event.key === "Enter"){
    this.setState({room: event.target.value
    })}
  }
  render() {
    return (
      <div className="TopNav">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">YT Share</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Form>
                  <FormGroup>
                    <Input type="text" placeholder="Search for a Session" value={this.state.value} onKeyDown={this.joinRoom}/>
                  </FormGroup>
                </Form>
              </NavItem>
              <NavItem>
                <Button onClick={this.createRoom}>Create a Session</Button>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}