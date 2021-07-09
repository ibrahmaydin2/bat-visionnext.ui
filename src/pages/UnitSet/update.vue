<template>
  <b-row class="asc__insertPage">
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'UnitSet' }">
              <CancelButton />
            </router-link>
            <AddButton @click.native="save()" />
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <NextFormGroup item-key="Code" :error="$v.form.Code">
            <NextInput v-model="form.Code" type="text" :disabled="insertReadonly.Code" />
          </NextFormGroup>
          <NextFormGroup item-key="StatusId" :error="$v.form.StatusId">
            <NextCheckBox v-model="form.StatusId" type="number" toggle/>
          </NextFormGroup>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab :title="$t('insert.unitSet.title')" active @click.prevent="tabValidation()">
          <b-row>
            <NextFormGroup item-key="Description1" :error="$v.form.Description1">
              <NextInput type="text" v-model="form.Description1" :disabled="insertReadonly.Description1"/>
            </NextFormGroup>
            <NextFormGroup item-key="CardTypeId" :error="$v.form.CardTypeId">
              <NextDropdown v-model="cardType" :disabled="insertReadonly.CardTypeId" :source="cardTypes" label="Label" @input="selectedType('CardTypeId', $event)"/>
            </NextFormGroup>
          </b-row>
        </b-tab>
        <b-tab :title="$t('insert.unitSet.units')" >
          <NextDetailPanel type="update" v-model="form.Units" :items="unitItems" :show-edit="true" />
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import insertMixin from '../../mixins/update'
import { detailData } from './detailPanelData'
export default {
  mixins: [insertMixin],
  data () {
    return {
      form: {
        Deleted: 0,
        System: 0,
        RecordState: 2,
        RecordId: null,
        StatusId: 1,
        Code: null,
        Description1: null,
        CardTypeId: null,
        Units: []
      },
      routeName1: 'Unit',
      cardType: null,
      unitItems: detailData.unitItems,
      cardTypes: [
        {
          Label: this.$t('insert.unitSet.userDefinedDimensions'),
          DecimalValue: 5
        }
      ]
    }
  },
  mounted () {
    this.getData().then(() => this.setData())
  },
  methods: {
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$toasted.show(this.$t('insert.requiredFields'), {
          type: 'error',
          keepOnHover: true,
          duration: '3000'
        })
        this.tabValidation()
      } else {
        this.updateData()
      }
    },
    setData () {
      let rowData = this.rowData
      this.form = rowData
      this.cardType = rowData.CardType
    }
  }
}
</script>
