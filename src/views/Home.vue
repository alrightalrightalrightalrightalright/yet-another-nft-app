<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <h1 class="text-5xl font-bold my-8 max-w-xl mx-auto">
      yet another nft minting app 😒
    </h1>
    <h2 class="text-xl">
      Connect your wallet and try minting.
    </h2>
  <p>minted NFTs will be listed here <i>very soon</i>... </p>
    <div class="content">
      <div class="container">
        <div class="row">
          <div
            v-for="(item, index) in nfts"
            :key="index"
            class="col-xs-12 col-sm-4"
          >
            <div class="card">
              <a class="img-card" href="#">
                <img :src="item.url" />
              </a>
              <div class="card-content">
                <h4 class="card-title">
                  <a href="#">
                    Bootstrap 3
                    {{ item.title }}
                  </a>
                </h4>
                <div>
                  <div>
                    <h5>additional data(key values)</h5>
                  </div>
                </div>
              </div>
              <div class="card-read-more">
                <a href="#" class="btn btn-link btn-block">
                  <p>Price: {{ item.price }}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useWalletStore } from "@/stores/wallet";
import { defineComponent } from "vue";
import { ethers } from "ethers";
import SwaggNFT from "../contracts/SwaggNFT.json";
import addresses from "../contracts/addresses.json";
import { useToast } from "vue-toastification";
export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const toast = useToast();
    const walletStore = useWalletStore();
    const contractAddress = addresses.SwaggNFT[1337];

    const listUserNfts = async function () {
      //@ts-expect-error Window.ethers not TS
      if (typeof window.ethereum !== "undefined") {
        //@ts-expect-error Window.ethers not TS
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          SwaggNFT.abi,
          signer
        );
        try {
          const transaction = await contract.symbol(
            // walletStore.walletData,
            // {
            //   gasLimit: 300000,
            // }
          );

          console.log("transaction :>> ", transaction);
          // this.toast.success(`listed all uris 🎉`);
        } catch (error: any) {
          this.toast.error(
            `Error Code: ${error.code}\nError Message: ${error.message}`
          );
          console.error(error);
        }
      }
    };

    return {
      toast,
      walletStore,
      listUserNfts,
    };
  },
  mounted() {
    if (this.walletStore.walletData !== null) {
      this.listUserNfts();
    }
  },
  data() {
    return {
      nfts: [],
    };
  },
});
</script>
<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:400,100,900);

html,
body {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  background: #fff;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
}

.wrapper {
  display: table;
  height: 100%;
  width: 100%;
}

.container-fostrap {
  display: table-cell;
  padding: 1em;
  text-align: center;
  vertical-align: middle;
}
.fostrap-logo {
  width: 100px;
  margin-bottom: 15px;
}
h1.heading {
  color: #fff;
  font-size: 1.15em;
  font-weight: 900;
  margin: 0 0 0.5em;
  color: #505050;
}
@media (min-width: 450px) {
  h1.heading {
    font-size: 3.55em;
  }
}
@media (min-width: 760px) {
  h1.heading {
    font-size: 3.05em;
  }
}
@media (min-width: 900px) {
  h1.heading {
    font-size: 3.25em;
    margin: 0 0 0.3em;
  }
}
.card {
  display: block;
  margin-bottom: 20px;
  line-height: 1.42857143;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.25s;
}
.card:hover {
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.img-card {
  width: 100%;
  height: 200px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  display: block;
  overflow: hidden;
}
.img-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: all 0.25s ease;
}
.card-content {
  padding: 15px;
  text-align: left;
}
.card-title {
  margin-top: 0px;
  font-weight: 700;
  font-size: 1.65em;
}
.card-title a {
  color: #000;
  text-decoration: none !important;
}
.card-read-more {
  border-top: 1px solid #d4d4d4;
}
.card-read-more a {
  text-decoration: none !important;
  padding: 10px;
  font-weight: 600;
  text-transform: uppercase;
}
</style>