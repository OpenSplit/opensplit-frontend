<template>
  <div class="content">
    <p> Hello {{ this.user.name }} </p>
    You are in the following groups (click to select):
    <div>
      <button v-for="(g,index) in this.groups" :key="g.id" v-on:click="selectGroup(index)">{{ g.name }}</button>
    </div>

    <div id='group-detail' v-if="this.selectedGroup">
      <h2>{{ this.selectedGroup.name }}</h2>
      Invite people with '<b>{{ this.selectedGroup.token }}</b>'
      <p>

      <div>
        <h3>Group actions</h3>
        <!-- <a :href="'/expense?group=' + this.selectedGroup.id">Add Expense</a> -->
        <button v-on:click="toggleExpense">Add Expense</button>
        <button v-on:click="togglePayment">Add Payment</button>
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

      <div>
        <h3>Member</h3>
        <ul>
          <li v-for="m in this.selectedGroup.member" :key="m.id"> {{ m.name }} </li>
        </ul>
      </div>

      Transaction:
      <table>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Split amongst</th>
          <th>Paid by</th>
        </tr>
        <tr v-for="item in this.transactions" :key="item.id">
          <td>{{ item.date | moment("D.MM.YYYY") }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.split_amongst | join  }}</td>
          <td>{{ item.paid_by.name  }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Groups',
  data () {
    return {
      groupSelected: false,
      user: {},
      groups: [],
      selectedGroup: null,
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
    join: function (value) {
      if (!value) return ''
      return value.map(function (elem) {
        return elem.name
      }).join(',')
    }
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

      var url = process.env.API_ROOT + '/groups/' + this.selectedGroup.id + '/transactions'
      instance.get(url).then(response => {
        console.log(response)
        this.transactions = response.data[0]
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
</style>
