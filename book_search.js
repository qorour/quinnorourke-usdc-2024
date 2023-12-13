/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    
    var result = { // base case if there's none found w/ search term, will update below if book objects found
        "SearchTerm": searchTerm,
        "Results": []
    };
    if (typeof scannedTextObj !== 'object' || Object.keys(scannedTextObj).length === 0) { // checking that scannedtext is valid, has values, and can be iterated through
        return result
    }
    
    // Verified we can begin our search, go through each book and check if the text has the searchterm.
    for(const book of scannedTextObj) {
        if (!book || !book.Content || book.Content.length === 0) { // checks for edge cases/inputs and skips them if found
            continue;
        }
        //console.log(`Checking book: ${book.Title}`);
        for(const content of book.Content) {
            //console.log(`Checking content - Page: ${content.Page}, Line: ${content.Line}`);
            if(content.Text.includes(searchTerm)) {
                //console.log(`Match found - Page: ${content.Page}, Line: ${content.Line}`);
                result.Results.push({
                    "ISBN": book.ISBN,
                    "Page": content.Page,
                    "Line": content.Line
                });
            }
        }
    }
    //console.log("Final result:", result);
    return result;
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** Let's also check for base cases/edge cases */

/** We should check for if the provided books is empty/null */
const test3result = findSearchTermInBooks("the", {}); 
if (test3result.Results.length == 0) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test3result.Results.length);
}

/** We should check for if the book exists but has no content/content is empty */

const nothingBurger = [
    {
        "Title": "Nothing Burger",
        "ISBN": "123456789"
    }
]
const nothingBurger2 = [
    {
        "Title": "Nothing Burger Text",
        "ISBN": "123456789",
        "Content":[]
    }
]

const test4result = findSearchTermInBooks("the", nothingBurger); 
if (test4result.Results.length == 0) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test4result.Results.length);
}

const test5result = findSearchTermInBooks("the", nothingBurger2); 
if (test5result.Results.length == 0) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test5result.Results.length);
}