## DelayChecker

NOTE: search for all INSERT and update before publishing

DelayChecker checks a flight's history and displays how many times it has been delayed in the past 30 days.
Each listing shows the flight's delay on arrival and departure.

DelayChecker is built with vanilla JS, HTML and Bootstrap CSS for styling.  It uses a middleware API built using Python and GCP cloud functions to connect with an API provided by Aviation-Edge.

##### CI/CD

All branch commits are built to a local test server using Jenkins and Docker.
Merges to the main branch are automatically built and deployed to a GCP cloud run container.
A Jenkinsfile and Dockerfile were used as part of the CI/CD process.  As any continued development will be entirely contained within branches the Jenkinsfile has now been removed from the main branch.

##### Demonstration

Unfortunately I no longer have access to the aviation-edge API whose functionality DelayChecker was built on, so I have produced a video that demonstrates the basic functionality of DelayChecker.

https://www.youtube.com/watch?v=_W1hA_CPxlI

Please note at one point the project was renamed to FlightAware before realising it was the name of an existing related product.  This name is used in the video and may be referenced at times in code.  The name of the project is DelayChecker.

## How to deploy

A Dockerfile is located at the root of the repository.  It can be deployed with the commands.

```
git clone https://github.com/tds455/DelayChecker.git
cd DelayChecker
docker build -t delaychecker .
docker run -p 8080:80 delaychecker
```
Adjust the port mapping to your own requirements.

An image is also kept available at https://hub.docker.com/r/tom455/delaychecker

## Development process and issues

The initial concept for DelayChecker was to fill a niche that did not seem to be covered by existing commercial aviation websites - Information on a past flight's delays to make informed decisions on bookings.

I located an API with the required information (aviation-edge) and made use of their 1 month trial to build the project

##### Reasons for choosing a SPA

As the information is provided in JSON format and the data that needs to be  displayed in the front-end is relatively light, I decided vanilla JS with bootstrap css would be suitable.
This also has the advantage of making the website mobile-friendly.

##### Issues with APIkey

As the APIkey must be passed as an argument in the api request it will be publicly visible to anyone using DelayChecker.

In order to hide the APIkey I decided to create a GCP cloud function using Python that runs on demand to act as middleware and insert the APIkey into requests.
I built using the lightweight functions-framework.

Using this method removes the CORS header from any response, so I modified the middleware API to replace the CORS header before passing the response.

##### Missing information in requests

The response object is processed by looping through each item inside the object and referencing it's properties.
Sometimes an item will be missing an actualTime value on it's arrival or delay sections which was causing the script to fail and prevent any further information from being displayed.  I added checking for this property to ignore items where these values are missing.

