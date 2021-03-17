import React, { useState } from "react";
import styled from "styled-components";
import './styles.css';
import AboutMe from './AboutMe';
import Work from './Work';
import Art from './Art';
import ControlPanel from './ControlPanel';
import Demo from './Demo';

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
  padding: 30 15;
  max-width: 70%;
  margin: auto;
  border-radius: ${(props) => props.radius};
  transition: 1s ease;
  transition-property: opacity;
  transform-origin: top;
  ${(props) => props.demoActive && `    
    opacity: 0 !important;
  `};
`;

const TabPage = styled.div`
  max-width: ${(props) => props.maxWidth};
  min-height: 100vh;
`;

const Tab = styled.button`
  padding: ${(props) => props.padding};
  font-size: 15px;
  font-weight: bold;
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
    transition: 1s ease;
    transition-property: width;
    transform-origin: center;
  }
  ${({ activeTab }) =>
        activeTab &&
        `
    background: yellow;
    color: black;
    border: 0;
  `}
`;

const TabButtons = styled.div`
    display: flex;
    justify-content: center;
`;

const FixedButtons = styled.div`
    z-index: 5;
    position: fixed;
`

/* Get matching react component based on clicked tab */
const getWindow = (topic, isMobile) => {
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

const tabs = ["About Me", "Work", "Art", "Demo"];

/* Manage current tab and control panel display */
const TabGroup = (props) => {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [activeDemo, setActiveDemo] = useState(false);

    document.addEventListener("mousedown", (event) => {
        var target = event.target;
        if (target instanceof HTMLButtonElement || target instanceof HTMLImageElement) {
            if (target.innerText === "Show/Hide Controls" || target.title === "Show/Hide Controls") {
                setActiveDemo(!activeDemo);
            }
        }
    });
    
    return (
        <TabPage id="window" maxWidth={props.isMobile ? "625px" : "1200px"}>
            <TabButtons className="tab-buttons">
                <FixedButtons>
                    {tabs.map((type) => (
                        <Tab
                            padding={props.isMobile ? "8 12" : "8 20"}
                            border={props.isMobile ? "solid" : "none"}
                            key={type}
                            activeTab={activeTab === type}
                            onClick={() => {
                                setActiveTab(type);
                                window.scrollTo(0, 0);
                                if (type !== "Demo") {
                                    setActiveDemo(false);
                                }
                            }}
                        >
                            {type}
                        </Tab>
                    ))}
                </FixedButtons>
                <ControlPanel isMobile={props.isMobile} isActive={activeTab === "Demo"}/>
            </TabButtons>
            <br />
            <Window id="tabwindow" demoActive={activeDemo}
                fontSize={props.isMobile ? "14px" : "17px"}
                radius={props.isMobile ? "0%" : "2%"}
            >
                {getWindow(activeTab, props.isMobile)}
            </Window>
        </TabPage>
    );
}

/* Track full page width to determine if we should resize for mobile */
const WebsiteContainer = () => {
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