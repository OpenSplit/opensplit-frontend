<template lang="pug">
    #app
        v-app
            Navigation
            Message
            router-view
</template>

<script>
import Navigation from './components/Navigation.vue'
import Message from './components/Message.vue'
export default {
    name: 'app',
    components: {
        Navigation,
        Message
    }
}
</script>

<style lang="sass">
// @import './../node_modules/bulma/css/bulma.css';
@import './../node_modules/@fortawesome/fontawesome-free/css/all.css';
#app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    text-align: center
    color: #2c3e50
</style>
