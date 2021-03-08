import React, { useState } from "react";
import styled from "styled-components";
import './styles.css';
import { AboutMe } from './AboutMe';
import { Work } from './Work';
import { Art } from './Art';
import { Demo } from './Demo';
import { ControlPanel } from './ControlPanel';

declare var require: any

var React = require('react');

const FullWindow = styled.div`
  padding: 0 0 250 0;
  position: relative;
  z-index: 1;
`

const Window = styled.div`
  background-color: #212121;
  color: white;
  font-size: ${(props) => props.fontSize};
  padding: 30 10;
  max-width: 75%;
  margin: auto;
  border-radius: ${(props) => props.radius};
  transition: 1s ease;
  transition-property: opacity;
  transform-origin: top;
`;

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

/* Get matching react component based on clicked tab */
function getWindow(topic, isMobile) {
    var text = "";
    if (topic === "About Me") {
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

function activateControls(showControls) {
    var window = document.getElementById("window");
    var controlButtons = window.querySelector("#controlbuttons");
    if (showControls) {
        controlButtons.classList.add("show-controls");
    }
    else {
        controlButtons.classList.remove("show-controls");
    }
}

function activateDemo(demoActive) {
    var window = document.getElementById("window");
    var tabWindow = window.querySelector("#tabwindow");
    if (demoActive) { 
        tabWindow.classList.add("window-translucent");
    }
    else {
        tabWindow.classList.remove("window-translucent");
    }
}

const tabs = ["About Me", "Work", "Art", "Demo"];

/* Manage current tab and control panel display */
function TabGroup(props) {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    var demoActive = false;

    document.addEventListener("mousedown", (event) => {
        var target = event.target;
        if (target instanceof HTMLButtonElement || target instanceof HTMLImageElement) {
            if (target.innerText === "Show/Hide Controls" || target.title === "Show/Hide Controls") {
                demoActive = !demoActive;
                activateDemo(demoActive);
            }
        }
    });
    
    return (
        <TabPage id="window" maxWidth={props.isMobile ? "625px" : "1200px"}>
            <div id="tabuttons" className="tab-buttons">
                {tabs.map((type) => (
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
            <ControlPanel isMobile={props.isMobile}/>
            <br />
            <Window id="tabwindow"
                fontSize={props.isMobile ? "14px" : "17px"}
                radius={props.isMobile ? "0%" : "2%"}
            >
                {getWindow(activeTab, props.isMobile)}
            </Window>
        </TabPage>
    );
}

/* Track full page width to determine if we should resize for mobile */
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