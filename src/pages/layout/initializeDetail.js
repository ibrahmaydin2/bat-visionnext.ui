// Detay paneller için örnek data kullanımları
// eslint-disable-next-line no-unused-vars
// Her alan her type için kullanılmasına gerek yoktur. false ve null olan kısımları ilgili alandan silersek daha temiz olur
// örneğin basit bir checkBox eklemek istersek type,id,modelProperty,visible,label kısımları eklemek yeterlidir.
// Her alan için kullanılsa da kullanılmasa da modelProperty eklemek gerekir.

var cycleInstructionItems = [
  {
    type: 'Autocomplete', // component tipi -> AutoComplete, Dropdown, Lookup, Text, Label, Date, Check
    inputType: null, // type === Text ise html input tipini setler. number, text gibi
    modelProperty: 'EmployeeId', // Request Modelde hangi alana set edileceği bilgisi
    parentProperty: null, // parentId varsa parent componentteki hangi alana göre sorgulama yapılacağı bilgisi
    labelProperty: 'Description1', // Dropdown, AutoComplete ve Lookuplar için seçimlerde görünen property adı
    valueProperty: 'RecordId', // Dropdown, AutoComplete ve Lookuplar seçildiğinde hangi alanın request modele ekleneceği bilgisi.
    // default olarak RecordId ve DecimalValue setlenir.
    url: 'VisionNextEmployee/api/Employee/AutoCompleteSearch', // AutoComplete ve Dropdonlarda istek atılacak url bilgisi.
    // Lookup ise lookup key bilgisi, Text ise get apisi bilgisi
    label: this.$t('insert.CycleInstruction.Employee'), // ilgili alanın label bilgisi
    required: true, // zorunluluk durumu. boolean | function olmaktadır. Belli bir conditiona göre yapılacaksa aşağıdaki şekilde yapılabilir. form değişkeni eklenecek objeye denk gelmektedir.
    /* required: (form) => {
      return form.IsFreeItem === 1
    }, */
    disabled: false, // disabled durumu. boolean | function olmaktadır.Belli bir conditiona göre yapılacaksa aşağıdaki şekilde yapılabilir. form değişkeni eklenecek objeye denk gelmektedir.
    /* disabled: (form) => {
      return form.IsFreeItem !== 1
    }, */
    visible: true, // görünür olup olmama durumu
    hideOnTable: true, // gridde ilgili alanın gösterilip gösterilmeme durumu
    isUnique: false, // eklenen alanın ilgili listede tekil olup olmama durumu
    parentId: null, // bi alana göre değişen bir yapıdaki durumlarda üst alan bilgisi
    id: 1, // her item için unique olabilir
    defaultValue: null, // başlangıçta default değer atamak için kullanılır
    objectKey: null, // update ekranlarında listelerde objectler gelmektedir. Örneğin Branch.Label kısmını göstermek istiyorsak object key olarak  'Branch' yazmalıyız.
    createCode: true, // bazı detay panellerde örneğin şube lokasyonu eklerken Code alanı (EkranKodu -1) şeklinde eklenmesi isteniyor.
    // bu nedenle bu alan true ise Ekran koduna göre her eklemede default bir value set eder.
    dynamicRequest: {paramId: 'ITEM_CRITERIA'}, // api isteği yaptığımız durumlarda isteğe ekenecek requesti setleyebiliriz.
    request: JSON.stringify({ParamName: 'val'}), // parent child ilişkisinde child isteği atarken parentProperty kısmındaki alan 'val'
    // kısmı ile replace olur ve requeste eklenir. Bu sayede parenta göre child bilgisi getirilebilir.
    sameValue: true // Text tiplerinde parentId deki değer sameValue true olana atanır.
  },
  {
    type: 'Dropdown',
    inputType: null,
    modelProperty: 'CustomerId',
    parentProperty: null,
    labelProperty: 'Description1',
    url: 'VisionNextCustomer/api/Customer/Search',
    label: this.$t('insert.CycleInstruction.Customer'),
    required: true,
    disabled: false,
    visible: true,
    hideOnTable: true,
    isUnique: false,
    parentId: null,
    id: 12,
    defaultValue: null,
    objectKey: null // update için kullanılır
  },
  {
    type: 'Dropdown',
    inputType: null,
    modelProperty: 'CustomerLocationId',
    parentProperty: 'RecordId',
    labelProperty: 'Description1',
    request: '{"AndConditionModel": {"CustomerIds":[val]}}',
    url: 'VisionNextCustomer/api/CustomerLocation/Search',
    label: this.$t('insert.CycleInstruction.CustomerLocation'),
    required: true,
    disabled: false,
    visible: true,
    hideOnTable: true,
    isUnique: false,
    parentId: 1,
    id: 2,
    defaultValue: null,
    objectKey: null // update için kullanılır
  },
  {
    type: 'Lookup',
    inputType: null,
    modelProperty: 'CustomeLocationId',
    parentProperty: null,
    labelProperty: 'Description1',
    url: 'CUSTOMER_CATEGORY_3',
    label: this.$t('insert.CycleInstruction.CustomerLookup'),
    required: true,
    disabled: false,
    visible: true,
    hideOnTable: true,
    isUnique: false,
    parentId: null,
    id: 123,
    defaultValue: null,
    objectKey: null // update için kullanılır
  },
  {
    type: 'Label',
    inputType: 'text',
    modelProperty: 'EmployeeDesc11',
    parentProperty: 'Description1',
    labelProperty: 'Description1',
    url: null,
    label: this.$t('insert.CycleInstruction.EmployeeDesc11'),
    required: false,
    disabled: true,
    visible: true,
    hideOnTable: true,
    isUnique: false,
    parentId: 1,
    id: null,
    defaultValue: null,
    objectKey: null // update için kullanılır
  },
  {
    type: 'Label',
    inputType: 'text',
    modelProperty: 'BranchDesc11',
    parentProperty: 'BranchId',
    labelProperty: 'Description1',
    url: 'VisionNextBranch/api/Branch/Get',
    label: this.$t('insert.CycleInstruction.BranchDesc11'),
    required: false,
    disabled: true,
    visible: true,
    hideOnTable: true,
    isUnique: false,
    parentId: 1,
    id: null,
    defaultValue: null,
    objectKey: null // update için kullanılır
  },
  {
    type: 'Text',
    inputType: 'number',
    modelProperty: 'Amount',
    parentProperty: null,
    labelProperty: 'Description1',
    url: null,
    label: this.$t('insert.CycleInstruction.Amount'),
    required: true,
    disabled: false,
    visible: true,
    hideOnTable: true,
    isUnique: false,
    parentId: null,
    id: 2,
    defaultValue: null,
    objectKey: null // update için kullanılır
  },
  {
    type: 'Text',
    inputType: 'text',
    modelProperty: 'Code',
    parentProperty: 'Code',
    labelProperty: 'Description1',
    url: null,
    label: this.$t('insert.CycleInstruction.Code'),
    required: true,
    disabled: false,
    visible: true,
    hideOnTable: true,
    isUnique: false,
    parentId: 1,
    id: null,
    defaultValue: null,
    objectKey: null // update için kullanılır
  },
  {
    type: 'Check',
    inputType: null,
    modelProperty: 'StatusId',
    parentProperty: null,
    labelProperty: 'Description1',
    url: null,
    label: this.$t('insert.CycleInstruction.Check'),
    required: true,
    disabled: false,
    visible: true,
    hideOnTable: true,
    isUnique: false,
    parentId: null,
    id: 3,
    defaultValue: null,
    objectKey: null // update için kullanılır
  },
  {
    type: 'Check',
    modelProperty: 'IsDiscount',
    visible: true,
    label: this.$t('insert.loyalty.isDiscount'),
    id: null
  },
  {
    type: 'Date',
    modelProperty: 'CategoryDate',
    visible: true,
    label: this.$t('insert.loyalty.categoryDate'),
    id: 8
  }
]
