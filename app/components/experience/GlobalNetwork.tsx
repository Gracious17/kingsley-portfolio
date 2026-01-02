"use client";

import { motion } from "framer-motion";
import { WorldMap } from "../ui/map";

// Global network connection data representing professional reach
const globalConnections = [
  {
    start: {
      lat: 64.2008,
      lng: -149.4937,
      label: "Fairbanks"
    },
    end: {
      lat: 34.0522,
      lng: -118.2437,
      label: "Los Angeles"
    }
  },
  {
    start: { 
      lat: 64.2008, 
      lng: -149.4937,
      label: "Fairbanks"
    },
    end: { 
      lat: -15.7975, 
      lng: -47.8919,
      label: "Brasília"
    }
  },
  {
    start: { 
      lat: -15.7975, 
      lng: -47.8919,
      label: "Brasília"
    },
    end: { 
      lat: 38.7223, 
      lng: -9.1393,
      label: "Lisbon"
    }
  },
  {
    start: { 
      lat: 51.5074, 
      lng: -0.1278,
      label: "London"
    },
    end: { 
      lat: 28.6139, 
      lng: 77.209,
      label: "New Delhi"
    }
  },
  {
    start: { 
      lat: 28.6139, 
      lng: 77.209,
      label: "New Delhi"
    },
    end: { 
      lat: 43.1332, 
      lng: 131.9113,
      label: "Vladivostok"
    }
  },
  {
    start: { 
      lat: 28.6139, 
      lng: 77.209,
      label: "New Delhi"
    },
    end: { 
      lat: -1.2921, 
      lng: 36.8219,
      label: "Nairobi"
    }
  },
  {
    start: { 
      lat: 40.7128, 
      lng: -74.0060,
      label: "New York"
    },
    end: { 
      lat: 51.5074, 
      lng: -0.1278,
      label: "London"
    }
  },
  {
    start: { 
      lat: 40.7128, 
      lng: -74.0060,
      label: "New York"
    },
    end: { 
      lat: 34.0522, 
      lng: -118.2437,
      label: "Los Angeles"
    }
  }
];

interface GlobalNetworkProps {
  title?: string;
  description?: string;
  mapProps?: {
    lineColor?: string;
    showLabels?: boolean;
    animationDuration?: number;
    loop?: boolean;
  };
}

const GlobalNetwork = ({ 
  title = "Global Network",
  description = "i work with teams and clients worldwide. my approach ensures seamless collaboration across continents.",
  mapProps = {}
}: GlobalNetworkProps) => {
  return (
    <section id="experience" className="relative w-full py-24 lg:py-32 bg-[#1a0b2e] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-800/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-['Preahvihear'] font-normal text-white mb-6">
            {title}
          </h2>
          <p className="text-sm md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* WorldMap Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full"
        >
          <WorldMap
            dots={globalConnections}
            lineColor="#0ea5e9"
            showLabels={true}
            animationDuration={2}
            loop={true}
            {...mapProps}
          />
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">6+</div>
              <div className="text-neutral-400 text-sm">Global Connections</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-neutral-400 text-sm">Worldwide Availability</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">∞</div>
              <div className="text-neutral-400 text-sm">Limitless Collaboration</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalNetwork;