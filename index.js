var fs = require('fs');
var Steam = require('steam');
var SteamTotp = require('steam-totp');

if (fs.existsSync('servers')) {
  Steam.servers = JSON.parse(fs.readFileSync('servers'));
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
      currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

var steamClient = new Steam.SteamClient();
var steamUser = new Steam.SteamUser(steamClient);
var steamFriends = new Steam.SteamFriends(steamClient);

const config = (() => {
  if (!fs.existsSync('./config.json')) {
      console.error('Config file does not exist or path to it is wrong!');
  }

  let configjson;
  try {
      configjson = JSON.parse(fs.readFileSync('./config.json').toString());
  } catch (err) {
      console.error(`Couldn't load the cfg file: ${err}`);
  }

  return configjson;
})();

steamClient.config = config;

var steamauthcode = SteamTotp.generateAuthCode(config.sharedsecret);

steamClient.connect();
steamClient.on('connected', function() {
  steamUser.logOn({
    account_name: config.username,
    password: config.password,
    two_factor_code: steamauthcode
  });
});

steamClient.on('logOnResponse', function(logonResp) {
  if (logonResp.eresult == Steam.EResult.OK) {
    console.log('Logged in!');
    steamFriends.setPersonaState(Steam.EPersonaState.Online);
    sleep(1000);
    while (true) {
      if (config.wtext == "1") {
        steamUser.gamesPlayed( { 
          games_played: [ 
            { game_id: '440', game_extra_info: config.rpctext1 }
          ] } );
        sleep(150);
        steamUser.gamesPlayed( { 
          games_played: [ 
          ] } );
        sleep(150);
        steamUser.gamesPlayed( { 
          games_played: [ 
            { game_id: '630', game_extra_info: config.rpctext2 }
          ] } );
        sleep(150);
        steamUser.gamesPlayed( { 
          games_played: [ 
            { game_id: '235780', game_extra_info: config.rpctext3 }
          ] } );
        sleep(150);
        steamUser.gamesPlayed( { 
          games_played: [ 
          ] } );
        sleep(150);
      }
      else {
        steamUser.gamesPlayed( { 
          games_played: [ 
            { game_id: '440' }
          ] } );
        sleep(150);
        steamUser.gamesPlayed( { 
          games_played: [ 
          ] } );
        sleep(150);
        steamUser.gamesPlayed( { 
          games_played: [ 
            { game_id: '630' }
          ] } );
        sleep(150);
        steamUser.gamesPlayed( { 
          games_played: [ 
            { game_id: '235780' }
          ] } );
        sleep(150);
        steamUser.gamesPlayed( { 
          games_played: [ 
          ] } );
        sleep(150);
      }
    }
  }
  else 
  {
    console.log("Failed to log in!");
    console.log(logonResp.eresult);
    sleep(2500);  
  }
});

steamClient.on('servers', function(servers) {
  fs.writeFileSync('servers', JSON.stringify(servers));
});
