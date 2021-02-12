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
  padding: 10px 30px;
  cursor: pointer;
  background: #575757;
  color: white;
  border: 0;
  outline: 0;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: ease border-bottom 250ms;
  ${({ active }) =>
        active &&
        `
    background: yellow;
    color: black;
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

function TabGroup() {
    const [active, setActive] = useState(types[0]);
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
        <TabPage id="window" maxWidth={isMobile ? "625px" : "1200px"
}>
            <div id="tabuttons" className="tab-buttons">
                {types.map((type) => (
                    <Tab
                        key={type}
                        active={active === type}
                        onClick={() => {
                            hideTabPage((type === "Demo"));
                            setActive(type);
                        }}
                    >
                        {type}
                    </Tab>
                ))}
            </div>
            <br />
            <TabWindow traits={traitMap[active]} isMobile={isMobile} />
        </TabPage>
    );
}

const types = ["About Me", "Work", "Art", "Demo"];

const Window = styled.div`
  background-color: #212121;
  color: white;
  min-height: 50%;
  font-size: 20px;
  padding: 10 10 10 10;
  max-width: 85%;
  margin: auto;
`;

const FullWindow = styled.div`
  padding: 0 0 100 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
`

const ShaderContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: -9999;
`

function MovingShader(props) {
    const [date, setDate] = useState(0.0);

    useEffect(() => {
        var timerID = setInterval(() => tick(), 10);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function tick() {
        setDate(date + 0.05);
    }

    return (
        <ShaderContainer>
            <Surface width={window.innerWidth} height={window.innerHeight}>
                <Shader active={1.0} time={date} />
            </Surface>
        </ShaderContainer>
    );
}

export class Website extends React.Component {
    render() {
        return (
            <>
                <MovingShader />
                <FullWindow id="FullWindow">
                    <TabGroup />
                </FullWindow>
            </>
        );
    }
}