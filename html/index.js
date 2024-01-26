// Define the API URL
const apiUrl = 'https://api.example.com/data';

// Make a GET request
fetch(ahttps://aviation-edge.com/v2/public/flightsHistory?key=[API_KEY]&type=departure
&date_from=YYYY-MM-DD&date_to=YYYY-MM-DD&flight_number=[1234])
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