<template lang="pug">
div
    v-alert(:value='notification.message' :type='notification.type' dismissible @input='close')
        | {{ notification.message }}
</div>

</template>

<script>
export default {
    computed: {
        notification() {
            return this.$store.getters.notification
        },
    },
    methods: {
        close() {
            // this.$store.dispatch('notification', { 'notification': '' })
        }
    }
}
</script>

<style lang="sass" scoped>
</style>
