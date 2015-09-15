var url = "http://charts.spotify.com/api/tracks/most_streamed/us/weekly/latest";

var dataSetProperties = {
  label: 'Spotify Chart of Top 20 Streamed Songs on Spotify with their Steam Count',
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
}

$(function() {
  getSpotifyTracks(success);
});

function extractTop20Tracks(tracks) {
  var topTwentyTracks = [];
  for (var i = 0; i < 20; i++) {
    topTwentyTracks.push(tracks[i]);
  }
  return topTwentyTracks;
}

function extractNumberOfStreams(tracks) {
  var numStreams = []
  tracks.forEach(function(t){
    numStreams.push(t.num_streams)
  })
  return numStreams;
}

function extractNames(tracks) {
  var trackNames = []
  tracks.forEach(function(t){
    trackNames.push(t.track_name)
  })
  return trackNames;
}

function chartData(labels, inputData) {
  dataSetProperties['data'] = inputData;
  var chartData = {
    labels: labels,
    datasets: [dataSetProperties]
  };
  return chartData;
}

function getSpotifyTracks(callback){
  $.ajax(url, {
    dataType: 'JSONP',
    success: function(data) {
      callback(data);
    }
  });
}

function success(parsedJSON) {
  var trackList = extractTop20Tracks(parsedJSON['tracks']);
  var trackNames = extractNames(trackList);
  var trackStreams = extractNumberOfStreams(trackList);
  var data = chartData(trackNames, trackStreams);
  var ctx = $('#spotify-chart').get(0).getContext("2d");
  var myBarChart = new Chart(ctx).Bar(data);
}
