
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
      departureDelay = item.departure.delay
      arrivalDate = item.arrival.actualTime
      arrivalDelay = item.arrival.delay

      // Create Row 
      const row = document.createElement('div');
      row.classList.add('row');
      // Create Each card in it's own column
      
      Card1 = NewCard()
      Card1.children[0].innerHTML = "Airline Name: "+airlineName+"<br />"+"Flight Number: "+flightNumber;
      row.appendChild(Card1);
      

      Card2 = NewCard()
      Card2.children[0].innerHTML = "Departure Time: "+departureDate+"<br />"+"Departure Delay: "+departureDelay;
      row.appendChild(Card2);

      // Card 3 - Time of arrival, Arrival delay
      Card3 = NewCard()
      Card3.children[0].innerHTML = "Arrival Time: "+arrivalDate+"<br />"+"Arrival Delay: "+arrivalDelay;
      row.appendChild(Card3);

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