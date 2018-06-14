<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  created () {
    location.href = '/'
    localStorage.removeItem('session_key')
    this.$root.session_key = null
  }
}
</script>

<style>
</style>
