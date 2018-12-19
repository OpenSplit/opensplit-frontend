<template lang="pug">
    .transactions
        p.title.mytitle {{ $t('transactions.title') }}
        table
            tr
                th {{ $t('transactions.date') }}
                th {{ $t('transactions.description') }}
                th.currency {{ $t('transactions.amount') }}
                th {{ $t('transactions.split') }}
                th {{ $t('transactions.paid') }}
                th
            tr(v-for='item in this.transactions', :key='item.id')
                td {{ item.date | moment("DD.MM.YYYY") }}
                td {{ item.description }}
                td.currency {{ formatCurrency(item.amount) }} €
                td {{ item.split_amongst | join }}
                td {{ item.paid_by.name }}
                td
                    a.delete(v-on:click='deleteTransaction( item.id )')
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
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
        },
        deleteTransaction (id) {
            console.log('This would delete the transaction with the id: ' + id)
        }
    }
}
</script>

<style lang="sass">
.currency
    text-align: right !important

.mytitle
    margin-top: 1em
    margin-bottom: 0 !important

hr
    margin-top: 0;
</style>