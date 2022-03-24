/*
  |||||| DİKKAT ||||||
  Index, Insert, Update, Get ekranları Layout altında "children" elementine tanımlanmalanacaktır.
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
import ChangePassword from '@/pages/Dashboard/ChangePassword'
import StockChangePassword from '@/pages/Dashboard/StockChangePassword'
import i18n from './i18n'
import { store } from './store'

import LayoutIndex from '@/pages/layout/'
import LayoutGet from '@/pages/layout/get'
import LayoutInsert from '@/pages/layout/insert'
import LayoutUpdate from '@/pages/layout/update'

import RouteIndex from '@/pages/Route/' // liste ekranı
import RouteGet from '@/pages/Route/get' // fullpage görünümü
import RouteInsert from '@/pages/Route/insert' // yeni kayıt

import VehicleIndex from '@/pages/Vehicle/' // liste ekranı

import EmployeeIndex from '@/pages/Employee/' // liste ekranı

import ItemIndex from '@/pages/Item/' // liste ekranı

import BranchIndex from '@/pages/Branch/' // liste ekranı

import BcpIndex from '@/pages/Bcp/' // liste ekranı
import BcpGet from '@/pages/Bcp/get' // fullpage görünümü
import BcpInsert from '@/pages/Bcp/insert' // yeni kayıt
import BcpUpdate from '@/pages/Bcp/update' // güncelleme

import AnalysisQuestionsIndex from '@/pages/AnalysisQuestions/' // liste ekranı
import AnalysisQuestionsGet from '@/pages/AnalysisQuestions/get' // fullpage görünümü
import AnalysisQuestionsInsert from '@/pages/AnalysisQuestions/insert' // yeni kayıt
import AnalysisQuestionsUpdate from '@/pages/AnalysisQuestions/update' // güncelleme

import WarehouseIndex from '@/pages/Warehouse/' // liste ekranı

import CustomerIndex from '@/pages/Customer/' // liste ekranı

import KeyAccountIndex from '@/pages/KeyAccount/' // liste ekranı
import KeyAccountGet from '@/pages/KeyAccount/get' // fullpage görünümü
import KeyAccountInsert from '@/pages/KeyAccount/insert' // yeni kayıt
import KeyAccountUpdate from '@/pages/KeyAccount/update' // güncelleme

import BranchStockTransferIndex from '@/pages/BranchStockTransfer/'
import BranchStockTransferGet from '@/pages/BranchStockTransfer/get'
import BranchStockTransferInsert from '@/pages/BranchStockTransfer/insert'

import OrderIndex from '@/pages/Order/'

import ContractsIndex from '@/pages/Contracts/'

import FieldAnalysisResultIndex from '@/pages/FieldAnalysisResult/'
import FieldAnalysisResultGet from '@/pages/FieldAnalysisResult/get'

import ItemAnalysisResultIndex from '@/pages/ItemAnalysisResult/'
import ItemAnalysisResultGet from '@/pages/ItemAnalysisResult/get'

import IntegrationDataParkIndex from '@/pages/IntegrationDataPark/'
import IntegrationDataParkGet from '@/pages/IntegrationDataPark/get'

import FieldSurveyResultIndex from '@/pages/FieldSurveyResult/'
import FieldSurveyResultGet from '@/pages/FieldSurveyResult/get'

import FieldSurveyIndex from '@/pages/FieldSurvey/'
import FieldSurveyGet from '@/pages/FieldSurvey/get'
import FieldSurveyInsert from '@/pages/FieldSurvey/insert'
import FieldSurveyUpdate from '@/pages/FieldSurvey/update'

import EDocumentLogIndex from '@/pages/EDocumentLog/'

import UnitSetIndex from '@/pages/UnitSet/'

import BankIndex from '@/pages/Bank/'

import PurchaseReturnInvoiceIndex from '@/pages/PurchaseReturnInvoice/'
import PurchaseReturnInvoiceGet from '@/pages/PurchaseReturnInvoice/get'
import PurchaseReturnInvoiceUpdate from '@/pages/PurchaseReturnInvoice/update'

import SalesReturnInvoiceIndex from '@/pages/SalesReturnInvoice/'
import SalesReturnInvoiceGet from '@/pages/SalesReturnInvoice/get'
import SalesReturnInvoiceUpdate from '@/pages/SalesReturnInvoice/update'

import ServiceSalesInvoiceIndex from '@/pages/ServiceSalesInvoice/'

import PurchaseOrderIndex from '@/pages/PurchaseOrder/'

import PurchaseInvoiceIndex from '@/pages/PurchaseInvoice/'

import DiscountIndex from '@/pages/Discount/'
import DiscountGet from '@/pages/Discount/get'
import DiscountInsert from '@/pages/Discount/insert'
import DiscountUpdate from '@/pages/Discount/update'

import DiscountLimitIndex from '@/pages/DiscountLimit/'
import DiscountLimitGet from '@/pages/DiscountLimit/get'
import DiscountLimitInsert from '@/pages/DiscountLimit/insert'
import DiscountLimitUpdate from '@/pages/DiscountLimit/update'

import PriceListIndex from '@/pages/PriceList/'
import PriceListGet from '@/pages/PriceList/get'
import PriceListInsert from '@/pages/PriceList/insert'
import PriceListUpdate from '@/pages/PriceList/update'

import BankTransactionIndex from '@/pages/BankTransaction/'
import BankTransactionGet from '@/pages/BankTransaction/get'
import BankTransactionInsert from '@/pages/BankTransaction/insert'
import BankTransactionUpdate from '@/pages/BankTransaction/update'

import CSCardIndex from '@/pages/CSCard/'
import CSCardGet from '@/pages/CSCard/get'
import CSCardInsert from '@/pages/CSCard/insert'
import CSCardUpdate from '@/pages/CSCard/update'

import VoucherIndex from '@/pages/Voucher/'
import VoucherGet from '@/pages/Voucher/get'
import VoucherInsert from '@/pages/Voucher/insert'
import VoucherUpdate from '@/pages/Voucher/update'

import AccountTransactionIndex from '@/pages/AccountTransaction/'
import AccountTransactionGet from '@/pages/AccountTransaction/get'

import CreditCardIndex from '@/pages/CreditCard/'

import StockAdjustmentIndex from '@/pages/StockAdjustment/'
import StockAdjustmentGet from '@/pages/StockAdjustment/get'
import StockAdjustmentInsert from '@/pages/StockAdjustment/insert'

import WarehouseStockHistoryIndex from '@/pages/WarehouseStockHistory/'
import WarehouseStockHistoryGet from '@/pages/WarehouseStockHistory/get'

import WarehouseStockIndex from '@/pages/WarehouseStock/'
import WarehouseStockGet from '@/pages/WarehouseStock/get'

import FixedTermIndex from '@/pages/FixedTerm/'
import FixedTermGet from '@/pages/FixedTerm/get'
import FixedTermInsert from '@/pages/FixedTerm/insert'
import FixedTermUpdate from '@/pages/FixedTerm/update'

import VanLoadingIndex from '@/pages/VanLoading/'
import VanLoadingGet from '@/pages/VanLoading/get'
import VanLoadingInsert from '@/pages/VanLoading/insert'
import VanLoadingUpdate from '@/pages/VanLoading/update'

import PotentialCustomerIndex from '@/pages/PotentialCustomer/'
import PotentialCustomerGet from '@/pages/PotentialCustomer/get'
import PotentialCustomerUpdate from '@/pages/PotentialCustomer/update'

import LoadingPlanIndex from '@/pages/LoadingPlan/'
import LoadingPlanGet from '@/pages/LoadingPlan/get'
import LoadingPlanInsert from '@/pages/LoadingPlan/insert'
import LoadingPlanUpdate from '@/pages/LoadingPlan/update'

import CashCardIndex from '@/pages/CashCard/'

import TerminalLogIndex from '@/pages/TerminalLog/'
import TerminalLogGet from '@/pages/TerminalLog/get'

import TerminalPasswordLogIndex from '@/pages/TerminalPasswordLog/'
import TerminalPasswordLogGet from '@/pages/TerminalPasswordLog/get'
import TerminalPasswordLogInsert from '@/pages/TerminalPasswordLog/insert'

import RouteBalanceInsert from '@/pages/RouteBalance/insert'

import WarehouseMovementIndex from '@/pages/WarehouseMovement/'
import WarehouseMovementGet from '@/pages/WarehouseMovement/get'
import WarehouseMovementInsert from '@/pages/WarehouseMovement/insert'

import LoyaltyExpenseIndex from '@/pages/LoyaltyExpense/'
import LoyaltyExpenseGet from '@/pages/LoyaltyExpense/get'
import LoyaltyExpenseInsert from '@/pages/LoyaltyExpense/insert'
import LoyaltyExpenseUpdate from '@/pages/LoyaltyExpense/update'

import LoyaltySummaryIndex from '@/pages/LoyaltySummary/'
import LoyaltySummaryGet from '@/pages/LoyaltySummary/get'

import CycleInstructionIndex from '@/pages/CycleInstruction/'
import CycleInstructionGet from '@/pages/CycleInstruction/get'
import CycleInstructionInsert from '@/pages/CycleInstruction/insert'
import CycleInstructionUpdate from '@/pages/CycleInstruction/update'

import CycleInstructionCustomerIndex from '@/pages/CycleInstructionCustomer/'
import CycleInstructionCustomerGet from '@/pages/CycleInstructionCustomer/get'

import RmaIndex from '@/pages/Rma/'
import RmaGet from '@/pages/Rma/get'
import RmaInsert from '@/pages/Rma/insert'
import RmaUpdate from '@/pages/Rma/update'

import RmaOrderIndex from '@/pages/RmaOrder/'
import RmaOrderGet from '@/pages/RmaOrder/get'
import RmaOrderInsert from '@/pages/RmaOrder/insert'
import RmaOrderUpdate from '@/pages/RmaOrder/update'

import FixedTermCampaignIndex from '@/pages/FixedTermCampaign/'
import FixedTermCampaignGet from '@/pages/FixedTermCampaign/get'
import FixedTermCampaignInsert from '@/pages/FixedTermCampaign/insert'
import FixedTermCampaignUpdate from '@/pages/FixedTermCampaign/update'

import DiscountReasonIndex from '@/pages/DiscountReason/'
import DiscountReasonGet from '@/pages/DiscountReason/get'
import DiscountReasonInsert from '@/pages/DiscountReason/insert'
import DiscountReasonUpdate from '@/pages/DiscountReason/update'

import DiscountPackageIndex from '@/pages/DiscountPackage/'
import DiscountPackageGet from '@/pages/DiscountPackage/get'
import DiscountPackageInsert from '@/pages/DiscountPackage/insert'
import DiscountPackageUpdate from '@/pages/DiscountPackage/update'

import PriceDiscountTransactionIndex from '@/pages/PriceDiscountTransaction/'
import PriceDiscountTransactionGet from '@/pages/PriceDiscountTransaction/get'
import PriceDiscountTransactionInsert from '@/pages/PriceDiscountTransaction/insert'
import PriceDiscountTransactionUpdate from '@/pages/PriceDiscountTransaction/update'

import SalesReturnWaybillIndex from '@/pages/SalesReturnWaybill/'
import SalesReturnWaybillGet from '@/pages/SalesReturnWaybill/get'
import SalesReturnWaybillUpdate from '@/pages/SalesReturnWaybill/update'

import PurchaseReturnWaybillIndex from '@/pages/PurchaseReturnWaybill/'
import PurchaseReturnWaybillGet from '@/pages/PurchaseReturnWaybill/get'
import PurchaseReturnWaybillUpdate from '@/pages/PurchaseReturnWaybill/update'

import PurchaseWaybillIndex from '@/pages/PurchaseWaybill/'

import AssetIndex from '@/pages/Asset/'
import AssetGet from '@/pages/Asset/get'
import AssetInsert from '@/pages/Asset/insert'
import AssetUpdate from '@/pages/Asset/update'

import AssetLocationIndex from '@/pages/AssetLocation/'
import AssetLocationGet from '@/pages/AssetLocation/get'
import AssetLocationInsert from '@/pages/AssetLocation/insert'
import AssetLocationUpdate from '@/pages/AssetLocation/update'

import AssetMovementCardIndex from '@/pages/AssetMovementCard/'

import AssetPropertyIndex from '@/pages/AssetProperty/'
import AssetPropertyGet from '@/pages/AssetProperty/get'
import AssetPropertyInsert from '@/pages/AssetProperty/insert'
import AssetPropertyUpdate from '@/pages/AssetProperty/update'

import AssetTypeIndex from '@/pages/AssetType/'
import AssetTypeGet from '@/pages/AssetType/get'
import AssetTypeInsert from '@/pages/AssetType/insert'
import AssetTypeUpdate from '@/pages/AssetType/update'

import AssetOperationIndex from '@/pages/AssetOperation/'
import AssetOperationGet from '@/pages/AssetOperation/get'
import AssetOperationInsert from '@/pages/AssetOperation/insert'
import AssetOperationUpdate from '@/pages/AssetOperation/update'

import OverDueDebitSearchIndex from '@/pages/OverDueDebitSearch/'

import Auth from '@/views/Auth'
import Login from '@/views/Auth/login'
import ForgotPassword from '@/views/Auth/forgot-password'
import ResetPassword from '@/views/Auth/reset-password'

import SalesWaybillIndex from '@/pages/SalesWaybill/'

import ServicePurchaseInvoiceIndex from '@/pages/ServicePurchaseInvoice/'

import DispatchRefDocumentIndex from '@/pages/DispatchRefDocument/'
import DispatchRefDocumentGet from '@/pages/DispatchRefDocument/get'
import DispatchRefDocumentUpdate from '@/pages/DispatchRefDocument/update'

import CreditBudgetIndex from '@/pages/CreditBudget/'
import CreditBudgetGet from '@/pages/CreditBudget/get'
import CreditBudgetInsert from '@/pages/CreditBudget/insert'
import CreditBudgetUpdate from '@/pages/CreditBudget/update'

import TerminalMessageIndex from '@/pages/TerminalMessage/'
import TerminalMessageGet from '@/pages/TerminalMessage/get'
import TerminalMessageInsert from '@/pages/TerminalMessage/insert'
import TerminalMessageUpdate from '@/pages/TerminalMessage/update'

import RouteDailyRecordIndex from '@/pages/RouteDailyRecord/'
import RouteDailyRecordGet from '@/pages/RouteDailyRecord/get'

import LabelIndex from '@/pages/Label/'
import LabelGet from '@/pages/Label/get'
import LabelInsert from '@/pages/Label/insert'
import LabelUpdate from '@/pages/Label/update'

import RefContractIndex from '@/pages/RefContract/'
import RefContractGet from '@/pages/RefContract/get'
import RefContractInsert from '@/pages/RefContract/insert'
import RefContractUpdate from '@/pages/RefContract/update'

import CustomerSItemCriteriaIndex from '@/pages/CustomerSItemCriteria/'
import CustomerSItemCriteriaGet from '@/pages/CustomerSItemCriteria/get'
import CustomerSItemCriteriaInsert from '@/pages/CustomerSItemCriteria/insert'
import CustomerSItemCriteriaUpdate from '@/pages/CustomerSItemCriteria/update'

import CancelReasonIndex from '@/pages/CancelReason/'
import CancelReasonGet from '@/pages/CancelReason/get'
import CancelReasonInsert from '@/pages/CancelReason/insert'
import CancelReasonUpdate from '@/pages/CancelReason/update'

import LoyaltyIndex from '@/pages/Loyalty/'
import LoyaltyGet from '@/pages/Loyalty/get'
import LoyaltyInsert from '@/pages/Loyalty/insert'
import LoyaltyUpdate from '@/pages/Loyalty/update'

import LoyaltyCategoryIndex from '@/pages/LoyaltyCategory/'
import LoyaltyCategoryGet from '@/pages/LoyaltyCategory/get'
import LoyaltyCategoryInsert from '@/pages/LoyaltyCategory/insert'
import LoyaltyCategoryUpdate from '@/pages/LoyaltyCategory/update'

import ItemAnalysisIndex from '@/pages/ItemAnalysis/'
import ItemAnalysisGet from '@/pages/ItemAnalysis/get'
import ItemAnalysisInsert from '@/pages/ItemAnalysis/insert'
import ItemAnalysisUpdate from '@/pages/ItemAnalysis/update'

import PriceDecreaseIndex from '@/pages/PriceDecrease/'
import PriceDecreaseGet from '@/pages/PriceDecrease/get'
import PriceDecreaseInsert from '@/pages/PriceDecrease/insert'
import PriceDecreaseUpdate from '@/pages/PriceDecrease/update'

import LoyaltyGainIndex from '@/pages/LoyaltyGain/'
import LoyaltyGainGet from '@/pages/LoyaltyGain/get'
import LoyaltyGainInsert from '@/pages/LoyaltyGain/insert'
import LoyaltyGainUpdate from '@/pages/LoyaltyGain/update'

import BudgetMasterIndex from '@/pages/BudgetMaster/'
import BudgetMasterGet from '@/pages/BudgetMaster/get'

import FieldAnalysisIndex from '@/pages/FieldAnalysis/'
import FieldAnalysisGet from '@/pages/FieldAnalysis/get'
import FieldAnalysisInsert from '@/pages/FieldAnalysis/insert'
import FieldAnalysisUpdate from '@/pages/FieldAnalysis/update'

import SaoIndex from '@/pages/Sao/'
import SaoGet from '@/pages/Sao/get'
import SaoInsert from '@/pages/Sao/insert'
import SaoUpdate from '@/pages/Sao/update'

import AssetServiceIndex from '@/pages/AssetService/'
import AssetServiceGet from '@/pages/AssetService/get'
import AssetServiceInsert from '@/pages/AssetService/insert'

import NewOrderIndex from '@/pages/NewOrder'

import CustomerTargetIndex from '@/pages/CustomerTarget/'
import CustomerTargetGet from '@/pages/CustomerTarget/get'
import CustomerTargetInsert from '@/pages/CustomerTarget/insert'
import CustomerTargetUpdate from '@/pages/CustomerTarget/update'

import BATLeagueTargetIndex from '@/pages/BATLeagueTarget/'
import BATLeagueTargetGet from '@/pages/BATLeagueTarget/get'
import BATLeagueTargetInsert from '@/pages/BATLeagueTarget/insert'
import BATLeagueTargetUpdate from '@/pages/BATLeagueTarget/update'

Vue.use(Router)

// TenantBase Pages
var tenant = process.env.TENANT

let getTenantPage = (pageName, type) => {
  type = !type ? '' : type
  const page = () => import(`@/pages/${pageName}/${tenant}/${type}`)
  return page
}

const listIndex = [
  {path: '/Route', name: 'Route', component: RouteIndex, meta: { title: i18n.t('router.Route'), createLink: 'RouteInsert', keepAlive: true }},
  {path: '/Vehicle', name: 'Vehicle', component: VehicleIndex, meta: { title: i18n.t('router.Vehicle'), createLink: 'VehicleInsert', keepAlive: true }},
  {path: '/Employee', name: 'Employee', component: EmployeeIndex, meta: { title: i18n.t('router.Employee'), createLink: 'EmployeeInsert', keepAlive: true }},
  {path: '/Item', name: 'Item', component: ItemIndex, meta: { title: i18n.t('router.Item'), createLink: 'ItemInsert', keepAlive: true }},
  {path: '/Branch', name: 'Branch', component: BranchIndex, meta: { title: i18n.t('router.Branch'), createLink: 'BranchInsert', keepAlive: true }},
  {path: '/Bcp', name: 'Bcp', component: BcpIndex, meta: { title: i18n.t('router.Bcp'), createLink: 'BcpInsert', keepAlive: true }},
  {path: '/AnalysisQuestions', name: 'AnalysisQuestions', component: AnalysisQuestionsIndex, meta: { title: i18n.t('router.AnalysisQuestions'), createLink: 'AnalysisQuestionsInsert', keepAlive: true }},
  {path: '/Warehouse', name: 'Warehouse', component: WarehouseIndex, meta: { title: i18n.t('router.Warehouse'), createLink: 'WarehouseInsert', keepAlive: true }},
  {path: '/Customer', name: 'Customer', component: CustomerIndex, meta: { title: i18n.t('router.Customer'), createLink: 'CustomerInsert', keepAlive: true }},
  {path: '/KeyAccount', name: 'KeyAccount', component: KeyAccountIndex, meta: { title: i18n.t('router.KeyAccount'), createLink: 'KeyAccountInsert', keepAlive: true }},
  {path: '/EDocumentLog', name: 'EDocumentLog', component: EDocumentLogIndex, meta: { title: i18n.t('router.EDocumentLog'), createLink: 'EDocumentLogInsert', keepAlive: true }},
  {path: '/UnitSet', name: 'UnitSet', component: UnitSetIndex, meta: { title: i18n.t('router.UnitSet'), createLink: 'UnitSetInsert', keepAlive: true }},
  {path: '/Bank', name: 'Bank', component: BankIndex, meta: { title: i18n.t('router.Bank'), createLink: 'BankInsert', keepAlive: true }},
  {path: '/PurchaseReturnInvoice', name: 'PurchaseReturnInvoice', component: PurchaseReturnInvoiceIndex, meta: { title: i18n.t('router.PurchaseReturnInvoice'), keepAlive: true }},
  {path: '/SalesReturnInvoice', name: 'SalesReturnInvoice', component: SalesReturnInvoiceIndex, meta: { title: i18n.t('router.SalesReturnInvoice'), createLink: 'SalesReturnInvoiceInsert', keepAlive: true }},
  {path: '/ServiceSalesInvoice', name: 'ServiceSalesInvoice', component: ServiceSalesInvoiceIndex, meta: { title: i18n.t('router.ServiceSalesInvoice'), createLink: 'ServiceSalesInvoiceInsert', keepAlive: true }},
  {path: '/SalesInvoice', name: 'SalesInvoice', component: getTenantPage('SalesInvoice', 'index'), meta: { title: i18n.t('router.SalesInvoice'), createLink: 'SalesInvoiceInsert', keepAlive: true }},
  {path: '/PurchaseOrder', name: 'PurchaseOrder', component: PurchaseOrderIndex, meta: { title: i18n.t('router.PurchaseOrder'), createLink: 'PurchaseOrderInsert', keepAlive: true }},
  {path: '/PurchaseInvoice', name: 'PurchaseInvoice', component: PurchaseInvoiceIndex, meta: { title: i18n.t('router.PurchaseInvoice'), createLink: 'PurchaseInvoiceInsert', keepAlive: true }},
  {path: '/Discount', name: 'Discount', component: DiscountIndex, meta: { title: i18n.t('router.Discount'), createLink: 'DiscountInsert', keepAlive: true }},
  {path: '/DiscountLimit', name: 'DiscountLimit', component: DiscountLimitIndex, meta: { title: i18n.t('router.DiscountLimit'), createLink: 'DiscountLimitInsert', keepAlive: true }},
  {path: '/PriceList', name: 'PriceList', component: PriceListIndex, meta: { title: i18n.t('router.PriceList'), createLink: 'PriceListInsert', keepAlive: true }},
  {path: '/BankTransaction', name: 'BankTransaction', component: BankTransactionIndex, meta: { title: i18n.t('router.BankTransaction'), createLink: 'BankTransactionInsert', keepAlive: true }},
  {path: '/CSCard', name: 'CSCard', component: CSCardIndex, meta: { title: i18n.t('router.CSCard'), createLink: 'CSCardInsert', keepAlive: true }},
  {path: '/Voucher', name: 'Voucher', component: VoucherIndex, meta: { title: i18n.t('router.Voucher'), createLink: 'VoucherInsert', keepAlive: true }},
  {path: '/AccountTransaction', name: 'AccountTransaction', component: AccountTransactionIndex, meta: { title: i18n.t('router.AccountTransaction'), createLink: 'AccountTransactionInsert', keepAlive: true }},
  {path: '/CreditCard', name: 'CreditCard', component: CreditCardIndex, meta: { title: i18n.t('router.CreditCard'), createLink: 'CreditCardInsert', keepAlive: true }},
  {path: '/StockAdjustment', name: 'StockAdjustment', component: StockAdjustmentIndex, meta: { title: i18n.t('router.StockAdjustment'), createLink: 'StockAdjustmentInsert', keepAlive: true }},
  {path: '/WarehouseStockHistory', name: 'WarehouseStockHistory', component: WarehouseStockHistoryIndex, meta: { title: i18n.t('router.WarehouseStockHistory'), createLink: 'WarehouseStockHistoryInsert', keepAlive: true }},
  {path: '/WarehouseStock', name: 'WarehouseStock', component: WarehouseStockIndex, meta: { title: i18n.t('router.WarehouseStock'), createLink: 'WarehouseStockInsert', keepAlive: true }},
  {path: '/BranchStockTransfer', name: 'BranchStockTransfer', component: BranchStockTransferIndex, meta: { title: i18n.t('router.BranchStockTransfer'), createLink: 'BranchStockTransferInsert', keepAlive: true }},
  {path: '/Order', name: 'Order', component: OrderIndex, meta: { title: i18n.t('router.Order'), createLink: 'OrderInsert', keepAlive: true }},
  {path: '/Contracts', name: 'Contracts', component: ContractsIndex, meta: { title: i18n.t('router.Contracts'), createLink: 'ContractsInsert', keepAlive: true }},
  {path: '/FieldAnalysisResult', name: 'FieldAnalysisResult', component: FieldAnalysisResultIndex, meta: { title: i18n.t('router.FieldAnalysisResult'), createLink: 'FieldAnalysisResultInsert', keepAlive: true }},
  {path: '/ItemAnalysisResult', name: 'ItemAnalysisResult', component: ItemAnalysisResultIndex, meta: { title: i18n.t('router.ItemAnalysisResult'), createLink: 'ItemAnalysisResultInsert', keepAlive: true }},
  {path: '/IntegrationDataPark', name: 'IntegrationDataPark', component: IntegrationDataParkIndex, meta: { title: i18n.t('router.IntegrationDataPark'), createLink: 'IntegrationDataParkInsert', keepAlive: true }},
  {path: '/FieldSurveyResult', name: 'FieldSurveyResult', component: FieldSurveyResultIndex, meta: { title: i18n.t('router.FieldSurveyResult'), createLink: 'FieldSurveyResultInsert', keepAlive: true }},
  {path: '/FieldSurvey', name: 'FieldSurvey', component: FieldSurveyIndex, meta: { title: i18n.t('router.FieldSurvey'), createLink: 'FieldSurveyInsert', keepAlive: true }},
  {path: '/FixedTerm', name: 'FixedTerm', component: FixedTermIndex, meta: { title: i18n.t('router.FixedTerm'), createLink: 'FixedTermInsert', keepAlive: true }},
  {path: '/VanLoading', name: 'VanLoading', component: VanLoadingIndex, meta: { title: i18n.t('router.VanLoading'), createLink: 'VanLoadingInsert', keepAlive: true }},
  {path: '/PotentialCustomer', name: 'PotentialCustomer', component: PotentialCustomerIndex, meta: { title: i18n.t('router.PotentialCustomer'), keepAlive: true }},
  {path: '/LoadingPlan', name: 'LoadingPlan', component: LoadingPlanIndex, meta: { title: i18n.t('router.LoadingPlan'), createLink: 'LoadingPlanInsert', keepAlive: true }},
  {path: '/CashCard', name: 'CashCard', component: CashCardIndex, meta: { title: i18n.t('router.CashCard'), createLink: 'CashCardInsert', keepAlive: true }},
  {path: '/TerminalLog', name: 'TerminalLog', component: TerminalLogIndex, meta: { title: i18n.t('router.TerminalLog'), createLink: 'TerminalLogInsert', keepAlive: true }},
  {path: '/TerminalPasswordLog', name: 'TerminalPasswordLog', component: TerminalPasswordLogIndex, meta: { title: i18n.t('router.TerminalPasswordLog'), createLink: 'TerminalPasswordLogInsert', keepAlive: true }},
  {path: '/WarehouseMovement', name: 'WarehouseMovement', component: WarehouseMovementIndex, meta: { title: i18n.t('router.WarehouseMovement'), createLink: 'WarehouseMovementInsert', keepAlive: true }},
  {path: '/LoyaltyExpense', name: 'LoyaltyExpense', component: LoyaltyExpenseIndex, meta: { title: i18n.t('router.LoyaltyExpense'), createLink: 'LoyaltyExpenseInsert', keepAlive: true }},
  {path: '/LoyaltySummary', name: 'LoyaltySummary', component: LoyaltySummaryIndex, meta: { title: i18n.t('router.LoyaltySummary'), keepAlive: true }},
  {path: '/CycleInstruction', name: 'CycleInstruction', component: CycleInstructionIndex, meta: { title: i18n.t('router.CycleInstruction'), createLink: 'CycleInstructionInsert', keepAlive: true }},
  {path: '/CycleInstructionCustomer', name: 'CycleInstructionCustomer', component: CycleInstructionCustomerIndex, meta: { title: i18n.t('router.CycleInstructionCustomer'), keepAlive: true }},
  {path: '/Rma', name: 'Rma', component: RmaIndex, meta: { title: i18n.t('router.Rma'), createLink: 'RmaInsert', keepAlive: true }},
  {path: '/RmaOrder', name: 'RmaOrder', component: RmaOrderIndex, meta: { title: i18n.t('router.RmaOrder'), createLink: 'RmaOrderInsert', keepAlive: true }},
  {path: '/FixedTermCampaign', name: 'FixedTermCampaign', component: FixedTermCampaignIndex, meta: { title: i18n.t('router.FixedTermCampaign'), createLink: 'FixedTermCampaignInsert', keepAlive: true }},
  {path: '/DiscountReason', name: 'DiscountReason', component: DiscountReasonIndex, meta: { title: i18n.t('router.DiscountReason'), createLink: 'DiscountReasonInsert', keepAlive: true }},
  {path: '/DiscountPackage', name: 'DiscountPackage', component: DiscountPackageIndex, meta: { title: i18n.t('router.DiscountPackage'), createLink: 'DiscountPackageInsert', keepAlive: true }},
  {path: '/PriceDiscountTransaction', name: 'PriceDiscountTransaction', component: PriceDiscountTransactionIndex, meta: { title: i18n.t('router.PriceDiscountTransaction'), createLink: 'PriceDiscountTransactionInsert', keepAlive: true }},
  {path: '/SalesReturnWaybill', name: 'SalesReturnWaybill', component: SalesReturnWaybillIndex, meta: { title: i18n.t('router.SalesReturnWaybill'), keepAlive: true }},
  {path: '/PurchaseReturnWaybill', name: 'PurchaseReturnWaybill', component: PurchaseReturnWaybillIndex, meta: { title: i18n.t('router.PurchaseReturnWaybill'), keepAlive: true }},
  {path: '/PurchaseWaybill', name: 'PurchaseWaybill', component: PurchaseWaybillIndex, meta: { title: i18n.t('router.PurchaseWaybill'), createLink: 'PurchaseWaybillInsert', keepAlive: true }},
  {path: '/Asset', name: 'Asset', component: AssetIndex, meta: { title: i18n.t('router.Asset'), createLink: 'AssetInsert', keepAlive: true }},
  {path: '/AssetLocation', name: 'AssetLocation', component: AssetLocationIndex, meta: { title: i18n.t('router.AssetLocation'), createLink: 'AssetLocationInsert', keepAlive: true }},
  {path: '/AssetMovementCard', name: 'AssetMovementCard', component: AssetMovementCardIndex, meta: { title: i18n.t('router.AssetMovementCard'), createLink: 'AssetMovementCardInsert', keepAlive: true }},
  {path: '/OverDueDebitSearch', name: 'OverDueDebitSearch', component: OverDueDebitSearchIndex, meta: { title: i18n.t('router.OverDueDebitSearch'), createLink: 'OverDueDebitSearchInsert', keepAlive: true }},
  {path: '/SalesWaybill', name: 'SalesWaybill', component: SalesWaybillIndex, meta: { title: i18n.t('router.SalesWaybill'), createLink: 'SalesWaybillInsert', keepAlive: true }},
  {path: '/ServicePurchaseInvoice', name: 'ServicePurchaseInvoice', component: ServicePurchaseInvoiceIndex, meta: { title: i18n.t('router.ServicePurchaseInvoice'), createLink: 'ServicePurchaseInvoiceInsert', keepAlive: true }},
  {path: '/DispatchRefDocument', name: 'DispatchRefDocument', component: DispatchRefDocumentIndex, meta: { title: i18n.t('router.DispatchRefDocument'), keepAlive: true }},
  {path: '/CreditBudget', name: 'CreditBudget', component: CreditBudgetIndex, meta: { title: i18n.t('router.CreditBudget'), createLink: 'CreditBudgetInsert', keepAlive: true }},
  {path: '/TerminalMessage', name: 'TerminalMessage', component: TerminalMessageIndex, meta: { title: i18n.t('router.TerminalMessage'), createLink: 'TerminalMessageInsert', keepAlive: true }},
  {path: '/Label', name: 'Label', component: LabelIndex, meta: { title: i18n.t('router.Label'), createLink: 'LabelInsert', keepAlive: true }},
  {path: '/RefContract', name: 'RefContract', component: RefContractIndex, meta: { title: i18n.t('router.RefContract'), createLink: 'RefContractInsert', keepAlive: true }},
  {path: '/RouteDailyRecord', name: 'RouteDailyRecord', component: RouteDailyRecordIndex, meta: { title: i18n.t('router.RouteDailyRecord'), keepAlive: true }},
  {path: '/CustomerSItemCriteria', name: 'CustomerSItemCriteria', component: CustomerSItemCriteriaIndex, meta: { title: i18n.t('router.CustomerSItemCriteria'), createLink: 'CustomerSItemCriteriaInsert', keepAlive: true }},
  {path: '/CancelReason', name: 'CancelReason', component: CancelReasonIndex, meta: { title: i18n.t('router.CancelReason'), createLink: 'CancelReasonInsert', keepAlive: true }},
  {path: '/Loyalty', name: 'Loyalty', component: LoyaltyIndex, meta: { title: i18n.t('router.Loyalty'), createLink: 'LoyaltyInsert', keepAlive: true }},
  {path: '/ItemAnalysis', name: 'ItemAnalysis', component: ItemAnalysisIndex, meta: { title: i18n.t('router.ItemAnalysis'), createLink: 'ItemAnalysisInsert', keepAlive: true }},
  {path: '/PriceDecrease', name: 'PriceDecrease', component: PriceDecreaseIndex, meta: { title: i18n.t('router.PriceDecrease'), createLink: 'PriceDecreaseInsert', keepAlive: true }},
  {path: '/AssetProperty', name: 'AssetProperty', component: AssetPropertyIndex, meta: { title: i18n.t('router.AssetProperty'), createLink: 'AssetPropertyInsert', keepAlive: true }},
  {path: '/AssetType', name: 'AssetType', component: AssetTypeIndex, meta: { title: i18n.t('router.AssetType'), createLink: 'AssetTypeInsert', keepAlive: true }},
  {path: '/LoyaltyGain', name: 'LoyaltyGain', component: LoyaltyGainIndex, meta: { title: i18n.t('router.LoyaltyGain'), createLink: 'LoyaltyGainInsert', keepAlive: true }},
  {path: '/AssetOperation', name: 'AssetOperation', component: AssetOperationIndex, meta: { title: i18n.t('router.AssetOperation'), createLink: 'AssetOperationInsert', keepAlive: true }},
  {path: '/BudgetMaster', name: 'BudgetMaster', component: BudgetMasterIndex, meta: { title: i18n.t('router.BudgetMaster'), createLink: 'BudgetMasterInsert', keepAlive: true }},
  {path: '/FieldAnalysis', name: 'FieldAnalysis', component: FieldAnalysisIndex, meta: { title: i18n.t('router.FieldAnalysis'), createLink: 'FieldAnalysisInsert', keepAlive: true }},
  {path: '/LoyaltyCategory', name: 'LoyaltyCategory', component: LoyaltyCategoryIndex, meta: { title: i18n.t('router.LoyaltyCategory'), createLink: 'LoyaltyCategoryInsert', keepAlive: true }},
  {path: '/Sao', name: 'Sao', component: SaoIndex, meta: { title: i18n.t('router.Sao'), createLink: 'SaoInsert', keepAlive: true }},
  {path: '/AssetService', name: 'AssetService', component: AssetServiceIndex, meta: { title: i18n.t('router.AssetService'), createLink: 'AssetServiceInsert', keepAlive: true }},
  {path: '/NewOrder', name: 'NewOrder', component: NewOrderIndex, meta: { title: i18n.t('router.NewOrder'), createLink: 'NewOrderInsert', keepAlive: true }},
  {path: '/CustomerTarget', name: 'CustomerTarget', component: CustomerTargetIndex, meta: { title: i18n.t('router.CustomerTarget'), createLink: 'CustomerTargetInsert', keepAlive: true }},
  {path: '/BATLeagueTarget', name: 'BATLeagueTarget', component: BATLeagueTargetIndex, meta: { title: i18n.t('router.BATLeagueTarget'), createLink: 'BATLeagueTargetInsert', keepAlive: true }}

]

const listGet = [
  { path: '/Route/:url', name: 'RouteGet', component: RouteGet, meta: { title: i18n.t('router.RouteGet'), baseLink: 'Route' } },
  { path: '/Vehicle/:url', name: 'VehicleGet', component: getTenantPage('Vehicle', 'get'), meta: { title: i18n.t('router.VehicleGet'), baseLink: 'Vehicle' } },
  { path: '/Employee/:url', name: 'EmployeeGet', component: getTenantPage('Employee', 'get'), meta: { title: i18n.t('router.EmployeeGet'), baseLink: 'Employee' } },
  { path: '/Item/:url', name: 'ItemGet', component: getTenantPage('Item', 'get'), meta: { title: i18n.t('router.ItemGet'), baseLink: 'Item' } },
  { path: '/Branch/:url', name: 'BranchGet', component: getTenantPage('Branch', 'get'), meta: { title: i18n.t('router.BranchGet'), baseLink: 'Branch' } },
  { path: '/Bcp/:url', name: 'BcpGet', component: BcpGet, meta: { title: i18n.t('router.BcpGet'), baseLink: 'Bcp' } },
  { path: '/AnalysisQuestions/:url', name: 'AnalysisQuestionsGet', component: AnalysisQuestionsGet, meta: { title: i18n.t('router.AnalysisQuestionsGet'), baseLink: 'AnalysisQuestions' } },
  { path: '/Warehouse/:url', name: 'WarehouseGet', component: getTenantPage('Warehouse', 'get'), meta: { title: i18n.t('router.WarehouseGet'), baseLink: 'Warehouse' } },
  { path: '/Customer/:url', name: 'CustomerGet', component: getTenantPage('Customer', 'get'), meta: { title: i18n.t('router.CustomerGet'), baseLink: 'Customer' } },
  { path: '/KeyAccount/:url', name: 'KeyAccountGet', component: KeyAccountGet, meta: { title: i18n.t('router.KeyAccountGet'), baseLink: 'KeyAccount' } },
  { path: '/UnitSet/:url', name: 'UnitSetGet', component: getTenantPage('UnitSet', 'get'), meta: { title: i18n.t('router.UnitSetGet'), baseLink: 'UnitSet' } },
  { path: '/Bank/:url', name: 'BankGet', component: getTenantPage('Bank', 'get'), meta: { title: i18n.t('router.BankGet'), baseLink: 'Bank' } },
  { path: '/PurchaseReturnInvoice/:url', name: 'PurchaseReturnInvoiceGet', component: PurchaseReturnInvoiceGet, meta: { title: i18n.t('router.PurchaseReturnInvoiceGet'), baseLink: 'PurchaseReturnInvoice' } },
  { path: '/SalesReturnInvoice/:url', name: 'SalesReturnInvoiceGet', component: SalesReturnInvoiceGet, meta: { title: i18n.t('router.SalesReturnInvoiceGet'), baseLink: 'SalesReturnInvoice' } },
  { path: '/ServiceSalesInvoice/:url', name: 'ServiceSalesInvoiceGet', component: getTenantPage('ServiceSalesInvoice', 'get'), meta: { title: i18n.t('router.ServiceSalesInvoiceGet'), baseLink: 'ServiceSalesInvoice' } },
  { path: '/SalesInvoice/:url', name: 'SalesInvoiceGet', component: getTenantPage('SalesInvoice', 'get'), meta: { title: i18n.t('router.SalesInvoiceGet'), baseLink: 'SalesInvoice' } },
  { path: '/PurchaseOrder/:url', name: 'PurchaseOrderGet', component: getTenantPage('PurchaseOrder', 'get'), meta: { title: i18n.t('router.PurchaseOrderGet'), baseLink: 'PurchaseOrder' } },
  { path: '/PurchaseInvoice/:url', name: 'PurchaseInvoiceGet', component: getTenantPage('PurchaseInvoice', 'get'), meta: { title: i18n.t('router.PurchaseInvoiceGet'), baseLink: 'PurchaseInvoice' } },
  { path: '/Discount/:url', name: 'DiscountGet', component: DiscountGet, meta: { title: i18n.t('router.DiscountGet'), baseLink: 'Discount' } },
  { path: '/DiscountLimit/:url', name: 'DiscountLimitGet', component: DiscountLimitGet, meta: { title: i18n.t('router.DiscountLimitGet'), baseLink: 'DiscountLimit' } },
  { path: '/PriceList/:url', name: 'PriceListGet', component: PriceListGet, meta: { title: i18n.t('router.PriceListGet'), baseLink: 'PriceList' } },
  { path: '/BankTransaction/:url', name: 'BankTransactionGet', component: BankTransactionGet, meta: { title: i18n.t('router.BankTransactionGet'), baseLink: 'BankTransaction' } },
  { path: '/CSCard/:url', name: 'CSCardGet', component: CSCardGet, meta: { title: i18n.t('router.CSCardGet'), baseLink: 'CSCard' } },
  { path: '/Voucher/:url', name: 'VoucherGet', component: VoucherGet, meta: { title: i18n.t('router.VoucherGet'), baseLink: 'Voucher' } },
  { path: '/AccountTransaction/:url', name: 'AccountTransactionGet', component: AccountTransactionGet, meta: { title: i18n.t('router.AccountTransactionGet'), baseLink: 'AccountTransaction' } },
  { path: '/CreditCard/:url', name: 'CreditCardGet', component: getTenantPage('CreditCard', 'get'), meta: { title: i18n.t('router.CreditCardGet'), baseLink: 'CreditCard' } },
  { path: '/StockAdjustment/:url', name: 'StockAdjustmentGet', component: StockAdjustmentGet, meta: { title: i18n.t('router.StockAdjustmentGet'), baseLink: 'StockAdjustment' } },
  { path: '/WarehouseStockHistory/:url', name: 'WarehouseStockHistoryGet', component: WarehouseStockHistoryGet, meta: { title: i18n.t('router.WarehouseStockHistoryGet'), baseLink: 'WarehouseStockHistory' } },
  { path: '/WarehouseStock/:url', name: 'WarehouseStockGet', component: WarehouseStockGet, meta: { title: i18n.t('router.WarehouseStockGet'), baseLink: 'WarehouseStock' } },
  { path: '/BranchStockTransfer/:url', name: 'BranchStockTransferGet', component: BranchStockTransferGet, meta: { title: i18n.t('router.BranchStockTransferGet'), baseLink: 'BranchStockTransfer' } },
  { path: '/Order/:url', name: 'OrderGet', component: getTenantPage('Order', 'get'), meta: { title: i18n.t('router.OrderGet'), baseLink: 'Order' } },
  { path: '/Contracts/:url', name: 'ContractsGet', component: getTenantPage('Contracts', 'get'), meta: { title: i18n.t('router.ContractsGet'), baseLink: 'Contracts' } },
  { path: '/FieldAnalysisResult/:url', name: 'FieldAnalysisResultGet', component: FieldAnalysisResultGet, meta: { title: i18n.t('router.FieldAnalysisResultGet'), baseLink: 'FieldAnalysisResult' } },
  { path: '/ItemAnalysisResult/:url', name: 'ItemAnalysisResultGet', component: ItemAnalysisResultGet, meta: { title: i18n.t('router.ItemAnalysisResultGet'), baseLink: 'ItemAnalysisResult' } },
  { path: '/IntegrationDataPark/:url', name: 'IntegrationDataParkGet', component: IntegrationDataParkGet, meta: { title: i18n.t('router.IntegrationDataParkGet'), baseLink: 'IntegrationDataPark' } },
  { path: '/FieldSurveyResult/:url', name: 'FieldSurveyResultGet', component: FieldSurveyResultGet, meta: { title: i18n.t('router.FieldSurveyResultGet'), baseLink: 'FieldSurveyResult' } },
  { path: '/FieldSurvey/:url', name: 'FieldSurveyGet', component: FieldSurveyGet, meta: { title: i18n.t('router.FieldSurveyGet'), baseLink: 'FieldSurvey' } },
  { path: '/FixedTerm/:url', name: 'FixedTermGet', component: FixedTermGet, meta: { title: i18n.t('router.FixedTermGet'), baseLink: 'FixedTerm' } },
  { path: '/VanLoading/:url', name: 'VanLoadingGet', component: VanLoadingGet, meta: { title: i18n.t('router.VanLoadingGet'), baseLink: 'VanLoading' } },
  { path: '/PotentialCustomer/:url', name: 'PotentialCustomerGet', component: PotentialCustomerGet, meta: { title: i18n.t('router.PotentialCustomerGet'), baseLink: 'PotentialCustomer' } },
  { path: '/LoadingPlan/:url', name: 'LoadingPlanGet', component: LoadingPlanGet, meta: { title: i18n.t('router.LoadingPlanGet'), baseLink: 'LoadingPlan' } },
  { path: '/CashCard/:url', name: 'CashCardGet', component: getTenantPage('CashCard', 'get'), meta: { title: i18n.t('router.CashCardGet'), baseLink: 'CashCard' } },
  { path: '/TerminalLog/:url', name: 'TerminalLogGet', component: TerminalLogGet, meta: { title: i18n.t('router.TerminalLogGet'), baseLink: 'TerminalLog' } },
  { path: '/TerminalPasswordLog/:url', name: 'TerminalPasswordLogGet', component: TerminalPasswordLogGet, meta: { title: i18n.t('router.TerminalPasswordLogGet'), baseLink: 'TerminalPasswordLog' } },
  { path: '/WarehouseMovement/:url', name: 'WarehouseMovementGet', component: WarehouseMovementGet, meta: { title: i18n.t('router.WarehouseMovementGet'), baseLink: 'WarehouseMovement' } },
  { path: '/LoyaltyExpense/:url', name: 'LoyaltyExpenseGet', component: LoyaltyExpenseGet, meta: { title: i18n.t('router.LoyaltyExpenseGet'), baseLink: 'LoyaltyExpense' } },
  { path: '/LoyaltySummary/:url', name: 'LoyaltySummaryGet', component: LoyaltySummaryGet, meta: { title: i18n.t('router.LoyaltySummaryGet'), baseLink: 'LoyaltySummary' } },
  { path: '/CycleInstruction/:url', name: 'CycleInstructionGet', component: CycleInstructionGet, meta: { title: i18n.t('router.CycleInstructionGet'), baseLink: 'CycleInstruction' } },
  { path: '/CycleInstructionCustomer/:url', name: 'CycleInstructionCustomerGet', component: CycleInstructionCustomerGet, meta: { title: i18n.t('router.CycleInstructionCustomerGet'), baseLink: 'CycleInstructionCustomer' } },
  { path: '/Rma/:url', name: 'RmaGet', component: RmaGet, meta: { title: i18n.t('router.RmaGet'), baseLink: 'Rma' } },
  { path: '/RmaOrder/:url', name: 'RmaOrderGet', component: RmaOrderGet, meta: { title: i18n.t('router.RmaOrderGet'), baseLink: 'RmaOrder' } },
  { path: '/FixedTermCampaign/:url', name: 'FixedTermCampaignGet', component: FixedTermCampaignGet, meta: { title: i18n.t('router.FixedTermCampaignGet'), baseLink: 'FixedTermCampaign' } },
  { path: '/DiscountReason/:url', name: 'DiscountReasonGet', component: DiscountReasonGet, meta: { title: i18n.t('router.DiscountReasonGet'), baseLink: 'DiscountReason' } },
  { path: '/DiscountPackage/:url', name: 'DiscountPackageGet', component: DiscountPackageGet, meta: { title: i18n.t('router.DiscountPackageGet'), baseLink: 'DiscountPackage' } },
  { path: '/PriceDiscountTransaction/:url', name: 'PriceDiscountTransactionGet', component: PriceDiscountTransactionGet, meta: { title: i18n.t('router.PriceDiscountTransactionGet'), baseLink: 'PriceDiscountTransaction' } },
  { path: '/SalesReturnWaybill/:url', name: 'SalesReturnWaybillGet', component: SalesReturnWaybillGet, meta: { title: i18n.t('router.SalesReturnWaybillGet'), baseLink: 'SalesReturnWaybill' } },
  { path: '/PurchaseReturnWaybill/:url', name: 'PurchaseReturnWaybillGet', component: PurchaseReturnWaybillGet, meta: { title: i18n.t('router.PurchaseReturnWaybillGet'), baseLink: 'PurchaseReturnWaybill' } },
  { path: '/PurchaseWaybill/:url', name: 'PurchaseWaybillGet', component: getTenantPage('PurchaseWaybill', 'get'), meta: { title: i18n.t('router.PurchaseWaybillGet'), baseLink: 'PurchaseWaybill' } },
  { path: '/Asset/:url', name: 'AssetGet', component: AssetGet, meta: { title: i18n.t('router.AssetGet'), baseLink: 'Asset' } },
  { path: '/AssetLocation/:url', name: 'AssetLocationGet', component: AssetLocationGet, meta: { title: i18n.t('router.AssetLocationGet'), baseLink: 'AssetLocation' } },
  { path: '/AssetMovementCard/:url', name: 'AssetMovementCardGet', component: getTenantPage('AssetMovementCard', 'get'), meta: { title: i18n.t('router.AssetMovementCardGet'), baseLink: 'AssetMovementCard' } },
  { path: '/SalesWaybill/:url', name: 'SalesWaybillGet', component: getTenantPage('SalesWaybill', 'get'), meta: { title: i18n.t('router.SalesWaybillGet'), baseLink: 'SalesWaybill' } },
  { path: '/ServicePurchaseInvoice/:url', name: 'ServicePurchaseInvoiceGet', component: getTenantPage('ServicePurchaseInvoice', 'get'), meta: { title: i18n.t('router.ServicePurchaseInvoiceGet'), baseLink: 'ServicePurchaseInvoice' } },
  { path: '/DispatchRefDocument/:url', name: 'DispatchRefDocumentGet', component: DispatchRefDocumentGet, meta: { title: i18n.t('router.DispatchRefDocumentGet'), baseLink: 'DispatchRefDocument' } },
  { path: '/CreditBudget/:url', name: 'CreditBudgetGet', component: CreditBudgetGet, meta: { title: i18n.t('router.CreditBudgetGet'), baseLink: 'CreditBudget' } },
  { path: '/TerminalMessage/:url', name: 'TerminalMessageGet', component: TerminalMessageGet, meta: { title: i18n.t('router.TerminalMessageGet'), baseLink: 'TerminalMessage' } },
  { path: '/Label/:url', name: 'LabelGet', component: LabelGet, meta: { title: i18n.t('router.LabelGet'), baseLink: 'Label' } },
  { path: '/RefContract/:url', name: 'RefContractGet', component: RefContractGet, meta: { title: i18n.t('router.RefContractGet'), baseLink: 'RefContract' } },
  { path: '/RouteDailyRecord/:url', name: 'RouteDailyRecordGet', component: RouteDailyRecordGet, meta: { title: i18n.t('router.RouteDailyRecordGet'), baseLink: 'RouteDailyRecord' } },
  { path: '/CustomerSItemCriteria/:url', name: 'CustomerSItemCriteriaGet', component: CustomerSItemCriteriaGet, meta: { title: i18n.t('router.CustomerSItemCriteriaGet'), baseLink: 'CustomerSItemCriteria' } },
  { path: '/CancelReason/:url', name: 'CancelReasonGet', component: CancelReasonGet, meta: { title: i18n.t('router.CancelReasonGet'), baseLink: 'CancelReason' } },
  { path: '/Loyalty/:url', name: 'LoyaltyGet', component: LoyaltyGet, meta: { title: i18n.t('router.LoyaltyGet'), baseLink: 'Loyalty' } },
  { path: '/ItemAnalysis/:url', name: 'ItemAnalysisGet', component: ItemAnalysisGet, meta: { title: i18n.t('router.ItemAnalysisGet'), baseLink: 'ItemAnalysis' } },
  { path: '/PriceDecrease/:url', name: 'PriceDecreaseGet', component: PriceDecreaseGet, meta: { title: i18n.t('router.PriceDecreaseGet'), baseLink: 'PriceDecrease' } },
  { path: '/AssetProperty/:url', name: 'AssetPropertyGet', component: AssetPropertyGet, meta: { title: i18n.t('router.AssetPropertyGet'), baseLink: 'AssetProperty' } },
  { path: '/AssetType/:url', name: 'AssetTypeGet', component: AssetTypeGet, meta: { title: i18n.t('router.AssetTypeGet'), baseLink: 'AssetType' } },
  { path: '/LoyaltyGain/:url', name: 'LoyaltyGainGet', component: LoyaltyGainGet, meta: { title: i18n.t('router.LoyaltyGainGet'), baseLink: 'LoyaltyGain' } },
  { path: '/AssetOperation/:url', name: 'AssetOperationGet', component: AssetOperationGet, meta: { title: i18n.t('router.AssetOperationGet'), baseLink: 'AssetOperation' } },
  { path: '/BudgetMaster/:url', name: 'BudgetMasterGet', component: BudgetMasterGet, meta: { title: i18n.t('router.BudgetMasterGet'), baseLink: 'BudgetMaster' } },
  { path: '/FieldAnalysis/:url', name: 'FieldAnalysisGet', component: FieldAnalysisGet, meta: { title: i18n.t('router.FieldAnalysisGet'), baseLink: 'FieldAnalysis' } },
  { path: '/LoyaltyCategory/:url', name: 'LoyaltyCategoryGet', component: LoyaltyCategoryGet, meta: { title: i18n.t('router.LoyaltyCategoryGet'), baseLink: 'LoyaltyCategory' } },
  { path: '/Sao/:url', name: 'SaoGet', component: SaoGet, meta: { title: i18n.t('router.SaoGet'), baseLink: 'Sao' } },
  { path: '/AssetService/:url', name: 'AssetServiceGet', component: AssetServiceGet, meta: { title: i18n.t('router.AssetServiceGet'), baseLink: 'AssetService' } },
  { path: '/NewOrder/:url', name: 'NewOrderGet', component: getTenantPage('NewOrder', 'get'), meta: { title: i18n.t('router.NewOrderGet'), baseLink: 'NewOrder' } },
  { path: '/CustomerTarget/:url', name: 'CustomerTargetGet', component: CustomerTargetGet, meta: { title: i18n.t('router.CustomerTargetGet'), baseLink: 'CustomerTarget' } },
  { path: '/BATLeagueTarget/:url', name: 'BATLeagueTargetGet', component: BATLeagueTargetGet, meta: { title: i18n.t('router.BATLeagueTargetGet'), baseLink: 'BATLeagueTarget' } }
]

const listUpdate = [
  { path: '/Update/Route/:url', name: 'RouteUpdate', component: getTenantPage('Route', 'update'), meta: { title: i18n.t('router.RouteUpdate'), baseLink: 'Route' } },
  { path: '/Update/Vehicle/:url', name: 'VehicleUpdate', component: getTenantPage('Vehicle', 'update'), meta: { title: i18n.t('router.VehicleUpdate'), baseLink: 'Vehicle' } },
  { path: '/Update/Employee/:url', name: 'EmployeeUpdate', component: getTenantPage('Employee', 'update'), meta: { title: i18n.t('router.EmployeeUpdate'), baseLink: 'Employee' } },
  { path: '/Update/Item/:url', name: 'ItemUpdate', component: getTenantPage('Item', 'update'), meta: { title: i18n.t('router.ItemUpdate'), baseLink: 'Item' } },
  { path: '/Update/Branch/:url', name: 'BranchUpdate', component: getTenantPage('Branch', 'update'), meta: { title: i18n.t('router.BranchUpdate'), baseLink: 'Branch' } },
  { path: '/Update/Bcp/:url', name: 'BcpUpdate', component: BcpUpdate, meta: { title: i18n.t('router.BcpUpdate'), baseLink: 'Bcp' } },
  { path: '/Update/AnalysisQuestions/:url', name: 'AnalysisQuestionsUpdate', component: AnalysisQuestionsUpdate, meta: { title: i18n.t('router.AnalysisQuestionsUpdate'), baseLink: 'AnalysisQuestions' } },
  { path: '/Update/Warehouse/:url', name: 'WarehouseUpdate', component: getTenantPage('Warehouse', 'update'), meta: { title: i18n.t('router.WarehouseUpdate'), baseLink: 'Warehouse' } },
  { path: '/Update/Customer/:url', name: 'CustomerUpdate', component: getTenantPage('Customer', 'update'), meta: { title: i18n.t('router.CustomerUpdate'), baseLink: 'Customer' } },
  { path: '/Update/KeyAccount/:url', name: 'KeyAccountUpdate', component: KeyAccountUpdate, meta: { title: i18n.t('router.KeyAccountUpdate'), baseLink: 'KeyAccount' } },
  { path: '/Update/UnitSet/:url', name: 'UnitSetUpdate', component: getTenantPage('UnitSet', 'update'), meta: { title: i18n.t('router.UnitSetUpdate'), baseLink: 'UnitSet' } },
  { path: '/Update/Bank/:url', name: 'BankUpdate', component: getTenantPage('Bank', 'update'), meta: { title: i18n.t('router.BankUpdate'), baseLink: 'Bank' } },
  { path: '/Update/PurchaseReturnInvoice/:url', name: 'PurchaseReturnInvoiceUpdate', component: PurchaseReturnInvoiceUpdate, meta: { title: i18n.t('router.PurchaseReturnInvoiceUpdate'), baseLink: 'PurchaseReturnInvoice' } },
  { path: '/Update/SalesReturnInvoice/:url', name: 'SalesReturnInvoiceUpdate', component: SalesReturnInvoiceUpdate, meta: { title: i18n.t('router.SalesReturnInvoiceUpdate'), baseLink: 'SalesReturnInvoice' } },
  { path: '/Update/ServiceSalesInvoice/:url', name: 'ServiceSalesInvoiceUpdate', component: getTenantPage('ServiceSalesInvoice', 'update'), meta: { title: i18n.t('router.ServiceSalesInvoiceUpdate'), baseLink: 'ServiceSalesInvoice' } },
  { path: '/Update/SalesInvoice/:url', name: 'SalesInvoiceUpdate', component: getTenantPage('SalesInvoice', 'update'), meta: { title: i18n.t('router.SalesInvoiceUpdate'), baseLink: 'SalesInvoice' } },
  { path: '/Update/PurchaseOrder/:url', name: 'PurchaseOrderUpdate', component: getTenantPage('PurchaseOrder', 'update'), meta: { title: i18n.t('router.PurchaseOrderUpdate'), baseLink: 'PurchaseOrder' } },
  { path: '/Update/PurchaseInvoice/:url', name: 'PurchaseInvoiceUpdate', component: getTenantPage('PurchaseInvoice', 'update'), meta: { title: i18n.t('router.PurchaseInvoiceUpdate'), baseLink: 'PurchaseInvoice' } },
  { path: '/Update/Discount/:url', name: 'DiscountUpdate', component: DiscountUpdate, meta: { title: i18n.t('router.DiscountUpdate'), baseLink: 'Discount' } },
  { path: '/Update/DiscountLimit/:url', name: 'DiscountLimitUpdate', component: DiscountLimitUpdate, meta: { title: i18n.t('router.DiscountLimitUpdate'), baseLink: 'DiscountLimit' } },
  { path: '/Update/PriceList/:url', name: 'PriceListUpdate', component: PriceListUpdate, meta: { title: i18n.t('router.PriceListUpdate'), baseLink: 'PriceList' } },
  { path: '/Update/BankTransaction/:url', name: 'BankTransactionUpdate', component: BankTransactionUpdate, meta: { title: i18n.t('router.BankTransactionUpdate'), baseLink: 'BankTransaction' } },
  { path: '/Update/CSCard/:url', name: 'CSCardUpdate', component: CSCardUpdate, meta: { title: i18n.t('router.CSCardUpdate'), baseLink: 'CSCard' } },
  { path: '/Update/Voucher/:url', name: 'VoucherUpdate', component: VoucherUpdate, meta: { title: i18n.t('router.VoucherUpdate'), baseLink: 'Voucher' } },
  { path: '/Update/CreditCard/:url', name: 'CreditCardUpdate', component: getTenantPage('CreditCard', 'update'), meta: { title: i18n.t('router.CreditCardUpdate'), baseLink: 'CreditCard' } },
  { path: '/Update/Order/:url', name: 'OrderUpdate', component: getTenantPage('Order', 'update'), meta: { title: i18n.t('router.OrderUpdate'), baseLink: 'Order' } },
  { path: '/Update/Contracts/:url', name: 'ContractsUpdate', component: getTenantPage('Contracts', 'update'), meta: { title: i18n.t('router.ContractsUpdate'), baseLink: 'Contracts' } },
  { path: '/Update/FieldSurvey/:url', name: 'FieldSurveyUpdate', component: FieldSurveyUpdate, meta: { title: i18n.t('router.FieldSurveyUpdate'), baseLink: 'FieldSurvey' } },
  { path: '/Update/FixedTerm/:url', name: 'FixedTermUpdate', component: FixedTermUpdate, meta: { title: i18n.t('router.FixedTermUpdate'), baseLink: 'FixedTerm' } },
  { path: '/Update/VanLoading/:url', name: 'VanLoadingUpdate', component: VanLoadingUpdate, meta: { title: i18n.t('router.VanLoadingUpdate'), baseLink: 'VanLoading' } },
  { path: '/Update/PotentialCustomer/:url', name: 'PotentialCustomerUpdate', component: PotentialCustomerUpdate, meta: { title: i18n.t('router.PotentialCustomerUpdate'), baseLink: 'PotentialCustomer' } },
  { path: '/Update/LoadingPlan/:url', name: 'LoadingPlanUpdate', component: LoadingPlanUpdate, meta: { title: i18n.t('router.LoadingPlanUpdate'), baseLink: 'LoadingPlan' } },
  { path: '/Update/CashCard/:url', name: 'CashCardUpdate', component: getTenantPage('CashCard', 'update'), meta: { title: i18n.t('router.CashCardUpdate'), baseLink: 'CashCard' } },
  { path: '/Update/LoyaltyExpense/:url', name: 'LoyaltyExpenseUpdate', component: LoyaltyExpenseUpdate, meta: { title: i18n.t('router.LoyaltyExpenseUpdate'), baseLink: 'LoyaltyExpense' } },
  { path: '/Update/CycleInstruction/:url', name: 'CycleInstructionUpdate', component: CycleInstructionUpdate, meta: { title: i18n.t('router.CycleInstructionUpdate'), baseLink: 'CycleInstruction' } },
  { path: '/Update/Rma/:url', name: 'RmaUpdate', component: RmaUpdate, meta: { title: i18n.t('router.RmaUpdate'), baseLink: 'Rma' } },
  { path: '/Update/RmaOrder/:url', name: 'RmaOrderUpdate', component: RmaOrderUpdate, meta: { title: i18n.t('router.RmaOrderUpdate'), baseLink: 'RmaOrder' } },
  { path: '/Update/FixedTermCampaign/:url', name: 'FixedTermCampaignUpdate', component: FixedTermCampaignUpdate, meta: { title: i18n.t('router.FixedTermCampaignUpdate'), baseLink: 'FixedTermCampaign' } },
  { path: '/Update/DiscountReason/:url', name: 'DiscountReasonUpdate', component: DiscountReasonUpdate, meta: { title: i18n.t('router.DiscountReasonUpdate'), baseLink: 'DiscountReason' } },
  { path: '/Update/DiscountPackage/:url', name: 'DiscountPackageUpdate', component: DiscountPackageUpdate, meta: { title: i18n.t('router.DiscountPackageUpdate'), baseLink: 'DiscountPackage' } },
  { path: '/Update/PriceDiscountTransaction/:url', name: 'PriceDiscountTransactionUpdate', component: PriceDiscountTransactionUpdate, meta: { title: i18n.t('router.PriceDiscountTransactionUpdate'), baseLink: 'PriceDiscountTransaction' } },
  { path: '/Update/SalesReturnWaybill/:url', name: 'SalesReturnWaybillUpdate', component: SalesReturnWaybillUpdate, meta: { title: i18n.t('router.SalesReturnWaybillUpdate'), baseLink: 'SalesReturnWaybill' } },
  { path: '/Update/PurchaseReturnWaybill/:url', name: 'PurchaseReturnWaybillUpdate', component: PurchaseReturnWaybillUpdate, meta: { title: i18n.t('router.PurchaseReturnWaybillUpdate'), baseLink: 'PurchaseReturnWaybill' } },
  { path: '/Update/PurchaseWaybill/:url', name: 'PurchaseWaybillUpdate', component: getTenantPage('PurchaseWaybill', 'update'), meta: { title: i18n.t('router.PurchaseWaybillUpdate'), baseLink: 'PurchaseWaybill' } },
  { path: '/Update/Asset/:url', name: 'AssetUpdate', component: AssetUpdate, meta: { title: i18n.t('router.AssetUpdate'), baseLink: 'Asset' } },
  { path: '/Update/AssetLocation/:url', name: 'AssetLocationUpdate', component: AssetLocationUpdate, meta: { title: i18n.t('router.AssetLocationUpdate'), baseLink: 'AssetLocation' } },
  { path: '/Update/AssetMovementCard/:url', name: 'AssetMovementCardUpdate', component: getTenantPage('AssetMovementCard', 'update'), meta: { title: i18n.t('router.AssetMovementCardUpdate'), baseLink: 'AssetMovementCard' } },
  { path: '/Update/SalesWaybill/:url', name: 'SalesWaybillUpdate', component: getTenantPage('SalesWaybill', 'update'), meta: { title: i18n.t('router.SalesWaybillUpdate'), baseLink: 'SalesWaybill' } },
  { path: '/Update/ServicePurchaseInvoice/:url', name: 'ServicePurchaseInvoiceUpdate', component: getTenantPage('ServicePurchaseInvoice', 'update'), meta: { title: i18n.t('router.ServicePurchaseInvoiceUpdate'), baseLink: 'ServicePurchaseInvoice' } },
  { path: '/Update/DispatchRefDocument/:url', name: 'DispatchRefDocumentUpdate', component: DispatchRefDocumentUpdate, meta: { title: i18n.t('router.DispatchRefDocumentUpdate'), baseLink: 'DispatchRefDocument' } },
  { path: '/Update/CreditBudget/:url', name: 'CreditBudgetUpdate', component: CreditBudgetUpdate, meta: { title: i18n.t('router.CreditBudgetUpdate'), baseLink: 'CreditBudget' } },
  { path: '/Update/TerminalMessage/:url', name: 'TerminalMessageUpdate', component: TerminalMessageUpdate, meta: { title: i18n.t('router.TerminalMessageUpdate'), baseLink: 'TerminalMessage' } },
  { path: '/Update/Label/:url', name: 'LabelUpdate', component: LabelUpdate, meta: { title: i18n.t('router.LabelUpdate'), baseLink: 'Label' } },
  { path: '/Update/RefContract/:url', name: 'RefContractUpdate', component: RefContractUpdate, meta: { title: i18n.t('router.RefContractUpdate'), baseLink: 'RefContract' } },
  { path: '/Update/CustomerSItemCriteria/:url', name: 'CustomerSItemCriteriaUpdate', component: CustomerSItemCriteriaUpdate, meta: { title: i18n.t('router.CustomerSItemCriteriaUpdate'), baseLink: 'CustomerSItemCriteria' } },
  { path: '/Update/CancelReason/:url', name: 'CancelReasonUpdate', component: CancelReasonUpdate, meta: { title: i18n.t('router.CancelReasonUpdate'), baseLink: 'CancelReason' } },
  { path: '/Update/Loyalty/:url', name: 'LoyaltyUpdate', component: LoyaltyUpdate, meta: { title: i18n.t('router.LoyaltyUpdate'), baseLink: 'Loyalty' } },
  { path: '/Update/ItemAnalysis/:url', name: 'ItemAnalysisUpdate', component: ItemAnalysisUpdate, meta: { title: i18n.t('router.ItemAnalysisUpdate'), baseLink: 'ItemAnalysis' } },
  { path: '/Update/PriceDecrease/:url', name: 'PriceDecreaseUpdate', component: PriceDecreaseUpdate, meta: { title: i18n.t('router.PriceDecreaseUpdate'), baseLink: 'PriceDecrease' } },
  { path: '/Update/AssetProperty/:url', name: 'AssetPropertyUpdate', component: AssetPropertyUpdate, meta: { title: i18n.t('router.AssetPropertyUpdate'), baseLink: 'AssetProperty' } },
  { path: '/Update/AssetType/:url', name: 'AssetTypeUpdate', component: AssetTypeUpdate, meta: { title: i18n.t('router.AssetTypeUpdate'), baseLink: 'AssetType' } },
  { path: '/Update/LoyaltyGain/:url', name: 'LoyaltyGainUpdate', component: LoyaltyGainUpdate, meta: { title: i18n.t('router.LoyaltyGainUpdate'), baseLink: 'LoyaltyGain' } },
  { path: '/Update/AssetOperation/:url', name: 'AssetOperationUpdate', component: AssetOperationUpdate, meta: { title: i18n.t('router.AssetOperationUpdate'), baseLink: 'AssetOperation' } },
  { path: '/Update/BudgetMaster/:url', name: 'BudgetMasterUpdate', component: getTenantPage('BudgetMaster', 'update'), meta: { title: i18n.t('router.BudgetMasterUpdate'), baseLink: 'BudgetMaster' } },
  { path: '/Update/FieldAnalysis/:url', name: 'FieldAnalysisUpdate', component: FieldAnalysisUpdate, meta: { title: i18n.t('router.FieldAnalysisUpdate'), baseLink: 'FieldAnalysis' } },
  { path: '/Update/LoyaltyCategory/:url', name: 'LoyaltyCategoryUpdate', component: LoyaltyCategoryUpdate, meta: { title: i18n.t('router.LoyaltyCategoryUpdate'), baseLink: 'LoyaltyCategory' } },
  { path: '/Update/Sao/:url', name: 'SaoUpdate', component: SaoUpdate, meta: { title: i18n.t('router.SaoUpdate'), baseLink: 'Sao' } },
  { path: '/Update/NewOrder/:url', name: 'NewOrderUpdate', component: getTenantPage('NewOrder', 'update'), meta: { title: i18n.t('router.NewOrderUpdate'), baseLink: 'NewOrder' } },
  { path: '/Update/CustomerTarget/:url', name: 'CustomerTargetUpdate', component: CustomerTargetUpdate, meta: { title: i18n.t('router.CustomerTargetUpdate'), baseLink: 'CustomerTarget' } },
  { path: '/Update/BATLeagueTarget/:url', name: 'BATLeagueTargetUpdate', component: BATLeagueTargetUpdate, meta: { title: i18n.t('router.BATLeagueTargetUpdate'), baseLink: 'BATLeagueTarget' } }
]

const listInsert = [
  { path: '/Insert/Route', name: 'RouteInsert', component: RouteInsert, meta: { title: i18n.t('router.RouteInsert'), baseLink: 'Route' } },
  { path: '/Insert/Vehicle', name: 'VehicleInsert', component: getTenantPage('Vehicle', 'insert'), meta: { title: i18n.t('router.VehicleInsert'), baseLink: 'Vehicle' } },
  { path: '/Insert/Employee', name: 'EmployeeInsert', component: getTenantPage('Employee', 'insert'), meta: { title: i18n.t('router.EmployeeInsert'), baseLink: 'Employee' } },
  { path: '/Insert/Item', name: 'ItemInsert', component: getTenantPage('Item', 'insert'), meta: { title: i18n.t('router.ItemInsert'), baseLink: 'Item' } },
  { path: '/Insert/Branch', name: 'BranchInsert', component: getTenantPage('Branch', 'insert'), meta: { title: i18n.t('router.BranchInsert'), baseLink: 'Branch' } },
  { path: '/Insert/Bcp', name: 'BcpInsert', component: BcpInsert, meta: { title: i18n.t('router.BcpInsert'), baseLink: 'Bcp' } },
  { path: '/Insert/AnalysisQuestions', name: 'AnalysisQuestionsInsert', component: AnalysisQuestionsInsert, meta: { title: i18n.t('router.AnalysisQuestionsInsert'), baseLink: 'AnalysisQuestions' } },
  { path: '/Insert/Warehouse', name: 'WarehouseInsert', component: getTenantPage('Warehouse', 'insert'), meta: { title: i18n.t('router.WarehouseInsert'), baseLink: 'Warehouse' } },
  { path: '/Insert/Customer', name: 'CustomerInsert', component: getTenantPage('Customer', 'insert'), meta: { title: i18n.t('router.CustomerInsert'), baseLink: 'Customer' } },
  { path: '/Insert/KeyAccount', name: 'KeyAccountInsert', component: KeyAccountInsert, meta: { title: i18n.t('router.KeyAccountInsert'), baseLink: 'KeyAccount' } },
  { path: '/Insert/UnitSet', name: 'UnitSetInsert', component: getTenantPage('UnitSet', 'insert'), meta: { title: i18n.t('router.UnitSetInsert'), baseLink: 'UnitSet' } },
  { path: '/Insert/Bank', name: 'BankInsert', component: getTenantPage('Bank', 'insert'), meta: { title: i18n.t('router.BankInsert'), baseLink: 'Bank' } },
  { path: '/Insert/SalesReturnInvoice', name: 'SalesReturnInvoiceInsert', component: getTenantPage('SalesReturnInvoice', 'insert'), meta: { title: i18n.t('router.SalesReturnInvoiceInsert'), baseLink: 'SalesReturnInvoice' } },
  { path: '/Insert/ServiceSalesInvoice', name: 'ServiceSalesInvoiceInsert', component: getTenantPage('ServiceSalesInvoice', 'insert'), meta: { title: i18n.t('router.ServiceSalesInvoiceInsert'), baseLink: 'ServiceSalesInvoice' } },
  { path: '/Insert/SalesInvoice', name: 'SalesInvoiceInsert', component: getTenantPage('SalesInvoice', 'insert'), meta: { title: i18n.t('router.SalesInvoiceInsert'), baseLink: 'SalesInvoice' } },
  { path: '/Insert/PurchaseOrder', name: 'PurchaseOrderInsert', component: getTenantPage('PurchaseOrder', 'insert'), meta: { title: i18n.t('router.PurchaseOrderInsert'), baseLink: 'PurchaseOrder' } },
  { path: '/Insert/PurchaseInvoice', name: 'PurchaseInvoiceInsert', component: getTenantPage('PurchaseInvoice', 'insert'), meta: { title: i18n.t('router.PurchaseInvoiceInsert'), baseLink: 'PurchaseInvoice' } },
  { path: '/Insert/Discount', name: 'DiscountInsert', component: DiscountInsert, meta: { title: i18n.t('router.DiscountInsert'), baseLink: 'Discount' } },
  { path: '/Insert/DiscountLimit', name: 'DiscountLimitInsert', component: DiscountLimitInsert, meta: { title: i18n.t('router.DiscountLimitInsert'), baseLink: 'DiscountLimit' } },
  { path: '/Insert/PriceList', name: 'PriceListInsert', component: PriceListInsert, meta: { title: i18n.t('router.PriceListInsert'), baseLink: 'PriceList' } },
  { path: '/Insert/BankTransaction', name: 'BankTransactionInsert', component: BankTransactionInsert, meta: { title: i18n.t('router.BankTransactionInsert'), baseLink: 'BankTransaction' } },
  { path: '/Insert/CSCard', name: 'CSCardInsert', component: CSCardInsert, meta: { title: i18n.t('router.CSCardInsert'), baseLink: 'CSCard' } },
  { path: '/Insert/Voucher', name: 'VoucherInsert', component: VoucherInsert, meta: { title: i18n.t('router.VoucherInsert'), baseLink: 'Voucher' } },
  { path: '/Insert/CreditCard', name: 'CreditCardInsert', component: getTenantPage('CreditCard', 'insert'), meta: { title: i18n.t('router.CreditCardInsert'), baseLink: 'CreditCard' } },
  { path: '/Insert/StockAdjustment', name: 'StockAdjustmentInsert', component: StockAdjustmentInsert, meta: { title: i18n.t('router.StockAdjustmentInsert'), baseLink: 'StockAdjustment' } },
  { path: '/Insert/BranchStockTransfer', name: 'BranchStockTransferInsert', component: BranchStockTransferInsert, meta: { title: i18n.t('router.BranchStockTransferInsert'), baseLink: 'BranchStockTransfer' } },
  { path: '/Insert/Order', name: 'OrderInsert', component: getTenantPage('Order', 'insert'), meta: { title: i18n.t('router.OrderInsert'), baseLink: 'Order' } },
  { path: '/Insert/Contracts', name: 'ContractsInsert', component: getTenantPage('Contracts', 'insert'), meta: { title: i18n.t('router.ContractsInsert'), baseLink: 'Contracts' } },
  { path: '/Insert/FieldSurvey', name: 'FieldSurveyInsert', component: FieldSurveyInsert, meta: { title: i18n.t('router.FieldSurveyInsert'), baseLink: 'FieldSurvey' } },
  { path: '/Insert/FixedTerm', name: 'FixedTermInsert', component: FixedTermInsert, meta: { title: i18n.t('router.FixedTermInsert'), baseLink: 'FixedTerm' } },
  { path: '/Insert/VanLoading', name: 'VanLoadingInsert', component: VanLoadingInsert, meta: { title: i18n.t('router.VanLoadingInsert'), baseLink: 'VanLoading' } },
  { path: '/Insert/LoadingPlan', name: 'LoadingPlanInsert', component: LoadingPlanInsert, meta: { title: i18n.t('router.LoadingPlanInsert'), baseLink: 'LoadingPlan' } },
  { path: '/Insert/CashCard', name: 'CashCardInsert', component: getTenantPage('CashCard', 'insert'), meta: { title: i18n.t('router.CashCardInsert'), baseLink: 'CashCard' } },
  { path: '/Insert/TerminalPasswordLog', name: 'TerminalPasswordLogInsert', component: TerminalPasswordLogInsert, meta: { title: i18n.t('router.TerminalPasswordLogInsert'), baseLink: 'TerminalPasswordLog' } },
  { path: '/Insert/RouteBalance', name: 'RouteBalance', component: RouteBalanceInsert, meta: { title: i18n.t('router.RouteBalanceInsert'), baseLink: 'RouteBalance' } },
  { path: '/Insert/WarehouseMovement', name: 'WarehouseMovementInsert', component: WarehouseMovementInsert, meta: { title: i18n.t('router.WarehouseMovementInsert'), baseLink: 'WarehouseMovement' } },
  { path: '/Insert/LoyaltyExpense', name: 'LoyaltyExpenseInsert', component: LoyaltyExpenseInsert, meta: { title: i18n.t('router.LoyaltyExpenseInsert'), baseLink: 'LoyaltyExpense' } },
  { path: '/Insert/CycleInstruction', name: 'CycleInstructionInsert', component: CycleInstructionInsert, meta: { title: i18n.t('router.CycleInstructionInsert'), baseLink: 'CycleInstruction' } },
  { path: '/Insert/Rma', name: 'RmaInsert', component: RmaInsert, meta: { title: i18n.t('router.RmaInsert'), baseLink: 'Rma' } },
  { path: '/Insert/RmaOrder', name: 'RmaOrderInsert', component: RmaOrderInsert, meta: { title: i18n.t('router.RmaOrderInsert'), baseLink: 'RmaOrder' } },
  { path: '/Insert/FixedTermCampaign', name: 'FixedTermCampaignInsert', component: FixedTermCampaignInsert, meta: { title: i18n.t('router.FixedTermCampaignInsert'), baseLink: 'FixedTermCampaign' } },
  { path: '/Insert/DiscountReason', name: 'DiscountReasonInsert', component: DiscountReasonInsert, meta: { title: i18n.t('router.DiscountReasonInsert'), baseLink: 'DiscountReason' } },
  { path: '/Insert/DiscountPackage', name: 'DiscountPackageInsert', component: DiscountPackageInsert, meta: { title: i18n.t('router.DiscountPackageInsert'), baseLink: 'DiscountPackage' } },
  { path: '/Insert/PriceDiscountTransaction', name: 'PriceDiscountTransactionInsert', component: PriceDiscountTransactionInsert, meta: { title: i18n.t('router.PriceDiscountTransactionInsert'), baseLink: 'PriceDiscountTransaction' } },
  { path: '/Insert/PurchaseWaybill', name: 'PurchaseWaybillInsert', component: getTenantPage('PurchaseWaybill', 'insert'), meta: { title: i18n.t('router.PurchaseWaybillInsert'), baseLink: 'PurchaseWaybill' } },
  { path: '/Insert/Asset', name: 'AssetInsert', component: AssetInsert, meta: { title: i18n.t('router.AssetInsert'), baseLink: 'Asset' } },
  { path: '/Insert/AssetLocation', name: 'AssetLocationInsert', component: AssetLocationInsert, meta: { title: i18n.t('router.AssetLocationInsert'), baseLink: 'AssetLocation' } },
  { path: '/Insert/AssetMovementCard', name: 'AssetMovementCardInsert', component: getTenantPage('AssetMovementCard', 'insert'), meta: { title: i18n.t('router.AssetMovementCardInsert'), baseLink: 'AssetMovementCard' } },
  { path: '/Insert/SalesWaybill', name: 'SalesWaybillInsert', component: getTenantPage('SalesWaybill', 'insert'), meta: { title: i18n.t('router.SalesWaybillInsert'), baseLink: 'SalesWaybill' } },
  { path: '/Insert/ServicePurchaseInvoice', name: 'ServicePurchaseInvoiceInsert', component: getTenantPage('ServicePurchaseInvoice', 'insert'), meta: { title: i18n.t('router.ServicePurchaseInvoiceInsert'), baseLink: 'ServicePurchaseInvoice' } },
  { path: '/Insert/CreditBudget', name: 'CreditBudgetInsert', component: CreditBudgetInsert, meta: { title: i18n.t('router.CreditBudgetInsert'), baseLink: 'CreditBudget' } },
  { path: '/Insert/TerminalMessage', name: 'TerminalMessageInsert', component: TerminalMessageInsert, meta: { title: i18n.t('router.TerminalMessageInsert'), baseLink: 'TerminalMessage' } },
  { path: '/Insert/Label', name: 'LabelInsert', component: LabelInsert, meta: { title: i18n.t('router.LabelInsert'), baseLink: 'Label' } },
  { path: '/Insert/RefContract', name: 'RefContractInsert', component: RefContractInsert, meta: { title: i18n.t('router.RefContractInsert'), baseLink: 'RefContract' } },
  { path: '/Insert/CustomerSItemCriteria', name: 'CustomerSItemCriteriaInsert', component: CustomerSItemCriteriaInsert, meta: { title: i18n.t('router.CustomerSItemCriteriaInsert'), baseLink: 'CustomerSItemCriteria' } },
  { path: '/Insert/CancelReason', name: 'CancelReasonInsert', component: CancelReasonInsert, meta: { title: i18n.t('router.CancelReasonInsert'), baseLink: 'CancelReason' } },
  { path: '/Insert/Loyalty', name: 'LoyaltyInsert', component: LoyaltyInsert, meta: { title: i18n.t('router.LoyaltyInsert'), baseLink: 'Loyalty' } },
  { path: '/Insert/ItemAnalysis', name: 'ItemAnalysisInsert', component: ItemAnalysisInsert, meta: { title: i18n.t('router.ItemAnalysisInsert'), baseLink: 'ItemAnalysis' } },
  { path: '/Insert/PriceDecrease', name: 'PriceDecreaseInsert', component: PriceDecreaseInsert, meta: { title: i18n.t('router.PriceDecreaseInsert'), baseLink: 'PriceDecrease' } },
  { path: '/Insert/AssetProperty', name: 'AssetPropertyInsert', component: AssetPropertyInsert, meta: { title: i18n.t('router.AssetPropertyInsert'), baseLink: 'AssetProperty' } },
  { path: '/Insert/AssetType', name: 'AssetTypeInsert', component: AssetTypeInsert, meta: { title: i18n.t('router.AssetTypeInsert'), baseLink: 'AssetType' } },
  { path: '/Insert/LoyaltyGain', name: 'LoyaltyGainInsert', component: LoyaltyGainInsert, meta: { title: i18n.t('router.LoyaltyGainInsert'), baseLink: 'LoyaltyGain' } },
  { path: '/Insert/AssetOperation', name: 'AssetOperationInsert', component: AssetOperationInsert, meta: { title: i18n.t('router.AssetOperationInsert'), baseLink: 'AssetOperation' } },
  { path: '/Insert/BudgetMaster', name: 'BudgetMasterInsert', component: getTenantPage('BudgetMaster', 'insert'), meta: { title: i18n.t('router.BudgetMasterInsert'), baseLink: 'BudgetMaster' } },
  { path: '/Insert/FieldAnalysis', name: 'FieldAnalysisInsert', component: FieldAnalysisInsert, meta: { title: i18n.t('router.FieldAnalysisInsert'), baseLink: 'FieldAnalysis' } },
  { path: '/Insert/LoyaltyCategory', name: 'LoyaltyCategoryInsert', component: LoyaltyCategoryInsert, meta: { title: i18n.t('router.LoyaltyCategoryInsert'), baseLink: 'LoyaltyCategory' } },
  { path: '/Insert/Sao', name: 'SaoInsert', component: SaoInsert, meta: { title: i18n.t('router.SaoInsert'), baseLink: 'Sao' } },
  { path: '/Insert/AssetService', name: 'AssetServiceInsert', component: AssetServiceInsert, meta: { title: i18n.t('router.AssetServiceInsert'), baseLink: 'AssetService' } },
  { path: '/Insert/NewOrder', name: 'NewOrderInsert', component: getTenantPage('NewOrder', 'insert'), meta: { title: i18n.t('router.NewOrderInsert'), baseLink: 'NewOrder' } },
  { path: '/Insert/CustomerTarget', name: 'CustomerTargetInsert', component: CustomerTargetInsert, meta: { title: i18n.t('router.CustomerTargetInsert'), baseLink: 'CustomerTarget' } },
  { path: '/Insert/BATLeagueTarget', name: 'BATLeagueTargetInsert', component: BATLeagueTargetInsert, meta: { title: i18n.t('router.BATLeagueTargetInsert'), baseLink: 'BATLeagueTarget' } }
]

const routes = [
  {
    path: '/',
    component: Pages,
    redirect: '/Dashboard',
    beforeEnter: AuthRequired,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        redirect: '/Dashboard',
        children: [
          {
            path: '/Dashboard',
            name: '',
            component: DashboardIndex
          },
          {
            path: '/ChangePassword',
            name: 'ChangePassword',
            component: ChangePassword
          },
          {
            path: '/StockChangePassword',
            name: 'StockChangePassword',
            component: StockChangePassword
          }
        ]
      },
      {
        path: '/',
        redirect: '/Dashboard',
        component: LayoutIndex,
        children: listIndex
      },
      {
        path: '/Get',
        component: LayoutGet,
        children: listGet
      },
      {
        path: '/Update',
        component: LayoutUpdate,
        children: listUpdate
      },
      {
        path: '/Insert',
        component: LayoutInsert,
        children: listInsert
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
    store.commit('gtagPageView')
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
