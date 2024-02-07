
// Process form input and create API url

let apiUrl = 'https://asia-northeast2-delaychecker-412510.cloudfunctions.net/FlightAwareAPIv2?code=KIX&type=arrival&date_from=2024-01-15&date_to=2024-01-16&flight_number=711';
// Make a GET request

async function InputValidation() {
  // Perform Input Validation
  const AirportInput =  document.getElementById('FormInputAirport').value 
  const FlightInput =  document.getElementById('FormInputFlight').value 
  console.log(AirportInput)
  console.log(FlightInput)
  // Error Checking

  // Find Date range
  // -4 days from current
  let EndDate = daysAgo(4);
  // -30 days from current
  let StartDate = daysAgo(30);


  // Create params object
  let params = {
    "AirportIATA": AirportInput,
    "FlightNumber": FlightInput,
    "StartDate": StartDate,
    "EndDate": EndDate,
  }

  // Step 1 - Airport code

  // Step 2 - Date range

  // Find 4 days in past and then 30 days prior

  // Step 3 Flight #



  // Pass Parameters
  let data = await MakeRequest(params)

  // if response = error
  // Update footer to show error message

  // Otherwise, CreateCards()

  CreateCards(data)

}

async function MakeRequest(params)  { 
  const response = await fetch(apiUrl)

  const data = await response.json()
  return data


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
      departureDate = item.departure.actualTime
      airlineName = item.airline.name
      flightNumber = item.flight.number
      departureDelay = item.departure.delay
      arrivalDate = item.arrival.actualTime
      arrivalDelay = item.arrival.delay

      // Create Row for each object
      const row = document.createElement('div');
      // Add bootstrap class "row"
      row.classList.add('row');

      // Call the NewCard function which creates an object with the classes "Card col-sm" and "card-body".
      // This will create aligned elements that only require innerHTML to be updated.
      
      // Create Card 1 which displays Airline info and Flight number
      // Appends each card to the row element.
      Card1 = NewCard()
      Card1.children[0].innerHTML = "Airline Name: "+airlineName+"<br />"+"Flight Number: "+flightNumber;
      row.appendChild(Card1);
      
      // Create Card 2 which displays Departure date/time and delay.
      Card2 = NewCard()
      Card2.children[0].innerHTML = "Departure Time: "+departureDate+"<br />"+"Departure Delay: "+departureDelay;
      row.appendChild(Card2);

      // Card 3 - Time of arrival, Arrival delay
      Card3 = NewCard()
      Card3.children[0].innerHTML = "Arrival Time: "+arrivalDate+"<br />"+"Arrival Delay: "+arrivalDelay;
      row.appendChild(Card3);

      // Append the row to the main element.
      element.appendChild(row);
    })
    }
function NewCard() {

    // Create each Card as a card and column to ensure correct layout.
    const Card = document.createElement('div');
    Card.classList.add('card', 'col-sm');
    const CardBody = document.createElement('div');
    CardBody.classList.add('card-body');
    CardBody.textconent = "";
    Card.appendChild(CardBody)
    return Card
}

function daysAgo(n) {
    // Calculate n days in the past
    date = new Date()
    date.setDate(date.getDate() - Math.abs(n))
    return date
}