/*
  |||||| DİKKAT ||||||
  Index, Inser, Update, Get ekranları Layout altında "children" elementine tanımlanmalanacaktır.
  -------------------------------------------------------------------------------------------------------------
  Yeni oluşturulacak ekranlar Route'dan kopyalanabilir.
  Yeni oluşturulmuş ekranları dil dosyalarında da tanımlamak gerekmektedir. (locales/tr||en.json)
  Düzeni sağlamak amacıyla "router" dizini kullanılacaktır.
  -------------------------------------------------------------------------------------------------------------
  Her bir router elementinin "name" değeri doğru girilmelidir!
  Bu değer tüm navigasyon işlemlerinde kullanılacak olan parametredir.
  -------------------------------------------------------------------------------------------------------------
  Her dizinin Yeni Kayıt linki createLink altında tanımlanmalıdır.
  -------------------------------------------------------------------------------------------------------------
  İçeriği modal içinde gösterilecek olan ekranlar INDEX altına children olarak tanımlanır
  ve Route/Show/:url örneğini kullanılır.
  -------------------------------------------------------------------------------------------------------------
  En alt dizinde bulunan "*" "tümü" anlamına gelir ve her zaman en alt satırda olmalıdır.
  Tanımlanmamış tüm ekranlar / hatalı linkler ana sayfaya yönlendirecektir.
*/
import Vue from 'vue'
import Router from 'vue-router'
import Pages from '@/pages'
import AuthRequired from '@/AuthRequired'
import Dashboard from '@/pages/Dashboard'
import DashboardIndex from '@/pages/Dashboard/Default'
import i18n from './i18n'

import LayoutIndex from '@/pages/layout/'
import LayoutGet from '@/pages/layout/get'
import LayoutInsert from '@/pages/layout/insert'
import LayoutUpdate from '@/pages/layout/update'

import RouteIndex from '@/pages/Route/' // liste ekranı
import RouteGet from '@/pages/Route/get' // fullpage görünümü
import RouteInsert from '@/pages/Route/insert' // yeni kayıt
import RouteUpdate from '@/pages/Route/update' // güncelleme

import VehicleIndex from '@/pages/Vehicle/' // liste ekranı
import VehicleGet from '@/pages/Vehicle/get' // fullpage görünümü
import VehicleInsert from '@/pages/Vehicle/insert' // yeni kayıt
import VehicleUpdate from '@/pages/Vehicle/update' // güncelleme

import EmployeeIndex from '@/pages/Employee/' // liste ekranı
import EmployeeGet from '@/pages/Employee/get' // fullpage görünümü
import EmployeeInsert from '@/pages/Employee/insert' // yeni kayıt
import EmployeeUpdate from '@/pages/Employee/update' // güncelleme

import ItemIndex from '@/pages/Item/' // liste ekranı
import ItemGet from '@/pages/Item/get' // fullpage görünümü
import ItemInsert from '@/pages/Item/insert' // yeni kayıt
import ItemUpdate from '@/pages/Item/update' // güncelleme

import BranchIndex from '@/pages/Branch/' // liste ekranı
import BranchGet from '@/pages/Branch/get' // fullpage görünümü
import BranchInsert from '@/pages/Branch/insert' // yeni kayıt
import BranchUpdate from '@/pages/Branch/update' // güncelleme

import WarehouseIndex from '@/pages/Warehouse/' // liste ekranı
import WarehouseGet from '@/pages/Warehouse/get' // fullpage görünümü
import WarehouseInsert from '@/pages/Warehouse/insert' // yeni kayıt
import WarehouseUpdate from '@/pages/Warehouse/update' // güncelleme

import CustomerIndex from '@/pages/Customer/' // liste ekranı
import CustomerGet from '@/pages/Customer/get' // fullpage görünümü
import CustomerInsert from '@/pages/Customer/insert' // yeni kayıt
import CustomerUpdate from '@/pages/Customer/update' // güncelleme

import BranchStockTransferIndex from '@/pages/BranchStockTransfer/'
import BranchStockTransferGet from '@/pages/BranchStockTransfer/get'
import BranchStockTransferInsert from '@/pages/BranchStockTransfer/insert'
import BranchStockTransferUpdate from '@/pages/BranchStockTransfer/update'

import OrderIndex from '@/pages/Order/'
import OrderGet from '@/pages/Order/get'
import OrderInsert from '@/pages/Order/insert'
import OrderUpdate from '@/pages/Order/update'

import FieldAnalysisResultIndex from '@/pages/FieldAnalysisResult/'
import FieldAnalysisResultGet from '@/pages/FieldAnalysisResult/get'
import FieldAnalysisResultInsert from '@/pages/FieldAnalysisResult/insert'
import FieldAnalysisResultUpdate from '@/pages/FieldAnalysisResult/update'

import ItemAnalysisResultIndex from '@/pages/ItemAnalysisResult/'
import ItemAnalysisResultGet from '@/pages/ItemAnalysisResult/get'
import ItemAnalysisResultInsert from '@/pages/ItemAnalysisResult/insert'
import ItemAnalysisResultUpdate from '@/pages/ItemAnalysisResult/update'

import FieldSurveyResultIndex from '@/pages/FieldSurveyResult/'
import FieldSurveyResultGet from '@/pages/FieldSurveyResult/get'
import FieldSurveyResultInsert from '@/pages/FieldSurveyResult/insert'
import FieldSurveyResultUpdate from '@/pages/FieldSurveyResult/update'

import FieldSurveyIndex from '@/pages/FieldSurvey/'
import FieldSurveyGet from '@/pages/FieldSurvey/get'
import FieldSurveyInsert from '@/pages/FieldSurvey/insert'
import FieldSurveyUpdate from '@/pages/FieldSurvey/update'

import ServiceIndex from '@/pages/Service/'
import ServiceGet from '@/pages/Service/get'
import ServiceInsert from '@/pages/Service/insert'
import ServiceUpdate from '@/pages/Service/update'

import EDocumentErrorManagementIndex from '@/pages/EDocumentErrorManagement/'
import EDocumentErrorManagementGet from '@/pages/EDocumentErrorManagement/get'
import EDocumentErrorManagementInsert from '@/pages/EDocumentErrorManagement/insert'
import EDocumentErrorManagementUpdate from '@/pages/EDocumentErrorManagement/update'

import ServiceRecordsIndex from '@/pages/ServiceRecords/'
import ServiceRecordsGet from '@/pages/ServiceRecords/get'
import ServiceRecordsInsert from '@/pages/ServiceRecords/insert'
import ServiceRecordsUpdate from '@/pages/ServiceRecords/update'

import DailyPerformanceIndex from '@/pages/DailyPerformance/'
import DailyPerformanceGet from '@/pages/DailyPerformance/get'
import DailyPerformanceInsert from '@/pages/DailyPerformance/insert'
import DailyPerformanceUpdate from '@/pages/DailyPerformance/update'

import FailurefollowupformIndex from '@/pages/Failurefollowupform/'
import FailurefollowupformGet from '@/pages/Failurefollowupform/get'
import FailurefollowupformInsert from '@/pages/Failurefollowupform/insert'
import FailurefollowupformUpdate from '@/pages/Failurefollowupform/update'

import MasterRecordsIndex from '@/pages/MasterRecords/'
import MasterRecordsGet from '@/pages/MasterRecords/get'
import MasterRecordsInsert from '@/pages/MasterRecords/insert'
import MasterRecordsUpdate from '@/pages/MasterRecords/update'

import RouteMasterRecordIndex from '@/pages/RouteMasterRecord/'
import RouteMasterRecordGet from '@/pages/RouteMasterRecord/get'
import RouteMasterRecordInsert from '@/pages/RouteMasterRecord/insert'
import RouteMasterRecordUpdate from '@/pages/RouteMasterRecord/update'

import VehicleMasterRecordIndex from '@/pages/VehicleMasterRecord/'
import VehicleMasterRecordGet from '@/pages/VehicleMasterRecord/get'
import VehicleMasterRecordInsert from '@/pages/VehicleMasterRecord/insert'
import VehicleMasterRecordUpdate from '@/pages/VehicleMasterRecord/update'

import WarehouseMasterRecordIndex from '@/pages/WarehouseMasterRecord/'
import WarehouseMasterRecordGet from '@/pages/WarehouseMasterRecord/get'
import WarehouseMasterRecordInsert from '@/pages/WarehouseMasterRecord/insert'
import WarehouseMasterRecordUpdate from '@/pages/WarehouseMasterRecord/update'

import CustomerRecordIndex from '@/pages/CustomerRecord/'
import CustomerRecordGet from '@/pages/CustomerRecord/get'
import CustomerRecordInsert from '@/pages/CustomerRecord/insert'
import CustomerRecordUpdate from '@/pages/CustomerRecord/update'

import ItemMasterRecordsIndex from '@/pages/ItemMasterRecords/'
import ItemMasterRecordsGet from '@/pages/ItemMasterRecords/get'
import ItemMasterRecordsInsert from '@/pages/ItemMasterRecords/insert'
import ItemMasterRecordsUpdate from '@/pages/ItemMasterRecords/update'

import BranchMasterRecordIndex from '@/pages/BranchMasterRecord/'
import BranchMasterRecordGet from '@/pages/BranchMasterRecord/get'
import BranchMasterRecordInsert from '@/pages/BranchMasterRecord/insert'
import BranchMasterRecordUpdate from '@/pages/BranchMasterRecord/update'

import UnitSetIndex from '@/pages/UnitSet/'
import UnitSetGet from '@/pages/UnitSet/get'
import UnitSetInsert from '@/pages/UnitSet/insert'
import UnitSetUpdate from '@/pages/UnitSet/update'

import BankIndex from '@/pages/Bank/'
import BankGet from '@/pages/Bank/get'
import BankInsert from '@/pages/Bank/insert'
import BankUpdate from '@/pages/Bank/update'

import ReturnIndex from '@/pages/Return/'
import ReturnGet from '@/pages/Return/get'
import ReturnInsert from '@/pages/Return/insert'
import ReturnUpdate from '@/pages/Return/update'

import PurchaseReturnOrderIndex from '@/pages/PurchaseReturnOrder/'
import PurchaseReturnOrderGet from '@/pages/PurchaseReturnOrder/get'
import PurchaseReturnOrderInsert from '@/pages/PurchaseReturnOrder/insert'
import PurchaseReturnOrderUpdate from '@/pages/PurchaseReturnOrder/update'

import WeighingInformationIndex from '@/pages/WeighingInformation/'
import WeighingInformationGet from '@/pages/WeighingInformation/get'
import WeighingInformationInsert from '@/pages/WeighingInformation/insert'
import WeighingInformationUpdate from '@/pages/WeighingInformation/update'

import PurchaseReturnInvoiceIndex from '@/pages/PurchaseReturnInvoice/'
import PurchaseReturnInvoiceGet from '@/pages/PurchaseReturnInvoice/get'
import PurchaseReturnInvoiceInsert from '@/pages/PurchaseReturnInvoice/insert'
import PurchaseReturnInvoiceUpdate from '@/pages/PurchaseReturnInvoice/update'

import PurchaseReturnDispatchIndex from '@/pages/PurchaseReturnDispatch/'
import PurchaseReturnDispatchGet from '@/pages/PurchaseReturnDispatch/get'
import PurchaseReturnDispatchInsert from '@/pages/PurchaseReturnDispatch/insert'
import PurchaseReturnDispatchUpdate from '@/pages/PurchaseReturnDispatch/update'

import SalesReturnInvoiceIndex from '@/pages/SalesReturnInvoice/'
import SalesReturnInvoiceGet from '@/pages/SalesReturnInvoice/get'
import SalesReturnInvoiceInsert from '@/pages/SalesReturnInvoice/insert'
import SalesReturnInvoiceUpdate from '@/pages/SalesReturnInvoice/update'

import SalesReturnDispatchIndex from '@/pages/SalesReturnDispatch/'
import SalesReturnDispatchGet from '@/pages/SalesReturnDispatch/get'
import SalesReturnDispatchInsert from '@/pages/SalesReturnDispatch/insert'
import SalesReturnDispatchUpdate from '@/pages/SalesReturnDispatch/update'

import SalesReturnOrderIndex from '@/pages/SalesReturnOrder/'
import SalesReturnOrderGet from '@/pages/SalesReturnOrder/get'
import SalesReturnOrderInsert from '@/pages/SalesReturnOrder/insert'
import SalesReturnOrderUpdate from '@/pages/SalesReturnOrder/update'

import SalesIndex from '@/pages/Sales/'
import SalesGet from '@/pages/Sales/get'
import SalesInsert from '@/pages/Sales/insert'
import SalesUpdate from '@/pages/Sales/update'

import ServiceSalesInvoiceIndex from '@/pages/ServiceSalesInvoice/'
import ServiceSalesInvoiceGet from '@/pages/ServiceSalesInvoice/get'
import ServiceSalesInvoiceInsert from '@/pages/ServiceSalesInvoice/insert'
import ServiceSalesInvoiceUpdate from '@/pages/ServiceSalesInvoice/update'

import SalesOrderIndex from '@/pages/SalesOrder/'
import SalesOrderGet from '@/pages/SalesOrder/get'
import SalesOrderInsert from '@/pages/SalesOrder/insert'
import SalesOrderUpdate from '@/pages/SalesOrder/update'

import AcceptGoodsDispatchIndex from '@/pages/AcceptGoodsDispatch/'
import AcceptGoodsDispatchGet from '@/pages/AcceptGoodsDispatch/get'
import AcceptGoodsDispatchInsert from '@/pages/AcceptGoodsDispatch/insert'
import AcceptGoodsDispatchUpdate from '@/pages/AcceptGoodsDispatch/update'

import DeliveryDispatchIndex from '@/pages/DeliveryDispatch/'
import DeliveryDispatchGet from '@/pages/DeliveryDispatch/get'
import DeliveryDispatchInsert from '@/pages/DeliveryDispatch/insert'
import DeliveryDispatchUpdate from '@/pages/DeliveryDispatch/update'

import SalesInvoiceIndex from '@/pages/SalesInvoice/'
import SalesInvoiceGet from '@/pages/SalesInvoice/get'
import SalesInvoiceInsert from '@/pages/SalesInvoice/insert'
import SalesInvoiceUpdate from '@/pages/SalesInvoice/update'

import PurchaseOrderIndex from '@/pages/PurchaseOrder/'
import PurchaseOrderGet from '@/pages/PurchaseOrder/get'
import PurchaseOrderInsert from '@/pages/PurchaseOrder/insert'
import PurchaseOrderUpdate from '@/pages/PurchaseOrder/update'

import PurchaseInvoiceIndex from '@/pages/PurchaseInvoice/'
import PurchaseInvoiceGet from '@/pages/PurchaseInvoice/get'
import PurchaseInvoiceInsert from '@/pages/PurchaseInvoice/insert'
import PurchaseInvoiceUpdate from '@/pages/PurchaseInvoice/update'

import FinanceIndex from '@/pages/Finance/'
import FinanceGet from '@/pages/Finance/get'
import FinanceInsert from '@/pages/Finance/insert'
import FinanceUpdate from '@/pages/Finance/update'

import PremiumCheckListIndex from '@/pages/PremiumCheckList/'
import PremiumCheckListGet from '@/pages/PremiumCheckList/get'
import PremiumCheckListInsert from '@/pages/PremiumCheckList/insert'
import PremiumCheckListUpdate from '@/pages/PremiumCheckList/update'

import PremiumResultIndex from '@/pages/PremiumResult/'
import PremiumResultGet from '@/pages/PremiumResult/get'
import PremiumResultInsert from '@/pages/PremiumResult/insert'
import PremiumResultUpdate from '@/pages/PremiumResult/update'

import VoucherOperationsIndex from '@/pages/VoucherOperations/'
import VoucherOperationsGet from '@/pages/VoucherOperations/get'
import VoucherOperationsInsert from '@/pages/VoucherOperations/insert'
import VoucherOperationsUpdate from '@/pages/VoucherOperations/update'

import DiscountIndex from '@/pages/Discount/'
import DiscountGet from '@/pages/Discount/get'
import DiscountInsert from '@/pages/Discount/insert'
import DiscountUpdate from '@/pages/Discount/update'

import PremiumOrderIndex from '@/pages/PremiumOrder/'
import PremiumOrderGet from '@/pages/PremiumOrder/get'
import PremiumOrderInsert from '@/pages/PremiumOrder/insert'
import PremiumOrderUpdate from '@/pages/PremiumOrder/update'

import CurrentAccountTransactionsIndex from '@/pages/CurrentAccountTransactions/'
import CurrentAccountTransactionsGet from '@/pages/CurrentAccountTransactions/get'
import CurrentAccountTransactionsInsert from '@/pages/CurrentAccountTransactions/insert'
import CurrentAccountTransactionsUpdate from '@/pages/CurrentAccountTransactions/update'

import DebtArrangementIndex from '@/pages/DebtArrangement/'
import DebtArrangementGet from '@/pages/DebtArrangement/get'
import DebtArrangementInsert from '@/pages/DebtArrangement/insert'
import DebtArrangementUpdate from '@/pages/DebtArrangement/update'

import PriceListIndex from '@/pages/PriceList/'
import PriceListGet from '@/pages/PriceList/get'
import PriceListInsert from '@/pages/PriceList/insert'
import PriceListUpdate from '@/pages/PriceList/update'

import CheckOperationsIndex from '@/pages/CheckOperations/'
import CheckOperationsGet from '@/pages/CheckOperations/get'
import CheckOperationsInsert from '@/pages/CheckOperations/insert'
import CheckOperationsUpdate from '@/pages/CheckOperations/update'

import BankTransactionIndex from '@/pages/BankTransaction/'
import BankTransactionGet from '@/pages/BankTransaction/get'
import BankTransactionInsert from '@/pages/BankTransaction/insert'
import BankTransactionUpdate from '@/pages/BankTransaction/update'

import CreditCardIndex from '@/pages/CreditCard/'
import CreditCardGet from '@/pages/CreditCard/get'
import CreditCardInsert from '@/pages/CreditCard/insert'
import CreditCardUpdate from '@/pages/CreditCard/update'

import CashTransactionsIndex from '@/pages/CashTransactions/'
import CashTransactionsGet from '@/pages/CashTransactions/get'
import CashTransactionsInsert from '@/pages/CashTransactions/insert'
import CashTransactionsUpdate from '@/pages/CashTransactions/update'

import AccountingIndex from '@/pages/Accounting/'
import AccountingGet from '@/pages/Accounting/get'
import AccountingInsert from '@/pages/Accounting/insert'
import AccountingUpdate from '@/pages/Accounting/update'

import AccountCodeDescriptionIndex from '@/pages/AccountCodeDescription/'
import AccountCodeDescriptionGet from '@/pages/AccountCodeDescription/get'
import AccountCodeDescriptionInsert from '@/pages/AccountCodeDescription/insert'
import AccountCodeDescriptionUpdate from '@/pages/AccountCodeDescription/update'

import AccountingVoucherIndex from '@/pages/AccountingVoucher/'
import AccountingVoucherGet from '@/pages/AccountingVoucher/get'
import AccountingVoucherInsert from '@/pages/AccountingVoucher/insert'
import AccountingVoucherUpdate from '@/pages/AccountingVoucher/update'

import GeneralAccountInvoiceIndex from '@/pages/GeneralAccountInvoice/'
import GeneralAccountInvoiceGet from '@/pages/GeneralAccountInvoice/get'
import GeneralAccountInvoiceInsert from '@/pages/GeneralAccountInvoice/insert'
import GeneralAccountInvoiceUpdate from '@/pages/GeneralAccountInvoice/update'

import MaterialAccountInformationIndex from '@/pages/MaterialAccountInformation/'
import MaterialAccountInformationGet from '@/pages/MaterialAccountInformation/get'
import MaterialAccountInformationInsert from '@/pages/MaterialAccountInformation/insert'
import MaterialAccountInformationUpdate from '@/pages/MaterialAccountInformation/update'

import GeneralLedgerMatchingIndex from '@/pages/GeneralLedgerMatching/'
import GeneralLedgerMatchingGet from '@/pages/GeneralLedgerMatching/get'
import GeneralLedgerMatchingInsert from '@/pages/GeneralLedgerMatching/insert'
import GeneralLedgerMatchingUpdate from '@/pages/GeneralLedgerMatching/update'

import BankAccountingMatchingIndex from '@/pages/BankAccountingMatching/'
import BankAccountingMatchingGet from '@/pages/BankAccountingMatching/get'
import BankAccountingMatchingInsert from '@/pages/BankAccountingMatching/insert'
import BankAccountingMatchingUpdate from '@/pages/BankAccountingMatching/update'

import StocksIndex from '@/pages/Stocks/'
import StocksGet from '@/pages/Stocks/get'
import StocksInsert from '@/pages/Stocks/insert'
import StocksUpdate from '@/pages/Stocks/update'

import StockAdjustmentIndex from '@/pages/StockAdjustment/'
import StockAdjustmentGet from '@/pages/StockAdjustment/get'
import StockAdjustmentInsert from '@/pages/StockAdjustment/insert'
import StockAdjustmentUpdate from '@/pages/StockAdjustment/update'

import InventoryTransactionViewIndex from '@/pages/InventoryTransactionView/'
import InventoryTransactionViewGet from '@/pages/InventoryTransactionView/get'
import InventoryTransactionViewInsert from '@/pages/InventoryTransactionView/insert'
import InventoryTransactionViewUpdate from '@/pages/InventoryTransactionView/update'

import StockTransferIndex from '@/pages/StockTransfer/'
import StockTransferGet from '@/pages/StockTransfer/get'
import StockTransferInsert from '@/pages/StockTransfer/insert'
import StockTransferUpdate from '@/pages/StockTransfer/update'

import WarehouseStockHistoryIndex from '@/pages/WarehouseStockHistory/'
import WarehouseStockHistoryGet from '@/pages/WarehouseStockHistory/get'
import WarehouseStockHistoryInsert from '@/pages/WarehouseStockHistory/insert'
import WarehouseStockHistoryUpdate from '@/pages/WarehouseStockHistory/update'

import WarehouseStockIndex from '@/pages/WarehouseStock/'
import WarehouseStockGet from '@/pages/WarehouseStock/get'
import WarehouseStockInsert from '@/pages/WarehouseStock/insert'
import WarehouseStockUpdate from '@/pages/WarehouseStock/update'

import FixedTermIndex from '@/pages/FixedTerm/'
import FixedTermGet from '@/pages/FixedTerm/get'
import FixedTermInsert from '@/pages/FixedTerm/insert'
import FixedTermUpdate from '@/pages/FixedTerm/update'

import Auth from '@/views/Auth'
import Login from '@/views/Auth/login'
import Register from '@/views/Auth/register'
import ForgotPassword from '@/views/Auth/forgot-password'
import ResetPassword from '@/views/Auth/reset-password'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Pages,
    redirect: '/Dashboard',
    beforeEnter: AuthRequired,
    children: [
      {
        path: '/Dashboard',
        name: 'Dashboard',
        component: Dashboard,
        redirect: '/Dashboard',
        children: [{
          path: '/',
          name: '',
          component: DashboardIndex
        }]
      },
      {
        path: '/',
        redirect: '/Dashboard',
        component: LayoutIndex, // listeleme ekranları
        children: [
          {path: '/RouteMasterRecord', name: 'RouteMasterRecord', component: RouteMasterRecordIndex, meta: { title: i18n.t('router.RouteMasterRecord'), createLink: 'RouteMasterRecordInsert' }},
          {path: '/VehicleMasterRecord', name: 'VehicleMasterRecord', component: VehicleMasterRecordIndex, meta: { title: i18n.t('router.VehicleMasterRecord'), createLink: 'VehicleMasterRecordInsert' }},
          {path: '/ItemMasterRecords', name: 'ItemMasterRecords', component: ItemMasterRecordsIndex, meta: { title: i18n.t('router.ItemMasterRecords'), createLink: 'ItemMasterRecordsInsert' }},
          {path: '/BranchMasterRecord', name: 'BranchMasterRecord', component: BranchMasterRecordIndex, meta: { title: i18n.t('router.BranchMasterRecord'), createLink: 'BranchMasterRecordInsert' }},
          {path: '/WarehouseMasterRecord', name: 'WarehouseMasterRecord', component: WarehouseMasterRecordIndex, meta: { title: i18n.t('router.WarehouseMasterRecord'), createLink: 'WarehouseMasterRecordInsert' }},

          {path: '/Route', name: 'Route', component: RouteIndex, meta: { title: i18n.t('router.Route'), createLink: 'RouteInsert' }},
          {path: '/Vehicle', name: 'Vehicle', component: VehicleIndex, meta: { title: i18n.t('router.Vehicle'), createLink: 'VehicleInsert' }},
          {path: '/Employee', name: 'Employee', component: EmployeeIndex, meta: { title: i18n.t('router.Employee'), createLink: 'EmployeeInsert' }},
          {path: '/Item', name: 'Item', component: ItemIndex, meta: { title: i18n.t('router.Item'), createLink: 'ItemInsert' }},
          {path: '/Branch', name: 'Branch', component: BranchIndex, meta: { title: i18n.t('router.Branch'), createLink: 'BranchInsert' }},
          {path: '/Warehouse', name: 'Warehouse', component: WarehouseIndex, meta: { title: i18n.t('router.Warehouse'), createLink: 'WarehouseInsert' }},
          {path: '/Customer', name: 'Customer', component: CustomerIndex, meta: { title: i18n.t('router.Customer'), createLink: 'CustomerInsert' }},
          {path: '/Service', name: 'Service', component: ServiceIndex, meta: { title: i18n.t('router.Service'), createLink: 'ServiceInsert' }},
          {path: '/EDocumentErrorManagement', name: 'EDocumentErrorManagement', component: EDocumentErrorManagementIndex, meta: { title: i18n.t('router.EDocumentErrorManagement'), createLink: 'EDocumentErrorManagementInsert' }},
          {path: '/ServiceRecords', name: 'ServiceRecords', component: ServiceRecordsIndex, meta: { title: i18n.t('router.ServiceRecords'), createLink: 'ServiceRecordsInsert' }},
          {path: '/DailyPerformance', name: 'DailyPerformance', component: DailyPerformanceIndex, meta: { title: i18n.t('router.DailyPerformance'), createLink: 'DailyPerformanceInsert' }},
          {path: '/Failurefollowupform', name: 'Failurefollowupform', component: FailurefollowupformIndex, meta: { title: i18n.t('router.Failurefollowupform'), createLink: 'FailurefollowupformInsert' }},
          {path: '/MasterRecords', name: 'MasterRecords', component: MasterRecordsIndex, meta: { title: i18n.t('router.MasterRecords'), createLink: 'MasterRecordsInsert' }},
          {path: '/CustomerRecord', name: 'CustomerRecord', component: CustomerRecordIndex, meta: { title: i18n.t('router.CustomerRecord'), createLink: 'CustomerRecordInsert' }},
          {path: '/UnitSet', name: 'UnitSet', component: UnitSetIndex, meta: { title: i18n.t('router.UnitSet'), createLink: 'UnitSetInsert' }},
          {path: '/Bank', name: 'Bank', component: BankIndex, meta: { title: i18n.t('router.Bank'), createLink: 'BankInsert' }},
          {path: '/Return', name: 'Return', component: ReturnIndex, meta: { title: i18n.t('router.Return'), createLink: 'ReturnInsert' }},
          {path: '/PurchaseReturnOrder', name: 'PurchaseReturnOrder', component: PurchaseReturnOrderIndex, meta: { title: i18n.t('router.PurchaseReturnOrder'), createLink: 'PurchaseReturnOrderInsert' }},
          {path: '/WeighingInformation', name: 'WeighingInformation', component: WeighingInformationIndex, meta: { title: i18n.t('router.WeighingInformation'), createLink: 'WeighingInformationInsert' }},
          {path: '/PurchaseReturnInvoice', name: 'PurchaseReturnInvoice', component: PurchaseReturnInvoiceIndex, meta: { title: i18n.t('router.PurchaseReturnInvoice'), createLink: 'PurchaseReturnInvoiceInsert' }},
          {path: '/PurchaseReturnDispatch', name: 'PurchaseReturnDispatch', component: PurchaseReturnDispatchIndex, meta: { title: i18n.t('router.PurchaseReturnDispatch'), createLink: 'PurchaseReturnDispatchInsert' }},
          {path: '/SalesReturnInvoice', name: 'SalesReturnInvoice', component: SalesReturnInvoiceIndex, meta: { title: i18n.t('router.SalesReturnInvoice'), createLink: 'SalesReturnInvoiceInsert' }},
          {path: '/SalesReturnDispatch', name: 'SalesReturnDispatch', component: SalesReturnDispatchIndex, meta: { title: i18n.t('router.SalesReturnDispatch'), createLink: 'SalesReturnDispatchInsert' }},
          {path: '/SalesReturnOrder', name: 'SalesReturnOrder', component: SalesReturnOrderIndex, meta: { title: i18n.t('router.SalesReturnOrder'), createLink: 'SalesReturnOrderInsert' }},
          {path: '/Sales', name: 'Sales', component: SalesIndex, meta: { title: i18n.t('router.Sales'), createLink: 'SalesInsert' }},
          {path: '/ServiceSalesInvoice', name: 'ServiceSalesInvoice', component: ServiceSalesInvoiceIndex, meta: { title: i18n.t('router.ServiceSalesInvoice'), createLink: 'ServiceSalesInvoiceInsert' }},
          {path: '/SalesOrder', name: 'SalesOrder', component: SalesOrderIndex, meta: { title: i18n.t('router.SalesOrder'), createLink: 'SalesOrderInsert' }},
          {path: '/AcceptGoodsDispatch', name: 'AcceptGoodsDispatch', component: AcceptGoodsDispatchIndex, meta: { title: i18n.t('router.AcceptGoodsDispatch'), createLink: 'AcceptGoodsDispatchInsert' }},
          {path: '/DeliveryDispatch', name: 'DeliveryDispatch', component: DeliveryDispatchIndex, meta: { title: i18n.t('router.DeliveryDispatch'), createLink: 'DeliveryDispatchInsert' }},
          {path: '/SalesInvoice', name: 'SalesInvoice', component: SalesInvoiceIndex, meta: { title: i18n.t('router.SalesInvoice'), createLink: 'SalesInvoiceInsert' }},
          {path: '/PurchaseOrder', name: 'PurchaseOrder', component: PurchaseOrderIndex, meta: { title: i18n.t('router.PurchaseOrder'), createLink: 'PurchaseOrderInsert' }},
          {path: '/PurchaseInvoice', name: 'PurchaseInvoice', component: PurchaseInvoiceIndex, meta: { title: i18n.t('router.PurchaseInvoice'), createLink: 'PurchaseInvoiceInsert' }},
          {path: '/Finance', name: 'Finance', component: FinanceIndex, meta: { title: i18n.t('router.Finance'), createLink: 'FinanceInsert' }},
          {path: '/PremiumCheckList', name: 'PremiumCheckList', component: PremiumCheckListIndex, meta: { title: i18n.t('router.PremiumCheckList'), createLink: 'PremiumCheckListInsert' }},
          {path: '/PremiumResult', name: 'PremiumResult', component: PremiumResultIndex, meta: { title: i18n.t('router.PremiumResult'), createLink: 'PremiumResultInsert' }},
          {path: '/VoucherOperations', name: 'VoucherOperations', component: VoucherOperationsIndex, meta: { title: i18n.t('router.VoucherOperations'), createLink: 'VoucherOperationsInsert' }},
          {path: '/Discount', name: 'Discount', component: DiscountIndex, meta: { title: i18n.t('router.Discount'), createLink: 'DiscountInsert' }},
          {path: '/PremiumOrder', name: 'PremiumOrder', component: PremiumOrderIndex, meta: { title: i18n.t('router.PremiumOrder'), createLink: 'PremiumOrderInsert' }},
          {path: '/CurrentAccountTransactions', name: 'CurrentAccountTransactions', component: CurrentAccountTransactionsIndex, meta: { title: i18n.t('router.CurrentAccountTransactions'), createLink: 'CurrentAccountTransactionsInsert' }},
          {path: '/DebtArrangement', name: 'DebtArrangement', component: DebtArrangementIndex, meta: { title: i18n.t('router.DebtArrangement'), createLink: 'DebtArrangementInsert' }},
          {path: '/PriceList', name: 'PriceList', component: PriceListIndex, meta: { title: i18n.t('router.PriceList'), createLink: 'PriceListInsert' }},
          {path: '/CheckOperations', name: 'CheckOperations', component: CheckOperationsIndex, meta: { title: i18n.t('router.CheckOperations'), createLink: 'CheckOperationsInsert' }},
          {path: '/BankTransaction', name: 'BankTransaction', component: BankTransactionIndex, meta: { title: i18n.t('router.BankTransaction'), createLink: 'BankTransactionInsert' }},
          {path: '/CreditCard', name: 'CreditCard', component: CreditCardIndex, meta: { title: i18n.t('router.CreditCard'), createLink: 'CreditCardInsert' }},
          {path: '/CashTransactions', name: 'CashTransactions', component: CashTransactionsIndex, meta: { title: i18n.t('router.CashTransactions'), createLink: 'CashTransactionsInsert' }},
          {path: '/Accounting', name: 'Accounting', component: AccountingIndex, meta: { title: i18n.t('router.Accounting'), createLink: 'AccountingInsert' }},
          {path: '/AccountCodeDescription', name: 'AccountCodeDescription', component: AccountCodeDescriptionIndex, meta: { title: i18n.t('router.AccountCodeDescription'), createLink: 'AccountCodeDescriptionInsert' }},
          {path: '/AccountingVoucher', name: 'AccountingVoucher', component: AccountingVoucherIndex, meta: { title: i18n.t('router.AccountingVoucher'), createLink: 'AccountingVoucherInsert' }},
          {path: '/GeneralAccountInvoice', name: 'GeneralAccountInvoice', component: GeneralAccountInvoiceIndex, meta: { title: i18n.t('router.GeneralAccountInvoice'), createLink: 'GeneralAccountInvoiceInsert' }},
          {path: '/MaterialAccountInformation', name: 'MaterialAccountInformation', component: MaterialAccountInformationIndex, meta: { title: i18n.t('router.MaterialAccountInformation'), createLink: 'MaterialAccountInformationInsert' }},
          {path: '/GeneralLedgerMatching', name: 'GeneralLedgerMatching', component: GeneralLedgerMatchingIndex, meta: { title: i18n.t('router.GeneralLedgerMatching'), createLink: 'GeneralLedgerMatchingInsert' }},
          {path: '/BankAccountingMatching', name: 'BankAccountingMatching', component: BankAccountingMatchingIndex, meta: { title: i18n.t('router.BankAccountingMatching'), createLink: 'BankAccountingMatchingInsert' }},
          {path: '/Stocks', name: 'Stocks', component: StocksIndex, meta: { title: i18n.t('router.Stocks'), createLink: 'StocksInsert' }},
          {path: '/StockAdjustment', name: 'StockAdjustment', component: StockAdjustmentIndex, meta: { title: i18n.t('router.StockAdjustment'), createLink: 'StockAdjustmentInsert' }},
          {path: '/InventoryTransactionView', name: 'InventoryTransactionView', component: InventoryTransactionViewIndex, meta: { title: i18n.t('router.InventoryTransactionView'), createLink: 'InventoryTransactionViewInsert' }},
          {path: '/StockTransfer', name: 'StockTransfer', component: StockTransferIndex, meta: { title: i18n.t('router.StockTransfer'), createLink: 'StockTransferInsert' }},
          {path: '/WarehouseStockHistory', name: 'WarehouseStockHistory', component: WarehouseStockHistoryIndex, meta: { title: i18n.t('router.WarehouseStockHistory'), createLink: 'WarehouseStockHistoryInsert' }},
          {path: '/WarehouseStock', name: 'WarehouseStock', component: WarehouseStockIndex, meta: { title: i18n.t('router.WarehouseStock'), createLink: 'WarehouseStockInsert' }},
          {path: '/BranchStockTransfer', name: 'BranchStockTransfer', component: BranchStockTransferIndex, meta: { title: i18n.t('router.BranchStockTransfer'), createLink: 'BranchStockTransferInsert' }},
          {path: '/Order', name: 'Order', component: OrderIndex, meta: { title: i18n.t('router.Order'), createLink: 'OrderInsert' }},
          {path: '/FieldAnalysisResult', name: 'FieldAnalysisResult', component: FieldAnalysisResultIndex, meta: { title: i18n.t('router.FieldAnalysisResult'), createLink: 'FieldAnalysisResultInsert' }},
          {path: '/ItemAnalysisResult', name: 'ItemAnalysisResult', component: ItemAnalysisResultIndex, meta: { title: i18n.t('router.ItemAnalysisResult'), createLink: 'ItemAnalysisResultInsert' }},
          {path: '/FieldSurveyResult', name: 'FieldSurveyResult', component: FieldSurveyResultIndex, meta: { title: i18n.t('router.FieldSurveyResult'), createLink: 'FieldSurveyResultInsert' }},
          {path: '/FieldSurvey', name: 'FieldSurvey', component: FieldSurveyIndex, meta: { title: i18n.t('router.FieldSurvey'), createLink: 'FieldSurveyInsert' }},
          {path: '/FixedTerm', name: 'FixedTerm', component: FixedTermIndex, meta: { title: i18n.t('router.FixedTerm'), createLink: 'FixedTermInsert' }},
        ]
      },
      {
        path: '/Get',
        component: LayoutGet, // görüntüleme ekranları
        children: [
          { path: '/Route/:url', name: 'RouteGet', component: RouteGet, meta: { title: i18n.t('router.RouteGet'), baseLink: 'Route' } },
          { path: '/Vehicle/:url', name: 'VehicleGet', component: VehicleGet, meta: { title: i18n.t('router.VehicleGet'), baseLink: 'Vehicle' } },
          { path: '/Employee/:url', name: 'EmployeeGet', component: EmployeeGet, meta: { title: i18n.t('router.EmployeeGet'), baseLink: 'Employee' } },
          { path: '/Item/:url', name: 'ItemGet', component: ItemGet, meta: { title: i18n.t('router.ItemGet'), baseLink: 'Item' } },
          { path: '/Branch/:url', name: 'BranchGet', component: BranchGet, meta: { title: i18n.t('router.BranchGet'), baseLink: 'Branch' } },
          { path: '/Warehouse/:url', name: 'WarehouseGet', component: WarehouseGet, meta: { title: i18n.t('router.WarehouseGet'), baseLink: 'Warehouse' } },
          { path: '/Customer/:url', name: 'CustomerGet', component: CustomerGet, meta: { title: i18n.t('router.CustomerGet'), baseLink: 'Customer' } },

          { path: '/Service/:url', name: 'ServiceGet', component: ServiceGet, meta: { title: i18n.t('router.ServiceGet'), baseLink: 'Service' } },
          { path: '/EDocumentErrorManagement/:url', name: 'EDocumentErrorManagementGet', component: EDocumentErrorManagementGet, meta: { title: i18n.t('router.EDocumentErrorManagementGet'), baseLink: 'EDocumentErrorManagement' } },
          { path: '/ServiceRecords/:url', name: 'ServiceRecordsGet', component: ServiceRecordsGet, meta: { title: i18n.t('router.ServiceRecordsGet'), baseLink: 'ServiceRecords' } },
          { path: '/DailyPerformance/:url', name: 'DailyPerformanceGet', component: DailyPerformanceGet, meta: { title: i18n.t('router.DailyPerformanceGet'), baseLink: 'DailyPerformance' } },
          { path: '/Failurefollowupform/:url', name: 'FailurefollowupformGet', component: FailurefollowupformGet, meta: { title: i18n.t('router.FailurefollowupformGet'), baseLink: 'Failurefollowupform' } },
          { path: '/MasterRecords/:url', name: 'MasterRecordsGet', component: MasterRecordsGet, meta: { title: i18n.t('router.MasterRecordsGet'), baseLink: 'MasterRecords' } },
          { path: '/RouteMasterRecord/:url', name: 'RouteMasterRecordGet', component: RouteMasterRecordGet, meta: { title: i18n.t('router.RouteMasterRecordGet'), baseLink: 'RouteMasterRecord' } },
          { path: '/VehicleMasterRecord/:url', name: 'VehicleMasterRecordGet', component: VehicleMasterRecordGet, meta: { title: i18n.t('router.VehicleMasterRecordGet'), baseLink: 'VehicleMasterRecord' } },
          { path: '/WarehouseMasterRecord/:url', name: 'WarehouseMasterRecordGet', component: WarehouseMasterRecordGet, meta: { title: i18n.t('router.WarehouseMasterRecordGet'), baseLink: 'WarehouseMasterRecord' } },
          { path: '/CustomerRecord/:url', name: 'CustomerRecordGet', component: CustomerRecordGet, meta: { title: i18n.t('router.CustomerRecordGet'), baseLink: 'CustomerRecord' } },
          { path: '/ItemMasterRecords/:url', name: 'ItemMasterRecordsGet', component: ItemMasterRecordsGet, meta: { title: i18n.t('router.ItemMasterRecordsGet'), baseLink: 'ItemMasterRecords' } },
          { path: '/BranchMasterRecord/:url', name: 'BranchMasterRecordGet', component: BranchMasterRecordGet, meta: { title: i18n.t('router.BranchMasterRecordGet'), baseLink: 'BranchMasterRecord' } },
          { path: '/UnitSet/:url', name: 'UnitSetGet', component: UnitSetGet, meta: { title: i18n.t('router.UnitSetGet'), baseLink: 'UnitSet' } },
          { path: '/Bank/:url', name: 'BankGet', component: BankGet, meta: { title: i18n.t('router.BankGet'), baseLink: 'Bank' } },
          { path: '/Employee/:url', name: 'EmployeeGet', component: EmployeeGet, meta: { title: i18n.t('router.EmployeeGet'), baseLink: 'Employee' } },
          { path: '/Return/:url', name: 'ReturnGet', component: ReturnGet, meta: { title: i18n.t('router.ReturnGet'), baseLink: 'Return' } },
          { path: '/PurchaseReturnOrder/:url', name: 'PurchaseReturnOrderGet', component: PurchaseReturnOrderGet, meta: { title: i18n.t('router.PurchaseReturnOrderGet'), baseLink: 'PurchaseReturnOrder' } },
          { path: '/WeighingInformation/:url', name: 'WeighingInformationGet', component: WeighingInformationGet, meta: { title: i18n.t('router.WeighingInformationGet'), baseLink: 'WeighingInformation' } },
          { path: '/PurchaseReturnInvoice/:url', name: 'PurchaseReturnInvoiceGet', component: PurchaseReturnInvoiceGet, meta: { title: i18n.t('router.PurchaseReturnInvoiceGet'), baseLink: 'PurchaseReturnInvoice' } },
          { path: '/PurchaseReturnDispatch/:url', name: 'PurchaseReturnDispatchGet', component: PurchaseReturnDispatchGet, meta: { title: i18n.t('router.PurchaseReturnDispatchGet'), baseLink: 'PurchaseReturnDispatch' } },
          { path: '/SalesReturnInvoice/:url', name: 'SalesReturnInvoiceGet', component: SalesReturnInvoiceGet, meta: { title: i18n.t('router.SalesReturnInvoiceGet'), baseLink: 'SalesReturnInvoice' } },
          { path: '/SalesReturnDispatch/:url', name: 'SalesReturnDispatchGet', component: SalesReturnDispatchGet, meta: { title: i18n.t('router.SalesReturnDispatchGet'), baseLink: 'SalesReturnDispatch' } },
          { path: '/SalesReturnOrder/:url', name: 'SalesReturnOrderGet', component: SalesReturnOrderGet, meta: { title: i18n.t('router.SalesReturnOrderGet'), baseLink: 'SalesReturnOrder' } },
          { path: '/Sales/:url', name: 'SalesGet', component: SalesGet, meta: { title: i18n.t('router.SalesGet'), baseLink: 'Sales' } },
          { path: '/ServiceSalesInvoice/:url', name: 'ServiceSalesInvoiceGet', component: ServiceSalesInvoiceGet, meta: { title: i18n.t('router.ServiceSalesInvoiceGet'), baseLink: 'ServiceSalesInvoice' } },
          { path: '/SalesOrder/:url', name: 'SalesOrderGet', component: SalesOrderGet, meta: { title: i18n.t('router.SalesOrderGet'), baseLink: 'SalesOrder' } },
          { path: '/AcceptGoodsDispatch/:url', name: 'AcceptGoodsDispatchGet', component: AcceptGoodsDispatchGet, meta: { title: i18n.t('router.AcceptGoodsDispatchGet'), baseLink: 'AcceptGoodsDispatch' } },
          { path: '/DeliveryDispatch/:url', name: 'DeliveryDispatchGet', component: DeliveryDispatchGet, meta: { title: i18n.t('router.DeliveryDispatchGet'), baseLink: 'DeliveryDispatch' } },
          { path: '/SalesInvoice/:url', name: 'SalesInvoiceGet', component: SalesInvoiceGet, meta: { title: i18n.t('router.SalesInvoiceGet'), baseLink: 'SalesInvoice' } },
          { path: '/PurchaseOrder/:url', name: 'PurchaseOrderGet', component: PurchaseOrderGet, meta: { title: i18n.t('router.PurchaseOrderGet'), baseLink: 'PurchaseOrder' } },
          { path: '/PurchaseInvoice/:url', name: 'PurchaseInvoiceGet', component: PurchaseInvoiceGet, meta: { title: i18n.t('router.PurchaseInvoiceGet'), baseLink: 'PurchaseInvoice' } },
          { path: '/Finance/:url', name: 'FinanceGet', component: FinanceGet, meta: { title: i18n.t('router.FinanceGet'), baseLink: 'Finance' } },
          { path: '/PremiumCheckList/:url', name: 'PremiumCheckListGet', component: PremiumCheckListGet, meta: { title: i18n.t('router.PremiumCheckListGet'), baseLink: 'PremiumCheckList' } },
          { path: '/PremiumResult/:url', name: 'PremiumResultGet', component: PremiumResultGet, meta: { title: i18n.t('router.PremiumResultGet'), baseLink: 'PremiumResult' } },
          { path: '/VoucherOperations/:url', name: 'VoucherOperationsGet', component: VoucherOperationsGet, meta: { title: i18n.t('router.VoucherOperationsGet'), baseLink: 'VoucherOperations' } },
          { path: '/Discount/:url', name: 'DiscountGet', component: DiscountGet, meta: { title: i18n.t('router.DiscountGet'), baseLink: 'Discount' } },
          { path: '/PremiumOrder/:url', name: 'PremiumOrderGet', component: PremiumOrderGet, meta: { title: i18n.t('router.PremiumOrderGet'), baseLink: 'PremiumOrder' } },
          { path: '/CurrentAccountTransactions/:url', name: 'CurrentAccountTransactionsGet', component: CurrentAccountTransactionsGet, meta: { title: i18n.t('router.CurrentAccountTransactionsGet'), baseLink: 'CurrentAccountTransactions' } },
          { path: '/DebtArrangement/:url', name: 'DebtArrangementGet', component: DebtArrangementGet, meta: { title: i18n.t('router.DebtArrangementGet'), baseLink: 'DebtArrangement' } },
          { path: '/PriceList/:url', name: 'PriceListGet', component: PriceListGet, meta: { title: i18n.t('router.PriceListGet'), baseLink: 'PriceList' } },
          { path: '/CheckOperations/:url', name: 'CheckOperationsGet', component: CheckOperationsGet, meta: { title: i18n.t('router.CheckOperationsGet'), baseLink: 'CheckOperations' } },
          { path: '/BankTransaction/:url', name: 'BankTransactionGet', component: BankTransactionGet, meta: { title: i18n.t('router.BankTransactionGet'), baseLink: 'BankTransaction' } },
          { path: '/CreditCard/:url', name: 'CreditCardGet', component: CreditCardGet, meta: { title: i18n.t('router.CreditCardGet'), baseLink: 'CreditCard' } },
          { path: '/CashTransactions/:url', name: 'CashTransactionsGet', component: CashTransactionsGet, meta: { title: i18n.t('router.CashTransactionsGet'), baseLink: 'CashTransactions' } },
          { path: '/Accounting/:url', name: 'AccountingGet', component: AccountingGet, meta: { title: i18n.t('router.AccountingGet'), baseLink: 'Accounting' } },
          { path: '/AccountCodeDescription/:url', name: 'AccountCodeDescriptionGet', component: AccountCodeDescriptionGet, meta: { title: i18n.t('router.AccountCodeDescriptionGet'), baseLink: 'AccountCodeDescription' } },
          { path: '/AccountingVoucher/:url', name: 'AccountingVoucherGet', component: AccountingVoucherGet, meta: { title: i18n.t('router.AccountingVoucherGet'), baseLink: 'AccountingVoucher' } },
          { path: '/GeneralAccountInvoice/:url', name: 'GeneralAccountInvoiceGet', component: GeneralAccountInvoiceGet, meta: { title: i18n.t('router.GeneralAccountInvoiceGet'), baseLink: 'GeneralAccountInvoice' } },
          { path: '/MaterialAccountInformation/:url', name: 'MaterialAccountInformationGet', component: MaterialAccountInformationGet, meta: { title: i18n.t('router.MaterialAccountInformationGet'), baseLink: 'MaterialAccountInformation' } },
          { path: '/GeneralLedgerMatching/:url', name: 'GeneralLedgerMatchingGet', component: GeneralLedgerMatchingGet, meta: { title: i18n.t('router.GeneralLedgerMatchingGet'), baseLink: 'GeneralLedgerMatching' } },
          { path: '/BankAccountingMatching/:url', name: 'BankAccountingMatchingGet', component: BankAccountingMatchingGet, meta: { title: i18n.t('router.BankAccountingMatchingGet'), baseLink: 'BankAccountingMatching' } },
          { path: '/Stocks/:url', name: 'StocksGet', component: StocksGet, meta: { title: i18n.t('router.StocksGet'), baseLink: 'Stocks' } },
          { path: '/StockAdjustment/:url', name: 'StockAdjustmentGet', component: StockAdjustmentGet, meta: { title: i18n.t('router.StockAdjustmentGet'), baseLink: 'StockAdjustment' } },
          { path: '/InventoryTransactionView/:url', name: 'InventoryTransactionViewGet', component: InventoryTransactionViewGet, meta: { title: i18n.t('router.InventoryTransactionViewGet'), baseLink: 'InventoryTransactionView' } },
          { path: '/StockTransfer/:url', name: 'StockTransferGet', component: StockTransferGet, meta: { title: i18n.t('router.StockTransferGet'), baseLink: 'StockTransfer' } },
          { path: '/WarehouseStockHistory/:url', name: 'WarehouseStockHistoryGet', component: WarehouseStockHistoryGet, meta: { title: i18n.t('router.WarehouseStockHistoryGet'), baseLink: 'WarehouseStockHistory' } },
          { path: '/WarehouseStock/:url', name: 'WarehouseStockGet', component: WarehouseStockGet, meta: { title: i18n.t('router.WarehouseStockGet'), baseLink: 'WarehouseStock' } },
          { path: '/BranchStockTransfer/:url', name: 'BranchStockTransferGet', component: BranchStockTransferGet, meta: { title: i18n.t('router.BranchStockTransferGet'), baseLink: 'BranchStockTransfer' } },
          { path: '/Order/:url', name: 'OrderGet', component: OrderGet, meta: { title: i18n.t('router.OrderGet'), baseLink: 'Order' } },
          { path: '/FieldAnalysisResult/:url', name: 'FieldAnalysisResultGet', component: FieldAnalysisResultGet, meta: { title: i18n.t('router.FieldAnalysisResultGet'), baseLink: 'FieldAnalysisResult' } },
          { path: '/ItemAnalysisResult/:url', name: 'ItemAnalysisResultGet', component: ItemAnalysisResultGet, meta: { title: i18n.t('router.ItemAnalysisResultGet'), baseLink: 'ItemAnalysisResult' } },
          { path: '/FieldSurveyResult/:url', name: 'FieldSurveyResultGet', component: FieldSurveyResultGet, meta: { title: i18n.t('router.FieldSurveyResultGet'), baseLink: 'FieldSurveyResult' } },
          { path: '/FieldSurvey/:url', name: 'FieldSurveyGet', component: FieldSurveyGet, meta: { title: i18n.t('router.FieldSurveyGet'), baseLink: 'FieldSurvey' } },
          { path: '/FixedTerm/:url', name: 'FixedTermGet', component: FixedTermGet, meta: { title: i18n.t('router.FixedTermGet'), baseLink: 'FixedTerm' } },
        ]
      },
      {
        path: '/Update',
        component: LayoutUpdate, // görüntüleme ekranları
        children: [
          { path: '/Update/Route/:url', name: 'RouteUpdate', component: RouteUpdate, meta: { title: i18n.t('router.RouteUpdate'), baseLink: 'Route' } },
          { path: '/Update/Vehicle/:url', name: 'VehicleUpdate', component: VehicleUpdate, meta: { title: i18n.t('router.VehicleUpdate'), baseLink: 'Vehicle' } },
          { path: '/Update/Employee/:url', name: 'EmployeeUpdate', component: EmployeeUpdate, meta: { title: i18n.t('router.EmployeeUpdate'), baseLink: 'Employee' } },
          { path: '/Update/Item/:url', name: 'ItemUpdate', component: ItemUpdate, meta: { title: i18n.t('router.ItemUpdate'), baseLink: 'Item' } },
          { path: '/Update/Branch/:url', name: 'BranchUpdate', component: BranchUpdate, meta: { title: i18n.t('router.BranchUpdate'), baseLink: 'Branch' } },
          { path: '/Update/Warehouse/:url', name: 'WarehouseUpdate', component: WarehouseUpdate, meta: { title: i18n.t('router.WarehouseUpdate'), baseLink: 'Warehouse' } },
          { path: '/Update/Customer/:url', name: 'CustomerUpdate', component: CustomerUpdate, meta: { title: i18n.t('router.CustomerUpdate'), baseLink: 'Customer' } },

          { path: '/Update/Service/:url', name: 'ServiceUpdate', component: ServiceUpdate, meta: { title: i18n.t('router.ServiceUpdate'), baseLink: 'Service' } },
          { path: '/Update/EDocumentErrorManagement/:url', name: 'EDocumentErrorManagementUpdate', component: EDocumentErrorManagementUpdate, meta: { title: i18n.t('router.EDocumentErrorManagementUpdate'), baseLink: 'EDocumentErrorManagement' } },
          { path: '/Update/ServiceRecords/:url', name: 'ServiceRecordsUpdate', component: ServiceRecordsUpdate, meta: { title: i18n.t('router.ServiceRecordsUpdate'), baseLink: 'ServiceRecords' } },
          { path: '/Update/DailyPerformance/:url', name: 'DailyPerformanceUpdate', component: DailyPerformanceUpdate, meta: { title: i18n.t('router.DailyPerformanceUpdate'), baseLink: 'DailyPerformance' } },
          { path: '/Update/Failurefollowupform/:url', name: 'FailurefollowupformUpdate', component: FailurefollowupformUpdate, meta: { title: i18n.t('router.FailurefollowupformUpdate'), baseLink: 'Failurefollowupform' } },
          { path: '/Update/MasterRecords/:url', name: 'MasterRecordsUpdate', component: MasterRecordsUpdate, meta: { title: i18n.t('router.MasterRecordsUpdate'), baseLink: 'MasterRecords' } },
          { path: '/Update/RouteMasterRecord/:url', name: 'RouteMasterRecordUpdate', component: RouteMasterRecordUpdate, meta: { title: i18n.t('router.RouteMasterRecordUpdate'), baseLink: 'RouteMasterRecord' } },
          { path: '/Update/VehicleMasterRecord/:url', name: 'VehicleMasterRecordUpdate', component: VehicleMasterRecordUpdate, meta: { title: i18n.t('router.VehicleMasterRecordUpdate'), baseLink: 'VehicleMasterRecord' } },
          { path: '/Update/WarehouseMasterRecord/:url', name: 'WarehouseMasterRecordUpdate', component: WarehouseMasterRecordUpdate, meta: { title: i18n.t('router.WarehouseMasterRecordUpdate'), baseLink: 'WarehouseMasterRecord' } },
          { path: '/Update/CustomerRecord/:url', name: 'CustomerRecordUpdate', component: CustomerRecordUpdate, meta: { title: i18n.t('router.CustomerRecordUpdate'), baseLink: 'CustomerRecord' } },
          { path: '/Update/ItemMasterRecords/:url', name: 'ItemMasterRecordsUpdate', component: ItemMasterRecordsUpdate, meta: { title: i18n.t('router.ItemMasterRecordsUpdate'), baseLink: 'ItemMasterRecords' } },
          { path: '/Update/BranchMasterRecord/:url', name: 'BranchMasterRecordUpdate', component: BranchMasterRecordUpdate, meta: { title: i18n.t('router.BranchMasterRecordUpdate'), baseLink: 'BranchMasterRecord' } },
          { path: '/Update/UnitSet/:url', name: 'UnitSetUpdate', component: UnitSetUpdate, meta: { title: i18n.t('router.UnitSetUpdate'), baseLink: 'UnitSet' } },
          { path: '/Update/Bank/:url', name: 'BankUpdate', component: BankUpdate, meta: { title: i18n.t('router.BankUpdate'), baseLink: 'Bank' } },
          { path: '/Update/Employee/:url', name: 'EmployeeUpdate', component: EmployeeUpdate, meta: { title: i18n.t('router.EmployeeUpdate'), baseLink: 'Employee' } },
          { path: '/Update/Return/:url', name: 'ReturnUpdate', component: ReturnUpdate, meta: { title: i18n.t('router.ReturnUpdate'), baseLink: 'Return' } },
          { path: '/Update/PurchaseReturnOrder/:url', name: 'PurchaseReturnOrderUpdate', component: PurchaseReturnOrderUpdate, meta: { title: i18n.t('router.PurchaseReturnOrderUpdate'), baseLink: 'PurchaseReturnOrder' } },
          { path: '/Update/WeighingInformation/:url', name: 'WeighingInformationUpdate', component: WeighingInformationUpdate, meta: { title: i18n.t('router.WeighingInformationUpdate'), baseLink: 'WeighingInformation' } },
          { path: '/Update/PurchaseReturnInvoice/:url', name: 'PurchaseReturnInvoiceUpdate', component: PurchaseReturnInvoiceUpdate, meta: { title: i18n.t('router.PurchaseReturnInvoiceUpdate'), baseLink: 'PurchaseReturnInvoice' } },
          { path: '/Update/PurchaseReturnDispatch/:url', name: 'PurchaseReturnDispatchUpdate', component: PurchaseReturnDispatchUpdate, meta: { title: i18n.t('router.PurchaseReturnDispatchUpdate'), baseLink: 'PurchaseReturnDispatch' } },
          { path: '/Update/SalesReturnInvoice/:url', name: 'SalesReturnInvoiceUpdate', component: SalesReturnInvoiceUpdate, meta: { title: i18n.t('router.SalesReturnInvoiceUpdate'), baseLink: 'SalesReturnInvoice' } },
          { path: '/Update/SalesReturnDispatch/:url', name: 'SalesReturnDispatchUpdate', component: SalesReturnDispatchUpdate, meta: { title: i18n.t('router.SalesReturnDispatchUpdate'), baseLink: 'SalesReturnDispatch' } },
          { path: '/Update/SalesReturnOrder/:url', name: 'SalesReturnOrderUpdate', component: SalesReturnOrderUpdate, meta: { title: i18n.t('router.SalesReturnOrderUpdate'), baseLink: 'SalesReturnOrder' } },
          { path: '/Update/Sales/:url', name: 'SalesUpdate', component: SalesUpdate, meta: { title: i18n.t('router.SalesUpdate'), baseLink: 'Sales' } },
          { path: '/Update/ServiceSalesInvoice/:url', name: 'ServiceSalesInvoiceUpdate', component: ServiceSalesInvoiceUpdate, meta: { title: i18n.t('router.ServiceSalesInvoiceUpdate'), baseLink: 'ServiceSalesInvoice' } },
          { path: '/Update/SalesOrder/:url', name: 'SalesOrderUpdate', component: SalesOrderUpdate, meta: { title: i18n.t('router.SalesOrderUpdate'), baseLink: 'SalesOrder' } },
          { path: '/Update/AcceptGoodsDispatch/:url', name: 'AcceptGoodsDispatchUpdate', component: AcceptGoodsDispatchUpdate, meta: { title: i18n.t('router.AcceptGoodsDispatchUpdate'), baseLink: 'AcceptGoodsDispatch' } },
          { path: '/Update/DeliveryDispatch/:url', name: 'DeliveryDispatchUpdate', component: DeliveryDispatchUpdate, meta: { title: i18n.t('router.DeliveryDispatchUpdate'), baseLink: 'DeliveryDispatch' } },
          { path: '/Update/SalesInvoice/:url', name: 'SalesInvoiceUpdate', component: SalesInvoiceUpdate, meta: { title: i18n.t('router.SalesInvoiceUpdate'), baseLink: 'SalesInvoice' } },
          { path: '/Update/PurchaseOrder/:url', name: 'PurchaseOrderUpdate', component: PurchaseOrderUpdate, meta: { title: i18n.t('router.PurchaseOrderUpdate'), baseLink: 'PurchaseOrder' } },
          { path: '/Update/PurchaseInvoice/:url', name: 'PurchaseInvoiceUpdate', component: PurchaseInvoiceUpdate, meta: { title: i18n.t('router.PurchaseInvoiceUpdate'), baseLink: 'PurchaseInvoice' } },
          { path: '/Update/Finance/:url', name: 'FinanceUpdate', component: FinanceUpdate, meta: { title: i18n.t('router.FinanceUpdate'), baseLink: 'Finance' } },
          { path: '/Update/PremiumCheckList/:url', name: 'PremiumCheckListUpdate', component: PremiumCheckListUpdate, meta: { title: i18n.t('router.PremiumCheckListUpdate'), baseLink: 'PremiumCheckList' } },
          { path: '/Update/PremiumResult/:url', name: 'PremiumResultUpdate', component: PremiumResultUpdate, meta: { title: i18n.t('router.PremiumResultUpdate'), baseLink: 'PremiumResult' } },
          { path: '/Update/VoucherOperations/:url', name: 'VoucherOperationsUpdate', component: VoucherOperationsUpdate, meta: { title: i18n.t('router.VoucherOperationsUpdate'), baseLink: 'VoucherOperations' } },
          { path: '/Update/Discount/:url', name: 'DiscountUpdate', component: DiscountUpdate, meta: { title: i18n.t('router.DiscountUpdate'), baseLink: 'Discount' } },
          { path: '/Update/PremiumOrder/:url', name: 'PremiumOrderUpdate', component: PremiumOrderUpdate, meta: { title: i18n.t('router.PremiumOrderUpdate'), baseLink: 'PremiumOrder' } },
          { path: '/Update/CurrentAccountTransactions/:url', name: 'CurrentAccountTransactionsUpdate', component: CurrentAccountTransactionsUpdate, meta: { title: i18n.t('router.CurrentAccountTransactionsUpdate'), baseLink: 'CurrentAccountTransactions' } },
          { path: '/Update/DebtArrangement/:url', name: 'DebtArrangementUpdate', component: DebtArrangementUpdate, meta: { title: i18n.t('router.DebtArrangementUpdate'), baseLink: 'DebtArrangement' } },
          { path: '/Update/PriceList/:url', name: 'PriceListUpdate', component: PriceListUpdate, meta: { title: i18n.t('router.PriceListUpdate'), baseLink: 'PriceList' } },
          { path: '/Update/CheckOperations/:url', name: 'CheckOperationsUpdate', component: CheckOperationsUpdate, meta: { title: i18n.t('router.CheckOperationsUpdate'), baseLink: 'CheckOperations' } },
          { path: '/Update/BankTransaction/:url', name: 'BankTransactionUpdate', component: BankTransactionUpdate, meta: { title: i18n.t('router.BankTransactionUpdate'), baseLink: 'BankTransaction' } },
          { path: '/Update/CreditCard/:url', name: 'CreditCardUpdate', component: CreditCardUpdate, meta: { title: i18n.t('router.CreditCardUpdate'), baseLink: 'CreditCard' } },
          { path: '/Update/CashTransactions/:url', name: 'CashTransactionsUpdate', component: CashTransactionsUpdate, meta: { title: i18n.t('router.CashTransactionsUpdate'), baseLink: 'CashTransactions' } },
          { path: '/Update/Accounting/:url', name: 'AccountingUpdate', component: AccountingUpdate, meta: { title: i18n.t('router.AccountingUpdate'), baseLink: 'Accounting' } },
          { path: '/Update/AccountCodeDescription/:url', name: 'AccountCodeDescriptionUpdate', component: AccountCodeDescriptionUpdate, meta: { title: i18n.t('router.AccountCodeDescriptionUpdate'), baseLink: 'AccountCodeDescription' } },
          { path: '/Update/AccountingVoucher/:url', name: 'AccountingVoucherUpdate', component: AccountingVoucherUpdate, meta: { title: i18n.t('router.AccountingVoucherUpdate'), baseLink: 'AccountingVoucher' } },
          { path: '/Update/GeneralAccountInvoice/:url', name: 'GeneralAccountInvoiceUpdate', component: GeneralAccountInvoiceUpdate, meta: { title: i18n.t('router.GeneralAccountInvoiceUpdate'), baseLink: 'GeneralAccountInvoice' } },
          { path: '/Update/MaterialAccountInformation/:url', name: 'MaterialAccountInformationUpdate', component: MaterialAccountInformationUpdate, meta: { title: i18n.t('router.MaterialAccountInformationUpdate'), baseLink: 'MaterialAccountInformation' } },
          { path: '/Update/GeneralLedgerMatching/:url', name: 'GeneralLedgerMatchingUpdate', component: GeneralLedgerMatchingUpdate, meta: { title: i18n.t('router.GeneralLedgerMatchingUpdate'), baseLink: 'GeneralLedgerMatching' } },
          { path: '/Update/BankAccountingMatching/:url', name: 'BankAccountingMatchingUpdate', component: BankAccountingMatchingUpdate, meta: { title: i18n.t('router.BankAccountingMatchingUpdate'), baseLink: 'BankAccountingMatching' } },
          { path: '/Update/Stocks/:url', name: 'StocksUpdate', component: StocksUpdate, meta: { title: i18n.t('router.StocksUpdate'), baseLink: 'Stocks' } },
          { path: '/Update/StockAdjustment/:url', name: 'StockAdjustmentUpdate', component: StockAdjustmentUpdate, meta: { title: i18n.t('router.StockAdjustmentUpdate'), baseLink: 'StockAdjustment' } },
          { path: '/Update/InventoryTransactionView/:url', name: 'InventoryTransactionViewUpdate', component: InventoryTransactionViewUpdate, meta: { title: i18n.t('router.InventoryTransactionViewUpdate'), baseLink: 'InventoryTransactionView' } },
          { path: '/Update/StockTransfer/:url', name: 'StockTransferUpdate', component: StockTransferUpdate, meta: { title: i18n.t('router.StockTransferUpdate'), baseLink: 'StockTransfer' } },
          { path: '/Update/WarehouseStockHistory/:url', name: 'WarehouseStockHistoryUpdate', component: WarehouseStockHistoryUpdate, meta: { title: i18n.t('router.WarehouseStockHistoryUpdate'), baseLink: 'WarehouseStockHistory' } },
          { path: '/Update/WarehouseStock/:url', name: 'WarehouseStockUpdate', component: WarehouseStockUpdate, meta: { title: i18n.t('router.WarehouseStockUpdate'), baseLink: 'WarehouseStock' } },

          { path: '/Update/BranchStockTransferUpdate/:url', name: 'BranchStockTransferUpdate', component: BranchStockTransferUpdate, meta: { title: i18n.t('router.BranchStockTransferUpdate'), baseLink: 'BranchStockTransferUpdate' } },
          { path: '/Update/OrderUpdate/:url', name: 'OrderUpdate', component: OrderUpdate, meta: { title: i18n.t('router.OrderUpdate'), baseLink: 'OrderUpdate' } },
          { path: '/Update/FieldAnalysisResultUpdate/:url', name: 'FieldAnalysisResultUpdate', component: FieldAnalysisResultUpdate, meta: { title: i18n.t('router.FieldAnalysisResultUpdate'), baseLink: 'FieldAnalysisResultUpdate' } },
          { path: '/Update/ItemAnalysisResultUpdate/:url', name: 'ItemAnalysisResultUpdate', component: ItemAnalysisResultUpdate, meta: { title: i18n.t('router.ItemAnalysisResultUpdate'), baseLink: 'ItemAnalysisResultUpdate' } },
          { path: '/Update/FieldSurveyResultUpdate/:url', name: 'FieldSurveyResultUpdate', component: FieldSurveyResultUpdate, meta: { title: i18n.t('router.FieldSurveyResultUpdate'), baseLink: 'FieldSurveyResultUpdate' } },
          { path: '/Update/FieldSurveyUpdate/:url', name: 'FieldSurveyUpdate', component: FieldSurveyUpdate, meta: { title: i18n.t('router.FieldSurveyUpdate'), baseLink: 'FieldSurveyUpdate' } },
          { path: '/Update/FixedTerm/:url', name: 'FixedTermUpdate', component: FixedTermUpdate, meta: { title: i18n.t('router.FixedTermUpdate'), baseLink: 'FixedTerm' } }
        ]
      },
      {
        path: '/Insert',
        component: LayoutInsert, // oluşturma ekranları
        children: [
          { path: '/Insert/Route', name: 'RouteInsert', component: RouteInsert, meta: { title: i18n.t('router.RouteInsert'), baseLink: 'Route' } },
          { path: '/Insert/Vehicle', name: 'VehicleInsert', component: VehicleInsert, meta: { title: i18n.t('router.VehicleInsert'), baseLink: 'Vehicle' } },
          { path: '/Insert/Employee', name: 'EmployeeInsert', component: EmployeeInsert, meta: { title: i18n.t('router.EmployeeInsert'), baseLink: 'Employee' } },
          { path: '/Insert/Item', name: 'ItemInsert', component: ItemInsert, meta: { title: i18n.t('router.ItemInsert'), baseLink: 'Item' } },
          { path: '/Insert/Branch', name: 'BranchInsert', component: BranchInsert, meta: { title: i18n.t('router.BranchInsert'), baseLink: 'Branch' } },
          { path: '/Insert/Warehouse', name: 'WarehouseInsert', component: WarehouseInsert, meta: { title: i18n.t('router.WarehouseInsert'), baseLink: 'Warehouse' } },
          { path: '/Insert/Customer', name: 'CustomerInsert', component: CustomerInsert, meta: { title: i18n.t('router.CustomerInsert'), baseLink: 'Customer' } },

          { path: '/Insert/Service', name: 'ServiceInsert', component: ServiceInsert, meta: { title: i18n.t('router.ServiceInsert'), baseLink: 'Service' } },
          { path: '/Insert/EDocumentErrorManagement', name: 'EDocumentErrorManagementInsert', component: EDocumentErrorManagementInsert, meta: { title: i18n.t('router.EDocumentErrorManagementInsert'), baseLink: 'EDocumentErrorManagement' } },
          { path: '/Insert/ServiceRecords', name: 'ServiceRecordsInsert', component: ServiceRecordsInsert, meta: { title: i18n.t('router.ServiceRecordsInsert'), baseLink: 'ServiceRecords' } },
          { path: '/Insert/DailyPerformance', name: 'DailyPerformanceInsert', component: DailyPerformanceInsert, meta: { title: i18n.t('router.DailyPerformanceInsert'), baseLink: 'DailyPerformance' } },
          { path: '/Insert/Failurefollowupform', name: 'FailurefollowupformInsert', component: FailurefollowupformInsert, meta: { title: i18n.t('router.FailurefollowupformInsert'), baseLink: 'Failurefollowupform' } },
          { path: '/Insert/MasterRecords', name: 'MasterRecordsInsert', component: MasterRecordsInsert, meta: { title: i18n.t('router.MasterRecordsInsert'), baseLink: 'MasterRecords' } },
          { path: '/Insert/RouteMasterRecord', name: 'RouteMasterRecordInsert', component: RouteMasterRecordInsert, meta: { title: i18n.t('router.RouteMasterRecordInsert'), baseLink: 'RouteMasterRecord' } },
          { path: '/Insert/VehicleMasterRecord', name: 'VehicleMasterRecordInsert', component: VehicleMasterRecordInsert, meta: { title: i18n.t('router.VehicleMasterRecordInsert'), baseLink: 'VehicleMasterRecord' } },
          { path: '/Insert/WarehouseMasterRecord', name: 'WarehouseMasterRecordInsert', component: WarehouseMasterRecordInsert, meta: { title: i18n.t('router.WarehouseMasterRecordInsert'), baseLink: 'WarehouseMasterRecord' } },
          { path: '/Insert/CustomerRecord', name: 'CustomerRecordInsert', component: CustomerRecordInsert, meta: { title: i18n.t('router.CustomerRecordInsert'), baseLink: 'CustomerRecord' } },
          { path: '/Insert/ItemMasterRecords', name: 'ItemMasterRecordsInsert', component: ItemMasterRecordsInsert, meta: { title: i18n.t('router.ItemMasterRecordsInsert'), baseLink: 'ItemMasterRecords' } },
          { path: '/Insert/BranchMasterRecord', name: 'BranchMasterRecordInsert', component: BranchMasterRecordInsert, meta: { title: i18n.t('router.BranchMasterRecordInsert'), baseLink: 'BranchMasterRecord' } },
          { path: '/Insert/UnitSet', name: 'UnitSetInsert', component: UnitSetInsert, meta: { title: i18n.t('router.UnitSetInsert'), baseLink: 'UnitSet' } },
          { path: '/Insert/Bank', name: 'BankInsert', component: BankInsert, meta: { title: i18n.t('router.BankInsert'), baseLink: 'Bank' } },
          { path: '/Insert/Employee', name: 'EmployeeInsert', component: EmployeeInsert, meta: { title: i18n.t('router.EmployeeInsert'), baseLink: 'Employee' } },
          { path: '/Insert/Return', name: 'ReturnInsert', component: ReturnInsert, meta: { title: i18n.t('router.ReturnInsert'), baseLink: 'Return' } },
          { path: '/Insert/PurchaseReturnOrder', name: 'PurchaseReturnOrderInsert', component: PurchaseReturnOrderInsert, meta: { title: i18n.t('router.PurchaseReturnOrderInsert'), baseLink: 'PurchaseReturnOrder' } },
          { path: '/Insert/WeighingInformation', name: 'WeighingInformationInsert', component: WeighingInformationInsert, meta: { title: i18n.t('router.WeighingInformationInsert'), baseLink: 'WeighingInformation' } },
          { path: '/Insert/PurchaseReturnInvoice', name: 'PurchaseReturnInvoiceInsert', component: PurchaseReturnInvoiceInsert, meta: { title: i18n.t('router.PurchaseReturnInvoiceInsert'), baseLink: 'PurchaseReturnInvoice' } },
          { path: '/Insert/PurchaseReturnDispatch', name: 'PurchaseReturnDispatchInsert', component: PurchaseReturnDispatchInsert, meta: { title: i18n.t('router.PurchaseReturnDispatchInsert'), baseLink: 'PurchaseReturnDispatch' } },
          { path: '/Insert/SalesReturnInvoice', name: 'SalesReturnInvoiceInsert', component: SalesReturnInvoiceInsert, meta: { title: i18n.t('router.SalesReturnInvoiceInsert'), baseLink: 'SalesReturnInvoice' } },
          { path: '/Insert/SalesReturnDispatch', name: 'SalesReturnDispatchInsert', component: SalesReturnDispatchInsert, meta: { title: i18n.t('router.SalesReturnDispatchInsert'), baseLink: 'SalesReturnDispatch' } },
          { path: '/Insert/SalesReturnOrder', name: 'SalesReturnOrderInsert', component: SalesReturnOrderInsert, meta: { title: i18n.t('router.SalesReturnOrderInsert'), baseLink: 'SalesReturnOrder' } },
          { path: '/Insert/Sales', name: 'SalesInsert', component: SalesInsert, meta: { title: i18n.t('router.SalesInsert'), baseLink: 'Sales' } },
          { path: '/Insert/ServiceSalesInvoice', name: 'ServiceSalesInvoiceInsert', component: ServiceSalesInvoiceInsert, meta: { title: i18n.t('router.ServiceSalesInvoiceInsert'), baseLink: 'ServiceSalesInvoice' } },
          { path: '/Insert/SalesOrder', name: 'SalesOrderInsert', component: SalesOrderInsert, meta: { title: i18n.t('router.SalesOrderInsert'), baseLink: 'SalesOrder' } },
          { path: '/Insert/AcceptGoodsDispatch', name: 'AcceptGoodsDispatchInsert', component: AcceptGoodsDispatchInsert, meta: { title: i18n.t('router.AcceptGoodsDispatchInsert'), baseLink: 'AcceptGoodsDispatch' } },
          { path: '/Insert/DeliveryDispatch', name: 'DeliveryDispatchInsert', component: DeliveryDispatchInsert, meta: { title: i18n.t('router.DeliveryDispatchInsert'), baseLink: 'DeliveryDispatch' } },
          { path: '/Insert/SalesInvoice', name: 'SalesInvoiceInsert', component: SalesInvoiceInsert, meta: { title: i18n.t('router.SalesInvoiceInsert'), baseLink: 'SalesInvoice' } },
          { path: '/Insert/PurchaseOrder', name: 'PurchaseOrderInsert', component: PurchaseOrderInsert, meta: { title: i18n.t('router.PurchaseOrderInsert'), baseLink: 'PurchaseOrder' } },
          { path: '/Insert/PurchaseInvoice', name: 'PurchaseInvoiceInsert', component: PurchaseInvoiceInsert, meta: { title: i18n.t('router.PurchaseInvoiceInsert'), baseLink: 'PurchaseInvoice' } },
          { path: '/Insert/Finance', name: 'FinanceInsert', component: FinanceInsert, meta: { title: i18n.t('router.FinanceInsert'), baseLink: 'Finance' } },
          { path: '/Insert/PremiumCheckList', name: 'PremiumCheckListInsert', component: PremiumCheckListInsert, meta: { title: i18n.t('router.PremiumCheckListInsert'), baseLink: 'PremiumCheckList' } },
          { path: '/Insert/PremiumResult', name: 'PremiumResultInsert', component: PremiumResultInsert, meta: { title: i18n.t('router.PremiumResultInsert'), baseLink: 'PremiumResult' } },
          { path: '/Insert/VoucherOperations', name: 'VoucherOperationsInsert', component: VoucherOperationsInsert, meta: { title: i18n.t('router.VoucherOperationsInsert'), baseLink: 'VoucherOperations' } },
          { path: '/Insert/Discount', name: 'DiscountInsert', component: DiscountInsert, meta: { title: i18n.t('router.DiscountInsert'), baseLink: 'Discount' } },
          { path: '/Insert/PremiumOrder', name: 'PremiumOrderInsert', component: PremiumOrderInsert, meta: { title: i18n.t('router.PremiumOrderInsert'), baseLink: 'PremiumOrder' } },
          { path: '/Insert/CurrentAccountTransactions', name: 'CurrentAccountTransactionsInsert', component: CurrentAccountTransactionsInsert, meta: { title: i18n.t('router.CurrentAccountTransactionsInsert'), baseLink: 'CurrentAccountTransactions' } },
          { path: '/Insert/DebtArrangement', name: 'DebtArrangementInsert', component: DebtArrangementInsert, meta: { title: i18n.t('router.DebtArrangementInsert'), baseLink: 'DebtArrangement' } },
          { path: '/Insert/PriceList', name: 'PriceListInsert', component: PriceListInsert, meta: { title: i18n.t('router.PriceListInsert'), baseLink: 'PriceList' } },
          { path: '/Insert/CheckOperations', name: 'CheckOperationsInsert', component: CheckOperationsInsert, meta: { title: i18n.t('router.CheckOperationsInsert'), baseLink: 'CheckOperations' } },
          { path: '/Insert/BankTransaction', name: 'BankTransactionInsert', component: BankTransactionInsert, meta: { title: i18n.t('router.BankTransactionInsert'), baseLink: 'BankTransaction' } },
          { path: '/Insert/CreditCard', name: 'CreditCardInsert', component: CreditCardInsert, meta: { title: i18n.t('router.CreditCardInsert'), baseLink: 'CreditCard' } },
          { path: '/Insert/CashTransactions', name: 'CashTransactionsInsert', component: CashTransactionsInsert, meta: { title: i18n.t('router.CashTransactionsInsert'), baseLink: 'CashTransactions' } },
          { path: '/Insert/Accounting', name: 'AccountingInsert', component: AccountingInsert, meta: { title: i18n.t('router.AccountingInsert'), baseLink: 'Accounting' } },
          { path: '/Insert/AccountCodeDescription', name: 'AccountCodeDescriptionInsert', component: AccountCodeDescriptionInsert, meta: { title: i18n.t('router.AccountCodeDescriptionInsert'), baseLink: 'AccountCodeDescription' } },
          { path: '/Insert/AccountingVoucher', name: 'AccountingVoucherInsert', component: AccountingVoucherInsert, meta: { title: i18n.t('router.AccountingVoucherInsert'), baseLink: 'AccountingVoucher' } },
          { path: '/Insert/GeneralAccountInvoice', name: 'GeneralAccountInvoiceInsert', component: GeneralAccountInvoiceInsert, meta: { title: i18n.t('router.GeneralAccountInvoiceInsert'), baseLink: 'GeneralAccountInvoice' } },
          { path: '/Insert/MaterialAccountInformation', name: 'MaterialAccountInformationInsert', component: MaterialAccountInformationInsert, meta: { title: i18n.t('router.MaterialAccountInformationInsert'), baseLink: 'MaterialAccountInformation' } },
          { path: '/Insert/GeneralLedgerMatching', name: 'GeneralLedgerMatchingInsert', component: GeneralLedgerMatchingInsert, meta: { title: i18n.t('router.GeneralLedgerMatchingInsert'), baseLink: 'GeneralLedgerMatching' } },
          { path: '/Insert/BankAccountingMatching', name: 'BankAccountingMatchingInsert', component: BankAccountingMatchingInsert, meta: { title: i18n.t('router.BankAccountingMatchingInsert'), baseLink: 'BankAccountingMatching' } },
          { path: '/Insert/Stocks', name: 'StocksInsert', component: StocksInsert, meta: { title: i18n.t('router.StocksInsert'), baseLink: 'Stocks' } },
          { path: '/Insert/StockAdjustment', name: 'StockAdjustmentInsert', component: StockAdjustmentInsert, meta: { title: i18n.t('router.StockAdjustmentInsert'), baseLink: 'StockAdjustment' } },
          { path: '/Insert/InventoryTransactionView', name: 'InventoryTransactionViewInsert', component: InventoryTransactionViewInsert, meta: { title: i18n.t('router.InventoryTransactionViewInsert'), baseLink: 'InventoryTransactionView' } },
          { path: '/Insert/StockTransfer', name: 'StockTransferInsert', component: StockTransferInsert, meta: { title: i18n.t('router.StockTransferInsert'), baseLink: 'StockTransfer' } },
          { path: '/Insert/WarehouseStockHistory', name: 'WarehouseStockHistoryInsert', component: WarehouseStockHistoryInsert, meta: { title: i18n.t('router.WarehouseStockHistoryInsert'), baseLink: 'WarehouseStockHistory' } },
          { path: '/Insert/WarehouseStock', name: 'WarehouseStockInsert', component: WarehouseStockInsert, meta: { title: i18n.t('router.WarehouseStockInsert'), baseLink: 'WarehouseStock' } },
          { path: '/Insert/BranchStockTransferInsert', name: 'BranchStockTransferInsert', component: BranchStockTransferInsert, meta: { title: i18n.t('router.BranchStockTransferInsert'), baseLink: 'BranchStockTransfer' } },
          { path: '/Insert/OrderInsert', name: 'OrderInsert', component: OrderInsert, meta: { title: i18n.t('router.OrderInsert'), baseLink: 'Order' } },
          { path: '/Insert/FieldAnalysisResultInsert', name: 'FieldAnalysisResultInsert', component: FieldAnalysisResultInsert, meta: { title: i18n.t('router.FieldAnalysisResultInsert'), baseLink: 'FieldAnalysisResult' } },
          { path: '/Insert/ItemAnalysisResultInsert', name: 'ItemAnalysisResultInsert', component: ItemAnalysisResultInsert, meta: { title: i18n.t('router.ItemAnalysisResultInsert'), baseLink: 'ItemAnalysisResult' } },
          { path: '/Insert/FieldSurveyResultInsert', name: 'FieldSurveyResultInsert', component: FieldSurveyResultInsert, meta: { title: i18n.t('router.FieldSurveyResultInsert'), baseLink: 'FieldSurveyResult' } },
          { path: '/Insert/FieldSurveyInsert', name: 'FieldSurveyInsert', component: FieldSurveyInsert, meta: { title: i18n.t('router.FieldSurveyInsert'), baseLink: 'FieldSurvey' } },
          { path: '/Insert/FixedTerm', name: 'FixedTermInsert', component: FixedTermInsert, meta: { title: i18n.t('router.FixedTermInsert'), baseLink: 'FixedTerm' } }

        ]
      }
    ]
  },
  {
    path: '/Auth',
    component: Auth,
    redirect: '/Auth/Login',
    children: [{
      path: 'Login',
      name: 'Login',
      component: Login
    },
    {
      path: 'Register',
      name: 'Register',
      component: Register
    },
    {
      path: 'ForgotPassword',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: 'ResetPassword',
      name: 'ResetPassword',
      component: ResetPassword
    }]
  },
  {
    path: '*',
    redirect: '/Dashboard'
  }
]

const router = new Router({
  linkActiveClass: 'active', // navigasyonda aktif linke ".active" ekler
  routes, // yukarıdaki linkleri çalıştırır.
  mode: 'history', // url yapısını history olarak çalıştıracaktır.
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition // önceki sayfaya geri dönüldüğünde scroll edilmiş alana geri dönmesini sağlar.
    } else {
      return {
        x: 0,
        y: 0 // yeni sayfanın tepede başlamasını sağlar.
      }
    }
  }
})

export default router
