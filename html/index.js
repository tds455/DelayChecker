// Middleware URL is hard-coded for now, but may change to be passed as a docker environment variable.
let apiUrl = 'https://asia-northeast2-delaychecker-412510.cloudfunctions.net/FlightAwareAPIv2?'
let regex = /^[A-Za-z]+$/;
const footer = document.getElementById("FooterText")
const loading = document.getElementById("loading")

function InputValidation() {

  // Clear any previous results and messages
  const element = document.getElementById("ResponseCards");
  element.textContent = ""
  const footer = document.getElementById("FooterText")
  footer.textContent = "᠎"

  // Input validation is performed in HTML for FlightInput
  const FlightInput =  document.getElementById('FormInputFlight').value 
  
  // Perform Input Validation
  const AirportInput =  document.getElementById('FormInputAirport').value
  if(regex.test(AirportInput)) {
    BuildParams(AirportInput, FlightInput)
  }
  else {
    const footer = document.getElementById("FooterText")
    footer.textContent = "Incorrect input detected"
    // Update HTML footer to show error message
  }
}

async function BuildParams(AirportInput, FlightInput) {

  // Find Date range and convert to YYYY-MM-DD
  // -4 days from current
  let EndDate = DaysAgo(4).toISOString().slice(0, 10);
  // -12 days from current
  let StartDate = DaysAgo(12).toISOString().slice(0, 10);

  // Create params object
  let params = {
    "AirportIATA": AirportInput,
    "FlightNumber": FlightInput,
    "StartDate": StartDate,
    "EndDate": EndDate,
  }

  // Pass Parameters
  let data = await MakeRequest(params)

  if (data.hasOwnProperty("error")) {
    footer.textContent = "No records found"
    RemoveSpinner()
  }
  else {
    CreateCards(data)
  }

  
  

  // if response = error
  // Update footer to show error message

  // Otherwise, CreateCards()
  
}

async function MakeRequest(params)  { 

  AddSpinner()

  let ParamsStr = apiUrl+"code="+params["AirportIATA"]+"&type=arrival&"+"date_from="+params["StartDate"]+"&date_to="+params["EndDate"]+"&flight_number="+params["FlightNumber"]
  const response = await fetch(ParamsStr);

  if (!response.ok) {
    footer.textContent = response   
    RemoveSpinner()
  }
  else {
    const data = await response.json()
    return data
  } 
  


  // Catch Errors
  // const footer = document.getElementById("FooterText")
  // footer.textContent = "᠎"



  // fetch(apiUrl)  
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //       console.log("Error")
  //       // Set footer to show error message
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     // For now log data to console while testing
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });
  }

function CreateCards(data) {

    
  
    // Link HTML element where cards will be placed
    const element = document.getElementById("ResponseCards");


    // Iterate over each object in the response JSON.
    data.forEach(item => {

      // Info required for each entry taken from response JSON.
      departureDate = item.departure.actualTime.slice(0,16).replace("t"," ")
      airlineName = item.airline.name
      flightNumber = item.flight.number
      arrivalDate = item.arrival.actualTime.slice(0,16).replace("t"," ")
      // arrivalDate = arrivalDate
      // Check if departure or arrival delays have returned as "undefined" - If so set as 0
      if (item.departure.delay === undefined) {
        departureDelay = 0+" Minutes"
      }
      else {
        departureDelay = item.departure.delay+" Minutes"
      }
      if (item.arrival.delay === undefined) {
        arrivalDelay = 0+" Minutes"
      }
      else {
        arrivalDelay = item.arrival.delay+ " Minutes"
      }
      

      // Create Row for each object
      const row = document.createElement('div');
      // Add bootstrap class "row"
      row.classList.add('row');

      // Call the NewCard function which creates an object with the classes "Card col-sm" and "card-body".
      // This will create aligned elements that only require innerHTML to be updated.
      
      // Create Card 1 which displays Airline info and Flight number
      // Appends each card to the row element.
      Card1 = NewCard()
      Card1.children[0].children[0].innerHTML = "Airline Name: "+"<br />"+airlineName
      Card1.children[0].children[1].innerHTML = "<br />"+"Flight Number: "+"<br />"+flightNumber;
      row.appendChild(Card1);
      
      // Create Card 2 which displays Departure date/time and delay.
      Card2 = NewCard()
      Card2.children[0].children[0].innerHTML = "Departure Time: "+"<br />"+departureDate;
      Card2.children[0].children[1].innerHTML = "Departure Delay: "+"<br />"+departureDelay;
      row.appendChild(Card2);

      // Card 3 - Time of arrival, Arrival delay
      Card3 = NewCard()
      Card3.children[0].children[0].innerHTML = "Arrival Time: "+"<br />"+arrivalDate
      Card3.children[0].children[1].innerHTML = "Arrival Delay: "+"<br />"+arrivalDelay;
      row.appendChild(Card3);

      // Append the row to the main element.
      element.appendChild(row);
      RemoveSpinner()
    })
    }
function NewCard() {

    // Create each Card as a card and column to ensure correct layout.
    const Card = document.createElement('div');
    Card.classList.add('card', 'col-4', 'pl-0', 'pr-0', 'text-center', 'mt-4');
    const CardBody = document.createElement('div');
    CardBody.classList.add('card-body');
    CardBody.textcontent = "";
    // Add element h5 class card-title
    const CardTitle1 = document.createElement('h5')
    CardTitle1.classList.add('card-title')
    CardTitle1.textcontent = "";
   // add element p class card-text
    const CardText1 = document.createElement('h5')
    CardText1.classList.add('card-text')
    CardText1.textContent = "";
    CardBody.appendChild(CardTitle1)
    CardBody.appendChild(CardText1)
    Card.appendChild(CardBody)
    return Card
}

function DaysAgo(n) {
    // Calculate n days in the past
    date = new Date()
    date.setDate(date.getDate() - Math.abs(n))
    date
    return date
}

function RemoveSpinner() {
  loading.classList.remove('hidden0')
  loading.classList.add('hidden1') 
}

function AddSpinner() {
  loading.classList.remove('hidden1')
  loading.classList.add('hidden0') 
}