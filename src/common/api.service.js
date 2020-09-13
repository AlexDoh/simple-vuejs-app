import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { apiUrl } from '@/constants';

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = apiUrl;
  },
  get(resource) {
    return Vue.axios.get(`${resource}`).catch(error => {
      if (error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      }
      throw new Error(`[TestApp] ApiService for ${resource} ${error}`);
    });
  },
  post(resource, body) {
    return Vue.axios.post(`${resource}`, body).catch(error => {
      if (error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      }
      throw new Error(`[TestApp] ApiService for ${resource} ${error}`);
    });
  }
};

export default ApiService;

export const TransactionService = {
  get() {
    return ApiService.get('transactions');
  },
  create(transaction) {
    return ApiService.post('transactions', transaction);
  }
};

export const BalanceService = {
  get() {
    return ApiService.get('balance');
  }
};
