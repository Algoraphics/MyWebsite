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
                <h3>ForeFlight (Boeing)</h3>
                Most recently I worked at ForeFlight.
                <h3>Quantcast</h3>
                After graduation, I moved to San Francisco to work at Quantcast. I worked on the Real-Time team (later renamed to Edge Services).
                We owned the core back-end systems serving ads to millions of users per day.
                <h2>Resume</h2>
                This is my long-form Resume. Click the button in the top right to get a closer look, or download the file.
                <WorkSection>
                    <iframe height="100%" src="https://drive.google.com/file/d/1Ui8d3xw0N4LCAxKIVKSuZxftQmt9LD0k/preview"></iframe>
                </WorkSection>
            </>
        )
    }
}