"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Full-screen animated aurora shader.
 *
 * Kept in its own module and loaded with next/dynamic({ ssr: false }) so the
 * ~600 KB three.js bundle stays out of the initial page payload — it is pure
 * decoration and must never block first paint.
 *
 * Cost controls, all deliberate:
 *  - RENDER_SCALE renders at half resolution into a CSS-stretched canvas. The
 *    shader is a soft gradient, so the upscale is invisible, but it quarters
 *    the per-frame fragment work.
 *  - The RAF loop stops entirely while the tab is hidden.
 *  - prefers-reduced-motion draws a single static frame and never animates.
 */

const RENDER_SCALE = 0.5;

const AuroraBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: "low-power",
    });

    const bufferWidth = () => Math.floor(window.innerWidth * RENDER_SCALE);
    const bufferHeight = () => Math.floor(window.innerHeight * RENDER_SCALE);

    renderer.setPixelRatio(1);
    // `false`: set the drawing buffer only, leave CSS size to the style below.
    renderer.setSize(bufferWidth(), bufferHeight(), false);

    const canvas = renderer.domElement;
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "0";
    canvas.style.display = "block";
    canvas.style.pointerEvents = "none";
    currentMount.appendChild(canvas);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(bufferWidth(), bufferHeight()) },
      },
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        uniform float iTime; uniform vec2 iResolution;
        #define NUM_OCTAVES 3
        float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
        float noise(vec2 p){ vec2 ip=floor(p);vec2 u=fract(p);u=u*u*(3.0-2.0*u);float res=mix(mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);return res*res; }
        float fbm(vec2 x) { float v=0.0;float a=0.3;vec2 shift=vec2(100);mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.50));for(int i=0;i<NUM_OCTAVES;++i){v+=a*noise(x);x=rot*x*2.0+shift;a*=0.4;}return v;}
        void main() {
            vec2 p=((gl_FragCoord.xy)-iResolution.xy*0.5)/iResolution.y*mat2(6.,-4.,4.,6.);vec4 o=vec4(0.);float f=2.+fbm(p+vec2(iTime*5.,0.))*.5;
            for(float i=0.;i++<20.;){vec2 v=p+cos(i*i+(iTime+p.x*.08)*.025+i*vec2(13.,11.))*3.5;float tailNoise=fbm(v+vec2(iTime*.5,i))*.3*(1.-(i/20.));vec4 auroraColors=vec4(.1+.3*sin(i*.2+iTime*.4),.3+.5*cos(i*.3+iTime*.5),.7+.3*sin(i*.4+iTime*.3),1.);vec4 currentContribution=auroraColors*exp(sin(i*i+iTime*.8))/length(max(v,vec2(v.x*f*.015,v.y*1.5)));float thinnessFactor=smoothstep(0.,1.,i/20.)*.6;o+=currentContribution*(1.+tailNoise*.8)*thinnessFactor;}
            o=tanh(pow(o/100.,vec4(1.6)));gl_FragColor=o*1.5;
        }`,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId = 0;
    let running = false;

    const renderFrame = () => renderer.render(scene, camera);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      material.uniforms.iTime.value += 0.016;
      renderFrame();
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      animate();
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(animationFrameId);
    };

    // Don't burn GPU on a tab nobody is looking at.
    const handleVisibility = () => (document.hidden ? stop() : start());

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        renderer.setSize(bufferWidth(), bufferHeight(), false);
        material.uniforms.iResolution.value.set(bufferWidth(), bufferHeight());
        if (!running) renderFrame();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    if (reduceMotion) renderFrame();
    else start();

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (currentMount.contains(canvas)) currentMount.removeChild(canvas);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
};

export default AuroraBackground;
