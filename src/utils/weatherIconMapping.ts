import {
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  Wind,
  CloudFog,
  Cloud,
  CloudSun,
  CloudMoon,
  SunMedium,
} from "lucide-react";

export const iconMapping = {
  "clear-day": SunMedium,
  "clear-night": Moon,
  rain: CloudRain,
  snow: CloudSnow,
  wind: Wind,
  fog: CloudFog,
  cloudy: Cloud,
  "partly-cloudy-day": CloudSun,
  "partly-cloudy-night": CloudMoon,
};
