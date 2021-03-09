import * as React from "react";
import styled from "styled-components";

const ArtSection = styled.div`
    display: block;
    flex-justify: center;
    flex-direction: column;
`

const SlimePreview = styled.div`
    display: inline-block;
    border-style: solid;
    border-color: #212121;
    &:hover {
        border-color: yellow;
    }
    height: fit-content;
    width: ${(props) => props.width};
`

const SlimeBoxDesktop = styled.div`
    display: flex;
    padding: 0 0 15 0;
`

const SlimeBoxMobile = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 0 10 0;
`

const SlimeTextMobile = styled.div`
    padding: 5 0 0 0;
`

const SlimeTextDesktop = styled.div`
    display: inline-block;
    padding: 10 10 10 30;
    vertical-align: top;
    width: 50%;
`

const FractalText = styled.div`
    display: inline-block;
`

const FractalBox = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const FractalImg = styled.img`
  flex: 0 9%;
  margin-bottom: 2%;
  transition: transform 0.5s ease-in-out;
`

const PreviewImg = styled.img`
  margin-top: -270;
  margin-right: -450;
`

const PreviewImgMobile = styled.img`
  margin-top: -150;
`

function FractalGallery(props) {
    var activeId = "none";
    const targetProp = props.isMobile ? "fractal-mobile-zoom" : "fractal-zoom";
    document.addEventListener("mousedown", (event) => {
        var target = event.target;
        if (activeId !== "none") {
            var prevImg = document.getElementById(activeId);
            prevImg.classList.remove(targetProp);
        }
        if (target instanceof HTMLImageElement && target.id.includes("fractalImg")) {
            if (target.id === activeId) {
                activeId = "none";
            }
            else {
                target.classList.add(targetProp);
                activeId = target.id;
            }
        }
    });

    const images = [];
    for (var i = 1; i <= 30; ++i) {
        if (props.isMobile) {
            i++;
        }
        var path = "PsychoPics/Screenshot (" + i + ").png";
        var id = "fractalImg" + i;
        images.push(<FractalImg key={i} id={id} src={path} height={props.isMobile ? "160" : "100"} />);
    }
    return (
        <FractalBox>
            {images}
        </FractalBox>
    );
}

function setShow(doShow) {
    var previewImg = document.getElementById("previewImg");
    if (doShow) {
        previewImg.style.display = "block";
    }
    else {
        previewImg.style.display = "none";
    }
}

const videoDimensions = { mobile: { width: "285", height: "150" }, desktop: {width : "500", height : "270"}}

function VideoElement(props) {
    if (props.isMobile) {
        return (
            <>
                <video id="slimeMobile" loop autoPlay height={videoDimensions.mobile.height} width={videoDimensions.mobile.width} preload="true">
                    <source src="SlimePreviewCroppedCompress.mp4" type="video/mp4" />
                    Your browser does not support this preview video.Click to see the full experience.
                </video >
                <PreviewImgMobile id="previewImg" src="SlimePreviewImg.JPG" height={videoDimensions.mobile.height} width="280" title="Waiting for video to load" />
            </>
        );
    }
    else return (
        <div>
            <video id="slimeDesktop" loop height={videoDimensions.desktop.height} width={videoDimensions.desktop.width} preload="true"
                onMouseOver={event => event.target.play()}
                onMouseOut={event => event.target.pause()}>
                <source src="SlimePreviewCroppedCompress.mp4" type="video/mp4" />
            </video>
            <PreviewImg id="previewImg" src="SlimePreviewImg.JPG" height="260" width={videoDimensions.desktop.width} title="Waiting for video to load" />
        </div>
    );
        
}

export class Art extends React.Component {
    props: any;

    constructor(props) {
        super(props);
    }

    render() {
        var slimePreview = (
            <SlimePreview width={this.props.isMobile ? "285" : "500"}>
                <a href="http://www.slime-freighter.glitch.me" target="_blank">
                    <VideoElement isMobile={this.props.isMobile} />
                </a>
            </SlimePreview>
        );
        var slimeText = (
            <div>
                    I wanted to give viewers a sense of scale with this experience, beginning with a very grounded
                    visual of "traveling down the road" which gradually increases in scope and becomes more surreal.
                <br /><br />
                    It shows the ways in which Virtual Reality can bend your expectations of what is visually possible, and then break them.
            </div>
        );
        var slimeBoxDesktop = (
            <SlimeBoxDesktop id="deskbox">
                {slimePreview}
                <SlimeTextDesktop>
                    {slimeText}
                </SlimeTextDesktop>
            </SlimeBoxDesktop>
        );
        var slimeBoxMobile = (
            <SlimeBoxMobile id="mobilebox">
                {slimePreview}
                <SlimeTextMobile>
                    {slimeText}
                </SlimeTextMobile>
            </SlimeBoxMobile>
        );
        return (
            <ArtSection>
                My main creative work has been these audio-visual experiences using various WebXR technologies.
                I love that users can immerse themselves to their comfort level from anywhere.
                <br /><br />
                If you have a VR headset, you can get them running in Firefox. See <a href="https://aframe.io/" target="_blank"><u>aframe.io</u></a> for more details.
                <h2>Slime Freighter</h2>
                <a href="http://www.slime-freighter.glitch.me" target="_blank"><u>Slime Freighter</u></a> is
                    an immersive VR music video set to "Side of the Road" by Big Black Delta.
                <br /><br />
                {this.props.isMobile ? slimeBoxMobile : slimeBoxDesktop}
                Assets in this video were handmade using GLSL shaders and WebGL geometry,
                and their placement is procedurally generated in Javascript, so each experience is a bit different.
                <br /><br />
                Nearly everything in the video is synchronized to the beat of the music, using a customized
                audio-reactivity component that I built for the project.
                <h2>Opal & Bismuth</h2>
                <FractalText>
                    A fun side-effect of the Slime Freighter video was discovering the potential of fractal visualizations using GLSL shaders.
                    <br /><br />
                    <a href="http://www.psycho-bubbles.glitch.me" target="_blank"><u>Opal & Bismuth</u></a> are my attempt to create a visualizer that will always show something new. 
                    They use the same basic algorithms, but Opal is based on circular geometry while Bismuth is rectangular.
                    <br /><br />
                    Click the link in their name to see the full VR app with both visualizers and some other small works.
                    <br /><br />
                    An interactive Bismuth preview is available on the <b>Demo</b> tab, or you can browse the gallery below to see samples of both visualizers. <b> Click to Zoom! </b>
                    <br /><br />
                </FractalText>
                <FractalGallery isMobile={this.props.isMobile}/>
            </ArtSection>
        )
    }
}