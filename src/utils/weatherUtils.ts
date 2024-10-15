export const getWindStrength = (windspeed) => {
  if (windspeed >= 0 && windspeed <= 5) {
    return "Calm"; // 0–5 kph
  } else if (windspeed >= 6 && windspeed <= 19) {
    return "Light Breeze"; // 6–19 kph
  } else if (windspeed >= 20 && windspeed <= 29) {
    return "Gentle Breeze"; // 20–29 kph
  } else if (windspeed >= 30 && windspeed <= 39) {
    return "Moderate Breeze"; // 30–39 kph
  } else if (windspeed >= 40 && windspeed <= 50) {
    return "Fresh Breeze"; // 40–50 kph
  } else if (windspeed >= 51 && windspeed <= 61) {
    return "Strong Breeze"; // 51–61 kph
  } else if (windspeed >= 62 && windspeed <= 74) {
    return "High Wind / Gale"; // 62–74 kph
  } else if (windspeed >= 75 && windspeed <= 88) {
    return "Strong Gale"; // 75–88 kph
  } else if (windspeed >= 89 && windspeed <= 102) {
    return "Storm"; // 89–102 kph
  } else if (windspeed >= 103 && windspeed <= 117) {
    return "Violent Storm"; // 103–117 kph
  } else if (windspeed >= 118) {
    return "Hurricane"; // 118+ kph
  } else {
    return "Unknown"; // Catch-all for unexpected values
  }
};

export const getRainfallIntensity = (rainfall) => {
  if (rainfall == 0) {
    return null;
  }

  if (rainfall < 2.5) {
    return "Light";
  } else if (rainfall >= 2.5 && rainfall < 7.6) {
    return "Moderate";
  } else if (rainfall >= 7.6 && rainfall < 50) {
    return "Heavy";
  } else {
    return "Violent";
  }
};
