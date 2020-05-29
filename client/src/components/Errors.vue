<template>
  <b-modal :active.sync="isCardModalActive" :width="400" scroll="keep">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Errors</p>
      </header>
      <section class="modal-card-body">
        <li
          style="color:red"
          v-for="(message, index) in messages"
          :key="index"
        >{{ (message.toUpperCase()).split('_').join(' ') }}</li>
        <br />
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="isCardModalActive = false">Close</button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      isCardModalActive: false,
    };
  },
  created() {
    this.$bus.$on('show-errors', data => {
      this.messages = data;
      this.isCardModalActive = true;
    });
  },
};
</script>