import * as React from "react";
import styled from "styled-components";

const WorkSection = styled.div`
    display: flex;
    flex-justify: center;
    padding: 10px;
`

export class Work extends React.Component {
    render() {
        return (
            <>
                The bulk of my industry work has been split between two jobs, each for about 3 years.
                <h4>ForeFlight (Boeing)</h4>
                In 2018, after I moved to Austin, I began working at ForeFlight (acquired by Boeing in 2019).
                I managed a variety of Spring microservices for the server team, focusing mostly on weather data and alerting. 
                I also helped build and improve features for the Logbook web interface and created internal tools to help other teams manage data.
                <h4>Quantcast</h4>
                After graduating college, I moved to San Francisco to work at Quantcast. I worked on the Real-Time / Edge Services team.
                We owned the core back-end systems serving real-time ads to millions of users per day. My responsibilities focused on
                feature addition, testing, and cloud migration for always-on services with expectations of very high throughput and low response latency.
                <h3>Resume</h3>
                This is my long-form Resume. Click the button in the top right to get a closer look, or download the file.
                <WorkSection>
                    <iframe height="100%" src="https://drive.google.com/file/d/1UyvxXlgMoTsYJgewymbfslwr240zbZkj/preview"></iframe>
                </WorkSection>
            </>
        )
    }
}