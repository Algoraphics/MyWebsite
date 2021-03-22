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
            This is a little interactive demo of "Bismuth." Hit the control buttons above to play around!
            <br /><br />
            If you got the red warning, your device may not be able to run this demo. For Mac, try using Safari! Hit <b>Add Complexity</b> to run it anyway.
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
            <InfoIcon src="websiteIcons/PowerUpWhite.png" />&nbsp;&nbsp; Add complexity (the coolest button)
            <br />
            <InfoIcon src="websiteIcons/PowerDownWhite.png" />&nbsp;&nbsp; Reduce complexity (if things get a bit slow)
            <br /><br />
            See the <b>Art</b> tab to learn more about this visual.
        </DemoText>);
}

export default Demo;