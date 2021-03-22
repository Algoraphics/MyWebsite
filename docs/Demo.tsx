import * as React from "react";
import styled from "styled-components";

const InfoIcon = styled.img`
    height: 25px;
    padding-bottom: 3px;
    vertical-align: middle;
`

const DemoText = styled.div`
    padding: 40 0 0 0;
    max-width: 680px;
`

const Demo = (props) => {
    return (
        <DemoText>
            This is a little interactive demo of "Bismuth." Use the control buttons above to play around!
            <br /><br />
            If it's been disabled, your device may not be able to run this demo. For Mac, try using Safari! Click <InfoIcon src="websiteIcons/PowerUpWhite.png" /> a few times to run it at your own risk.
            <br/><br/>
            <InfoIcon src="websiteIcons/VisibleWhite.png" />&nbsp;&nbsp; <b>Show/Hide this information panel</b>
            <br />
            <InfoIcon src="websiteIcons/RewindWhite.png" />
            <InfoIcon src="websiteIcons/FastForwardWhite.png" />&nbsp;&nbsp; Rewind / Fast Forward (Try clicking multiple times)
            <br />
            <InfoIcon src="websiteIcons/PauseWhite.png" />&nbsp;&nbsp; Pause (Mouse interaction still works while paused)
            <br />
            <InfoIcon src="websiteIcons/PlayWhite.png" />&nbsp;&nbsp; Resume movement at default speed
            <br />
            <InfoIcon src="websiteIcons/MouseWhite.png" />&nbsp;&nbsp; Toggle mouse interaction (enabled by default)
            <br />
            <InfoIcon src="websiteIcons/PowerUpWhite.png" />&nbsp;&nbsp; Add complexity (the more you click, the cooler it gets)
            <br />
            <InfoIcon src="websiteIcons/PowerDownWhite.png" />&nbsp;&nbsp; Reduce complexity (if things get a bit slow)
            <br /><br />
            See the <b>Art</b> tab to learn more about this visual.
        </DemoText>);
}

export default Demo;