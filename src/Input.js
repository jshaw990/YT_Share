import {Component} from "react";
import React from "react";
import {
  Form, 
  FormGroup,
  Input 
} from 'reactstrap';

class ChatMessage extends Component {
  state = {
    text: ""
  }
  onChange(e) {
    this.setState({text: e.target.value});
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({text: ""});
    this.props.onSendMessage(this.state.text);
  }
  render() {
    return (
      <div className="Input">
        <Form onSubmit={e => this.onSubmit(e)}>
          <FormGroup>
          <Input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Enter your message and press ENTER"
            autoFocus={true}
          />
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default ChatMessage;