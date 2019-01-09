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
                <Button outline color="secondary" onClick={this.props.onSync}>Sync with Host</Button>
                <Button outline color="secondary" onClick={this.skipCount.bind(this)}>{this.state.skipCount} {this.state.skipLabel}</Button>
                <Button outline color="secondary">{this.props.members} Users in Session</Button>
                <Button outline color="secondary">Sync with Host</Button>
                <Button outline color="secondary" onClick={this.props.skipCount}>{this.props.skip} Votes to Skip</Button>
                <Button outline color="secondary"># Users in Session</Button>
                <Button outline color="secondary" id="videoURL">Video URL</Button>
                <Tooltip placement="right" isOpen={this.state.tooltipOpen} autohide={false} target="videoURL" toggle={this.toggle}>
                    https://youtu.be/{this.props.selectedVideo}
                </Tooltip>
            </div>
        )
    }
}