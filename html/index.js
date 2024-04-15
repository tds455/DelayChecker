// Middleware URL is hard-coded for now, but may change to be passed as a docker environment variable.
let apiUrl = 'https://us-central1-delaychecker-412510.cloudfunctions.net/FlightAwareAPIv3?'
// Initialise regex to be used for input validation
let regex = /^[A-Za-z]+$/;
let regexNum = /^[0-9]*$/;
// Initialse global HTML variables
const footer = document.getElementById("FooterText")
const loading = document.getElementById("loading")

function InputValidation() {

  // Clear any previous results and messages
  const element = document.getElementById("ResponseCards");
  element.textContent = ""
  const footer = document.getElementById("FooterText")
  footer.textContent = "᠎"

  // Remove any non-numerical characets from FlightInput
  // We still need to allow input of alphanumerical characters so users can use callsigns
  const FlightInput =  document.getElementById('FormInputFlight').value.replace(/\D/g,'')
  
  // Perform Input Validation on AirportInput
  const AirportInput =  document.getElementById('FormInputAirport').value

  // Reject any non a-Z inputs
  if((regex.test(AirportInput))&&(regexNum.test(FlightInput))) {
    // Pass input to BuildParams function
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
  // NOTE - DUE TO API ISSUES DATE RANGE IS CURRENT 4-12 DAYS PRIOR.
  // THIS IS INTENDED TO BE 3-30 DAYS.
  let StartDate = DaysAgo(12).toISOString().slice(0, 10);

  // Create params object
  let params = {
    "AirportIATA": AirportInput,
    "FlightNumber": FlightInput,
    "StartDate": StartDate,
    "EndDate": EndDate,
  }

  // Pass Parameters to MakeRequest function for middleware api call
  let data = await MakeRequest(params)

  // If response contains no values and therefore has property "error"
  // Return an error message
  if (data.hasOwnProperty("error")) {
    footer.textContent = "No records found"
    // Remove loading spinner and reenable submit button
    ToggleSpinner()
    ToggleSubmit()
  }
  else {
    // Pass response data to CreateCards function
    await CreateCards(data)
    // Remove loading spinner and reenable submit button
    ToggleSpinner()
    ToggleSubmit()
  }
}

async function MakeRequest(params)  { 
  // Add loading spinner while request in progress
  ToggleSpinner()

  // Disabled submit button
  ToggleSubmit()

  // Build parameters string to be appended to GET request
  let ParamsStr = apiUrl+"code="+params["AirportIATA"]+"&type=arrival&"+"date_from="+params["StartDate"]+"&date_to="+params["EndDate"]+"&flight_number="+params["FlightNumber"]
  // Await response from middleware API
  const response = await fetch(ParamsStr);

  // If an error message is recieved, pass textcontent to HTML
  if (!response.ok) {
    footer.textContent = response.textContent 
    // Remove loading spinner  
    ToggleSpinner()
    // Reenable submit button
    ToggleSubmit()
  }
  else {
    // If successful response received, convert to JSON and return
    const data = await response.json()
    return data
  } 
  
  }

async function CreateCards(data) {

    // Link HTML element where cards will be placed
    const element = document.getElementById("ResponseCards");

    // Iterate over each object in the response JSON.
    data.forEach(item => {

      // Skip item if status is not "landed"
      if (item.status === "landed") {

        // Info required for each entry taken from response JSON.
        airlineName = item.airline.name
        flightNumber = item.flight.number
        arrivalDate = item.arrival.actualTime
        departureDate = item.departure.actualTime
  
        // Not all entries have an "actualTime" - skip if not present
        if ((!arrivalDate)||(!departureDate)) {
          return 0
        }
  
        // Format dates to YYYY-MM-DD HH-MM format and remove any unneccesary characters
        arrivalDate = arrivalDate.slice(0,16).replace("t"," ")
        departureDate = departureDate.slice(0,16).replace("t"," ")
  
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

      }
      else {
        return
      }

    })
    }
function NewCard() {

    // Create each Card as a card and column to ensure correct layout.
    const Card = document.createElement('div');
    
    // Overwrite any bootstrap padding values
    Card.classList.add('card', 'col-4', 'p-0', 'text-center', 'mt-4');
    
    // Create CardBody element to contain text elements
    const CardBody = document.createElement('div');
    CardBody.classList.add('card-body');
    CardBody.textcontent = "";

    // Add CardTitle1 and CardText1 as h5 elements
    const CardTitle1 = document.createElement('h5')
    CardTitle1.classList.add('card-title')

    const CardText1 = document.createElement('h5')
    CardText1.classList.add('card-text')
 

    // Append children to appropiate parent element
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

function ToggleSpinner() {
  // Toggle status of loading spinner
  loading.classList.toggle('spinnerHidden')
}

function ToggleSubmit() {
  // Toggle disabled state on submit button
  // Disable submit button
  const SubmitButton = document.getElementById("SubmitButton")
  if (SubmitButton.hasAttribute("disabled")) {
    SubmitButton.removeAttribute("disabled")
    SubmitButton.textContent = "Submit"
  }
  else {
    SubmitButton.setAttribute("disabled","")
    SubmitButton.textContent = "Please Wait"
  }
}