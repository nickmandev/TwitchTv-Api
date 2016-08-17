function apiCallStreams(streamer) {
  var account = [];
  var channel = [];
  $.getJSON("https://api.twitch.tv/kraken/streams/" + streamer)
    .error(function(error) {
      account.push({
        "status": "Account closed",
        "name": streamer,
        "logo": "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F"
      })
      userData(account)
    })
    .done(function(value) {
      if (value["stream"] === null) {
        channel.push(value["_links"]["channel"])
      } else {
        account.push({
          'status': value["stream"]["game"] + value["stream"]["channel"]["status"],
          "name": value["stream"]["channel"]["display_name"],
          'logo': value["stream"]["channel"]["logo"],
          'url': value["stream"]["channel"]["url"],
        })
      }
      secondJsonRequest(channel, account);
      userData(account)
    })
};

function secondJsonRequest(channel, account) {
  $.getJSON(channel)
    .done(function(value) {
      account.push({
        "status": "Offline",
        "name": value["display_name"],
        "logo": value["logo"],
        "url": value["url"]
      })
      userData(account)
    })
};

function userData(account) {

  $.each(account, function(i, val) {
    var table = $("#stream");
    table.find('#tbody')
    table.append($("<tr>")
        .addClass("info")
        .addClass("myStyle")
        .append($("<td>")
          .append($("<img>")
            .attr("src", account[i]["logo"])
            .addClass("img-small")))
       .append($("<td>")
            .append($("<a>")
            .attr("href", account[i]["url"])
            .attr("target", "_blank")
            .text(account[i]['name'])))
       .append($("<td>")
             .append($("<p>")
             .addClass("textStyle")
             .text(account[i]["status"])))
 
             
      
    );

  });

};
$(document).ready(function() {
  var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
  for (var i = 0; i < streamers.length; i++) {
    apiCallStreams(streamers[i]);
  }

});