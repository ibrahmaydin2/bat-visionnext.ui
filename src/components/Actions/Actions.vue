<template>
  <!-- ViewType
  Potansiyel Müşteri Onayla-> PotentialCustomerApprove
  Potansiyel Müşteri Reddet-> PotentialCustomerReject
  Genel Onaylama -> Modal
  Güncelle -> Route
  Detaylar -> Route
  Farklı Kaydet -> SaveAs
  Doküman Dönüştür -> Convert
  Import -> Uploads adında bir ayraç olmalı.
  İptal -> Cancel
  Alan Güncelleme -> QuickUpdate
  Uyarı -> ControlModel -->
  <b-dropdown-group header="Actions">
    <b-dropdown-item v-for="(action, i) in filteredActions" :key="i">
      <router-link v-if="action.ViewType === 'Route'" :to="{name: $route.name + action.Action, params: {url: row.RecordId}}">
        <img width="10" height="10" :src="icon" />
        <span class="ml-1">{{action.Title}}</span>
      </router-link>
      <router-link v-if="action.ViewType === 'SaveAs'" :to="{name: $route.name + 'Update', params: {url: row.RecordId}, query: {saveAs: 1}}">
        <img width="10" height="10" :src="icon" />
        <span class="ml-1">{{action.Title}}</span>
      </router-link>
      <!-- <span v-else-if="action.ViewType === 'Modal'" @click="showModal(action.Action, action.ActionUrl, row.RecordId, row, action.Query, action.QueryMessage)"> -->
      <span class="d-inline-block w-100" v-else-if="action.ViewType === 'Modal'" @click.prevent.stop="showModal (action, row, $event)">
        <img width="10" height="10" :src="icon" />
        <span class="ml-1">{{action.Title}}</span>
      </span>
      <span class="d-inline-block w-100" v-else-if="action.ViewType === 'Print'" @click.prevent.stop="print (action, row)">
        <img width="10" height="10" :src="icon" />
        <span class="ml-1">{{action.Title}}</span>
      </span>
      <!-- <span class="d-inline-block w-100" v-else>
        <img width="10" height="10" :src="icon" />
        <span class="ml-1">{{action.Title}}</span>
      </span> -->
      <!-- <a v-else-if="action.ViewType === 'Link'" :href="action.Action" target="_blank">
        <img width="10" height="10" :src="icon" />
        <span class="ml-1">{{action.Title}}</span>
      </a>
      <router-link v-else :to="{name: $route.name + action.Action, params: {url: row.RecordId}}">
        <img width="10" height="10" :src="icon" />
        <span class="ml-1">{{action.Title}}</span>
      </router-link> -->
    </b-dropdown-item>
  </b-dropdown-group>
</template>
<script>
export default {
  name: 'Actions',
  computed: {
    filteredActions () {
      return this.actions.filter(i => {
        if (i.IsMultiple === null) {
          i.IsMultiple = 0
        }
        return i.IsMultiple === this.isMultiple
      })
    }
  },
  data () {
    return {
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTM5NC44LDIyMi44NTFMMTg2LjA2NSwxNC4xMTZjLTE4LjgyMS0xOC44MjEtNTEuMzI4LTE4LjgyMS02OC40MzgsMGMtMTguODIsMTguODIxLTE4LjgyLDQ5LjYxNywwLDY4LjQzOCAgICBMMjkwLjQzMywyNTcuMDdMMTE3LjYyOCw0MjkuODc1Yy0xOC44MiwxOC44MjEtMTguODIsNDkuNjE4LDAsNjguNDM4QzEyNi4xODMsNTA2Ljg2OCwxMzkuODcsNTEyLDE1MS44NDYsNTEyICAgIGMxMS45NzYsMCwyNS42NjUtNS4xMzIsMzQuMjE5LTEzLjY4OEwzOTQuOCwyOTEuMjg4YzguNTU1LTguNTU1LDEzLjY4OC0yMi4yNDIsMTMuNjg4LTM0LjIxOSAgICBDNDA4LjQ4OCwyNDUuMDkzLDQwMy4zNTUsMjMxLjQwNiwzOTQuOCwyMjIuODUxeiBNMzcwLjg0NywyNjcuMzM1TDE2My44MjMsNDc0LjM2Yy01LjEzMyw1LjEzMi0xNS4zOTgsNS4xMzItMjAuNTMxLDAgICAgYy01LjEzMy01LjEzMi01LjEzMy0xNS4zOTksMC0yMC41MzFsMTg0Ljc4Mi0xODQuNzgyYzYuODQ0LTYuODQ0LDYuODQ0LTE3LjEwOSwwLTIzLjk1M0wxNDEuNTgxLDYwLjMxMiAgICBjLTUuMTMzLTYuODQ0LTUuMTMzLTE1LjM5OSwwLTIwLjUzMWMzLjQyMi0zLjQyMiw2Ljg0NC01LjEzMiwxMC4yNjYtNS4xMzJjMy40MjIsMCw2Ljg0NCwxLjcxLDEwLjI2Niw1LjEzMmwyMDguNzM1LDIwOC43MzUgICAgYzMuNDIyLDMuNDIyLDUuMTMyLDYuODQ0LDUuMTMyLDEwLjI2NkMzNzQuMjY5LDI2MC40OTEsMzcyLjU1OCwyNjUuNjI1LDM3MC44NDcsMjY3LjMzNXoiIGZpbGw9IiNmNzhiNGUiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+'
    }
  },
  props: {
    actions: {
      type: Array
    },
    row: {},
    isMultiple: {
      default: 0
    }
  },
  methods: {
    showModal (action, row, e) {
      this.$emit('showModal', action, row)
    },
    print (action, row) {
      this.$api.postByUrl({recordId: 33504721807}, action.ActionUrl).then((res) => {
        console.log(res)
        let w = window.open()
        w.document.write(res.Html)
        w.document.close()
        w.focus()
        w.print()
      })
    }
  },
  mounted () {
  }
}

</script>
