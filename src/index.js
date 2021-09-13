const ethers = require("ethers");
const { lootAvatarABI } = require("./abi.js");
const lootAvatarAddress = "0xa1FEb9617dC1a5e7c569D51bd53d31cc4306A32b";

class LootAvatar {
  constructor(rpcProvider) {
    const rpc = new ethers.providers.JsonRpcProvider(rpcProvider);
    const lootAvatar = new ethers.Contract(
      lootAvatarAddress,
      lootAvatarABI,
      rpc
    );

    this.lootAvatar = lootAvatar;
  }

  async bag(lootAvatarId) {
    if (lootAvatarId > 0) {
      const [chest, foot, head, neck, facial, weapon] = await Promise.all([
        this.lootAvatar.getChestArmor(lootAvatarId),
        this.lootAvatar.getFootArmor(lootAvatarId),
        this.lootAvatar.getHeadArmor(lootAvatarId),
        this.lootAvatar.getNecklaces(lootAvatarId),
        this.lootAvatar.getFacial(lootAvatarId),
        this.lootAvatar.getWeapon(lootAvatarId)
      ]);

      let bag = {
        id: lootAvatarId,
        chest: chest[0],
        foot: foot[0],
        head: head[0],
        neck: neck[0],
        facial: facial[0],
        weapon: weapon[0]
      };

      return bag;
    }

    return {};
  }

  async numberOfBagsInWallet(address) {
    let balance = await this.lootAvatar.balanceOf(address);

    return balance.toNumber();
  }

  async lootAvatarIdsInWallet(address) {
    const numberOfBags = await this.numberOfBagsInWallet(address);
    let lootAvatarIds = [];
    let tasks = [];
    for (var i = 0; i < numberOfBags; i++) {
      tasks.push(this.lootAvatar.tokenOfOwnerByIndex(address, i));
    }

    const data = await Promise.all(tasks);
    for (const lootAvatarIdBN of data) {
      lootAvatarIds.push(lootAvatarIdBN.toString());
    }

    return lootAvatarIds;
  }
}

module.exports = LootAvatar;
