import { getCurrentCity } from "@/actions/weather"

export const WeeklyComponent = () => {

  const currentCity = getCurrentCity()
  console.log(currentCity)
  return (
    <div>weeklyComponent</div>

  )
}


