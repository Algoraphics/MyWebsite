import * as React from "react";
import styled from "styled-components";

const ControlButton = styled.button`
    outline: none;
    font-size: 0;
    border: 1px solid;
    background-size: contain;
    background-color: #454545;
    border-color: #454545;
    border-top-width: 2px;
    border-top-color: #454545;
    border-bottom-width: 2px;
    border-bottom-color: #454545;
    &:hover {
        border-color: yellow;
    }
    &:active {
        background-color: yellow;
    }
`

const ControlButtonGroup = styled.div`
    position: fixed;
    left: 50%;
    right: 50%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    transition: all 0.5s ease;
    transform: scale(0.25);
`

const ControlIcon = styled.img`
    padding: 5px;
`

const controlTypes = ["visible", "rewind", "pause", "play", "fastForward", "mouse", "powerDown", "powerUp"];

const controlMap = {
    visible: {
        path: "websiteIcons/VisibleWhite.png",
        hover: "Show/Hide Controls"
    },
    pause: {
        path: "websiteIcons/PauseWhite.png",
        hover: "Pause"
    },
    play: {
        path: "websiteIcons/PlayWhite.png",
        hover: "Play"
    },
    rewind: {
        path: "websiteIcons/RewindWhite.png",
        hover: "Rewind"
    },
    fastForward: {
        path: "websiteIcons/FastForwardWhite.png",
        hover: "Fast Forward"
    },
    mouse: {
        path: "websiteIcons/MouseWhite.png",
        hover: "Toggle Cursor Interactivity"
    },
    powerUp: {
        path: "websiteIcons/PowerDownWhite.png",
        hover: "Decrease Complexity"
    },
    powerDown: {
        path: "websiteIcons/PowerUpWhite.png",
        hover: "Increase Complexity"
    },
};

function ControlButtons(props) {
    return (
        <ControlButtonGroup id="controlbuttons">
            {controlTypes.map((type) => (
                <ControlButton id="controlbutton" key={type}>{controlMap[type].hover}
                    <ControlIcon src={controlMap[type].path} title={controlMap[type].hover} height={props.isMobile ? "25px" : "40px"} />
                </ControlButton>
            ))}
        </ControlButtonGroup>
    )
}


export class ControlPanel extends React.Component {
    props: any;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ControlButtons isMobile={this.props.isMobile}/>
        );
    }
}