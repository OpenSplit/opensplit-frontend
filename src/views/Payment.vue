<template lang="pug">
    .expense
        h4.title.is-4.mytitle {{ $t('payment.title') }}
        p {{ group.name }}
        v-form(ref='form' v-model='valid' lazy-validation)
            v-text-field(:label='$t("transactions.amount")' type='number' placeholder='0,00' step='0.01' v-model='amount' append-icon='euro_symbol'  :rules="amountRules")
            v-select(:label='$t("payment.sender")' v-model='sender' :items='group.member' item-text='name' item-value='id' :rules='paidRules')
            v-btn(@click='payment') {{ $t('actions.submit') }}
            v-btn(@click='back') {{ $t('actions.cancel') }}
</template>

<script>
export default {
    data () {
        return {
            valid: true,
            amount: '',
            amountRules: [
                v => !!v || `${this.$t('transactions.amount')} ${this.$t('common.required')}`,
            ],
            sender: '',
            paidRules: [
                v => !!v || `${this.$t('transactions.name')} ${this.$t('common.required')}`,
            ]
        }
    },
    computed: {
        group() {
            return this.$store.getters.groups[this.$route.params.id]
        },
        user() {
            return this.$store.getters.user
        }
    },
    methods: {
        payment () {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('payment', {amount: this.amount, receiver: this.user.id, sender: this.sender, group: this.group.id})
                this.$router.push({ name: 'group', params: { id: this.group.id } })
            }
        },
        back() {
            this.$router.go(-1)
        }
    }

}
</script>

<style lang="sass" scoped>
.expense
    min-width: 80vw
    margin: 0 auto
</style>
