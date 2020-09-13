import Vue from 'vue'
import Vuex from 'vuex'

import transactions from './transactions.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    transactions
  }
});
