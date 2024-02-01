
// Process form input and create API url

let apiUrl = 'https://asia-northeast2-delaychecker-412510.cloudfunctions.net/FlightAwareAPIv2?code=KIX&type=arrival&date_from=2024-01-15&date_to=2024-01-16&flight_number=711';
// Make a GET request

async function InputValidation() {
  // Perform Input Validation

  // Error Checking

  // Pass Parameters
  let data = await MakeRequest()

  // if response = error
  // Update footer to show error message

  // Otherwise, CreateCards()

  CreateCards(data)

}

async function MakeRequest()  { 
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
    const element = document.getElementById("ResponseCards");

    data.forEach(item => {

      // Info required for each entry
      departureDate = item.departure.actualTime
      airlineName = item.airline.name
      flightNumber = item.flight.number
      departureDelay = item.departureDelay
      arrivalDelay = item.arrivalDelay

      // Create Row 

      // Create Each card in it's own column

      // Card 1 - Date, Airline, Flight number

      // Card 2 - Time of departure, Departure delay

      // Card 3 - Time of arrival, Arrival delay
      


      // Original Version 

      // Create div for response data to be placed into
      const row = document.createElement('div');
      // Place each response into a seperate row
      row.classList.add('row');
      
      // Create cards
      const card = document.createElement('div');
      card.classList.add('card-body','card');

      // Populate cards with data from response
      const body = document.createElement('p');
      body.textContent = "Airline: "+item.airline.name;
      body.textContent += "Flight number: "+item.flight.number
      
      const card2 = document.createElement('div');
      card2.classList.add('card-body','card');

      const body2 = document.createElement('p');
      body2.textContent = "Minutes Delay on Depature: "+item.departure.delay;
      body2.textContent += "Time of Departure: "+item.departure.actualTime;


      row.appendChild(card);
      card.appendChild(body);
      row.appendChild(card2);
      card2.appendChild(body2);
      element.appendChild(row);
    })
    // For Item in Json
    // Create CARD [0.arrival.date]
    // Create CARD HTMLtext+[1.arrival.delay]
}