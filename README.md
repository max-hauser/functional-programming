# Functional Programming

This repository contains my process of the @CMDA-TT Functional Programming course. During this course students are subjected to multiple ways of dealing with (external) datasets, how to clean them and prepare them for further use.

In an attempt to create a realistic environment, students are working with a critically acclaimed newspaper called 'De Volkskrant'. Students will do a preliminary research on datasets from the RDW. With the datasets in mind they'll create a topic which journalists could write an article about. 

## Research Question

**Which garage is in the best for a getaway car in Amsterdam?**

subquestions/criteria:
- Which garages allow payment in cash?
- Which garages allow big cars to enter?
- Which garages are open at all times?
- Which garages are in the best location with regards to getting out of the city?

## expectations

I expect that the most garages are at the edges of the city so there's a good change that most of my results will be away from the city center.

## Highlighted Functional Pattern

To give a glimpse of my code, I've selected an interesting piece to break-down and explain:

``` javascript
// filter out the areaid's if they occur 3 times in the array
  let keyValues = {};

  let canditAreas = cityData.map(area => {
    keyValues[area] = keyValues[area] == null ? 1 : keyValues[area] + 1;
  
    if (keyValues[area] == 3) {
      return area;
    }
  }).filter(area => area != null);
```

First a bit of context. Above this code I've collected areaid's (which are unique values) that correspond with locations of garages, from three different array's and put them all in one variable called ```javascript cityData```. Alright now on with the code example.

To start we'll first create an object with the name keyValues: ```javascript let keyValues = {}```. Next we want to map the areaid's in the ```javascript keyValues```. To make sure not all the areaid are selected to be mapped we'll use a ES6 if else statement. If the keyValue amount is equal to 3 then the area will be returned. This creates an array filled with undefined and some correct areaid's. So lastly we'll filter out the undefined by only keeping the area if they're not null (which also includes undefined).

## Acknowledgements

- The teachers (they give very interesting lectures and adapt well with regards to the CoVid crisis/ working from home situation)
- Nino Schelcher (we give each other feedback and tips during the entire project)
- Stackoverflow (for the occational question)
- MDN Web Docs (for deepdiving and really understanding how something works)
