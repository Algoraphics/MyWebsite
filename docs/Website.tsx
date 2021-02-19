import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Surface } from "gl-react-dom";
import './styles.css';
import './sassystyles.scss';
import { AboutMe } from './AboutMe';
import { Work } from './Work';
import { Art } from './Art';
import { Demo } from './Demo';
import { Shader } from './Shader';

declare var require: any

var React = require('react');

const theme = {
    blue: {
        default: "#415473",
        hover: "#FFFF00",
        text: "white"
    },
    party: {
        default: "#212121",
        text: "white"
    },
    black: {
        default: "#212121",
        text: "white"
    },
    white: {
        default: "#000000"
    },
};

const traitMap = {
    "About Me": ["black", "AboutMe"],
    "Work": ["black", "Work"],
    "Demo": ["black", "Demo"],
    "Art": ["black", "Art"]
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: black;
  outline: 0;
  text-transform: uppercase;
  cursor: pointer;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

function getWindow(topic, isMobile) {
    var text = "";
    if (topic === "AboutMe") {
        text = <AboutMe isMobile={isMobile} />
    }
    else if (topic === "Work") {
        text = <Work isMobile={isMobile} />
    }
    else if (topic === "Art") {
        text = <Art isMobile={isMobile} />
    }
    else if (topic === "Demo") {
        text = <Demo isMobile={isMobile} />
    }
    else {
        text = topic;
    }
    return text;
}

function TabWindow(props) {
    return (
        <Window id="tabwindow"
            fontSize={props.isMobile ? "14px" : "17px"}
            radius={props.isMobile ? "0%" : "2%"}
        >
            {getWindow(props.traits[1], props.isMobile)}
        </Window>
    );

}

const TabPage = styled.div`
  max-width: ${(props) => props.maxWidth};
  min-height: 100vh;
`;


const Tab = styled.button`
  padding: ${(props) => props.padding};
  cursor: pointer;
  border-width: thin;
  border-style: ${(props) => props.border};
  outline: 0;
  background: #575757;
  color: white;
  white-space: nowrap;
  border-bottom: 2px solid;
  border-color: #575757;
  &:hover {
    border-color: yellow;
  }
  ${({ activeTab }) =>
        activeTab &&
        `
    background: yellow;
    color: black;
    border: 0;
  `}
`;

const ControlButton = styled.button`
    outline: none;
    font-size: 0;
    border: 1px solid;
    background-size: contain;
    background-color: #454545;
    border-color: black;
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

function activateControls(doHide) {
    var window = document.getElementById("window");
    var controlButtons = window.querySelector("#controlbuttons");
    if (doHide) {
        controlButtons.classList.add("show-controls");
    }
    else {
        controlButtons.classList.remove("show-controls");
    }
}

function activateDemo(demoActive) {
    var window = document.getElementById("window");
    var tabWindow = window.querySelector("#tabwindow");
    //var tabButtons = window.querySelector("#tabuttons");
    if (demoActive) { 
        tabWindow.classList.add("window-translucent");
        //tabButtons.classList.add("nothing");
    }
    else {
        tabWindow.classList.remove("window-translucent");
        //tabButtons.classList.remove("nothing");
    }
}

function TabGroup(props) {
    const [activeTab, setActiveTab] = useState(types[0]);
    var demoActive = false;

    document.addEventListener("mousedown", (event) => {
        var target = event.target;
        if (target instanceof HTMLButtonElement) {
            if (target.innerText === "Show/Hide Controls") {
                demoActive = !demoActive;
                activateDemo(demoActive);
            }
        }
        else if (target instanceof HTMLImageElement) {
            if (target.title === "Show/Hide Controls") {
                demoActive = !demoActive;
                activateDemo(demoActive);
            }
        }
    });
    
    return (
        <TabPage id="window" maxWidth={props.isMobile ? "625px" : "1200px"}>
            <div id="tabuttons" className="tab-buttons">
                {types.map((type) => (
                    <Tab
                        padding={props.isMobile ? "10 15" : "10 30"}
                        border={props.isMobile ? "solid" : "unset"}
                        key={type}
                        activeTab={activeTab === type}
                        onClick={() => {
                            var clickedDemo = type === "Demo";
                            activateControls(clickedDemo);
                            if (!clickedDemo && demoActive) {
                                activateDemo(false);
                            }
                            setActiveTab(type);
                        }}
                    >
                        {type}
                    </Tab>
                ))}
            </div>
            <ControlButtons isMobile={props.isMobile}/>
            <br />
            <TabWindow traits={traitMap[activeTab]} isMobile={props.isMobile}/>
        </TabPage>
    );
}

const types = ["About Me", "Work", "Art", "Demo"];

const Window = styled.div`
  background-color: #212121;
  color: white;
  font-size: ${(props) => props.fontSize};
  padding: 30 10;
  max-width: 75%
  margin: auto;
  border-radius: ${(props) => props.radius};
  transition: 1s ease;
  transition-property: opacity;
  transform-origin: top;
`;

const FullWindow = styled.div`
  padding: 0 0 250 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  z-index: 1;
`

const ShaderContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 0;
`

function MovingShader(props) {
    const [time, setTime] = useState(400.0);
    const [activate, setActivate] = useState(0.0);
    const [holding, setHolding] = useState(false);
    const [mouseX, setMouseX] = useState(0.0);
    const [mouseY, setMouseY] = useState(0.0);

    useEffect(() => {
        var timerID = setInterval(() => tick(), 10);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    document.addEventListener("mouseup", (event) => {
        setHolding(false);
    });

    function tick() {
        var timeAdd = 0.002;
        if (holding && activate > 0.) {
            timeAdd = timeAdd * 20.0;
        }
        if (activate > 0. && activate < 1.) {
            setActivate(activate + 0.002);
        }
        setTime(time + timeAdd);
    }

    return (
        <ShaderContainer>
            <Surface width={props.isMobile ? "100%" : window.innerWidth}
                height={props.isMobile ? "100%" : window.innerHeight}>
                <Shader active={activate} time={time} mouse={[mouseX, mouseY]} mobile={props.isMobile}/>
            </Surface>
        </ShaderContainer>
    );
}

function WebsiteContainer() {
    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    })
    React.useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })

        }

        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })
    const isMobile = dimensions.width <= 1000;
    //<MovingShader isMobile={isMobile} />
    return (
        <>
            <FullWindow id="FullWindow">
                <TabGroup isMobile={isMobile} />
            </FullWindow>
        </>
    );
}

export class Website extends React.Component {
    render() {
        return <WebsiteContainer/>
    }
}