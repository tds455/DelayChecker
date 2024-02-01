
// Process form input and create API url

const apiUrl = 'https://asia-northeast2-delaychecker-412510.cloudfunctions.net/FlightAwareAPIv2?code=KIX&type=arrival&date_from=2024-01-15&date_to=2024-01-16&flight_number=711';

// Make a GET request

function InputValidation() {
  // Perform Input Validation

  // Error Checking

  // Pass Parameters
  let response = MakeRequest()

  // if response = error
  // Update footer to show error message

  // Otherwise, CreateCards()

  CreateCards(response)

}

function MakeRequest()  {
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
        // Set footer to show error message
      }
      return response.json();
    })
    .then(data => {
      // For now log data to console while testing
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

function CreateCards(json) {
    console.log(json)

}