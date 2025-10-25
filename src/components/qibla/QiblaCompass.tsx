"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "lucide-react";

interface QiblaCompassProps {
  userLat?: number;
  userLng?: number;
}

const MECCA_LAT = 21.4225;
const MECCA_LNG = 39.8262;

function calculateQiblaDirection(lat: number, lng: number): number {
  const toRadians = (deg: number) => (deg * Math.PI) / 180;
  const toDegrees = (rad: number) => (rad * 180) / Math.PI;

  const lat1 = toRadians(lat);
  const lng1 = toRadians(lng);
  const lat2 = toRadians(MECCA_LAT);
  const lng2 = toRadians(MECCA_LNG);

  const dLng = lng2 - lng1;

  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

  let bearing = toDegrees(Math.atan2(y, x));
  bearing = (bearing + 360) % 360;

  return bearing;
}

export function QiblaCompass({ userLat, userLng }: QiblaCompassProps) {
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);

  useEffect(() => {
    if (userLat && userLng) {
      const direction = calculateQiblaDirection(userLat, userLng);
      setQiblaDirection(direction);
    }
  }, [userLat, userLng]);

  useEffect(() => {
    // For devices with compass
    if (window.DeviceOrientationEvent) {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        if (event.alpha) {
          setHeading(360 - event.alpha);
        }
      };

      window.addEventListener("deviceorientation", handleOrientation);
      return () =>
        window.removeEventListener("deviceorientation", handleOrientation);
    }
  }, []);

  const needleRotation = qiblaDirection - heading;

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Compass Circle */}
      <div className="absolute inset-0 glass-card rounded-full border-4 border-primary/20">
        {/* Direction Labels */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-bold">
          K
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-bold">
          G
        </div>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold">
          B
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold">
          D
        </div>

        {/* Center Dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full" />

        {/* Qibla Needle */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 origin-center"
          style={{
            height: "40%",
            marginTop: "-40%",
          }}
          animate={{
            rotate: needleRotation,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          <Navigation className="w-8 h-8 text-primary fill-primary" />
        </motion.div>
      </div>

      {/* Degree Display */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm text-foreground/60 mb-1">Kıble Yönü</p>
        <p className="text-3xl font-bold gradient-text">
          {Math.round(qiblaDirection)}°
        </p>
      </div>
    </div>
  );
}

