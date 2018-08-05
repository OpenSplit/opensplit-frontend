<template>
    <div class="transactions">
        <h3 class="is-3">Transactions</h3>
        <table>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th class="currency">Amount</th>
            <th>Split amongst</th>
            <th>Paid by</th>
          </tr>
          <tr v-for="item in transactions" :key="item.id">
            <td>{{ item.date | moment("DD.MM.YYYY") }}</td>
            <td>{{ item.description }}</td>
            <td class="currency">{{ formatCurrency(item.amount) }} €</td>
            <td>{{ item.split_amongst | join  }}</td>
            <td>{{ item.paid_by.name  }}</td>
          </tr>
        </table>
      </div>
</template>

<script>
export default {
  props: ['transactions'],
  filters: {
    join: function (value) {
      if (!value) return ''
      return value.map(function (elem) {
        return elem.name
      }).join(', ')
    }
  },
  methods: {
    formatCurrency (value) {
      let val = (value / 1).toFixed(2)
      return val.toString()
    }
  }
}
</script>

<style>
.currency {
   text-align: right !important;
}
</style>
