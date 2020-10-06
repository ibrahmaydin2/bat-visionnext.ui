<template>
    <div>
        <b-sidebar id="sidebar-right" class="asc__sidebar-right" text-variant="light" right backdrop shadow :title="$t('sidebar.shortcuts')" @hidden="hidden">
          <div class="p-3">
            <!-- <i class="fa fa-star-half-alt font-weight-bold text-white"></i>
            <span class="font-weight-bold text-white"> Kısayollar</span>
            <p class="mt-3 text-white font-weight-bold">Kısayol Oluştur</p> -->
            <template>
              <div v-show="!showEdit">
                <div role="group">
                  <label class="mb-0 text-white" for="input-live">Description1</label>
                  <b-form-input
                    v-model="description1"
                    trim
                    class="bg-transparent border-white text-white"
                  ></b-form-input>
                </div>
                <div class="mt-3" role="group">
                  <label class="mb-0 text-white" for="input-live">LinkUrl</label>
                  <b-form-input
                    v-model="linkUrl"
                    trim
                    class="bg-transparent border-white text-white"
                  ></b-form-input>
                </div>
                <div class="mt-3 w-100 text-right asc__add-shortcut-btn">
                  <b-button variant="outline-light" @click="addShortcut()">{{$t('sidebar.createShortcut')}}</b-button>
                </div>
              </div>
              <div v-show="showEdit">
                <div role="group">
                  <label class="mb-0 text-white" for="input-live">Description1</label>
                  <b-form-input
                    v-model="description1"
                    trim
                    class="bg-transparent border-white text-white"
                  ></b-form-input>
                </div>
                <div class="mt-3" role="group">
                  <label class="mb-0 text-white" for="input-live">LinkUrl</label>
                  <b-form-input
                    v-model="linkUrl"
                    trim
                    class="bg-transparent border-white text-white"
                  ></b-form-input>
                </div>
                <div class="mt-3 w-100 text-right asc__add-shortcut-btn edit">
                  <i class="fa fa-trash fa-2x"></i>
                  <b-button @click="updateShortcut" variant="outline-light">{{$t('sidebar.update')}}</b-button>
                </div>
              </div>
              <p class="mt-3 text-white font-weight-bold">{{$t('sidebar.savedShortcuts')}}</p>
              <ul class="asc__sidebar-shortcuts">
                <li v-for="(item,i) in items" :key="'i'+i">
                  <router-link class="text-white" exact :to="{name: item.router}">
                    <i :class="item.icon ? item.icon : ''"></i>
                    {{item.title}}
                  </router-link>
                  <i @click="editShortcut(item)" class="fa fa-edit asc__shortcut-edit"></i>
                </li>
              </ul>
            </template>
          </div>
        </b-sidebar>
        <b-tooltip target="shortcutsIcon" triggers="hover" placement="left">
            {{$t('sidebar.shortcuts')}}
        </b-tooltip>
    </div>
</template>
<script>
import { shortcut } from './nav.js'
export default {
  name: 'SidebarRight',
  data () {
    return {
      items: shortcut,
      description1: null,
      linkUrl: null,
      showEdit: false
    }
  },
  methods: {
    addShortcut () {
      if (!this.description1 && !this.linkUrl) {
        return
      }
      this.items.push({
        title: this.description1,
        router: this.linkUrl
      })
      this.empty()
    },
    editShortcut (item) {
      this.showEdit = true
      this.description1 = item.title
      this.linkUrl = item.router
    },
    updateShortcut () {
      this.showEdit = false
      this.empty()
    },
    hidden () {
      this.showEdit = false
      this.empty()
    },
    empty () {
      this.description1 = null
      this.linkUrl = null
    }
  }
}
</script>
<style lang="sass">
.b-sidebar
  background-color: #f49201 !important
.asc__sidebar-right
  .b-sidebar-header
    display: flex
    align-items: center
    justify-content: space-between
    flex-direction: row-reverse
    button
      margin-right: 0 !important
  .asc__add-shortcut-btn
    font-size: 12px
  .asc__add-shortcut-btn.edit
    display: flex
    align-items: center
    justify-content: space-between
    & i
      cursor: pointer
  .asc__sidebar-shortcuts
    padding-left: 0
    li
      list-style: none
      border-bottom: 1px solid
      padding: 5px 0
      a
        color: black
        padding-left: 1px
  .asc__shortcut-edit
    float: right
    cursor: pointer
</style>
