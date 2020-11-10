<template>
  <b-row>
    <b-col cols="12">
      <header>
        <b-row>
          <b-col cols="12" md="6">
            <Breadcrumb />
          </b-col>
          <b-col cols="12" md="6" class="text-right">
            <router-link :to="{name: 'Dashboard' }">
              <b-button size="sm" variant="outline-danger">Vazgeç</b-button>
            </router-link>
            <b-button @click="save()" size="sm" variant="success">Kaydet</b-button>
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <section>
        <b-row>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              label="Sistem Kodu"
            >
              <b-form-input type="text" v-model="form.Code"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              label="Adı"
            >
              <b-form-input type="text" v-model="form.Description1"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" lg="2">
            <b-form-group
              label="Şube Tipi*"
            >
              <b-form-input type="text" v-model="form.branchType"/>
            </b-form-group>
          </b-col>
        </b-row>
      </section>
    </b-col>
    <b-col cols="12">
      <b-tabs>
        <b-tab title="Şube" active>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Ticari Ünvan*"
              >
                <b-form-input type="text" v-model="form.Unvan"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Müşteri Vergi Tipi*">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Üst Şube">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Vergiden Muaf mı?"
              >
              <b-form-radio-group v-model="form.IsVehicle">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Vergi Dairesi*"
              >
                <b-form-input type="text" v-model="form.Vergi"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Vergi Numarası*"
              >
                <b-form-input type="text" v-model="form.vergiNo"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Bölge">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Lisans Numarası*"
              >
                <b-form-input type="text" v-model="form.vergiNo"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Satış Belge Türü">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Satış Belge Türü">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Siparişi Değiştirilebilecek mi?"
              >
              <b-form-radio-group v-model="form.isSales">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Depo Satışı mı?"
              >
              <b-form-radio-group v-model="form.isWarehouse">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Web Adresi"
              >
                <b-form-input type="text" v-model="form.adress"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Ticaret Sicil Numarası"
              >
                <b-form-input type="text" v-model="form.sicilNo"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="VisionPlus E-Fatura Kullanılacak mı?"
              >
              <b-form-radio-group v-model="form.isEfatura">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="VisionPlus E-Arşiv Kullanılacak mı?">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="VisionPlus E-İrsaliye Kullanılacak mı?">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Durum"
              >
              <b-form-radio-group v-model="form.isStatus">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Müşteri Ön Kodu"
              >
                <b-form-input type="text" v-model="form.OnCode"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Şube Detayları">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Üst Bölge">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Alt Bölge">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Grup Bölge">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Not"
              >
                <b-form-input type="text" v-model="form.Note"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Lokasyon">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Lokasyon Kodu*"
              >
                <b-form-input type="text" v-model="form.locationCode"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Lokasyon Adı*"
              >
                <b-form-input type="text" v-model="form.locationName"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Adres*"
              >
                <b-form-input type="text" v-model="form.add"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="İl*">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="İlçe*">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Mahalle">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Sokak"
              >
                <b-form-input type="text" v-model="form.sokak"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Cep Telefonu"
              >
                <b-form-input type="tel" placeholder="(___)___ __ __" v-model="form.tel1"/>
              </b-form-group>
            </b-col>
             <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Telefon(1)"
              >
                <b-form-input type="tel" placeholder="(___)___ __ __" v-model="form.tel2"/>
              </b-form-group>
            </b-col>
             <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Telefon(2)"
              >
                <b-form-input type="tel" placeholder="(___)___ __ __" v-model="form.tel3"/>
              </b-form-group>
            </b-col>
             <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Faks"
              >
                <b-form-input type="tel" placeholder="(___)___ __ __" v-model="form.faks"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Fatura Adresi mi?"
              >
              <b-form-radio-group v-model="form.isFaturaAddress">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Teslimat Adresi mi?"
              >
              <b-form-radio-group v-model="form.isTeslimat">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Varsayılan Lokasyon mu?"
              >
              <b-form-radio-group v-model="form.default">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Not"
              >
                <b-form-input type="text" v-model="form.note1"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
            </b-col>
            <b-col class="d-flex align-items-end" cols="12" md="3" lg="2">
              <b-form-group>
                <b-button variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Finansal Bilgiler">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Varsayılan Ödeme Tipi*">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Fiyat Listesi Kategorisi*">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Maksimum Prim Oranı*"
              >
                <b-form-input type="text" v-model="form.prim"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Fiyat Değişiklik Oranı*"
              >
                <b-form-input type="text" v-model="form.change"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Ödeme Vadesi">
                <v-select disabled :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Finans Kodu"
              >
                <b-form-input type="text" v-model="form.note2"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Kredi Limiti"
              >
                <b-form-input disabled type="text" v-model="form.limit"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Risk Limiti"
              >
                <b-form-input disabled type="text" v-model="form.limit2"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Risk Limiti Aşılabilir mi?"
              >
              <b-form-radio-group v-model="form.isRisk">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Teslim Gün Sayısı"
              >
                <b-form-input type="text" v-model="form.note3"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Müşteri İndirimi 1"
              >
                <b-form-input type="text" v-model="form.note4"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Müşteri İndirimi 2"
              >
                <b-form-input type="text" v-model="form.note5"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Manuel Fatura Kapatma"
              >
                <b-form-input type="text" v-model="form.note3"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Kredi Tarihçesi">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Teminat Tanımı">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Teminat Tutarı"
              >
                <b-form-input type="text" v-model="form.tutar"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Para Birimi">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Banka">
                <v-select disabled :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Kredi Başlangıç Tarihi">
                <b-form-datepicker id="contract-datepicker1" :placeholder="$t('insert.vehicles.chooseDate')" v-model="form.date1" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Kredi Bitiş Tarihi">
                <b-form-datepicker id="contract-datepicker2" :placeholder="$t('insert.vehicles.chooseDate')" v-model="form.date2" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Kredi Limiti"
              >
                <b-form-input type="text" v-model="form.limit3"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Risk Limiti"
              >
                <b-form-input type="text" v-model="form.limit4"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Risk Limiti Aşılabilir mi?"
              >
              <b-form-radio-group v-model="form.isRisk2">
                  <b-form-radio value="1">{{$t('insert.yes')}}</b-form-radio>
                  <b-form-radio value="0">{{$t('insert.no')}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Kefil"
              >
                <b-form-input type="text" disabled v-model="form.kefil"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Borçlu"
              >
                <b-form-input type="text" disabled v-model="form.borc"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Evrak Numarası"
              >
                <b-form-input type="text" disabled v-model="form.evrak"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Evrak Tarihi">
                <b-form-datepicker disabled id="contract-datepicker3" :placeholder="$t('insert.vehicles.chooseDate')" v-model="form.date4" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Tapu Dairesi"
              >
                <b-form-input type="text" disabled v-model="form.evrak1"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Trafik Tescil Şube Md."
              >
                <b-form-input type="text" disabled v-model="form.evrak2"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Noter Numarası"
              >
                <b-form-input type="text" disabled v-model="form.evrak3"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Noter İşlem Tarihi">
                <b-form-datepicker disabled id="contract-datepicker4" :placeholder="$t('insert.vehicles.chooseDate')" v-model="form.date5" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="İpotek Değeri"
              >
                <b-form-input type="text" disabled v-model="form.evrak4"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Ada/Pafta"
              >
                <b-form-input type="text" disabled v-model="form.evrak5"/>
              </b-form-group>
            </b-col>
            <b-col class="d-flex align-items-center" cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Ödeme Tipi">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Ödeme Tipi">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col class="d-flex align-items-end" cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Ödeme Vadeleri">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Satın Alma Ödeme Vadesi">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col class="d-flex align-items-end" cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Ürün İndirimleri">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Başlangıç Tarihi">
                <b-form-datepicker id="contract-datepicker5" :placeholder="$t('insert.vehicles.chooseDate')" v-model="form.date5" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Bitiş Tarihi">
                <b-form-datepicker id="contract-datepicker6" :placeholder="$t('insert.vehicles.chooseDate')" v-model="form.date5" locale="tr" class="mb-2"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Alan Açıklaması">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Değer">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Ürün İndirimi 1*"
              >
                <b-form-input type="text" v-model="form.discount1"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Ürün İndirimi 2*"
              >
                <b-form-input type="text" v-model="form.discount2"/>
              </b-form-group>
            </b-col>
            <b-col class="d-flex align-items-end" cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="EFU Kodları">
          <b-row>
            <b-col cols="12" md="3" lg="2">
              <b-form-group
                label="Ön Birim Kod*"
              >
                <b-form-input type="text" v-model="form.unit1"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Terminal mi PC mi?">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="VisionPlus EFU Servisleri*">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="İşlem Günü">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3" lg="2">
              <b-form-group label="Durum">
                <v-select :options="form.drivers" @input="selectedDriver" label="title"></v-select>
              </b-form-group>
            </b-col>
            <b-col class="d-flex align-items-end" cols="12" md="3" lg="2">
              <b-form-group>
                <b-button class="mt-2" variant="success" size="sm"><i class="fa fa-plus"></i> Ekle</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      form: {
        Code: '',
        Description1: '',
        branchType: '',
        driver: null,
        drivers: [
          {
            id: 1,
            title: 'Örnek 1'
          },
          {
            id: 2,
            title: 'Örnek 2'
          },
          {
            id: 3,
            title: 'Örnek 3'
          }
        ],
      }
    }
  },
  computed: {
    ...mapState([])
  },
  mounted () {
    this.$store.commit('bigLoaded', false)
  },
  methods: {
    save () {
      let createData = {
      }
      this.$store.dispatch('createData', {...this.query, info: createData})
    },
    selectedDriver (e) {
      this.form.driver = e.title
    },
  }
}
</script>
<style lang="sass">
</style>
