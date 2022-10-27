import Vuex from 'vuex';
import accounts from "./modules/accounts";
import contracts from "./modules/contracts";


const store = new Vuex.Store({
    modules: {
        accounts,
        contracts
    }
});

export default store;