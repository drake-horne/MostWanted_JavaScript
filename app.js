/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'\n",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\ntype the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName() 

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = "First Name: " + person.firstName + "\n";
    personInfo += "Last Name: " + person.lastName + "\n";
    personInfo += "Gender: " + person.gender + "\n";
    personInfo += "Date Of Birth: " + person.dob + "\n";
    personInfo += "Height: " + person.height + "\n";
    personInfo += "Weight: " + person.weight + "\n";
    personInfo += "Eye Color: " + person.eyeColor + "\n";
    personInfo += "Occupation: " + person.occupation + "\n";
    personInfo += "Parents: " + person.parents + "\n";
    personInfo += "Current Spouse: " + person.currentSpouse + "\n";
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);  
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// // End of chars()

// //////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// // Any additional functions can be written below this line 👇. Happy Coding! 😁
function searchFor(trait){
    let input = promptFor(`Enter a ${trait}`, chars)
    return input;
}

function searchBy(trait, thing, people){
    let results = people.filter(function(el){
        if(el[trait] === thing){
            return true;
        }
        else{
            return false;
        }
    })
    return results
}

function searchByMany(list, people){
    let results = people.filter(function(el){
        for(let i=0; i < list.length; i++){
            let category = list[i][0]
            let thing = list[i][1]
            if(el[category] === thing && i === (list.length-1)){
                return true;
            }
            else if(el[list[i][0]] == list[i][1]){
                continue;
            }
            else{
                return false;
            }
        }
    })
    return results
}

function listNames(people, relationship){
    let nameList = people.map(function(el){
        return `\n${el.firstName} ${el.lastName}`
    })
    if(people.length > 0){
        return `\n${relationship}${nameList}\n`      
    }
    else{
        return `\nNo ${relationship} in the system.\n`
    }

}

function findPersonFamily(person, people){
    let personFamily = `${person.firstName} ${person.lastName} family members are:\n`
    personFamily += findPersonSpouse(person, people)
    personFamily += findPersonSiblings(person, people)
    personFamily += findPersonParents(person, people)
    return personFamily
}

function findPersonSpouse(person, people){
    let personSpouse = ``
    let spouse = people.filter(function(el){
        if(person.currentSpouse == el.id){
            return true
        }
        else{
            return false
        } 
    })
    if(spouse.length == 0){
        personSpouse += `\nNo spouse in the system.\n`; 
    }
    else if(spouse.length == 1){
        personSpouse += `\nSpouse:\n${spouse[0].firstName} ${spouse[0].lastName}\n`;
    }
    return personSpouse
}

function findPersonParents(person, people){
    let personParents = ``
    let parents = people.filter(function(el){
        if(person.parents.includes(el.id)){
                return true
            }
            else{
                return false
            }   
        })
       
    let parentList = parents.map(function(el){
        return `\n${el.firstName} ${el.lastName}`
    })
    if(parents.length > 0){
        personParents += `\nParents:${parentList}\n`
    }
    else{
        personParents += `\nNo parents in the system.\n`
        }
    return personParents    
}

function findPersonSiblings(person, people){
    let personSiblings = ``
    let siblings = people.filter(function(el){
        if((person.parents.includes(el.parents[0]) || person.parents.includes(el.parents[1])) && person.id != el.id){
            return true;
        }
        else{
            return false;
        }
    })
    let siblingList = siblings.map(function(el){
        return `\n${el.firstName} ${el.lastName}`
    })
    if(siblings.length > 0){
        personSiblings += `\nSiblings:${siblingList}\n`        
    }
    else{
        personSiblings += `\nNo siblings in the system.\n`
    }
    return personSiblings
}

function findPersonChildren(person, people){
    let children = people.filter(function(el){
        if(el.parents.includes(person.id)){
            return true;
        }
        else{
            return false;
        }
    })
    return children
}

function findPersonDescendants(person,people){
    let descendants = `Descendants: \n`
    let children = findPersonChildren(person, people)
    descendants += listNames(children, 'The Children: ')
    let hasChildren = children.filter(function(el){
        let grandChild = findPersonChildren(el, people)
        if (grandChild.length === 0){
            return false
        }
        else{
            return true
        }
    })
    let grandChildren = hasChildren.map(function(el){
        let grandChild = findPersonChildren(el, people)
        return grandChild
    })
    descendants += listNames(grandChildren[0], 'The Grand Children: ')
    return descendants
}

function searchByTraits(people) {
    let searchOption = promptFor('Would you like to search for one or many traits?(type "one" or "many") ', chars)
    if(searchOption === 'one'){
        return searchBySingleTrait(people);
    }
    else{
        return searchByMultipleTraits(people);
    }
}

function searchBySingleTrait(people){
    let traitSearch = promptFor('What trait do you want to search for? "gender", "eyecolor", "weight", "height", "occupation": ', chars)
    if(traitSearch === 'gender'){
        return searchByGender(people)
    }
    else if(traitSearch === 'eyecolor'){
        return searchByeyeColor(people)
    }
    else if(traitSearch === 'weight'){
        return searchByWeight(people)
    }
    else if(traitSearch === 'height'){
        return searchByHeight(people)
    }
    else if(traitSearch === 'occupation'){
        return searchByOccupation(people)
    }

}

function searchByMultipleTraits(people){
    let genderChoice = prompt(`input "gender":\n press enter to skip or type 'restart' or 'quit'.`);
    let eyeColorChoice = prompt(`input "eyecolor":\n press enter to skip or type 'restart' or 'quit'.`);
    let weightChoice = prompt(`input "weight":\n press enter to skip or type 'restart' or 'quit'.`);
    let heightChoice = prompt(`input "height":\n press enter to skip or type 'restart' or 'quit'.`);
    let occupationChoice = prompt(`input "occupation":\n press enter to skip or type 'restart' or 'quit'.`);
    genderChoice = traitFilter(people, genderChoice)
    eyeColorChoice = traitFilter(people, eyeColorChoice)
    heightChoice = traitFilter(people, heightChoice)
    weightChoice = traitFilter(people, weightChoice)
    occupationChoice = traitFilter(people, occupationChoice)
    let traitMatch;
    if(eyeColorChoice[0] !== undefined){
        traitMatch = people.filter(function(el){
            if(el.eyeColor === eyeColorChoice[0].eyeColor){
                return true;}
        })}
    if(genderChoice[0] !== undefined){
        traitMatch = people.filter(function(el){
            if(el.gender === genderChoice[0].gender){
                return true;}
        })}
    if(heightChoice[0] !== undefined){
        traitMatch = people.filter(function(el){
            if(el.height === heightChoice[0].height){
                return true;}
        })}
    if(weightChoice[0] !== undefined){
        traitMatch = people.filter(function(el){
            if(el.weight === weightChoice[0].weight){
                return true;}
        })}
    if(occupationChoice[0] !== undefined){
        traitMatch = people.filter(function(el){
            if(el.occupation === occupationChoice[0].occupation){
                return true;}
        })}
    return displayPeople(traitMatch);                        

   
}
function traitFilter(people, choice){
    let theTraits = people.filter(function(el){
        if (el.gender === choice || el.eyeColor === choice || el.height === choice || el.weight === choice || el.occupation === choice) {
            return true;
    }})
    return theTraits;
}

function searchByGender(people){
    let genderSelection = promptFor("What is the gender you are searching for?", chars);
    let foundPersons = people.filter(function(person) {
        if (person.gender === genderSelection ) {
            return true;
        }
    });
    return displayPeople(foundPersons);
}
    
function searchByeyeColor(people) {
    let eyeSelection = promptFor("What is the eyecolor you are searching for?", chars);
    let foundPersons = people.filter(function (person) {
        if (person.eyeColor === eyeSelection ) {
            return true;
        }
    });
    return displayPeople(foundPersons);
} 

function searchByWeight(people) {
    let weightSelection = promptFor("What is the weight you are searching for?", chars);
    let foundPersons = people.filter(function (person) {
        if (person.weight === parseInt(weightSelection)) {
            return true;
        }
    });
    return displayPeople(foundPersons);
} 

function searchByHeight(people) {
    let heightSelection = promptFor("What is the height you are searching for?", chars);
    let foundPersons = people.filter(function (person) {
        if (person.height === parseInt(heightSelection)) {
            return true;
        }
    });
    return displayPeople(foundPersons);
} 

function searchByOccupation(people) {
    let occupationSelection = promptFor("What is the occupation you are searching for?", chars);
    let foundPersons = people.filter(function (person) {
        if (person.occupation === occupationSelection ) {
            return true;
        }
    });
    return displayPeople(foundPersons);
} 