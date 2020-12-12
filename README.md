# Enpicom Technical Assignment

## Authors
- Rick Berkers
- Steven Liebregt

## Getting Started

*All the commands are to be run in the root of the cloned repository, unless otherwise specified.*

### Prerequisites

- Node.js version 10 or higher

### Installing

- Clone this repository
- Run `npm install` to install the required packages

## Running the Application

*If you wish to change the port of the web server you'll need to edit the `port` variable in `src/app.ts`, by default it is 5000.*

**Dev mode**

1. Run the application with `npm run dev`

**Prod mode**

1. Build the application with `npm run build`
2. Run the application with `npm run start`

## Running the Tests

1. Run the tests with `npm run test`

## Possible Improvements and Changes
- http overhead? 
- compressing data? 
- multicores/multithread? 
- faster language?
- no instant result rest, but send it to event/message bus and notify user when done? (TODO: Add diagram)

