# Idler


## Content
* [Features](#features)
* [Setup](#setup)
* [Credits](#credits)

## Features
* Spam Steam RPC:
![Example 1](https://krypt0n.eu/res/srpcs/1.gif)
![Example 2](https://krypt0n.eu/res/srpcs/2.gif)

## Setup

### What will you need:
1. Steam account AND its [shared secret](https://steamcommunity.com/groups/TradeVise/discussions/2/1621724915764974831/)
2. [Node.js](https://nodejs.org/) and [npm](https://npmjs.com/)

### What to do:
1. Clone / download this repo
2. Run "install.sh"
7. Open the file config.json
8. Fill in the blanks so it looks something like this:
    ```
    {
	"username": "USERNAME",
        "password": "PASSWORD",
        "sharedsecret": "SHARED SECRET",
    ```
9. Run "start.sh"
10. To stop it press Ctrl & C

### Aditional steps to spam custom text
1. Open the file config.json
2. Edit it so it looks something like this:
    ```
        "wtext": "1",
        "rpctext1": "YOUR CUSTOM TEXT HERE",
        "rpctext2": "YOUR CUSTOM TEXT HERE",
        "rpctext3": "YOUR CUSTOM TEXT HERE"
    }
    ```
3. To turn the custom text off, set wtext to 0
 
## Credits
- [RayzrDev](https://github.com/RayzrDev)
  - used his [config loader](https://github.com/RayzrDev/bot-base/blob/master/src/bot.js#L10)
- [Jack Franklin](https://www.sitepoint.com/author/jfranklin/)
  - used his [sleep function](https://www.sitepoint.com/delay-sleep-pause-wait/)
