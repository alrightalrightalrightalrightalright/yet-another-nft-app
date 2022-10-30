// import { ethers } from "ethers";
import Contract from "../../contracts/SwaggNFT.json";
import addresses from "../../contracts/addresses.json";

const state = {
  num: 0,
  contractAbi: null,
  contractAddress: null
};

const getters = {
  getContractAbi(state) {
    return state.contractAbi;
  },
  getContractAddress(state) {
    return state.contractAddress;
  },
};

const actions = {
  storeContractAbi({ commit }) {
    commit("setContractAbi", Contract.abi);
  },
  storeContractAddress({ commit, rootState }) {
    let chainIdDec = parseInt(rootState.accounts.chainId);
    let contractAddress = addresses.SwaggNFT[chainIdDec];

    commit("setContractAddress", contractAddress);
  }
};

const mutations = {
  setContractAbi(state, abi) {
    state.contractAbi = abi;
  },
  setContractAddress(state, address) {
    state.contractAddress = address;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
