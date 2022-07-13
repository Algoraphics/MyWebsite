import * as React from "react";
import styled from "styled-components";

const DeskFace = styled.img`
    padding: 10px 20px 10px 10px;
    border-radius: 50%;
    float: left;
`

const MobileFace = styled.img`
    padding: 10px 20px 10px 10px;
    border-radius: 50%;
    margin: 0 auto;
    display: block;
`

const AboutTextSection = styled.div`
    padding: 5 5 0 5;
`
const MobileTextSection = styled.div`
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    flex: 1 1 auto;
`

const MobileWrap = styled.div`
`

const TopLevel = styled.div`
    padding: 0 0 30 0;
`

var IntroText = () => (
    <AboutTextSection>
        Hi!
        <br /><br />
                My name is Ethan Rabb. I'm a Software Engineer with 7+ years in industry and a passion for creative programming projects.
        <h2>What kind of work do you do?</h2>
                        I've done primarily Back-end, but also Front-end and DevOps work in AdTech, Aviation, and Robotics.
                        I love novelty, and I'm always looking for new fields and technologies where I can use my programming skills.
        <br /><br />
                        Currently I'm most interested in Full Stack development, but open to any opportunity that catches my eye. I'm excited by innovative products and services,
                        especially if they help make the world a better place to live in.
        <br /><br />
                        For a full Resume and more detail about my work, go to the <b>Work</b> tab.
    </AboutTextSection>
);

var AboutIntroDesktop = () => (
    <AboutTextSection>
        <DeskFace src="Headshot.jpg" title="It me" height="320"></DeskFace>
        <IntroText/>
    </AboutTextSection>
);

var AboutIntroMobile = () => (
    <MobileTextSection>
        <MobileWrap>
            <MobileFace src="Headshot.jpg" title="It me" height="270"></MobileFace>
        </MobileWrap>
        <IntroText/>
    </MobileTextSection>
);

var Additional = () => (
    <AboutTextSection>
        <h2>What's going on with the background?</h2>
                In my free time, I like to explore the limits of code as an art form. The background to this website is one of my creations!
                You can play around with it on the <b>Demo</b> tab, or find more examples and info on the <b>Art</b> tab.
        <br /><br />
                I'm interested in ideas like procedural generation, immersion, artificial intelligence, and emergent interaction, and how these concepts engage a viewer.
        <h2>Do you have any other interests?</h2>
                Definitely! I have plenty of non-programming hobbies and interests.
        <br /><br /><b>Things I do outside:</b> Climbing, Frisbee Golf, Kayaking, Camping, Swimming, Hiking, Spikeball, Biking, Tennis, Pickleball
        <br /><br /><b>Topics I could talk about for hours:</b> Cooking, Movies/TV, Local Restaurants & Bars, Writing, Basketball, Meteorology, Investing, Gaming, Nature, Robotics, Space
        <h2>What's the best way to reach you?</h2>
                The best way to reach me is at <b>ethanrabb@gmail.com.</b>
        <br /><br />
                Let's chat!
    </AboutTextSection>
);

const AboutMe = (props) => {
    let { isMobile } = props;
    return (
        <TopLevel>
            {isMobile ? <AboutIntroMobile /> : <AboutIntroDesktop/>}
            <Additional/>
        </TopLevel>
    );
}

export default AboutMe;
