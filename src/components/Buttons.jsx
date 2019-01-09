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
            tooltipOpen: false,
            skipCount: 0,
            skipLabel: "Votes to Skip"
        };
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    skipCount() {
        this.setState((prevState) => ({
            skipCount: prevState.skipCount + 1,
            skipLabel: "Vote to Skip"
        }));
        if (this.state.skipCount > 1 || this.state.skipCount === 2) {
            this.setState((prevState) => ({
                skipLabel: "Votes to Skip"
            }));
        }
    }

    render() {
        return (
            <div>
                <Button outline color="secondary" onClick={this.props.onSync}>Sync with Host</Button>
                <Button outline color="secondary" onClick={this.skipCount.bind(this)}>{this.state.skipCount} {this.state.skipLabel}</Button>
                <Button outline color="secondary">{this.props.members} Users in Session</Button>
                <Button outline color="secondary" id="videoURL">Video URL</Button>
                <Tooltip placement="right" isOpen={this.state.tooltipOpen} autohide={false} target="videoURL" toggle={this.toggle}>
                    https://youtu.be/{this.props.selectedVideo}
                </Tooltip>
            </div>
        )
    }
}