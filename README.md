## FlightAware

NOTE: search for all INSERT and update before publishing

FlightAware checks a flight's history and displays how many times it has been delayed in the past 30 days.
Each listing shows the flight's delay on arrival and departure.

FlightAware is built with vanilla JS, HTML and Bootstrap CSS for styling.  It uses a middleware API built using Python and GCP cloud functions to connect with an API provided by Aviation-Edge.

##### CI/CD

All branch commits are built to a local test server using Jenkins and Docker.
Merges to the main branch are automatically built and deployed to a GCP cloud run container.

##### Demonstration Video

It is possible the application will lose access to the Aviation-Edge api in the future, so I have prepared a video demonstrating the application's functionality and discussing the design process.

## How to deploy

A Dockerfile is located at the root of the repository.  It can be deployed with the command

```
docker run INSERT
```

Adjust the port mapping to your own requirements.

An image is also kept available at INSERT
## Development process and issues

The initial concept for FlightAware was to fill a niche that did not seem to be covered by existing commercial aviation websites - Information on a past flight's delays to make informed decisions on bookings.

I located an API with the required information (aviation-edge) and made use of their 1 month trial to build the project

##### Reasons for choosing a SPA

As the information is provided in JSON format and the data that needs to be  displayed in the front-end is relatively light, I decided vanilla JS with bootstrap elements would be suitable.
This also has the advantage of making the website mobile-friendly.
##### Issues with APIkey

As the APIkey must be passed as an argument in the api request it will be publicly visible to anyone using FlightAware.

In order to hide the APIkey I decided to create a GCP cloud function using Python that runs on demand to act as middleware and insert the APIkey into requests.
I built using the lightweight functions-framework.

Using this method removes the CORS header from any response, so I modified the middleware API to replace the CORS header before passing the response.

##### Missing information in requests

The response object is processed by looping through each item inside the object and referencing it's properties.
Sometimes an item will be missing an actualTime value on it's arrival or delay sections which was causing the script to fail and prevent any further information from being displayed.

