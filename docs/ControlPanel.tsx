import * as React from "react";
import styled from "styled-components";

const ControlButton = styled.button`
    outline: none;
    cursor: pointer;
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
    opacity: 0;
    top: 40;
    position: fixed;
    display: flex;
    justify-content: center;
    transition: all 0.5s ease;
    transform: scale(0.25);
    transform-origin: top;
    ${(props) => props.isActive &&`
        z-index: 2;
        opacity: 1 !important;
        transform: scale(0.75) !important;
    `};
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

const ControlButtons = (props) => {
    return (
        <ControlButtonGroup id="controlbuttons" isActive={props.isActive}>
            {controlTypes.map((type) => (
                <ControlButton id="controlbutton" key={type}>{controlMap[type].hover}
                    <ControlIcon src={controlMap[type].path} title={controlMap[type].hover} height={props.isMobile ? "25px" : "40px"} />
                </ControlButton>
            ))}
        </ControlButtonGroup>
    )
}


const ControlPanel = (props) => {
    let { isMobile, isActive } = props;
    return (
        <ControlButtons isMobile={isMobile} isActive={isActive} />
    );
}

export default ControlPanel;
