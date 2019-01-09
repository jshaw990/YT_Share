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
            skipLabel: "Votes to Skip"
        };
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    Label() {
        this.setState((prevState) => ({
            skipCount: prevState.skip + 1,
        }));
        if (this.state.skipCount === 0) {
            this.setState((prevState) => ({
                skipLabel: "Vote to Skip"
            }))} else {
                this.setState((prevState) => ({
                    skipLabel: "Votes to Skip"
                }));
            }
    }

    render() {
        return (
            <div>
                <Button outline color="secondary">Sync with Host</Button>
                <Button outline color="secondary" onClick={this.props.skipCount}>{this.props.skip} {this.state.skipLabel}</Button>
                <Button outline color="secondary"># Users in Session</Button>
                <Button outline color="secondary" id="videoURL">Video URL</Button>
                <Tooltip placement="right" isOpen={this.state.tooltipOpen} autohide={false} target="videoURL" toggle={this.toggle}>
                    https://youtu.be/{this.props.selectedVideo}
                </Tooltip>
            </div>
        )
    }
}