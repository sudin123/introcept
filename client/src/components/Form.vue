<template>
  <b-modal :active.sync="isCardModalActive" :width="800" scroll="keep">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{title}}</p>
      </header>
      <section class="modal-card-body">
        <form @keypress.enter="save" v-if="showForm">
          <div v-for="(field, index) in columns" :key="index">
            <b-field
              v-if="field.type == `date`"
              :label="field.title"
              :type="(field.id in errors) ? 'is-danger' : null"
              :message="(field.id in errors) ? errors[field.id] : null"
            >
              <b-datepicker
                v-model="formData[field.id]"
                placeholder="Click to select..."
                icon="calendar-today"
                trap-focus
              ></b-datepicker>
            </b-field>

            <b-field
              v-else-if="field.type == `options`"
              :label="field.title"
              :type="(field.id in errors) ? 'is-danger' : null"
              :message="(field.id in errors) ? errors[field.id] : null"
            >
              <b-select placeholder="Select one" expanded v-model="formData[field.id]">
                <option
                  v-for="(option, index) in field.options"
                  :key="index"
                  :value="option"
                >{{option}}</option>
              </b-select>
            </b-field>

            <b-field
              style="margin-top:10px"
              v-else-if="field.type == `textarea`"
              :label="field.title"
              :type="(field.id in errors) ? 'is-danger' : null"
              :message="(field.id in errors) ? errors[field.id] : null"
            >
              <quill-editor
                style="height:300px"
                ref="myQuillEditor"
                v-model="formData[field.id]"
                :options="editorOption"
              />
            </b-field>

            <b-field
              v-else
              :label="field.title"
              :type="(field.id in errors) ? 'is-danger' : null"
              :message="(field.id in errors) ? errors[field.id] : null"
            >
              <b-input :type="field.type" v-model="formData[field.id]"></b-input>
            </b-field>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="isCardModalActive = false">Close</button>
        <button class="button is-success" @click="save">Save</button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      isCardModalActive: false,
      formData: {},
      editorOption: {},
      title: null,
      columns: [],
      uri: null,
      errors: {},
      showForm: true,
    };
  },
  async created() {
    this.$bus.on('form', data => {
      this.columns = this.$store.getters.columns;
      this.title = data.title;
      this.uri = data.uri;
      this.isCardModalActive = true;
    });
  },

  destroyed() {
    this.$bus.off('form');
  },

  methods: {
    async save() {
      try {
        let res = await this.$api.post(`/${this.uri}`, this.formData);
        this.isCardModalActive = false;
        this.$bus.emit('refresh-list');
      } catch (e) {
        e.response.data.map(err => {
          this.errors[err.field] = err.message;
        });
        this.showForm = false;
        this.$nextTick(() => {
          this.showForm = true;
        });
      }
    },
  },
};
</script>


<style scoped>
.file-upload-form,
.image-preview {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 20px;
}
img.preview {
  width: 200px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px;
}

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}

.custom-file-input::before {
  content: 'Select Image';
  display: inline-block;
  background: linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
</style>