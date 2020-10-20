export const indexPage = [
  // NOT: Tüm title değerleri dil dosyasına tanımlı dil kodu üzerinden gönderilmelidir!
  {
    Id: 1,
    Name: 'SalesOrder', // Router ismiyle birebir olmak zorunda.
    Title: 'Model_SalesOrder', // dil dosyasından gelen kod
    Icon: 'fas fa-basket',
    Filters: [
      { title: 'AllRecords', order: 1, hidden: false, action: '' },
      { title: 'TodayRecords', order: 2, hidden: false, action: '?start=today&end=tonight' },
      { title: 'SubmittedRecords', order: 3, hidden: false, action: '?keyword=submit' }
    ],
    // ACTIONS:
    // 1 action tanımlanırsa doğrudan buton çalışır.
    // 1den fazla action tanımlanırsa buton yerine dropdown gelecek ve seçim yapılabilecek.
    // "view" parametresi modal veya page olabilir.
    // // page olursa doğrudan yönlendirme, modal olursa modal actionı açılır ve çağırılan component görüntülenir.
    // // // vue linki <router-link :to="{name: 'CreateSalesOrder'}">Create</router-link> şeklinde tanımlanır.
    // // // bundan dolayı page linklerinde router ismini tanımlarız. ROUTER isimleri her zaman doğru tanımlanmak zorunda!
    Actions: [
      { title: 'Create', icon: 'null', view: 'page', action: '{name: "CreateSalesOrder"}' },
      { title: 'Create', icon: 'null', view: 'modal', action: 'SalesOrderCreateComponent' }
    ],
    Download: [
      { title: 'PDF', icon: 'fas fa-doc-pdf', action: 'DOWNLOAD-URL' },
      { title: 'XML', icon: 'fas fa-doc-xml', action: 'DOWNLOAD-URL' },
      { title: 'EXCELL', icon: 'fas fa-doc-excell', action: 'DOWNLOAD-URL' }
    ],
    // OPERATIONS:
    // view bazlı özel dönüşüm işlemleri, ek tanımlama seçenekleri olabilir.
    // işlemi başlatacak olan butonun ortak özellikleri aşağıdaki gibidir. geliştirilebilir.
    Operations: [
      { title: 'OPERATION', icon: 'fas fa-circle-o', view: 'modal', action: 'COMPONENT' }
    ],
    RowActions: [
      { title: 'QuickView', order: 1, view: 'modal', action: 'showOrderComponent/{RowID}' },
      { title: 'QuickView', order: 2, view: 'page', action: '{name: "GetSalesOrder", params: { url : "RowID" }}' }, // yandaki örnek doğru bir router link parametresidir.
      { title: null, order: 3, view: 'divider', action: null }, // satırlar arasına yatay çizgi atmak için kullanılabilir.
      { title: 'Confirm', order: 3, view: 'component', action: 'confirmSalesOrderComponent/{RowID}' } // bu componente istek gönderince yönlendirme işlemini de aynı component tanımlayacak.
    ],
    // RowData:
    // hidden ve visible arasındaki fark:
    // hidden: kullanıcıya bu datayı isteğe bağlı görünür yapabilir.
    // visible: değeri false olan sütunlar kullanıcıya kesinlikle gösterilmez.
    RowData: [
      { id: '', title: 'Açıklama', label: 'description', type: 'text', format: null, order: 1, hidden: false, visible: true, align: 'left', template: null },
      { id: '', title: 'İsim', label: 'name', type: 'text', format: null, order: 2, hidden: false, visible: true, align: 'left', template: '<span>{{data.item.name}} {{data.item.surname}}</span>' }, // kodun HTML Karşılığı bu. ancak henüz test edilmedi.
      { id: '', title: 'Soy isim', label: 'surname', type: 'text', format: null, order: 3, hidden: true, visible: false, align: 'left', template: null },
      { id: '', title: 'Belge Saati', label: 'documentDate', type: 'datetime', format: 'dd-yy-mmmm HH:ii:ss', order: 4, hidden: false, visible: true, align: 'left', template: null },
      { id: '', title: 'İptal', label: 'cancelStatus', type: 'icon', format: 'html', order: 5, hidden: false, visible: true, align: 'left', template: 'true ? "fas fa-times" : "fas fa-check"' } // formatı html ve tipi icon olan datanın template sorgusu yapılır ve ikon görüntülenir. NOT: henüz test edilmedi.
    ]
  }
]
