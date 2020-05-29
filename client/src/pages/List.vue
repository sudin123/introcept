<template>
  <div class="container">
    <div v-if="total > 0">
      <div class="columns">
        <div class="column is-half">
          <b-input v-model="search" placeholder="Search"></b-input>
        </div>
        <div class="column"></div>
      </div>

      <div class="buttons">
        <b-button type="is-success" size="is-small">Text</b-button>
        <!-- <BulkActions v-if="checkedRows.length > 0" :items="checkedRows" /> -->
      </div>

      <b-table
        :loading="loading"
        checkable
        :checked-rows.sync="checkedRows"
        :data="data"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :pagination-position="paginationPosition"
        :default-sort-direction="defaultSortDirection"
        :sort-icon="sortIcon"
        :sort-icon-size="sortIconSize"
        default-sort="first_name"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        :backend-sorting="backendSortingEnabled"
        @sort="sortPressed"
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
      sortable: true,
      data: [],
      loading: true,
      backendSortingEnabled: true,
      search: '',
      checkedRows: [],
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      currentPage: 1,
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
  watch: {
    '$route.params.list': {
      handler(val) {
        this.fetch();
      },
    },
  },
  methods: {
    async fetch() {
      try {
        this.loading = true;
        let res = await this.$api.getWithPayload('/api/list', this.searchData);
        this.data = res.items;
        this.total = res.count;
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    },
    openForm() {
      this.$bus.emit('form', {
        header: this.$route.params.list,
      });
    },
    sortPressed(field, order) {
      console.log(field, order);
    },
    onPageChange(page) {
      this.searchData.page = page;
      this.fetch();
    },
  },
};
</script>