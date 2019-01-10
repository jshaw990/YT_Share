import React from 'react';
import { 
    Button,
    Tooltip
} from 'reactstrap';

export default class Buttons extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            tooltipOpen: false
        };
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    render() {
        return (
            <div>
                <Button outline color="danger" onClick={this.props.onSync}>Sync with Host</Button>
                <Button outline color="danger">{this.props.members} Users in Session</Button>
                <Button outline color="danger" id="videoURL">Video URL</Button>
                <Tooltip placement="right" isOpen={this.state.tooltipOpen} autohide={false} target="videoURL" toggle={this.toggle}>
                    https://youtu.be/{this.props.selectedVideo}
                </Tooltip>
            </div>
        )
    }
}