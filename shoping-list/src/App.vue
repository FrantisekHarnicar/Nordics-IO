<script setup>
  import {RouterView, RouterLink} from "vue-router"
  import {ref} from "vue"
</script>
// active class na znazornenie aktivnej klasy
<template>
  <main class="container">
    <div class="nav-bar">
        <RouterLink active-class="active" to="/">Search</RouterLink>
        <RouterLink active-class="active" to="/cart">Cart</RouterLink>
        <RouterLink active-class="active" to="/favourite">Favourite</RouterLink>
    </div>
    <div>
      <RouterView />
    </div>
    
  </main>
</template>

