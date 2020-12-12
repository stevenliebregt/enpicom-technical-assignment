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

### Making requests

The following endpoints are available:

`POST @ /dna` with a JSON body containing 
- the key `dna` with a string value consisting of ACTG characters to insert

`POST @ /dna/searches` with a JSON body containing 
- the key `dna` with a string value consisting of ACTG characters to search for
- (optional) the key `maxDistance` with a number value to limit the editing distance of the Levenshtein algorithm

## Running the Tests

1. Run the tests with `npm run test`

## Possible Improvements and Changes

**Processing after receiving request**

Instead of making an HTTP request, and keeping the connection open, we could queue the request, and give the user an id 
back with which he can retrieve the results later (maybe seconds).

**Faster language**

Perhaps a faster language like C++ or Rust might be able to improve the performance of the application, or at least the 
processing part.

**Another algorithm that does not use matrices**

*This depends on the length of the search, and the values in the store*

We assumed that there might be DNA strings with a length of 250 characters, or more. We do not really know how long those 
are, if the Wiki is to be believed, those numbers are way higher, maybe into the millions of characters.

The current algorithm uses a matrix to calculate the minimum editing distance, but constructing a matrix for two 
sequences of 250 characters costs a lot of memory.

**Different storing method**

*We are aware that this way of storing and searching the strings is not optimal. It would be better to use some sort of tree to store the information. This would make the system more optimal for searching.*

