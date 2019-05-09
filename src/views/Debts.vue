<template lang="pug">
    v-container
        v-layout(row wrap)
            v-flex(xs12)
                h2 {{ $t('debt.title') }}
            v-flex(xs6)
                h3 {{ $t('debt.gets') }}
                v-data-table(:headers="headers" :items="debts.gets" class="elevation-1")
                    template(v-slot:items='props')
                        td.text-xs-left {{ props.item[0] }}
                        td.text-xs-left {{ props.item[1] }} €
            v-flex(xs6)
                h3 {{ $t('debt.owes') }}
                v-data-table(:headers="headers" :items="debts.owes" class="elevation-1")
                    template(v-slot:items='props')
                        td.text-xs-left {{ props.item[0] }}
                        td.text-xs-left {{ props.item[1] }} €
            v-flex(xs12)
                v-btn(@click='back') {{ $t('actions.back') }}
</template>

<script>
export default {
    data() {
        return {
            headers: [
                { text: `${this.$t('transactions.name')}`, align: 'left', value: '[0]' },
                { text: `${this.$t('transactions.amount')}`, align: 'left', value: '[1]' }
            ]
        }
    },
    computed: {
        debts() {
            let group = this.$store.getters.groups[this.$route.params.id]
            let userId = this.$store.getters.user.id
            let member = group.member.find(member => member.id === userId)
            let debts = member.debts
            return debts
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="sass">

</style>

