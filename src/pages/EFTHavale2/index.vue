<template>
  <Nextgrid :and-conditional-model="{CashCardTypeIds: [12] }" apiurl="VisionNextFinance/api/CashCard/Search" :OrderByColumns="[{column: 'DocumentDate',orderByType: 0}, {column: 'RecordId',orderByType: 0}]" />
</template>
