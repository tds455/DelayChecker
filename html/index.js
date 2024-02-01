
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

  // Handle CORS
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
      const row = document.createElement('div');
      row.classList.add('row');
      
      const container = document.createElement('div');
      container.classList.add('col-sm-6 mb-3 mb-sm-0');

      const card = document.createElement('div');
      card.classList.add('card');

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const body = document.createElement('p');
      body.textContent = item.airline.name;

      row.appendChild(container);
      container.appendChild(card);
      card.appendChild(cardBody);
      cardBody.appendChild(body);
      element.appendChild(row);
    })
    // For Item in Json
    // Create CARD [0.arrival.date]
    // Create CARD HTMLtext+[1.arrival.delay]
}