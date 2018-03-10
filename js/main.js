$(document).ready(function() {
  const $inputUrl = $('input.url');
  const $responseField = $('div.response');
  const btnEl = $('button[class*="btn"]');
  const apiUrl = 'https://www.googleapis.com/urlshortener/v1/url';
  const apiKey = 'AIzaSyBlpQ2OF5x79WMdyKimcxxtRldmEKGldaQ';

  function shortenUrl() {
    const urlWithKey = apiUrl + '?key=' + apiKey;
    const urlToShorten = $inputUrl.val();
    $.ajax({
      url: urlWithKey,
      type: 'POST',
      data: JSON.stringify({longUrl: urlToShorten}),
      dataType: 'json',
      contentType: 'application/json',
      success(response) {
        $responseField.append('<p>Your shortened url is: </p><p>' + response.id + '</p>');
      },
      error(jqXHR, status, errorThrown) {
        console.log(jqXHR);
      }
    });
  }

  function expandUrl() {
    const urlWithKey = apiUrl + '?key=' + apiKey + '&shortUrl=';
    const urlToExpand = urlWithKey + $inputUrl.val();
    $.ajax({
      url: urlToExpand,
      type: 'GET',
      dataType: 'json',
      success (response) {
        $responseField.append('<p>Your expanded url is: </p><p>' + response.longUrl + '</p>');
      },
      error (jqXHR, status, errorThrown) {
        console.log(jqXHR);
      }
    });
  }

  btnEl.on('click', function(e) {
    e.preventDefault();
    $responseField.empty();
    if (e.target.className === 'btn btn-shorten') {
      shortenUrl();
    } else {
      expandUrl();
    }
  });

});
