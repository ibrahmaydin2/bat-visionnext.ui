<template>
  <div class="asc__smart">
    <smart-grid id="grid" />
    <smart-menu id="menu" mode="dropDown">
      <smart-menu-item data-id="clickedMe" label="<i class='fas fa-bell'></i>click me"></smart-menu-item>
      <smart-menu-item data-id="removedMe" label="<i class='fas fa-trash'></i>Remove Me"></smart-menu-item>
    </smart-menu>
    <div id="log" class="mt-3" />
    <div class="option">
      <button id="printRestrictBtn">print 0-50</button>
      <button id="printBtn">print all</button>
      <button id="xlsxBtn">Export to Excel</button>
      <button id="pdfBtn">Export to PDF</button>
      <button id="htmlBtn">Export to HTML</button>
      <button id="csvBtn">Export to CSV</button>
      <button id="tsvBtn">Export to TSV</button>
      <button id="xmlBtn">Export to XML</button>
    </div>
  </div>
</template>

<script>
import 'smart-webcomponents/source/styles/smart.default.css'
import 'smart-webcomponents/source/modules/smart.grid.js'
import 'smart-webcomponents/source/modules/smart.menu.js'
import { dm } from './dumy.js'
import { mapState } from 'vuex'
export default {
  watch: {
    smartgrid: function (e) {
      if (e === true) {
        this.grid(this.tableData.BaseModels, dm.RowColumns, this.tableOperations.RowFields)
      }
    }
  },
  computed: {
    ...mapState(['smartgrid', 'tableData', 'tableOperations'])
  },
  methods: {
    gridActions () {
      const grid = document.getElementById('grid')
      const log = document.querySelector('#log')

      grid.addEventListener('columnDragStart', function () {})
      grid.onColumnDragStart = function (event) {
        log.innerHTML = 'columnDragStart: ' + event.detail.column.label + ', index: ' + event.detail.index + '<br/>'
      }
      grid.onColumnDragging = function () {}
      grid.onColumnDragEnd = function (event) {
        log.innerHTML += 'columnDragEnd: ' + event.detail.column.label + ', index: ' + event.detail.index + ', new index: ' + event.detail.newIndex + '<br/>'
      }
      grid.onColumnDragCancel = function (event) {
        log.innerHTML += 'columnDragCancel: ' + event.detail.column.label + '<br/>'
      }

      grid.addEventListener('rowDragging', function (event) {
        log.innerHTML += 'columnDragEnd: ' + event.detail.column.label + ', index: ' + event.detail.index + ', new index: ' + event.detail.newIndex + '<br/>'
      })

      grid.addEventListener('filter', function (event) {
        const detail = event.detail
        const columns = detail.columns
        const data = detail.data
      })
      const xlsxBtn = document.querySelector('#xlsxBtn')
      const pdfBtn = document.querySelector('#pdfBtn')
      const csvBtn = document.querySelector('#csvBtn')
      const tsvBtn = document.querySelector('#tsvBtn')
      const xmlBtn = document.querySelector('#xmlBtn')
      const htmlBtn = document.querySelector('#htmlBtn')
      xlsxBtn.addEventListener('click', () => {
        grid.exportData('xlsx')
      })
      pdfBtn.addEventListener('click', () => {
        grid.exportData('pdf')
      })
      csvBtn.addEventListener('click', () => {
        grid.exportData('csv')
      })
      tsvBtn.addEventListener('click', () => {
        grid.exportData('tsv')
      })
      xmlBtn.addEventListener('click', () => {
        grid.exportData('xml')
      })
      htmlBtn.addEventListener('click', () => {
        grid.exportData('html')
      })

      const printBtn = document.querySelector('#printBtn')
      const printRestrictBtn = document.querySelector('#printRestrictBtn')
      printBtn.addEventListener('click', () => {
        grid.print()
      })
      printRestrictBtn.addEventListener('click', () => {
        grid.dataExport.viewStart = 25
        grid.dataExport.viewEnd = 50
        grid.dataExport.view = true
        grid.print()
        grid.dataExport.viewStart = 0
        grid.dataExport.viewEnd = 50
      })
    },
    grid (d, c, f) {
      window.Smart(
        '#grid', class {
          get properties () {
            return {
              selection: {
                enabled: true,
                // birden fazla satırı seçip toplu işlem yaptırtabiliriz.
                checkBoxes: {
                  enabled: false,
                  autoShow: false
                }
              },
              behavior: {
                columnResizeMode: 'growAndShrink',
                allowColumnReorder: true,
                rowResizeMode: 'growAndShrink'
              },
              editing: {
                enabled: true,
                action: 'none',
                commandColumn: {
                  visible: true,
                  dataSource: {
                    commandColumnEdit: {
                      visible: false
                    },
                    commandColumnDelete: {
                      visible: false
                    },
                    commandColumnMenu: {
                      visible: true
                    },
                    commandColumnRowMenu: {
                      visible: true
                    }
                  }
                }
              },
              sorting: {
                enabled: true
              },
              summaryRow: {
                visible: true
              },
              appearance: {
                showColumnHeaderLines: true,
                showColumnLines: true,
                allowSortAnimation: false,
                allowRowHeaderSelection: true,
                showRowLines: true
              },
              header: {
                visible: false,
                buttons: ['columns', 'search']
              },
              pager: {
                visible: true,
                pageSizeSelector: {
                  visible: true
                },
                pageIndexSelectors: {
                  dataSource: 3
                }
              },
              paging: {
                enabled: true,
                pageSize: 10,
                pageIndex: 0
              },
              dataExport: {
                view: true,
                viewStart: 0,
                viewEnd: 50
              },
              layout: {
                // rowHeight: 50,
                rowHeight: 'auto',
                allowCellsWrap: true
              },
              filtering: {
                enabled: true,
                // aynı anda ikisi kullanılamıyor galiba.
                // filterRow: {
                //   visible: true
                // },
                filterMenu: {
                  mode: 'excel'
                }
              },
              onCommand: function (args) {
                if (args.name === 'commandColumnRowMenuCommand') {
                  const row = args.details
                  const menu = document.getElementById('menu')
                  args.event.preventDefault()
                  menu.setAttribute('data-row-id', row.id)
                  menu.onItemClick = event => {
                    document.querySelector('#log').innerHTML = JSON.stringify(event)
                  }
                  menu.open(args.event.pageX - 150, args.event.pageY + 20)
                  args.handled = true
                }
              },
              /* bu ne biliyor musun ?
              belirlediğin aralıktaki satırı sabit tutar. scroll edilmez.
              onRowInit (index, row) {
                if (index < 1) {
                  row.freeze = 'near'
                }
              },
              */
              columns: c,
              dataSource: new window.Smart.DataAdapter(
                {
                  dataSource: d,
                  dataFields: f
                }
              )
            }
          }
        }
      )
      this.gridActions()
    }
  }
}

/* notlar:
  kolon formatlamak için:     https://www.htmlelements.com/vue/demos/grid/column-template/
  localization için:          https://www.htmlelements.com/vue/demos/grid/localization/
  freeze formatları:          https://www.htmlelements.com/vue/demos/grid/freeze-row/
  satır pozisyonu için:       https://www.htmlelements.com/vue/demos/grid/row-reorder/
*/
</script>
<style lang="sass">
  .smart-grid
    width: 100%
    height: 80vh
  .smart-menu
    height: auto !important
</style>
