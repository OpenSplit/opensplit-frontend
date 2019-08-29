<template lang="pug">
.group.container.content(v-if='group')
    h1 {{ group.name }}
    v-chip(v-for='m in group.member') {{ m.name }}

    Transactions(v-bind:id="group.id")

    div
        p.title.mytitle {{ $t('group.actions') }}
        v-btn
            router-link(:to="group.id + '/expenses/new'") {{ $t('expense.title') }}
        v-btn
            router-link(:to="group.id + '/payment/new'") {{ $t('payment.title') }}
        v-btn
            router-link(:to="group.id + '/debts'") {{ $t('debt.title') }}

    .invite
        | {{ $t('group.invite') }}:
        br
        b {{ group.token }}

</template>

<script>
import Transactions from './../components/Transactions'
export default {
    components: {
        Transactions
    },
    data() {
        return {
            transactions: []
        }
    },
    computed: {
        group() {
            return this.$store.getters.groups[this.$route.params.id]
        }
    },
    beforeMount() {
        if(!this.$store.getters.groups[this.$route.params.id]) {
            this.$store.dispatch('groups')
        }
    }
}
</script>

<style lang="sass" scoped>
.invite
    margin: 1rem 0
    padding: .5rem
    background-color: lightgrey
</style>
