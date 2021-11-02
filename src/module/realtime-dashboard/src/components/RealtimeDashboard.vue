<template>
  <div class="realtime-dashboard">
    <b-row>
      <b-col cols="12" md="8">
        <v-select class="mb-2" :placeholder="$t('dashboard.realtime.selectBranch')" :options="branchs" @input="selectBranch" label="Desciption"></v-select>
        <b-card-group deck>
          <b-card bg-variant="info" text-variant="white" :header="$t('dashboard.realtime.totalSalesAmount')" class="text-center">
            <div class="mt-2">
              <span><b>{{roundNumber(summary.total)}} TL</b></span>
            </div>
          </b-card>

          <b-card bg-variant="danger" text-variant="white" :header="$t('dashboard.realtime.totalSalesQuantity')" class="text-center">
            <div class="mt-2">
              <span><b>{{roundNumber(summary.quantity)}}</b></span>
            </div>
          </b-card>

           <b-card bg-variant="warning" text-variant="white" :header="$t('dashboard.realtime.totalVisitCount')" class="text-center">
            <div class="mt-2">
              <span><b>{{visits.length}}</b></span>
            </div>
          </b-card>

          <b-card bg-variant="success" text-variant="white" :header="$t('dashboard.realtime.activeUserCount')" class="text-center">
            <div class="mt-2">
              <span><b>{{activeEmployeeCount}}</b></span>
            </div>
          </b-card>
        </b-card-group>
        <realtime-location class="mt-2" :points="points"/>
         <b-card-group deck class="mt-2">
          <b-card v-for="(visit, index) in lastVisits" :key="index" bg-variant="secondary" text-variant="white">
            <span> {{getCustomerName(visit.customerId)}}</span><br>
            <span><i class="fa fa-user"></i> {{getEmployeeName(visit.employeeId)}}</span><br>
            <span><i class="fa fa-calendar"></i> {{toDatetimeString(visit.startTime)}}</span><br>
            <span><b>{{$t('dashboard.realtime.sales')}}: </b> {{getSalesProperty(visit.guid, 'price')}} TL</span><br>
            <span><b>{{$t('dashboard.realtime.quantity')}}: </b> {{getSalesProperty(visit.guid, 'quantity')}}</span>
          </b-card>
         </b-card-group>
      </b-col>
      <b-col cols="12" md="4">
        <v-select class="mb-2" v-model="selectedCustomerKey" :options="customerKeys" @input="selectCustomerKey"></v-select>
        <b-list-group class="detail-list">
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="(detail, index) in details" :key="index">
           {{detail[0][selectedCustomerKey]}}
            <b-badge size="xl" variant="primary" pill>{{getDetailTotal(detail)}} TL</b-badge>
          </b-list-group-item>
        </b-list-group>
        <v-select class="mb-2" v-model="selectedProductKey" :options="productKeys" @input="selectProductKey"></v-select>
        <b-list-group class="detail-list">
          <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="(detail, index) in productDetails" :key="index">
           {{detail[0][selectedProductKey]}}
            <b-badge size="xl" variant="primary" pill>{{getDetailTotal(detail)}} TL</b-badge>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  props: {
    branchs: {
      type: Array,
      default: () => []
    }
  },
  data: function () {
    return {
      sales: [],
      customers: [],
      customerKeys: [],
      productKeys: [],
      employees: [],
      products: [],
      summary: {
        customerId: 0,
        discountTotal: 0,
        employeeId: 0,
        netTotal: 0,
        productId: 0,
        quantity: 0,
        total: 0
      },
      activeEmployeeCount: 0,
      points: [],
      visits: [],
      lastVisits: [],
      branchIds: [],
      selectedCustomerKey: null,
      selectedProductKey: null,
      details: [],
      productDetails: []
    }
  },

  methods: {
    getCustomers () {
      this.$firebaseHelper.watchCollection('Customers', (data) => {
        if (data && data.length > 0) {
          this.customers = data
          if (this.customerKeys.length === 0) {
            this.customerKeys = data[0].details.map(d => d.key)
            this.selectedCustomerKey = this.customerKeys[0]
          }
        }
      })
    },
    getEmployees () {
      this.$firebaseHelper.watchCollection('Employee', (data) => {
        if (data && data.length > 0) {
          this.employees = data
        }
      })
    },
    getProducts () {
      this.$firebaseHelper.watchCollection('Products', (data) => {
        if (data && data.length > 0) {
          this.products = data
          if (this.productKeys.length === 0) {
            this.productKeys = data[0].details.map(d => d.key)
            this.selectedProductKey = this.productKeys[0]
          }
        }
      })
    },
    getData () {
      let me = this
      this.$firebaseHelper.watchCollection('SalesSummary', (data) => {
        if (data && data.length > 0) {
          let filteredArr = data.filter(d => me.branchIds.includes(d.branchId))
          this.summary = {
            total: filteredArr.reduce((a, b) => a + b.total, 0),
            quantity: filteredArr.reduce((a, b) => a + b.quantity, 0)
          }
        }
      })

      this.$firebaseHelper.watchCollection('Visits', (data) => {
        if (data && data.length > 0) {
          this.visits = data.filter(d => me.branchIds.includes(d.branchId))
          let points = []

          this.visits.filter(v => v.finishTime === null).forEach(v => {
            if (v.longitude > 0 && v.latitude > 0) {
              points.push({
                x: v.latitude,
                y: v.longitude
              })
            }
          })
          this.points = points
          this.lastVisits = this.visits.sort((a, b) => (a.startTime < b.startTime) ? 1 : ((b.startTime < a.startTime) ? -1 : 0)).slice(0, 4)
        }
      })

      this.$firebaseHelper.watchCollection('Sales', (data) => {
        if (data && data.length > 0) {
          this.sales = data.filter(d => me.branchIds.includes(d.branchId))
          let all = this.groupBy(this.sales, 'employeeId')
          this.activeEmployeeCount = Object.keys(all).length
          this.selectCustomerKey(this.selectedCustomerKey)
          this.selectProductKey(this.selectedProductKey)
        }
      })
    },
    selectCustomerKey (key) {
      this.details = []

      if (key) {
        let mergedList = this.sales.map(s => {
          let filteredCustomers = this.customers.filter(c => c.customerId === s.customerId)
          if (filteredCustomers.length > 0) {
            filteredCustomers[0].details.map(d => {
              s[d.key] = d.value
            })
          }
          return s
        })

        this.details = this.groupBy(mergedList, key)
      }
    },
    selectProductKey (key) {
      this.productDetails = []

      if (key) {
        let mergedList = this.sales.map(s => {
          let filteredProducts = this.products.filter(c => s.details.map(a => a.productId).includes(c.productId))
          if (filteredProducts.length > 0) {
            filteredProducts[0].details.map(d => {
              s[d.key] = d.value
            })
          }
          return s
        })

        this.productDetails = this.groupBy(mergedList, key)
      }
    },
    getDetailTotal (list) {
      let salesDetails = []
      list.map(l => {
        salesDetails = [...salesDetails, ...l.details]
      })
      let total = salesDetails.reduce((a, b) => a + b.total, 0)

      return this.roundNumber(total)
    },
    roundNumber (value, decimalCount = 2) {
      if (typeof value === 'string') {
        value = parseFloat(value)
      }
      return value && (Number.isInteger(value) || value % 1 !== 0) ? value.toFixed(decimalCount) : value
    },
    groupBy (list, key) {
      let group = list.reduce((r, a) => {
        r[a[key]] = [...r[a[key]] || [], a]
        return r
      }, {})
      return group
    },
    toDatetimeString (value) {
      if (value) {
        let date = new Date(value)
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
      }

      return ''
    },
    getSalesProperty (guid, type) {
      let filteredArr = this.sales.filter(s => s.visitGuid === guid)

      if (filteredArr.length === 0) {
        return 0
      }

      if (type === 'price') {
        return this.roundNumber(filteredArr[0].details.reduce((a, b) => a + b.total, 0))
      }

      if (type === 'quantity') {
        return this.roundNumber(filteredArr[0].details.reduce((a, b) => a + b.quantity, 0))
      }

      return 0
    },
    selectBranch (value) {
      this.branchIds = value ? [value.Id] : this.branchs.map(b => b.Id)
      this.getData()
    },
    getEmployeeName (id) {
      let filteredList = this.employees.filter(e => e.employeeId === id)

      return filteredList.length > 0 ? filteredList[0].name : '-'
    },
    getCustomerName (id) {
      let filteredList = this.customers.filter(e => e.customerId === id)

      return filteredList.length > 0 ? filteredList[0].name : '-'
    }
  },
  mounted () {
    if (this.branchs.length > 0) {
      this.branchIds = this.branchs.map(b => b.Id)
      this.getData()
    }
    this.getCustomers()
    this.getProducts()
    this.getEmployees()
  },
  watch: {
    branchs (value) {
      if (value.length > 0) {
        this.branchIds = value.map(b => b.Id)
        this.getData()
      }
    }
  }
}
</script>
<style scoped>
.realtime-dashboard {
  padding: 20px;
  border: 2px solid #dcdcdc;
  border-radius: 10px
}
.detail-list {
  height: 250px;
  overflow: auto;
}
</style>
