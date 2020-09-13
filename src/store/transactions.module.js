import { BalanceService, TransactionService } from '@/common/api.service';
import { ADD_TRANSACTION, FETCH_BALANCE, FETCH_TRANSACTIONS } from './actions.type';
import { SET_BALANCE, SET_TRANSACTIONS } from './mutations.type';

const initialState = {
  balance: 0.0,
  transactions: []
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_TRANSACTIONS](context) {
    const { data } = await TransactionService.get();
    context.commit(SET_TRANSACTIONS, data);
    return data;
  },
  async [ADD_TRANSACTION](context, transaction) {
    const { data } = await TransactionService.create(transaction);
    context.commit(SET_TRANSACTIONS, data);
    return data;
  },
  async [FETCH_BALANCE](context) {
    const { data } = await BalanceService.get();
    context.commit(SET_BALANCE, data);
    return data;
  }
};

export const mutations = {
  [SET_TRANSACTIONS](state, transactions) {
    state.transactions = state.transactions.concat(transactions);
  },
  [SET_BALANCE](state, balance) {
    state.balance = balance;
  }
};

const getters = {
  transactions(state) {
    return state.transactions;
  },
  balance(state) {
    return state.balance;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
