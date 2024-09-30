import Image from "next/image";

interface WeatherIconProps {
  weatherIcon: string | null;
  width: number;
  height: number;
  priority?: boolean;
}

const WeatherIcon = ({
  weatherIcon,
  width,
  height,
  priority = false,
}: WeatherIconProps) => {
  if (!weatherIcon) {
    return null;
  }

  return (
    <Image
      src={weatherIcon}
      alt="Weather icon"
      width={width}
      height={height}
      priority={priority}
    />
  );
};

export default WeatherIcon;
