<template>
  <div>
    <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          OpenSplit
        </h1>
        <h2 class="subtitle">
          Easily split your bills and settle up with your friends
        </h2>
      </div>
    </div>
  </section>
  <div class="content">
    <div class="tile is-ancestor">
  <div class="tile is-4 is-vertical is-parent">
    <div class="tile is-child box">
      <p class="title">Open Source</p>
      Because OpenSplit is Open Source you can find the full sourcecode on <a href="https://github.com/opensplit">GitHub</a>.
    </div>
    <div class="tile is-child box">
      <p class="title">Foobar</p>
      My hands are typing words!
    </div>
  </div>
  <div class="tile is-parent">
    <div class="tile is-child box">
      <p class="title">Why should I use it?</p>
      If you're constantly fighting the <i>"I payed your lunch last time. Now it's your turn"</i>-battle just start using OpenSplit ;)
      Or just keep track of your expenses in a group of friends, family or flatmates. This way you don't have to exchange money every time.
      <br />
      Using OpenSplit will reduce the amount of money transactions between the group members by adding up all the expenses you entered and just show you the
      differences between the individual people to settle everyone up.
    </div>
  </div>
</div>
  </div>
 </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style>
.hero {
  margin-bottom: 2em;
}

.content {
  width: 60%;
  margin: 0 auto;
}
</style>
