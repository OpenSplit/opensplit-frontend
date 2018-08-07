<template>
  <div class="content container">
    <p> Hello {{ this.user.name }} </p>
    You are in the following groups (click to select):
    <div>
      <button class="button" v-for="(g,index) in this.groups" :key="g.id" v-on:click="selectGroup(index)">{{ g.name }}</button>
    </div>

<section class="section">
    <div id='group-detail' v-if="this.selectedGroup">
      <h2>{{ this.selectedGroup.name }}</h2>
      <div class="invite">
        Invite people with by giving them this link: <b>{{ this.selectedGroup.token }}</b>
      </div>

      <div>
        <p class="title mytitle">Debts</p>
        <hr />
        <div class="columns">
          <div class="column">
          <!-- Debts I get -->
          <p class="subtitle">You get</p>
          <div class="field is-grouped is-grouped-multiline">
            <div class="control" v-for="entry in this.personalDebts.gets" :key="entry[0]">
              <div class="tags has-addons">
                <span class="tag is-light">{{entry[0]}}</span>
                <span class="tag is-success">{{entry[1]}}</span>
              </div>
            </div>
          </div>
          </div>
          <div class="column">
        <!-- Debts I have to pay -->
        <p class="subtitle">You have to pay</p>
        <div class="field is-grouped is-grouped-multiline">
          <div class="control" v-for="entry in this.personalDebts.owes" :key="entry[0]">
            <div class="tags has-addons">
              <span class="tag is-light">{{entry[0]}}</span>
              <span class="tag is-danger">{{entry[1]}}</span>
            </div>
          </div>
        </div>
      </div>
          </div>
        </div>

      <div>
        <p class="title mytitle">Group actions</p>
        <hr />
        <!-- <a :href="'/expense?group=' + this.selectedGroup.id">Add Expense</a> -->
        <button class="button" v-on:click="toggleExpense">Add Expense</button>
        <button class="button" v-on:click="togglePayment">Add Payment</button>
      </div>

      <div class="payment " :class="{hidden: this.payment.hidden}">
        <h4 class="title is-4 has-text-centered">Add Payment</h4>
        <div class="field">
          <label class="label">Amount</label>
          <div class="control">
            <input class="input" type="number" placeholder="0.00" step='0.01' v-model="payment.amount">
          </div>
        </div>
        <div class="field">
          <label class="label">Receiver</label>
          <div class="select">
            <select v-model="payment.receiver">
              <option v-for="m in this.selectedGroup.member" :key="m.id" :value="m.id">{{ m.name }}</option>
            </select>
          </div>
        </div>
        <button class="button is-primary" @click="addPayment">Submit</button>
      </div>

      <div class="expense " :class="{hidden: this.expense.hidden}">
        <h4 class="title is-4 has-text-centered">Add Expense</h4>
        <div class="field">
          <label class="label">Amount</label>
          <div class="control">
            <input class="input" type="number" placeholder="0.00" step='0.01' v-model="expense.amount">
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <input class="input" type="text" placeholder="Description" v-model="expense.description">
          </div>
        </div>
        <div class="field">
          <label class="label">Member</label>
          <div class="select is-multiple">
            <select multiple v-model="expense.split_amongst">
              <option v-for="m in this.selectedGroup.member" :key="m.id" :value="m.id">{{ m.name }}</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label class="label">Sugar Daddy</label>
          <div class="select">
            <select v-model="expense.paid_by">
              <option v-for="m in this.selectedGroup.member" :key="m.id" :value="m.id" :selected="m.id == user.id">{{ m.name }}</option>
            </select>
          </div>
        </div>
        <button class="button is-primary" @click="addExpense">Submit</button>
      </div>

      <Transactions v-bind:transactions="this.transactions"></Transactions>
    </div>
  </section>
  </div>
</template>

<script>
import axios from 'axios'
import Transactions from './Transactions'

export default {
  components: {
    Transactions
  },
  name: 'Groups',
  data () {
    return {
      groupSelected: false,
      user: {},
      groups: [],
      selectedGroup: null,
      personalDebts: {'owes': [], 'gets': []},
      transactions: null,
      expense: {
        hidden: true,
        amount: 0,
        description: '',
        split_amongst: [],
        paid_by: null
      },
      payment: {
        hidden: true,
        amount: 0,
        receiver: null,
        sender: null
      }
    }
  },
  filters: {

  },
  methods: {
    toggleExpense: function () {
      this.expense.hidden = !this.expense.hidden
    },
    addExpense: function () {
      var instance = axios.create({
        headers: {'Authorization': this.$root.session_key}
      })

      var url = process.env.API_ROOT + '/groups/' + this.selectedGroup.id + '/transactions'
      instance.post(url, this.expense).then(response => {
        console.log(response)
        this.expense.hidden = true
      }, error => {
        console.log(error)
      })
    },
    togglePayment: function () {
      this.payment.hidden = !this.payment.hidden
    },
    addPayment: function () {
      var instance = axios.create({
        headers: {'Authorization': this.$root.session_key}
      })

      var url = process.env.API_ROOT + '/groups/' + this.selectedGroup.id + '/payments'
      this.payment.sender = this.user.id
      instance.post(url, this.payment).then(response => {
        console.log(response)
        this.payment.hidden = true
      }, error => {
        console.log(error)
      })
    },
    selectGroup (pos) {
      this.selectedGroup = this.groups[pos]
      var instance = axios.create({
        headers: {'Authorization': this.$root.session_key}
      })

      console.log(this.user.id)
      for (let i = 0; i < this.selectedGroup.member.length; i++) {
        console.log(this.selectedGroup.member[i].id)
        if (this.user.id === this.selectedGroup.member[i].id) {
          this.personalDebts = this.selectedGroup.member[i].debts
        }
      }

      var url = process.env.API_ROOT + '/groups/' + this.selectedGroup.id + '/transactions'
      instance.get(url).then(response => {
        console.log(response)
        this.transactions = response.data
      }, error => {
        console.log(error)
      })
    }
  },
  beforeCreate () {
    if (localStorage.getItem('session_key')) {
      this.$root.session_key = localStorage.getItem('session_key')
      var instance = axios.create({
        headers: {'Authorization': this.$root.session_key}
      })

      var url = process.env.API_ROOT + '/checktoken'
      instance.get(url).then(response => {
        console.log('jup')
      }, _ => {
        location.href = '/login'
        localStorage.removeItem('session_key')
        this.$root.session_key = ''
      })
    } else {
      location.href = '/login'
    }
  },
  created () {
    var instance = axios.create({
      headers: {'Authorization': this.$root.session_key}
    })

    var url = process.env.API_ROOT + '/users'
    instance.get(url).then(response => {
      console.log(response)
      this.user = response.data
    }, error => {
      console.log(error)
    })

    url = process.env.API_ROOT + '/groups'
    instance.get(url).then(response => {
      console.log(response)
      this.groups = response.data
    }, error => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}
.mytitle {
  margin-top: 1em;
  margin-bottom: 0 !important;
}
hr {
  margin-top: 0;
}

</style>
