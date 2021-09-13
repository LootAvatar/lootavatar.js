# lootavatar.js
lootavatar.js (based on loot.js) is a library that allow you to interact with LootAvatar contracts.


## Install

```Shell
npm install --save loot.js
```

## Get started

```javascript
var LootAvatar = require('lootavatar.js');

let lootAvatar = new Loot("http://localhost:8545");

// 👁️ Bag #1
var bag = await lootAvatar.bag(1);
console.log(bag);
/*
{
  id: 1,
  chest: 'Stately Cloak of Vengeance',
  foot: "Archmage's Buskin of Shelter",
  head: 'Pirate hat',
  neck: 'Ruby of the Demigod',
  facial: "I'm an avatar",
  weapon: 'Hammer of the Demigod'
}
*/

```