<template>
  <div class="container table_list">
    <div calss="table_header">
      <!-- table headers can be made dynamic -->
      <span class="header">Clients</span>
    </div>
    <div v-if="total > 0">
      <!-- dynamic table -->
      <b-table
        :loading="loading"
        :data="data"
        :current-page.sync="searchData.page"
        :pagination-simple="isPaginationSimple"
        :pagination-position="paginationPosition"
        @page-change="onPageChange"
        paginated
        backend-pagination
        :per-page="perPage"
        :total="total"
      >
        <template slot-scope="props">
          <b-table-column
            v-for="(column, index) in $store.getters.columns"
            :key="index"
            :label="column.title"
            :field="column.id"
            :sortable="sortable"
          >
            <span v-if="column.type == 'textarea'" v-html="props.row[column.id]"></span>
            <span v-else>{{ props.row[column.id]}}</span>
          </b-table-column>
        </template>
      </b-table>
    </div>

    <div class="hero-body" v-else>
      <div class="container has-text-centered">
        <div class="column is-6 is-offset-3">
          <h1 class="title">Introcept Task | There are no clients yet !</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      sortable: false,
      data: [],
      loading: true,
      checkedRows: [],
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: 'bottom',
      perPage: 10,
      total: 0,
      searchData: {
        page: 1,
      },
      columns: [],
    };
  },
  created() {
    this.$bus.on('refresh-list', () => {
      this.fetch();
    });
  },
  destroyed() {
    this.$bus.off('refresh-list');
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        this.loading = true;
        let res = await this.$api.getWithPayload('/clients', this.searchData);
        this.data = res.items;
        this.total = res.count;
        this.loading = false;
      } catch (e) {
        alert('Something went wrong! Please try again');
      }
    },
    onPageChange(page) {
      this.searchData.page = page;
      this.fetch();
    },
  },
};
</script>

<style scoped>
.header {
  font-size: 30px;
}
.table_list {
  padding-top: 30px;
}
</style>