// gets the HTML components into the script file to be manipulated: 
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader');

// setting the apiQuotes variable (we do let as we are changing the value)
let apiQuotes = []
// if first api goes down ues this
let apiQuotes2 = []

// This function will show when we are loading
function loading() {
    // this hidden attribute will unhine the loader element 
    loader.hidden = false;
    // this hidden attribute will hide the quote container
    quoteContainer.hidden = true;
}

// Hide Loading when the loading is complete
function complete() {
    // this hidden attribute will unhine the quote container
    quoteContainer.hidden = false;
    // this hidden attribute will hid the loader element 
    loader.hidden = true;
}


// Show New Quote (pass a quote paramater)
function newQuote(quotes) {
    // call the loading function as when we push the button we can show it loading
    loading();
    // Math.random() gets a random number between 0 and 1 and Math.floor() returns the largest integer less that or equal to a given number (i.e. it gets a whole number)
    // Pick a random quote from apiQuotes array. We times the random figure by the quotes array length and then use math.floor to make sure it is a whole number
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    // check if Author fild is blank and replace it with 'Unknown'
    if (!quote.author) {
        // set the author text content to be unknown
        authorText.textContent = 'Unknown'
        // if we do have an author quote value
    } else {
        // set the text of the authore to the authore 
        authorText.textContent = quote.author;
    }
    // Check Quote Length to determine styling
    if (quote.text.length > 120) {
        // if the quote is above 120 words then we add the long quote css styling 
        quoteText.classList.add('long-quote');
        // if the quote text length is shorter than 120
    } else {
        // if the quote is less than 120 words then we remove the long quote css styling 
        quoteText.classList.remove('long-quote');
    }
    // this will set the value of the text content to the text
    quoteText.textContent = quote.text;
    // hide the loader
    complete();
}

// Get Quotes From API - https://type.fit/api/quotes (to check if it is working https://zenquotes.io/api/random)
// (we are using an async function so the page can still be loaded while waiting for the API to get the quotes)
async function getQuotes() {
    // call the loading function
    loading();
    // getting the quotes 
    const apiUrl = 'https://type.fit/api/quotes';
    // if first api goes down ues this
    const apiUrl2 = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    // we are generating the quote and putting it in a try statement
    try {
        // this constant will not be populated until we fetch the data from out API
      const response = await fetch(apiUrl);
        //  we are setting a global variable here. What this means is we ar getting the JSON from the response and converting it into JavaScript
      apiQuotes = await response.json();
        //   call the new quote function 
      newQuote(apiQuotes);
    } catch (error) {
        // if first api goes down ues this
        const response2 = await fetch(apiUrl2);
        apiQuotes2 = await response2.json();
        newQuote(apiQuotes2);
    }
}

// The function allows you to Tweet a Quote
function tweetQuote() {
    // this will be a template string and after the ? we add the query paramaters i.e. text and author
    // you can read more about this here: https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    // this allows us to open a new window with our twitterURL as the URL. '_blank' allows the window to open in a new tab
    window.open(twitterURL, '_blank');
}

// Event Listeners
// When the New Quote button is clicked we run the newQuote function 
newQuoteBtn.addEventListener('click', getQuotes);
// When the New Twitter button is clicked we run the tweetQuote function 
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();