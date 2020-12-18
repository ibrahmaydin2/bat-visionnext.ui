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
              <b-button size="sm" variant="outline-danger">{{$t('header.cancel')}}</b-button>
            </router-link>
            <b-button @click="save()" id="submitButton" size="sm" variant="success">{{$t('header.save')}}</b-button>
          </b-col>
        </b-row>
      </header>
    </b-col>
    <b-col cols="12" class="asc__insertPage-content-head">
      <pre v-if="developmentMode" class="asc__codeHTML">
        <span v-for="(codeInCode, i) in insertHTML" :key="'codeInCode' + i">
          {{codeInCode}}
        </span>
      </pre>
      <section>
        <b-row class="mb-5 pb-5">

         <b-col v-if="insertVisible.RegDistrict != null ? insertVisible.RegDistrict : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.RegDistrict" :class="{ 'form-group--error': $v.form.RegDistrict.$error }">
                  <b-form-input type="text" v-model="form.RegDistrict" :readonly="insertReadonly.RegDistrict" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.RegSerialNumber != null ? insertVisible.RegSerialNumber : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.RegSerialNumber" :class="{ 'form-group--error': $v.form.RegSerialNumber.$error }">
                  <b-form-input type="text" v-model="form.RegSerialNumber" :readonly="insertReadonly.RegSerialNumber" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.PrimarySchool != null ? insertVisible.PrimarySchool : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.PrimarySchool" :class="{ 'form-group--error': $v.form.PrimarySchool.$error }">
                  <b-form-input type="text" v-model="form.PrimarySchool" :readonly="insertReadonly.PrimarySchool" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.PsStartDate != null ? insertVisible.PsStartDate : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.PsStartDate" :class="{ 'form-group--error': $v.form.PsStartDate.$error }">
                  <b-form-datepicker v-model="form.PsStartDate" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.PsEndDate != null ? insertVisible.PsEndDate : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.PsEndDate" :class="{ 'form-group--error': $v.form.PsEndDate.$error }">
                  <b-form-datepicker v-model="form.PsEndDate" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.SecondarySchool != null ? insertVisible.SecondarySchool : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.SecondarySchool" :class="{ 'form-group--error': $v.form.SecondarySchool.$error }">
                  <b-form-input type="text" v-model="form.SecondarySchool" :readonly="insertReadonly.SecondarySchool" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.SsStartDate != null ? insertVisible.SsStartDate : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.SsStartDate" :class="{ 'form-group--error': $v.form.SsStartDate.$error }">
                  <b-form-datepicker v-model="form.SsStartDate" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.SsEndDate != null ? insertVisible.SsEndDate : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.SsEndDate" :class="{ 'form-group--error': $v.form.SsEndDate.$error }">
                  <b-form-datepicker v-model="form.SsEndDate" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.HighSchool != null ? insertVisible.HighSchool : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.HighSchool" :class="{ 'form-group--error': $v.form.HighSchool.$error }">
                  <b-form-input type="text" v-model="form.HighSchool" :readonly="insertReadonly.HighSchool" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.HsStartDate != null ? insertVisible.HsStartDate : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.HsStartDate" :class="{ 'form-group--error': $v.form.HsStartDate.$error }">
                  <b-form-datepicker v-model="form.HsStartDate" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.HsEndDate != null ? insertVisible.HsEndDate : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.HsEndDate" :class="{ 'form-group--error': $v.form.HsEndDate.$error }">
                  <b-form-datepicker v-model="form.HsEndDate" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Collage != null ? insertVisible.Collage : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Collage" :class="{ 'form-group--error': $v.form.Collage.$error }">
                  <b-form-input type="text" v-model="form.Collage" :readonly="insertReadonly.Collage" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.ClStartDate != null ? insertVisible.ClStartDate : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.ClStartDate" :class="{ 'form-group--error': $v.form.ClStartDate.$error }">
                  <b-form-datepicker v-model="form.ClStartDate" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.ClEndDate != null ? insertVisible.ClEndDate : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.ClEndDate" :class="{ 'form-group--error': $v.form.ClEndDate.$error }">
                  <b-form-datepicker v-model="form.ClEndDate" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Master != null ? insertVisible.Master : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Master" :class="{ 'form-group--error': $v.form.Master.$error }">
                  <b-form-input type="text" v-model="form.Master" :readonly="insertReadonly.Master" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.MsStartDate != null ? insertVisible.MsStartDate : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.MsStartDate" :class="{ 'form-group--error': $v.form.MsStartDate.$error }">
                  <b-form-datepicker v-model="form.MsStartDate" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.MsEndDate != null ? insertVisible.MsEndDate : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.MsEndDate" :class="{ 'form-group--error': $v.form.MsEndDate.$error }">
                  <b-form-datepicker v-model="form.MsEndDate" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Phd != null ? insertVisible.Phd : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Phd" :class="{ 'form-group--error': $v.form.Phd.$error }">
                  <b-form-input type="text" v-model="form.Phd" :readonly="insertReadonly.Phd" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.PhdStartDate != null ? insertVisible.PhdStartDate : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.PhdStartDate" :class="{ 'form-group--error': $v.form.PhdStartDate.$error }">
                  <b-form-datepicker v-model="form.PhdStartDate" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.PhdEndDate != null ? insertVisible.PhdEndDate : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.PhdEndDate" :class="{ 'form-group--error': $v.form.PhdEndDate.$error }">
                  <b-form-datepicker v-model="form.PhdEndDate" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.BankDef != null ? insertVisible.BankDef : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.BankDef" :class="{ 'form-group--error': $v.form.BankDef.$error }">
                  <b-form-input type="text" v-model="form.BankDef" :readonly="insertReadonly.BankDef" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.BankAccount != null ? insertVisible.BankAccount : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.BankAccount" :class="{ 'form-group--error': $v.form.BankAccount.$error }">
                  <b-form-input type="text" v-model="form.BankAccount" :readonly="insertReadonly.BankAccount" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.BonusTypeId != null ? insertVisible.BonusTypeId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.BonusTypeId" :class="{ 'form-group--error': $v.form.BonusTypeId.$error }">
                  <b-form-input type="text" v-model="form.BonusTypeId" :readonly="insertReadonly.BonusTypeId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.IsTeam != null ? insertVisible.IsTeam : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.IsTeam" :class="{ 'form-group--error': $v.form.IsTeam.$error }">
                  <b-form-input type="text" v-model="form.IsTeam" :readonly="insertReadonly.IsTeam" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.CustomerId != null ? insertVisible.CustomerId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.CustomerId" :class="{ 'form-group--error': $v.form.CustomerId.$error }">
                  <b-form-input type="text" v-model="form.CustomerId" :readonly="insertReadonly.CustomerId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.PriceListCategoryId != null ? insertVisible.PriceListCategoryId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.PriceListCategoryId" :class="{ 'form-group--error': $v.form.PriceListCategoryId.$error }">
                  <b-form-input type="text" v-model="form.PriceListCategoryId" :readonly="insertReadonly.PriceListCategoryId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.CreateCustomerRecord != null ? insertVisible.CreateCustomerRecord : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.CreateCustomerRecord" :class="{ 'form-group--error': $v.form.CreateCustomerRecord.$error }">
                  <b-form-input type="text" v-model="form.CreateCustomerRecord" :readonly="insertReadonly.CreateCustomerRecord" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.FinanceCode1 != null ? insertVisible.FinanceCode1 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.FinanceCode1" :class="{ 'form-group--error': $v.form.FinanceCode1.$error }">
                  <b-form-input type="text" v-model="form.FinanceCode1" :readonly="insertReadonly.FinanceCode1" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.FinanceCode2 != null ? insertVisible.FinanceCode2 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.FinanceCode2" :class="{ 'form-group--error': $v.form.FinanceCode2.$error }">
                  <b-form-input type="text" v-model="form.FinanceCode2" :readonly="insertReadonly.FinanceCode2" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.UserGroupId != null ? insertVisible.UserGroupId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.UserGroupId" :class="{ 'form-group--error': $v.form.UserGroupId.$error }">
                  <b-form-input type="text" v-model="form.UserGroupId" :readonly="insertReadonly.UserGroupId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.EducationId != null ? insertVisible.EducationId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.EducationId" :class="{ 'form-group--error': $v.form.EducationId.$error }">
                  <v-select
                    v-model="form.EducationId"
                    :options="lookup.EDUCATION"
                    @input="selectedType('EducationId', form.EducationId)"
                    label="Label"
                  />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.DenimSize != null ? insertVisible.DenimSize : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.DenimSize" :class="{ 'form-group--error': $v.form.DenimSize.$error }">
                  <b-form-input type="text" v-model="form.DenimSize" :readonly="insertReadonly.DenimSize" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.CorduroySize != null ? insertVisible.CorduroySize : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.CorduroySize" :class="{ 'form-group--error': $v.form.CorduroySize.$error }">
                  <b-form-input type="text" v-model="form.CorduroySize" :readonly="insertReadonly.CorduroySize" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.ScoreCardClassId != null ? insertVisible.ScoreCardClassId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.ScoreCardClassId" :class="{ 'form-group--error': $v.form.ScoreCardClassId.$error }">
                  <b-form-input type="text" v-model="form.ScoreCardClassId" :readonly="insertReadonly.ScoreCardClassId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.UpperEmployeeId != null ? insertVisible.UpperEmployeeId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.UpperEmployeeId" :class="{ 'form-group--error': $v.form.UpperEmployeeId.$error }">
                  <b-form-input type="text" v-model="form.UpperEmployeeId" :readonly="insertReadonly.UpperEmployeeId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.HatSize != null ? insertVisible.HatSize : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.HatSize" :class="{ 'form-group--error': $v.form.HatSize.$error }">
                  <b-form-input type="text" v-model="form.HatSize" :readonly="insertReadonly.HatSize" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Height != null ? insertVisible.Height : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Height" :class="{ 'form-group--error': $v.form.Height.$error }">
                  <b-form-input type="text" v-model="form.Height" :readonly="insertReadonly.Height" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Weight != null ? insertVisible.Weight : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Weight" :class="{ 'form-group--error': $v.form.Weight.$error }">
                  <b-form-input type="text" v-model="form.Weight" :readonly="insertReadonly.Weight" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.DriverLicenceType != null ? insertVisible.DriverLicenceType : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.DriverLicenceType" :class="{ 'form-group--error': $v.form.DriverLicenceType.$error }">
                  <b-form-input type="text" v-model="form.DriverLicenceType" :readonly="insertReadonly.DriverLicenceType" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.DriverLicenceNumber != null ? insertVisible.DriverLicenceNumber : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.DriverLicenceNumber" :class="{ 'form-group--error': $v.form.DriverLicenceNumber.$error }">
                  <b-form-input type="text" v-model="form.DriverLicenceNumber" :readonly="insertReadonly.DriverLicenceNumber" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Genexp1 != null ? insertVisible.Genexp1 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Genexp1" :class="{ 'form-group--error': $v.form.Genexp1.$error }">
                  <b-form-input type="text" v-model="form.Genexp1" :readonly="insertReadonly.Genexp1" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Genexp2 != null ? insertVisible.Genexp2 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Genexp2" :class="{ 'form-group--error': $v.form.Genexp2.$error }">
                  <b-form-input type="text" v-model="form.Genexp2" :readonly="insertReadonly.Genexp2" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.IsRepresentative != null ? insertVisible.IsRepresentative : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.IsRepresentative" :class="{ 'form-group--error': $v.form.IsRepresentative.$error }">
                  <b-form-checkbox v-model="form.IsRepresentative" name="check-button">
                    {{(form.IsRepresentative) ? $t('insert.active'): $t('insert.passive')}}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.AssistantId != null ? insertVisible.AssistantId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.AssistantId" :class="{ 'form-group--error': $v.form.AssistantId.$error }">
                  <b-form-input type="text" v-model="form.AssistantId" :readonly="insertReadonly.AssistantId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.JobaddressId != null ? insertVisible.JobaddressId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.JobaddressId" :class="{ 'form-group--error': $v.form.JobaddressId.$error }">
                  <b-form-input type="text" v-model="form.JobaddressId" :readonly="insertReadonly.JobaddressId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.JobaddressDetail != null ? insertVisible.JobaddressDetail : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.JobaddressDetail" :class="{ 'form-group--error': $v.form.JobaddressDetail.$error }">
                  <b-form-input type="text" v-model="form.JobaddressDetail" :readonly="insertReadonly.JobaddressDetail" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.SpouseName != null ? insertVisible.SpouseName : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.SpouseName" :class="{ 'form-group--error': $v.form.SpouseName.$error }">
                  <b-form-input type="text" v-model="form.SpouseName" :readonly="insertReadonly.SpouseName" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.KidName1 != null ? insertVisible.KidName1 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.KidName1" :class="{ 'form-group--error': $v.form.KidName1.$error }">
                  <b-form-input type="text" v-model="form.KidName1" :readonly="insertReadonly.KidName1" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.KidName2 != null ? insertVisible.KidName2 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.KidName2" :class="{ 'form-group--error': $v.form.KidName2.$error }">
                  <b-form-input type="text" v-model="form.KidName2" :readonly="insertReadonly.KidName2" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.KidName3 != null ? insertVisible.KidName3 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.KidName3" :class="{ 'form-group--error': $v.form.KidName3.$error }">
                  <b-form-input type="text" v-model="form.KidName3" :readonly="insertReadonly.KidName3" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Anniversary != null ? insertVisible.Anniversary : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Anniversary" :class="{ 'form-group--error': $v.form.Anniversary.$error }">
                  <b-form-input type="text" v-model="form.Anniversary" :readonly="insertReadonly.Anniversary" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.FathersName != null ? insertVisible.FathersName : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.FathersName" :class="{ 'form-group--error': $v.form.FathersName.$error }">
                  <b-form-input type="text" v-model="form.FathersName" :readonly="insertReadonly.FathersName" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.MothersName != null ? insertVisible.MothersName : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.MothersName" :class="{ 'form-group--error': $v.form.MothersName.$error }">
                  <b-form-input type="text" v-model="form.MothersName" :readonly="insertReadonly.MothersName" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.PlaceOfBirth != null ? insertVisible.PlaceOfBirth : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.PlaceOfBirth" :class="{ 'form-group--error': $v.form.PlaceOfBirth.$error }">
                  <b-form-input type="text" v-model="form.PlaceOfBirth" :readonly="insertReadonly.PlaceOfBirth" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Religion != null ? insertVisible.Religion : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Religion" :class="{ 'form-group--error': $v.form.Religion.$error }">
                  <b-form-input type="text" v-model="form.Religion" :readonly="insertReadonly.Religion" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.BloodType != null ? insertVisible.BloodType : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.BloodType" :class="{ 'form-group--error': $v.form.BloodType.$error }">
                  <b-form-input type="text" v-model="form.BloodType" :readonly="insertReadonly.BloodType" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.RegCity != null ? insertVisible.RegCity : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.RegCity" :class="{ 'form-group--error': $v.form.RegCity.$error }">
                  <b-form-input type="text" v-model="form.RegCity" :readonly="insertReadonly.RegCity" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.RegCounty != null ? insertVisible.RegCounty : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.RegCounty" :class="{ 'form-group--error': $v.form.RegCounty.$error }">
                  <b-form-input type="text" v-model="form.RegCounty" :readonly="insertReadonly.RegCounty" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.RecordId != null ? insertVisible.RecordId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.RecordId" :class="{ 'form-group--error': $v.form.RecordId.$error }">
                  <b-form-input type="text" v-model="form.RecordId" :readonly="insertReadonly.RecordId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Code != null ? insertVisible.Code : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Code" :class="{ 'form-group--error': $v.form.Code.$error }">
                  <b-form-input type="text" v-model="form.Code" :readonly="insertReadonly.Code" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.CompanyId != null ? insertVisible.CompanyId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.CompanyId" :class="{ 'form-group--error': $v.form.CompanyId.$error }">
                  <b-form-input type="text" v-model="form.CompanyId" :readonly="insertReadonly.CompanyId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.BranchId != null ? insertVisible.BranchId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.BranchId" :class="{ 'form-group--error': $v.form.BranchId.$error }">
                  <b-form-input type="text" v-model="form.BranchId" :readonly="insertReadonly.BranchId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Description1 != null ? insertVisible.Description1 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Description1" :class="{ 'form-group--error': $v.form.Description1.$error }">
                  <b-form-textarea v-model="form.Description1" placeholder="" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.CreatedUser != null ? insertVisible.CreatedUser : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.CreatedUser" :class="{ 'form-group--error': $v.form.CreatedUser.$error }">
                  <b-form-input type="text" v-model="form.CreatedUser" :readonly="insertReadonly.CreatedUser" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.CreatedDateTime != null ? insertVisible.CreatedDateTime : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.CreatedDateTime" :class="{ 'form-group--error': $v.form.CreatedDateTime.$error }">
                  <b-form-datepicker v-model="form.CreatedDateTime" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.ModifiedUser != null ? insertVisible.ModifiedUser : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.ModifiedUser" :class="{ 'form-group--error': $v.form.ModifiedUser.$error }">
                  <b-form-input type="text" v-model="form.ModifiedUser" :readonly="insertReadonly.ModifiedUser" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.ModifiedDateTime != null ? insertVisible.ModifiedDateTime : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.ModifiedDateTime" :class="{ 'form-group--error': $v.form.ModifiedDateTime.$error }">
                  <b-form-datepicker v-model="form.ModifiedDateTime" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Deleted != null ? insertVisible.Deleted : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Deleted" :class="{ 'form-group--error': $v.form.Deleted.$error }">
                  <b-form-input type="text" v-model="form.Deleted" :readonly="insertReadonly.Deleted" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.System != null ? insertVisible.System : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.System" :class="{ 'form-group--error': $v.form.System.$error }">
                  <b-form-input type="text" v-model="form.System" :readonly="insertReadonly.System" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.EmploymentStartDate != null ? insertVisible.EmploymentStartDate : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.EmploymentStartDate" :class="{ 'form-group--error': $v.form.EmploymentStartDate.$error }">
                  <b-form-datepicker v-model="form.EmploymentStartDate" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.EmploymentEndDate != null ? insertVisible.EmploymentEndDate : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.EmploymentEndDate" :class="{ 'form-group--error': $v.form.EmploymentEndDate.$error }">
                  <b-form-datepicker v-model="form.EmploymentEndDate" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.RegisterNo != null ? insertVisible.RegisterNo : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.RegisterNo" :class="{ 'form-group--error': $v.form.RegisterNo.$error }">
                  <b-form-input type="text" v-model="form.RegisterNo" :readonly="insertReadonly.RegisterNo" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Name != null ? insertVisible.Name : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Name" :class="{ 'form-group--error': $v.form.Name.$error }">
                  <b-form-input type="text" v-model="form.Name" :readonly="insertReadonly.Name" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Surname != null ? insertVisible.Surname : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Surname" :class="{ 'form-group--error': $v.form.Surname.$error }">
                  <b-form-input type="text" v-model="form.Surname" :readonly="insertReadonly.Surname" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.TypeId != null ? insertVisible.TypeId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.TypeId" :class="{ 'form-group--error': $v.form.TypeId.$error }">
                  <b-form-input type="text" v-model="form.TypeId" :readonly="insertReadonly.TypeId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.GroupId != null ? insertVisible.GroupId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.GroupId" :class="{ 'form-group--error': $v.form.GroupId.$error }">
                  <b-form-input type="text" v-model="form.GroupId" :readonly="insertReadonly.GroupId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.StatusId != null ? insertVisible.StatusId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.StatusId" :class="{ 'form-group--error': $v.form.StatusId.$error }">
                  <b-form-checkbox v-model="form.StatusId" name="check-button" switch>
                    {{(form.StatusId) ? $t('insert.active'): $t('insert.passive')}}
                  </b-form-checkbox>
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Category1Id != null ? insertVisible.Category1Id : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Category1Id" :class="{ 'form-group--error': $v.form.Category1Id.$error }">
                  <b-form-input type="text" v-model="form.Category1Id" :readonly="insertReadonly.Category1Id" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Category2Id != null ? insertVisible.Category2Id : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Category2Id" :class="{ 'form-group--error': $v.form.Category2Id.$error }">
                  <b-form-input type="text" v-model="form.Category2Id" :readonly="insertReadonly.Category2Id" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Category3Id != null ? insertVisible.Category3Id : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Category3Id" :class="{ 'form-group--error': $v.form.Category3Id.$error }">
                  <b-form-input type="text" v-model="form.Category3Id" :readonly="insertReadonly.Category3Id" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Category4Id != null ? insertVisible.Category4Id : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Category4Id" :class="{ 'form-group--error': $v.form.Category4Id.$error }">
                  <b-form-input type="text" v-model="form.Category4Id" :readonly="insertReadonly.Category4Id" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Category5Id != null ? insertVisible.Category5Id : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Category5Id" :class="{ 'form-group--error': $v.form.Category5Id.$error }">
                  <b-form-input type="text" v-model="form.Category5Id" :readonly="insertReadonly.Category5Id" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Category6Id != null ? insertVisible.Category6Id : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Category6Id" :class="{ 'form-group--error': $v.form.Category6Id.$error }">
                  <b-form-input type="text" v-model="form.Category6Id" :readonly="insertReadonly.Category6Id" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Category7Id != null ? insertVisible.Category7Id : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Category7Id" :class="{ 'form-group--error': $v.form.Category7Id.$error }">
                  <b-form-input type="text" v-model="form.Category7Id" :readonly="insertReadonly.Category7Id" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Category8Id != null ? insertVisible.Category8Id : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Category8Id" :class="{ 'form-group--error': $v.form.Category8Id.$error }">
                  <b-form-input type="text" v-model="form.Category8Id" :readonly="insertReadonly.Category8Id" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Category9Id != null ? insertVisible.Category9Id : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Category9Id" :class="{ 'form-group--error': $v.form.Category9Id.$error }">
                  <b-form-input type="text" v-model="form.Category9Id" :readonly="insertReadonly.Category9Id" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Category10Id != null ? insertVisible.Category10Id : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Category10Id" :class="{ 'form-group--error': $v.form.Category10Id.$error }">
                  <b-form-input type="text" v-model="form.Category10Id" :readonly="insertReadonly.Category10Id" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Seniority != null ? insertVisible.Seniority : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Seniority" :class="{ 'form-group--error': $v.form.Seniority.$error }">
                  <b-form-input type="text" v-model="form.Seniority" :readonly="insertReadonly.Seniority" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.ProfessionId != null ? insertVisible.ProfessionId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.ProfessionId" :class="{ 'form-group--error': $v.form.ProfessionId.$error }">
                  <b-form-input type="text" v-model="form.ProfessionId" :readonly="insertReadonly.ProfessionId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.InsuranceStartDate != null ? insertVisible.InsuranceStartDate : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.InsuranceStartDate" :class="{ 'form-group--error': $v.form.InsuranceStartDate.$error }">
                  <b-form-datepicker v-model="form.InsuranceStartDate" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.InsuranceNumber != null ? insertVisible.InsuranceNumber : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.InsuranceNumber" :class="{ 'form-group--error': $v.form.InsuranceNumber.$error }">
                  <b-form-input type="text" v-model="form.InsuranceNumber" :readonly="insertReadonly.InsuranceNumber" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.InsuranceRegCityId != null ? insertVisible.InsuranceRegCityId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.InsuranceRegCityId" :class="{ 'form-group--error': $v.form.InsuranceRegCityId.$error }">
                  <b-form-input type="text" v-model="form.InsuranceRegCityId" :readonly="insertReadonly.InsuranceRegCityId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.InsurancePayCityId != null ? insertVisible.InsurancePayCityId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.InsurancePayCityId" :class="{ 'form-group--error': $v.form.InsurancePayCityId.$error }">
                  <b-form-input type="text" v-model="form.InsurancePayCityId" :readonly="insertReadonly.InsurancePayCityId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.DepartmentId != null ? insertVisible.DepartmentId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.DepartmentId" :class="{ 'form-group--error': $v.form.DepartmentId.$error }">
                  <b-form-input type="text" v-model="form.DepartmentId" :readonly="insertReadonly.DepartmentId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.ManagerId != null ? insertVisible.ManagerId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.ManagerId" :class="{ 'form-group--error': $v.form.ManagerId.$error }">
                  <b-form-input type="text" v-model="form.ManagerId" :readonly="insertReadonly.ManagerId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Telephone1 != null ? insertVisible.Telephone1 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Telephone1" :class="{ 'form-group--error': $v.form.Telephone1.$error }">
                  <b-form-input type="text" v-model="form.Telephone1" :readonly="insertReadonly.Telephone1" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Telephone2 != null ? insertVisible.Telephone2 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Telephone2" :class="{ 'form-group--error': $v.form.Telephone2.$error }">
                  <b-form-input type="text" v-model="form.Telephone2" :readonly="insertReadonly.Telephone2" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.GsmNumber != null ? insertVisible.GsmNumber : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.GsmNumber" :class="{ 'form-group--error': $v.form.GsmNumber.$error }">
                  <b-form-input type="text" v-model="form.GsmNumber" :readonly="insertReadonly.GsmNumber" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.FaxNumber != null ? insertVisible.FaxNumber : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.FaxNumber" :class="{ 'form-group--error': $v.form.FaxNumber.$error }">
                  <b-form-input type="text" v-model="form.FaxNumber" :readonly="insertReadonly.FaxNumber" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Email != null ? insertVisible.Email : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Email" :class="{ 'form-group--error': $v.form.Email.$error }">
                  <b-form-input type="text" v-model="form.Email" :readonly="insertReadonly.Email" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Other1 != null ? insertVisible.Other1 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Other1" :class="{ 'form-group--error': $v.form.Other1.$error }">
                  <b-form-input type="text" v-model="form.Other1" :readonly="insertReadonly.Other1" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Other2 != null ? insertVisible.Other2 : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Other2" :class="{ 'form-group--error': $v.form.Other2.$error }">
                  <b-form-input type="text" v-model="form.Other2" :readonly="insertReadonly.Other2" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.HomeaddressId != null ? insertVisible.HomeaddressId : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.HomeaddressId" :class="{ 'form-group--error': $v.form.HomeaddressId.$error }">
                  <b-form-input type="text" v-model="form.HomeaddressId" :readonly="insertReadonly.HomeaddressId" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.HomeaddressDetail != null ? insertVisible.HomeaddressDetail : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.HomeaddressDetail" :class="{ 'form-group--error': $v.form.HomeaddressDetail.$error }">
                  <b-form-input type="text" v-model="form.HomeaddressDetail" :readonly="insertReadonly.HomeaddressDetail" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.BirthDate != null ? insertVisible.BirthDate : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.BirthDate" :class="{ 'form-group--error': $v.form.BirthDate.$error }">
                  <b-form-datepicker v-model="form.BirthDate" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.TShirtSize != null ? insertVisible.TShirtSize : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.TShirtSize" :class="{ 'form-group--error': $v.form.TShirtSize.$error }">
                  <b-form-input type="text" v-model="form.TShirtSize" :readonly="insertReadonly.TShirtSize" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.JacketSize != null ? insertVisible.JacketSize : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.JacketSize" :class="{ 'form-group--error': $v.form.JacketSize.$error }">
                  <b-form-input type="text" v-model="form.JacketSize" :readonly="insertReadonly.JacketSize" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.MontSize != null ? insertVisible.MontSize : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.MontSize" :class="{ 'form-group--error': $v.form.MontSize.$error }">
                  <b-form-input type="text" v-model="form.MontSize" :readonly="insertReadonly.MontSize" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.OvercoatSize != null ? insertVisible.OvercoatSize : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.OvercoatSize" :class="{ 'form-group--error': $v.form.OvercoatSize.$error }">
                  <b-form-input type="text" v-model="form.OvercoatSize" :readonly="insertReadonly.OvercoatSize" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.ShoeSize != null ? insertVisible.ShoeSize : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.ShoeSize" :class="{ 'form-group--error': $v.form.ShoeSize.$error }">
                  <b-form-input type="text" v-model="form.ShoeSize" :readonly="insertReadonly.ShoeSize" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Group != null ? insertVisible.Group : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Group" :class="{ 'form-group--error': $v.form.Group.$error }">
                  <b-form-input type="text" v-model="form.Group" :readonly="insertReadonly.Group" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Type != null ? insertVisible.Type : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Type" :class="{ 'form-group--error': $v.form.Type.$error }">
                  <b-form-input type="text" v-model="form.Type" :readonly="insertReadonly.Type" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.RecordStatus != null ? insertVisible.RecordStatus : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.RecordStatus" :class="{ 'form-group--error': $v.form.RecordStatus.$error }">
                  <b-form-input type="text" v-model="form.RecordStatus" :readonly="insertReadonly.RecordStatus" />
                </b-form-group>
              </b-col>
       
         <b-col v-if="insertVisible.Status != null ? insertVisible.Status : developmentMode" cols="12" md="2">
                <b-form-group :label="insertTitle.Status" :class="{ 'form-group--error': $v.form.Status.$error }">
                  <b-form-input type="text" v-model="form.Status" :readonly="insertReadonly.Status" />
                </b-form-group>
              </b-col>
       
        </b-row>
      </section>
    </b-col>
  </b-row>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      form: {},
      routeName: this.$route.meta.baseLink
    }
  },
  computed: {
    ...mapState([
      'developmentMode',
      'insertHTML',
      'insertRules',
      'insertVisible',
      'insertTitle',
      'insertReadonly',
      'lookup',
      'createCode'
    ])
  },
  mounted () {
    this.$store.commit('bigLoaded', false)
    this.getInsertPage(this.routeName)
  },
  methods: {
    getInsertPage (e) {
      this.$store.dispatch('getInsertRules', {...this.query, api: e})
      this.$store.dispatch('getCreateCode', {...this.query, apiUrl: `VisionNext${e}/api/${e}/GetCode`})
    },
    selectedType (label, model) {
      this.form[label] = model.DecimalValue
    },
    save () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$store.commit('showAlert', { type: 'error', msg: 'Zorunlu alanları doldurun' })
      } else {
        this.$store.dispatch('createData', {...this.query, api: `VisionNext${this.routeName}/api/${this.routeName}`, formdata: this.form, return: this.routeName})
      }
    }
  },
  validations () {
    return {
      form: this.insertRules
    }
  },
  watch: {
    createCode (e) {
      if (e) {
        this.form.Code = e
      }
    }
  }
}
</script>
<style lang="sass">
</style>
