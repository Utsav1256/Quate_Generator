// "https://jacintodesign.github.io/quotes-api/data/quotes.json"
// https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent

const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new_quote");
const twitterBtn = document.getElementById("twitter_btn");
const loader = document.getElementById("loader");
const quoteContainer = document.getElementById("quote_container");
let apiQuates = [];

function newQuates() {
  loading();

  const quote = apiQuates[Math.floor(Math.random() * apiQuates.length)];
  console.log(quote);

  if (quote.text.length > 50) {
    quoteText.classList.add("long_quote");
  } else {
    quoteText.classList.remove("long_quote");
  }
  quoteText.textContent = `${quote.text}`;

  // check if author feild is blank
  if (!quote.author) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = `${quote.author}`;
  }

  complete();
}

// get quates from API
async function getQuates() {
  loading();
  try {
    const response = await fetch(
      "https://jacintodesign.github.io/quotes-api/data/quotes.json"
    );
    apiQuates = await response.json();
    newQuates();
  } catch (error) {
    // console.log(error);
  }
}

// Tweet Quate
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Event Listeners
newQuoteBtn.addEventListener("click", () => {
  newQuates();
});

twitterBtn.addEventListener("click", () => {
  tweetQuote();
});

// on load
getQuates();
