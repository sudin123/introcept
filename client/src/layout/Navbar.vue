<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <span class="navbar-item">
          <img
            style="cursor:pointer"
            src="https://s3-ap-southeast-2.amazonaws.com/introcept-nepal/icn-logo.svg"
            alt="ICN Logo"
            class="full-logo"
            @click="$router.push('/')"
          />
        </span>
        <span class="navbar-burger burger" data-target="navbarMenu">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-end">
          <span class="navbar-item">
            <router-link class="button is-white is-outlined" to="/list">
              <span class="icon">
                <i class="fa fa-eye"></i>
              </span>
              <span>View List</span>
            </router-link>
          </span>
          <span class="navbar-item">
            <a
              class="button is-white is-outlined"
              @click="$bus.emit('form', {title: 'Add Data', uri: 'save'})"
            >
              <span class="icon">
                <i class="fa fa-plus"></i>
              </span>
              <span>Add Data</span>
            </a>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>