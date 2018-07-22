<template>
    <div class="transactions">
        <h3 class="is-3">Transactions</h3>
        <table>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Split amongst</th>
            <th>Paid by</th>
          </tr>
          <tr v-for="item in transactions" :key="item.id">
            <td>{{ item.date | moment("D.MM.YYYY") }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.amount }}</td>
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
  }
}
</script>
