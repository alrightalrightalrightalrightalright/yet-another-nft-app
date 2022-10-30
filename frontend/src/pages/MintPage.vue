<template>
  <div>
    <div
      class="
        d-flex
        justify-content-between
        flex-wrap flex-md-nowrap
        align-items-center
        pt-3
        pb-2
        mb-3
        border-bottom
      "
    >
      <h1 class="h2">MintPage a new NFT!</h1>
    </div>

    <div class="row mt-8">
      <div class="col-md-6">
        <div>
          <div class="card-body">
            <form @submit.prevent="onSubmit">
              <div class="row">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-4">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="NFT Title"
                        />
                      </div>
                      <div class="col-md-4">
                        <input
                          type="file"
                          accept=".gif,.jpg,.jpeg,.png"
                          @change="onFileChange"
                        />
                        <div id="preview">
                          <img v-if="url" :src="url" />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <input
                          id="valField"
                          v-model="newValue"
                          type="number"
                          min="0"
                          class="form-control"
                          placeholder="Price"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" class="btn btn-outline-primary">
                🎈MINT!✨
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <h3>{{ status }}</h3>
    <div v-if="online" class="ipfs-info">
      <h3>
        ID: <span id="ipfs-info-id">{{ id }}</span>
      </h3>
      <h3>
        Agent version: <span id="ipfs-info-agent">{{ agentVersion }}</span>
      </h3>
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers";
import { mapGetters } from "vuex";

export default {
  name: "MintPage",
  computed: {
    ...mapGetters("accounts", ["getActiveAccount", "getProviderEthers"]),
    ...mapGetters("contracts", ["getContractAbi", "getContractAddress"]),
  },
  created() {
    this.$store.dispatch("contracts/storeContractAbi");
    this.$store.dispatch("contracts/storeContractAddress");

    // if web3 provider has not been yet loaded, redirect to root
    if (!this.getProviderEthers) {
      document.location.href = "/";
    } else {
      let signer = this.getProviderEthers.getSigner();
      this.contract = new ethers.Contract(
        this.getContractAddress,
        this.getContractAbi,
        signer
      );
      // let component = this;
      // // set event listener
      // this.contract.on("OwnershipTransferred", (_from, value) => {
      //   component.$toasted.show("nft minted?  " + value, {
      //     type: "success",
      //     duration: 5000,
      //     theme: "bubble",
      //     position: "top-center",
      //   });
      //   // refresh the num value
      //   // component.$store.dispatch("contracts/fetchNum");
      // });
    }
  },
  mounted: function () {
    // this.getIpfsNodeInfo();
  },
  data() {
    return {
      newValue: null,
      contract: null,
      url: null,
      status: "Connecting to IPFS...",
      id: "",
      agentVersion: "",
      online: false,
    };
  },
  methods: {
    async getIpfsNodeInfo() {
      try {
        // Await for ipfs node instance.
        const ipfs = await this.$ipfs;
        console.log("bak", ipfs);
        // Call ipfs `id` method.
        // Returns the identity of the Peer.
        const { agentVersion, id } = await ipfs.id();
        this.agentVersion = agentVersion;
        this.id = id;
        // Set successful status text.
        this.status = "Connected to IPFS =)";
        this.online = ipfs.isOnline();
        console.log("ayoo succ");
      } catch (err) {
        // Set error status text.
        this.status = `Error: ${err}`;
        console.log("ipfs err", err);
      }
    },
    async onSubmit() {
      console.log("minting bruh: ", this.getActiveAccount);
      console.log("con adres: ", this.getContractAddress);
      console.log("con abi: ", this.getContractAbi);
      // let signer = this.getProviderEthers.getSigner();
      // var swagg = new ethers.Contract(
      //   this.getContractAddress,
      //   this.getContractAbi,
      //   signer
      // );
      var asdsa = await this.contract.symbol();
      console.log("asssssssssssss", asdsa);

      // var asd = await this.contract.name();
      // await this.contract.wait()
      // console.log("aq ", asd);
      // await this.contract.payToMint(this.getActiveAccount, "asdasd");
    },
    async onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
  },
};
</script>

<style>
#preview img {
  height: 200px;
}
</style>

