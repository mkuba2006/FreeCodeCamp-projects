

















































document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('text');
    const quoteAuthor = document.getElementById('author');
    const newQuoteButton = document.getElementById('new-quote');
    const tweetButton = document.getElementById('tweet-quote');
  
    let currentQuote = '';
    let currentAuthor = '';
  
    const fetchQuote = async () => {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
        console.log(response);
      currentQuote = data.content;
      currentAuthor = data.author;

      quoteText.textContent = currentQuote;
      quoteAuthor.textContent = currentAuthor;
    };
  
    const handleClick = () => {
      fetchQuote();
    };
  
    const tweetQuote = () => {
      const tweetText = encodeURIComponent(`"${currentQuote}" - ${currentAuthor}`);
      const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
      window.open(tweetUrl, '_blank');
    };
  
    newQuoteButton.addEventListener('click', handleClick);
    tweetButton.addEventListener('click', tweetQuote);
  
    fetchQuote();
  });
  