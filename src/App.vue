<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="/static/img/logo.png" alt="opensplit">
        </a>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <a href="/login" class="navbar-item">Login</a>
          <a href="/register" class="navbar-item">Register</a>
          <a href="/groups" class="navbar-item">Groups</a>
          <a href="/logout" class="navbar-item">Logout</a>
        </div>
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
@import './../node_modules/bulma/css/bulma.css';
@import './../node_modules/@fortawesome/fontawesome-free/css/all.css';
.navbar-menu.is-active {
  position: absolute;
  width: 100%;
  text-align: center;
}
</style>
