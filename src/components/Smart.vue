<template>
  <div class="asc__smart">
    <smart-grid id="grid"></smart-grid>
  </div>
</template>

<script>
import 'smart-webcomponents/source/styles/smart.default.css'
import 'smart-webcomponents/source/modules/smart.grid.js'
export default {
  props: ['items', 'columns', 'fields'],
  name: 'app',
  mounted () {
    this.grid()
    const grid = document.getElementById('grid')
    grid.addEventListener('rowDragging', function (event) {
      const detail = event.detail
      console.log(detail)
    })
  },
  methods: {
    grid () {
      const dataitems = this.items
      const datacolums = this.columns
      const datafields = this.fields
      window.Smart(
        '#grid', class {
          get properties () {
            return {
              sorting: {
                enabled: true,
                sortMode: 'many'
              },
              filtering: {
                enabled: true
              },
              header: {
                visible: true
              },
              behavior: {
                columnResizeMode: 'growAndShrink',
                allowColumnReorder: true
              },
              selection: {
                enabled: true,
                allowCellSelection: true,
                allowRowHeaderSelection: true,
                allowColumnHeaderSelection: true,
                mode: 'extended'
              },
              appearance: {
                alternationCount: 2,
                showRowHeader: true,
                showRowHeaderSelectIcon: true,
                showRowHeaderFocusIcon: true
              },
              paging: {
                enabled: true
              },
              pager: {
                visible: true
              },
              columns: datacolums,
              dataSource: new window.Smart.DataAdapter(
                {
                  dataSource: dataitems,
                  dataFields: datafields
                }
              )
            }
          }
        }
      )
    }
  }
}
</script>
<style>
  .smart-grid {
    width: 100%;
  }
</style>
