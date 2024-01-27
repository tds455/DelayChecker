
// Process form input and create API url

// const apiUrl = 'https://aviation-edge.com/v2/public/flightsHistory?key=$AEKEY&code=JFK&type=arrival&date_from=2023-12-01&flight_number=4764';

// Make a GET request
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