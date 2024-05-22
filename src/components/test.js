


const test = () => {

  const givenDate = new Date("2024-05-22");

  const currentDate = new Date(); 

  console.log(givenDate)
  console.log(currentDate)

  if (givenDate.getDate() === currentDate.getDate()) {
    console.log(true)
  } else {
    console.log(false)
    console.log(givenDate.getDate())
    console.log(currentDate.getDate())
  }
}

test()