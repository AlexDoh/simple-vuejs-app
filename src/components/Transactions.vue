<template>
  <div class="col-md-6 col-sm-12 mx-auto">
    <h4>Emit Transaction</h4>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
          id="input-group-1"
          label="Transaction amount:"
          label-for="input-1"
          description="Please enter amount, which would be processed for your balance"
      >
        <b-form-input
            id="input-1"
            v-model="form.amount"
            type="number"
            step="any"
            min="0"
            required
            placeholder="Enter amount"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Transaction type:" label-for="input-3">
        <b-form-select
            id="input-3"
            v-model="form.type"
            :options="types"
            required
        ></b-form-select>
      </b-form-group>

      <b-button class="mr-2" type="submit" variant="primary">Submit transaction</b-button>
      <b-button type="reset" variant="danger">Reset form</b-button>
    </b-form>
    <h2 class="my-5">Current balance amount: {{ balance }}</h2>
    <b-card class="mt-3" header="Transaction history">
      <b-list-group>
        <b-list-group-item v-for="transaction in transactions" :key="transaction.id"
                           class="d-flex flex-column text-left">
          <p>
            <span>Id: </span>
            <span>{{ transaction.id }}</span>
          </p>
          <p>
            <span>Type: </span>
            <span>{{ transaction.type }}</span>
          </p>
          <p>
            <span>Amount: </span>
            <span>{{ transaction.amount }}</span>
          </p>
          <p>
            <span>Date: </span>
            <span>{{ transaction.effectiveDate }}</span>
          </p>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ADD_TRANSACTION, FETCH_BALANCE, FETCH_TRANSACTIONS } from '@/store/actions.type';

export default {
  data() {
    this.$store.dispatch(FETCH_BALANCE);
    this.$store.dispatch(FETCH_TRANSACTIONS);
    return {
      form: {
        amount: '',
        type: null,
      },
      types: [{ text: 'Select type', value: null }, 'DEBIT', 'CREDIT'],
      show: true
    }
  },
  computed: {
    ...mapGetters(['transactions', 'balance'])
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      await this.$store.dispatch(ADD_TRANSACTION, this.form);
      await this.$store.dispatch(FETCH_BALANCE);
    },
    onReset(event) {
      event.preventDefault()
      this.form.amount = ''
      this.form.type = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
