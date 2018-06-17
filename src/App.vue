<template>
  <div id="foo">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a href="/" class="navbar-item"> Home</a>
        <a href="/login" class="navbar-item">Login</a>
        <a href="/register" class="navbar-item">Register</a>
        <a href="/groups" class="navbar-item">Groups</a>
        <a href="/logout" class="navbar-item">Logout</a>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
nav {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}

#foo {
  width: 50%;
  margin: 0 auto;
}
</style>
