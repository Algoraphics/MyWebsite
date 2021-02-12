import * as React from "react";
import { Shaders, Node, GLSL } from "gl-react";
const shaders = Shaders.create({
    fractalShader: {
        frag: GLSL`
        precision highp float;
        varying vec2 uv;
        uniform float blue;
        uniform float active;
        uniform float time;
        uniform vec2 mouse;
        uniform vec2 resolution;

        #define time (time / 3. + 1180.0)
        #define PI 3.14159265358979323846

        float box(vec2 _st, vec2 _size, float _smoothEdges){
            _size = vec2(1.75)-_size*0.75;
            vec2 aa = vec2(_smoothEdges*0.5);
            vec2 uv = smoothstep(_size,_size+aa,_st);
            uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
            return uv.x*uv.y;
        }

        vec2 tile(vec2 _st, float _zoom){
            _st *= _zoom;
            return fract(_st);
        }

        vec2 rotate2D(vec2 _st, float _angle, vec2 shift){
            _st -= 0.5 + shift.x;
            _st =  mat2(cos(_angle),-sin(_angle),
                        sin(_angle),cos(_angle)) * _st;
            _st += 0.5 + shift.y;
            return _st;
        }

        void main() {
            vec2 v = (gl_FragCoord.xy - resolution/2.0) / min(resolution.y,resolution.x) * 5.0;
            vec2 vv = v; vec2 vvv = v;
            float tm = time*0.05;
            vec2 mspt = (vec2(
                    sin(tm)+cos(tm*0.2)+sin(tm*0.5)+cos(tm*-0.4)+sin(tm*1.3),
                    cos(tm)+sin(tm*0.1)+cos(tm*0.8)+sin(tm*-1.1)+cos(tm*1.5)
                    )+4.0)*0.03;
            vec2 resV = ( gl_FragCoord.xy / resolution );
                float bdist = clamp(1.5 - 6.*distance(mouse, resV), 0., 1.);
            float tdist = 1.0 - 0.2*bdist;
                vec2 vdist = vec2(distance(mouse.x, resV.x), distance(mouse.x, resV.x));


            //vec2 mspt = (vec2(sin(tm), cos(tm)) + 10.5) * 0.015;
            float R = 0.0;
            float RR = 0.0;
            float RRR = 0.0;
            float a = (.6-mspt.x)*6.2;
            float C = cos(a);
            float S = sin(a);
            vec2 xa=vec2(C, -S);
            vec2 ya=vec2(S, C);
            vec2 shift = vec2( 1.2, 1.62);
            float Z = 1.0 + mspt.y*6.0;
            float ZZ = 1.0 + (mspt.y)*6.2;
            float ZZZ = 1.0 + (mspt.y)*6.9;

            vec2 b = gl_FragCoord.xy/(resolution);
            b = rotate2D(b, PI*Z, 0.05*xa);
            //b = vec2(box(b,vec2(1.1),0.95));

            for ( int i = 0; i < 25; i++ ){
                float br = dot(b,b);
                float r = dot(v,v);
                if ( r > sin(tm) + 3.0 )
                {
                    r = (sin(tm) + 3.0)/r ;
                    v.x = v.x * r + 0.;
                    v.y = v.y * r + 0.;
                }
                if ( br > 0.75 )
                {
                    br = (0.56)/br ;
                    //v.x = v.x * r + 0.;
                    //v.y = v.y * r + 0.;
                }

                R *= 1.05;
                R += br;//b.x;
                if(i < 24){
                    RR *= 1.05;
                    RR += br;//b.x;
                    if(i <23){
                        RRR *= 1.05;
                        RRR += br;//b.x;
                    }
                }

                v = vec2( dot(v, xa), dot(v, ya)) * Z + shift;
                //b = vec2( dot(b.xy, xa), dot(b.xy, ya)) * Z + shift;
                //b = rotate2D(vec2( dot(v, xa), dot(v, ya)), PI*Z, ya);
                //b = vec2( dot(b, xa), dot(b, ya));
                b = vec2(box(v,vec2(5.*tdist),0.9*tdist)) + shift * 0.42;
            }
            float c = ((mod(R,2.0)>1.0)?1.0-fract(R):fract(R));
            float cc = ((mod(RR,2.0)>1.0)?1.0-fract(RR):fract(RR));
            float ccc = ((mod(RRR,2.0)>1.0)?1.0-fract(RRR):fract(RRR));

            // Complex wave for blackout
            float sine = -1.2*(sin(4.*tm) + sin(2.*tm));
            float blackout = 2.4 - 0.7*bdist;
            if (blackout > 3.5) {
                    blackout = 3.4 - (-1.2 + bdist);
            }
            if (ccc+cc+c < blackout) {
                // Gradient into blackout
                float diff = ccc+cc+c - blackout;
                float m = -0.75;
                ccc = ccc - m*diff;
                cc = cc - m*diff;
                c = c-m*diff;
            }  

          float gray = ccc+cc+c / 3. - 0.8;

          vec4 color = vec4(cc,c,ccc, 1.);
          vec4 grayscale = vec4(gray,gray,gray, 1.);
          gl_FragColor = color*active + (1. - active)*grayscale;
        }
`
    }
});

export class Shader extends React.Component {
    props: { active: any; time: any; };

    render() {
        var time = this.props.time;
        var mouse = [0.5, 0.5];
        var resolution = [window.innerWidth, window.innerHeight]
        var active = this.props.active;
        return (
                <Node shader={shaders.fractalShader} uniforms={{ active, time, mouse, resolution }} />
        );
    }
}