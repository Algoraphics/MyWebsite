import * as React from "react";
import styled from "styled-components";

const WorkSection = styled.div`
    display: flex;
    flex-justify: center;
    padding: 10px;
`

const ResumeFrame = styled.iframe`
    display: block;
    border: none;
    height: 80vh;
    width: 100%;
`

const Work = () => {
    return (
        <>
            I have about 10 years of industry work experience, split between four full-time jobs, each in a different industry.
            <h2>OnsiteIQ</h2>
                In 2022, I switched to OnsiteIQ, a startup doing ML-based progress tracking for construction sites.
                I again filled a senior full-stack role, focusing mostly on back-end design and implementation of customer-facing
                products. I was the primary developer on multiple mission-critical feature releases.
            <h2>Maize Analytics (SecureLink (Imprivata))</h2>
                In 2020, I started remote work at Maize Analytics (acquired by SecureLink in 2020 (acquired by Imprivata in 2021)).
                As a senior full-stack developer, I distributed my time between front-end, back-end, and database implementation needs.
                I also mentored junior developers, and worked with product and design team members to architect new features.
            <h2>ForeFlight (Boeing)</h2>
                In 2018, after I moved to Austin, I began working at ForeFlight (acquired by Boeing in 2019).
                I managed a variety of Spring microservices for the server team, focusing mostly on weather data and alerting.
                I also helped build and improve features for the Logbook web interface and created internal tools to help other teams manage data.
            <h2>Quantcast</h2>
                After graduating college, I moved to San Francisco to work at Quantcast. I worked on the Real-Time / Edge Services team.
                We owned the core back-end systems serving real-time ads to millions of users per day. My responsibilities focused on
                feature addition, testing, and cloud migration for always-on services with expectations of very high throughput and low response latency.
            <h2>Resume</h2>
                This is my long-form Resume. Click the button in the top right to get a closer look, or download the file.
            <WorkSection>
                <ResumeFrame height="100%" src="EthanRabbFullResume.pdf" />
            </WorkSection>
        </>
    );
}

export default Work;
