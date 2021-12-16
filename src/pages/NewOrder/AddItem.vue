<template>
  <div>
    <NextFormGroup :title="$t('insert.newOrder.product')" :error="error" :required="true" md="12" lg="12">
      <div class="form-control" @click="showModal">
        <img v-if="value" height="20px" src="https://productimages.hepsiburada.net/s/47/550/10921432318002.jpg" />
        <span>{{value ? `${value.Code} - ${value.Description1}` : $t('insert.newOrder.selectItem')}}</span>
      </div>
    </NextFormGroup>
    <b-modal :id="`modal${id}`" size="xl" @show="show">
      <template #modal-title>
        {{$t('insert.newOrder.addNewItem')}}
      </template>
      <b-row>
        <NextFormGroup :title="$t('insert.newOrder.category1')" :error="$v.itemInfo.category1" :required="true" md="2" lg="2">
          <NextDropdown
            v-model="itemInfo.category1"
            lookup-key="ITEM_CATEGORY_1"
            @input="selectCategory($event, 2)"
            get-lookup/>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.newOrder.category2')" :error="$v.itemInfo.category2" :required="true" md="2" lg="2">
          <NextDropdown
            v-model="itemInfo.category2"
            label="Label"
            :source="category2List"
            :disabled="!itemInfo.category1"
            @input="selectCategory($event, 3)"/>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.newOrder.category3')" :error="$v.itemInfo.category3" :required="true" md="2" lg="2">
          <NextDropdown
            v-model="itemInfo.category3"
            label="Label"
            :source="category3List"
            :disabled="!itemInfo.category2"
            @input="selectCategory($event, 4)"/>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.newOrder.category4')" :error="$v.itemInfo.category4" :required="true" md="2" lg="2">
          <NextDropdown
            v-model="itemInfo.category4"
            label="Label"
            :source="category4List"
            :disabled="!itemInfo.category3"
            @input="selectCategory($event, 5)"/>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.newOrder.category5')" :error="$v.itemInfo.category5" :required="true" md="2" lg="2">
          <NextDropdown
            v-model="itemInfo.category5"
            label="Label"
            :source="category5List"
            :disabled="!itemInfo.category4"
            @input="selectCategory($event, 0)"/>
        </NextFormGroup>
        <NextFormGroup :title="$t('insert.newOrder.product')" :error="$v.itemInfo.item" :required="true" md="2" lg="2">
          <NextDropdown
            v-model="itemInfo.item"
            :disabled="!itemInfo.category5"
            :source="itemList"
            @input="updateData"/>
        </NextFormGroup>
        <div class="selected-item" v-if="itemInfo.item">
          <img height="40px" src="https://productimages.hepsiburada.net/s/47/550/10921432318002.jpg" />
          <span class="pl-2">{{`${itemInfo.item.Code} - ${itemInfo.item.Description1}`}}</span>
        </div>
        <b-col cols="12" md="12">
          <b-form-group class="float-right">
            <b-button size="sm" variant="success" @click="addItem()">
              <span><i class="fa fa-plus"></i> {{$t('insert.newOrder.add')}}</span>
            </b-button>
          </b-form-group>
        </b-col>
      </b-row>
      <template #modal-footer>
        <b-button size="sm" class="float-right ml-2"  variant="outline-danger" @click="closeModal()">{{$t('insert.cancel')}}</b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import mixin from '../../mixins/index'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'NewOrderAddItem',
  mixins: [mixin],
  props: {
    value: {
      type: Object
    },
    error: {}
  },
  model: {
    prop: 'value',
    event: 'valuechange'
  },
  data () {
    return {
      id: Math.random().toString(36).substring(2),
      itemInfo: {
        category1: null,
        category2: null,
        category3: null,
        category4: null,
        category5: null,
        item: null
      },
      itemList: [],
      category2List: [],
      category3List: [],
      category4List: [],
      category5List: []
    }
  },
  methods: {
    addItem () {
      this.$v.itemInfo.$touch()
      if (this.$v.itemInfo.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        return
      }

      this.$emit('success', this.itemInfo.item)
      this.$emit('valuechange', this.itemInfo.item)
      this.closeModal()
    },
    show () {
      this.category2List = []
      this.category3List = []
      this.category4List = []
      this.category5List = []
      this.itemList = []
      if (this.value) {
        this.initializeData(this.value)
      } else {
        this.itemInfo = {}
      }
      this.$v.itemInfo.$reset()
    },
    showModal () {
      this.$bvModal.show(`modal${this.id}`)
    },
    closeModal () {
      this.$bvModal.hide(`modal${this.id}`)
    },
    selectCategory (value, index) {
      if (index > 0) {
        for (let i = index; i <= 5; i++) {
          this.itemInfo[`category${i}`] = null
          this[`category${i}List`] = []
        }
        this.itemInfo.item = null
        this.itemInfo[`category${index - 1}`] = value
      }
      if (value) {
        let request = {
          andConditionModel: {
            Category1Ids: this.itemInfo.category1 ? [this.itemInfo.category1.DecimalValue] : null,
            Category2Ids: this.itemInfo.category2 ? [this.itemInfo.category2.DecimalValue] : null,
            Category3Ids: this.itemInfo.category3 ? [this.itemInfo.category3.DecimalValue] : null,
            Category4Ids: this.itemInfo.category4 ? [this.itemInfo.category4.DecimalValue] : null,
            Category5Ids: this.itemInfo.category5 ? [this.itemInfo.category5.DecimalValue] : null
          }
        }
        this.$api.postByUrl(request, 'VisionNextItem/api/Item/Search').then((response) => {
          if (response && response.ListModel && response.ListModel.BaseModels.length > 0) {
            if (index > 0) {
              this[`category${index}List`] = [...new Set(response.ListModel.BaseModels.map(r => r[`Category${index}`]))]
            } else {
              this.itemList = response.ListModel.BaseModels
            }
          } else {
            this.$toasted.show(this.$t('insert.newOrder.itemNotFound'), {
              type: 'error',
              keepOnHover: true,
              duration: '3000'
            })
          }
        })
      }
    },
    initializeData (value) {
      this.itemInfo = {
        category1: value.Category1,
        category2: value.Category2,
        category3: value.Category3,
        category4: value.Category4,
        category5: value.Category5,
        item: value
      }
      this.updateData()
    },
    updateData () {
      this.$nextTick(() => {
        this.$$forceUpdate()
      })
    }
  },
  validations () {
    let itemInfo = {
      category1: {
        required
      },
      category2: {
        required
      },
      category3: {
        required
      },
      category4: {
        required
      },
      category5: {
        required
      },
      item: {
        required
      }
    }
    return {
      itemInfo: itemInfo
    }
  },
  watch: {
    value (newValue) {
      if (newValue) {
        this.initializeData(newValue)
      }
    }
  }
}
</script>
<style scoped>
.selected-item {
  border: 1px solid gray;
  border-radius: 9px;
  padding: 14px;
  width: 100%;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
