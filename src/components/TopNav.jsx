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
} from 'reactstrap';

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
                    <Input type="text" placeholder="Search for a Session" />
                  </FormGroup>
                </Form>
              </NavItem>
              <NavItem>
                <NavLink href="/NewSession">Create a Session</NavLink>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    );
  }
}