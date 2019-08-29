<template lang="pug">
ul
    li(v-for="lang in this.languages" :key="lang" @click="changeLang(lang)") {{lang}}
</template>

<script>
export default {
    data: () => ({
        languages: ['en', 'de']
    }),
    methods: {
        changeLang(lang){
            this.$router.push({ name: this.$router.currentRoute.name, params: { lang: lang }});
            this.$i18n.locale = lang
        }
    }
}
</script>