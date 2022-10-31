<template>
  <div class="row">
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
      <h1 class="h2">Mint a new NFT!</h1>
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
                          v-model="title"
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
                          v-model="price"
                          type="number"
                          min="0"
                          class="form-control"
                          placeholder="Price"
                        />
                      </div>
                    </div>
                    <hr />
                    <div
                      class="row"
                      v-for="(keyValue, index) in keyValues"
                      :key="index"
                    >
                      <div class="form-group col-md-5">
                        <input
                          v-model="keyValue.key"
                          :name="`keyValues[${index}][key]`"
                          type="text"
                          class="form-control"
                          placeholder="key"
                        />
                      </div>
                      <div class="form-group col-md-5">
                        <input
                          v-model="keyValue.value"
                          :name="`keyValues[${index}][value]`"
                          type="text"
                          class="form-control"
                          placeholder="value"
                        />
                      </div>
                      <div class="form-group col-md-1">
                        <button
                          @click="removePair(index)"
                          type="button"
                          class="btn btn-icon"
                        >
                          X
                        </button>
                      </div>
                    </div>
                    <div class="form-group">
                      <button
                        @click="addkeyValue"
                        type="button"
                        class="btn btn-secondary"
                      >
                        Add keyValue
                      </button>
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

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useWalletStore } from "@/stores/wallet";
import { ethers } from "ethers";

interface Message {
  from: string;
  text: string;
  datetime: Date;
}

import SwaggNFT from "../contracts/SwaggNFT.json";
import addresses from "../contracts/addresses.json";
import { useToast } from "vue-toastification";
import axios from "axios";
import { AxiosRequestConfig } from "axios";

export default defineComponent({
  name: "MintNft",
  components: {},

  setup() {
    const toast = useToast();
    const trxInProgress = ref<boolean>(false);

    const walletStore = useWalletStore();
    const contractAddress = addresses.SwaggNFT[1337];
    const message = ref("");

    const mintNft = async function () {
      //1) upload nft to ipfs
      var data = new FormData();
      data.append("file", this.currentImage);
      data.append("pinataOptions", '{"cidVersion": 1}');

      let p = [];
      this.keyValues.forEach(function (item) {
        p.push(`"${item.key}":"${item.value}"`);
      });
      p.push(`"price":"${this.price}"`);
      p.push(`"title":"${this.title}"`);

      let keyvalues = `${p.join()}`;
      data.append(
        "pinataMetadata",
        `{"name": "${this.currentImage.name}", "keyvalues": {${keyvalues}} }`
      );

      var config: AxiosRequestConfig = {
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkODUyY2Y3MS0yOGMxLTQ5NDUtOTMyNi01NzJkOGE4NWIzMjIiLCJlbWFpbCI6InNwZWJ6b3FAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjYxOTNmNzdhZDk3NDA3OTE3N2Y3Iiwic2NvcGVkS2V5U2VjcmV0IjoiMzZlMDI2MTg3YWU5YmJmODBlODgyZjAwYmQ2MjRmZjk2NDk1ZjNlYTUyYjAyZDgwZmUxYmE3YmU0OGExMmY4YiIsImlhdCI6MTY2NzE1ODI0M30.7dO-lRTo7KSAOTp-NG8KccTIoHzdkSCYJ2UsBcP3xvs",
        },
        data: data,
      };

      const res = await axios(config);

      console.log("result: ", res.data);
      this.toast.success(
        `Successfully uploaded to IPFS!\n: Here is your hash${res.data.IpfsHash}`
      );
      //2) mint nft from ipfs hash
      //@ts-expect-error Window.ethers not TS
      if (typeof window.ethereum !== "undefined") {
        trxInProgress.value = true;
        //@ts-expect-error Window.ethers not TS
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          SwaggNFT.abi,
          signer
        );
        try {
          const transaction = await contract.payToMint(
            walletStore.walletData,
            res.data.IpfsHash,
            {
              value: ethers.utils.parseEther("0.054"),
              gasLimit: 300000,
            }
          );

          console.log("transaction :>> ", transaction);
          await transaction.wait();
          message.value = "";
          trxInProgress.value = false;
          this.toast.success(`NFT successfully minted 🎉`);
        } catch (error: any) {
          this.toast.error(
            `Error Code: ${error.code}\nError Message: ${error.message}`
          );
          console.error(error);

          trxInProgress.value = false;
        }
      }
    };

    return {
      toast,
      message,
      walletStore,
      trxInProgress,
      mintNft,
    };
  },
  mounted() {
    if (this.walletStore.walletData !== null) {
      console.log("There is a wallet connected!");
    }
  },
  computed: {
    accAvailable() {
      return useWalletStore().walletData;
    },
  },
  watch: {
    accAvailable(newVal, old) {
      console.log(`updating from ${old} to ${newVal}`);
    },
  },
  data() {
    return {
      keyValues: [
        {
          key: "",
          value: "",
        },
      ],
      currentImage: "",
      price: "",
      title: "",
      contract: "",
      url: "",
      id: "",
      agentVersion: "",
      online: false,
    };
  },
  methods: {
    removePair: function (index: any) {
      console.log("index", index);
      this.keyValues.splice(index, 1);
    },
    addkeyValue() {
      this.keyValues.push({
        key: "",
        value: "",
      });
    },
    async onSubmit() {
      await this.mintNft();
    },
    async onFileChange(e: Event) {
      //TODO: trunc name <50 chars
      const target = e.target as HTMLInputElement;
      const file = target.files[0];
      this.currentImage = file;
      this.url = URL.createObjectURL(file);
    },
  },
});
</script>
