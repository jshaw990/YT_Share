import '../style/App.css';
import React from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Form,
  FormGroup,
  Input,
  Button
} from 'reactstrap';

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    
    this.state = {
      isOpen: false,
      room: this.props.room.name,
      member: this.props.member
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  onSubmit(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div className="TopNav">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">YT Share</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Input type="text" placeholder="Search for a Session" value={this.state.value} onKeyDown={this.props.joinRoom}/>
                  </FormGroup>
                </Form>
              </NavItem>
              <NavItem>
                <Button onClick={this.props.createRoom}>Create a Session</Button>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}