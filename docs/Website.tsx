import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Surface } from "gl-react-dom";
import './styles.css';
import './sassystyles.scss';
import { AboutMe } from './AboutMe';
import { Work } from './Work';
import { Art } from './Art';
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
    "Demo": ["black", "Click and move to interact. Use the navigation buttons above to go back at any time."],
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
    else {
        text = topic;
    }
    return text;
}

function TabWindow(props) {
    return (
        <Window id="tabwindow">
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
  border-bottom: 2px solid transparent;
  transition: ease border-bottom 250ms;
  ${({ activeTab }) =>
        activeTab &&
        `
    background: yellow;
    color: black;
    border: 0;
  `}
`;

function hideTabPage(doHide) {
    var window = document.getElementById("window");
    var tabWindow = window.querySelector("#tabwindow");
    var tabButtons = window.querySelector("#tabuttons");
    if (doHide) { 
        tabWindow.classList.add("window-translucent");
        tabButtons.classList.add("nothing");
    }
    else {
        tabWindow.classList.remove("window-translucent");
        tabButtons.classList.remove("nothing");
    }
}

function TabGroup(props) {
    const [activeTab, setActiveTab] = useState(types[0]);
    
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
                            hideTabPage((type === "Demo"));
                            setActiveTab(type);
                        }}
                    >
                        {type}
                    </Tab>
                ))}
            </div>
            <br />
            <TabWindow traits={traitMap[activeTab]} isMobile={props.isMobile}/>
        </TabPage>
    );
}

const types = ["About Me", "Work", "Art", "Demo"];

const Window = styled.div`
  background-color: #212121;
  color: white;
  min-height: 500px;
  font-size: 20px;
  padding: 30 10;
  max-width: 85%;
  margin: auto;
`;

const FullWindow = styled.div`
  padding: 0 0 100 0;
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

    document.addEventListener("mousemove", (event) => {
        setMouseX(2.*event.clientX / window.innerWidth);
        setMouseY(2.0-2.*event.clientY / window.innerHeight);
    });

    document.addEventListener("mousedown", (event) => {
        setHolding(true);
        var target = event.target;
        if (target instanceof HTMLButtonElement) {
            if (target.innerText === "Demo") {
                if (activate === 0.) {
                    setActivate(0.01);
                    window.scrollTo(0, 0);
                }
            }
            else {
                setActivate(0.0);
            }
        }
        else {
        }
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