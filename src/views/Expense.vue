<template lang="pug">
    .expense
        h4.title.is-4.mytitle {{ $t('expense.title') }}
        p {{ group.name }}
        v-form(ref='form' v-model='valid' lazy-validation)
            v-text-field(:label='$t("transactions.amount")' type='number' placeholder='0,00' step='0.01' v-model='amount' append-icon='euro_symbol'  :rules="amountRules")
            v-text-field(:label='$t("transactions.description")' v-model='description' :rules='descriptionRules')
            v-select(:label='$t("transactions.split")' v-model='split_amongst' :items='group.member' item-text='name' item-value='id' multiple :rules='splitRules')
            v-select(:label='$t("transactions.paid")' v-model='paid_by' :items='group.member' item-text='name' item-value='id' :rules='paidRules')
            v-btn(@click='expense') {{ $t('actions.submit') }}
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
            description: '',
            descriptionRules: [
                v => !!v || `${this.$t('transactions.description')} ${this.$t('common.required')}`,
            ],
            split_amongst: [],
            splitRules: [
                v => v.length != 0 || `${this.$t('transactions.name')} ${this.$t('common.required')}`,
            ],
            paid_by: '',
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
        expense () {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('expense', {amount: this.amount, description: this.description, split_amongst: this.split_amongst, paid_by: this.paid_by, group: this.group.id})
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
