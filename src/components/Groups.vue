<template>
  <div class="content">
    <p> Hello {{ this.user.name }} </p>
    You are in the following groups (click to select):
    <ul>
      <li v-for="(g,index) in this.groups" :key="g.id" v-on:click="selectGroup(index)">
        {{ g.name }}
      </li>
    </ul>

    <div id='group-detail' v-if="this.selectedGroup">
      <h2>{{ this.selectedGroup.name }}</h2>
      Invite people with '<b>{{ this.selectedGroup.token }}</b>'
      <p>

      Member:
      <ul>
        <li v-for="m in this.selectedGroup.member" :key="m.id"> {{ m.name }} </li>
      </ul>
      </p>

      Transaction:
      <table>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Split amongst</th>
        </tr>
        <tr v-for="item in this.transactions" :key="item.id">
          <td>{{ item.description }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.split_amongst | join  }}</td>
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
      transactions: null
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

<style>
</style>
