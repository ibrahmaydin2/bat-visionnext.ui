<template>
  <Nextgrid :and-conditional-model="{CashCardTypeIds: [1,2,3,4,5,6,7,8,9,10,11] }" apiurl="VisionNextFinance/api/CashCard/Search" :OrderByColumns="[{column: 'DocumentDate',orderByType: 0}, {column: 'RecordId',orderByType: 0}]" />
</template>
