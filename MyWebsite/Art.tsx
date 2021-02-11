import * as React from "react";
import styled from "styled-components";

const ArtSection = styled.div`
    display: flex;
    flex-justify: center;
    flex-direction: column;
    padding: 10px;
`

const SlimePreview = styled.div`
    overflow: hidden;
    display: inline-block;
    width: 475px;
    height: 280px;
    border-style: solid;
    border-color: #212121;
    &:hover {
        border-color: yellow;
    }
`

const SlimeBoxDesktop = styled.div`
    display: flex;
`

const SlimeBoxMobile = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const SlimeTextMobile = styled.div`
    padding: 5 5 0 5;
`

const SlimeTextDesktop = styled.div`
    display: inline-block;
    padding: 10 10 10 30;
    vertical-align: top;
    width: 50%;
`

const FractalText = styled.div`
    display: inline-block;
    padding: 10 10 10 10;
`

const FractalBox = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

//TODO make scale size a prop that is different based on isMobile. No need to have the images expand past the screen edges.
const FractalImg = styled.img`
  flex: 0 9%;
  margin-bottom: 2%;
  transition: transform 3s ease-in-out;
  &:hover {
    transform: scale(6);
  }
`

const BufferBox = styled.div`
    height: 100px;
`

export class Art extends React.Component {
    props: any;

    constructor(props) {
        super(props);
    }

    render() {
        var imgHeight = "100";
        const images = [];
        for (var i = 2; i < 56; ++i) {
            var path = "PsychoPics/Screenshot (" + i + ").png";
            images.push(<FractalImg key={i} src={path} height={imgHeight} />);
        }
        var slimePreview = (
            <SlimePreview>
                <a href="http://www.slime-freighter.glitch.me">
                    <video id="slime" loop height="280" width="500" preload="true" onMouseOver={event => event.target.play()}
                        onMouseOut={event => event.target.pause()}>
                        <source src="SlimePreview.mp4" type="video/mp4" />
                                Your browser does not support this preview video. Click to see the full experience.
                            </video>
                </a>
            </SlimePreview>
        );
        var slimeText = (
            <div>
                <a href="http://www.slime-freighter.glitch.me">Slime Freighter</a> is
                        an immersive VR music video set to "Side of the Road" by Big Black Delta.
                <br /><br />
                        I wanted to give viewers a sense of scale with this experience, beginning with a very grounded
                        visual of "traveling down the road" which gradually becomes more surreal.
                <br /><br />
                        It demonstrates the ways in which Virtual Reality can bend your expectations of what is visually possible, and then break them.
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
                <h1>Slime Freighter</h1>
                {this.props.isMobile ? slimeBoxMobile : slimeBoxDesktop}
                <br /><br />
                Assets in this video were handmade using GLSL shaders and WebGL geometry,
                and their placement is procedurally generated, so each experience is a bit different.
                <br /><br />
                Nearly everything in the video is synchronized to the beat of the music, using a customized
                audio-reactivity component that I built for the project.
                <h1>Opal & Bismuth</h1>
                <FractalText>
                    A fun side-effect of the Slime Freighter video was discovering the potential of fractal visualizations using GLSL shaders.
                    <br /><br />
                    Personally I'd always found music visualizers to be repetitive, but it is quite challenging to create a visualizer that even
                    comes close to the unreachable ideal of "infinite variety."
                    <br /><br />
                    <a href="http://www.psycho-bubbles.glitch.me">Opal & Bismuth</a> are the result, after quite a bit of tinkering
                    with fractal GLSL math. The two use the same basic algorithms, but Opal is based on circular geometry while Bismuth is more rectangular.
                    <br /><br />
                    Click the link in their name to see the full VR version. I added user-controlled settings for additional variety, 
                    and mapped them to 3D spheres in VR so viewers can surround themselves with the visualizations.
                    <br /><br />
                    A preview of Bismuth is available on the "Demo" tab, or you can browse the gallery below to see samples of both visualizers.
                    <br /><br />
                </FractalText>
                <FractalBox>
                    {images}
                </FractalBox>
                <BufferBox/>
            </ArtSection>
        )
    }
}