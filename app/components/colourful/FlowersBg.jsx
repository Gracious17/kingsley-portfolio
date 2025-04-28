// components/ParticlesBg.jsx
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBg = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        particles: {
          number: { value: 35 },
          size: { value: 3 },
          color: { value: "#eb9b40" },
          move: { enable: true, speed: 0.5 },
          opacity: { value: 0.3 },
        },
      }}
    />
  );
};

export default ParticlesBg;
