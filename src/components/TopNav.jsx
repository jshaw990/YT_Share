import '../style/App.css';
import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Form,
  FormGroup,
  Input,
  FormText,
  Button
} from 'reactstrap';

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true, 
      room: this.props.room.name,
      member: this.props.member
    };
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  onSubmit(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div className="TopNav">
        <Navbar color="dark" className="navbar-dark">
          <NavbarBrand href="/"className="mr-auto">YT Share</NavbarBrand>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <FormText className="userNameHelp">Enter your Username</FormText>
                <Input
                    className="userNameInput"
                    type="text" 
                    value={this.props.username}
                    onChange={this.props.setUser}
                />
              </FormGroup>
            </Form>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
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
            </Collapse>
        </Navbar>
      </div>
    );
  }
}