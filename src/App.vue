<template lang="pug">
    #app
        Navigation
        router-view
        LangSwitch
</template>

<script>
import Navigation from './components/Navigation.vue'
import LangSwitch from "@/components/LangSwitch";
export default {
    name: 'app',
    components: {
        Navigation,
        LangSwitch
    }
}
</script>

<style lang="sass">
@import './../node_modules/bulma/css/bulma.css';
@import './../node_modules/@fortawesome/fontawesome-free/css/all.css';
#app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    text-align: center
    color: #2c3e50
</style>
