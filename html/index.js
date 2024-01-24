// Define the API URL
const apiUrl = 'https://api.example.com/data';

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