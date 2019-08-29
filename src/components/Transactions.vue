<template lang="pug">
    .transactions
        .title.mytitle {{ $t('transactions.title') }}
        v-data-table(:headers="headers" :items="transactions" class="elevation-1")
            template(v-slot:items='props')
                td.text-xs-left {{ props.item.date | moment("DD.MM.YYYY") }}
                td.text-xs-left {{ props.item.description }}
                td.text-xs-left {{ props.item.amount }}
                td.text-xs-left {{ props.item.split_amongst | join }}
                td.text-xs-left {{ props.item.paid_by.name }}
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            headers: [
                { text: `${this.$t('transactions.date')}`, align: 'left', sortable: false, value: 'date' },
                { text: `${this.$t('transactions.description')}`, align: 'left', sortable: false, value: 'description' },
                { text: `${this.$t('transactions.amount')}`, align: 'left', sortable: false, value: 'amount' },
                { text: `${this.$t('transactions.split')}`, align: 'left', sortable: false, value: 'split_amongst' },
                { text: `${this.$t('transactions.paid')}`, align: 'left', sortable: false, value: 'paid_by' },
            ],
            transactions: []
        }
    },
    props: ['id'],
    beforeMount() {
        var session_key = localStorage.getItem('session_key')
        var instance = axios.create({
            headers: {'Authorization': session_key}
        })
        var url = process.env.VUE_APP_API + '/groups/' + this.id + '/transactions'
        instance.get(url)
        .then(response => {
            this.transactions = response.data
        })
    },
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
            var val = (value / 1).toFixed(2)
            return val.toString()
        }
    }
}
</script>

<style lang="sass">
.currency
    text-align: right !important

.mytitle
    margin: 1.5rem auto 1rem

hr
    margin-top: 0;
</style>