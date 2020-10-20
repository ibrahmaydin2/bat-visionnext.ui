// NOT: Tüm title değerleri dil dosyasına tanımlı dil kodu üzerinden gönderilmelidir!
export const indexPage = {
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
    {
      BloodTransfusion: '0000000000',
      sapOrderNumber: '1000068340',
      confirmationCode: 'OL',
      confirmationCodeDescription: 'Onaylı'
    },
    {
      BloodTransfusion: '0000000000',
      sapOrderNumber: '1000068341',
      confirmationCode: 'OL',
      confirmationCodeDescription: 'Onaylı'
    },
    {
      BloodTransfusion: '0000000000',
      sapOrderNumber: '1000068417',
      confirmationCode: 'OL',
      confirmationCodeDescription: 'Onaylı'
    },
    {
      BloodTransfusion: '0000000000',
      sapOrderNumber: '1000068659',
      confirmationCode: 'OL',
      confirmationCodeDescription: 'Onaylı'
    },
    {
      BloodTransfusion: '0000000000',
      sapOrderNumber: '1000068676',
      confirmationCode: 'OL',
      confirmationCodeDescription: 'Onaylı'
    },
    {
      BloodTransfusion: '0000000000',
      sapOrderNumber: '1000068763',
      confirmationCode: 'OL',
      confirmationCodeDescription: 'Onaylı'
    },
    {
      BloodTransfusion: '0000000000',
      sapOrderNumber: '1000068920',
      confirmationCode: 'OL',
      confirmationCodeDescription: 'Onaylı'
    },
    {
      BloodTransfusion: '0000000000',
      sapOrderNumber: '1000068920',
      confirmationCode: 'OL',
      confirmationCodeDescription: 'Onaylı'
    },
    {
      BloodTransfusion: '0000000000',
      sapOrderNumber: '1000068920',
      confirmationCode: 'OL',
      confirmationCodeDescription: 'Onaylı'
    },
    {
      BloodTransfusion: '0000000000',
      sapOrderNumber: '1000068921',
      confirmationCode: 'OL',
      confirmationCodeDescription: 'Onaylı'
    },
    {
      BloodTransfusion: '0000000000',
      sapOrderNumber: '1000068921',
      confirmationCode: 'OL',
      confirmationCodeDescription: 'Onaylı'
    },
    {
      BloodTransfusion: '0000000000',
      sapOrderNumber: '1000068922',
      confirmationCode: 'OL',
      confirmationCodeDescription: 'Onaylı'
    }
  ],
  RowField: [
    { visible: true, dataField: 'BloodTransfusion', label: 'BloodTransfusion' },
    { visible: true, dataField: 'sapOrderNumber', label: 'sapOrderNumber' },
    { visible: true, dataField: 'confirmationCode', label: 'confirmationCode' },
    { visible: true, dataField: 'confirmationCodeDescription', label: 'confirmationCodeDescription' }
  ],
  RowFields: [
    'BloodTransfusion: string',
    'sapOrderNumber: string',
    'confirmationCode: string',
    'confirmationCodeDescription: string'
  ]
}
