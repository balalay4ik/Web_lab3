<script setup>
import PopupAdd from '../components/Popup.vue'
import Table from '../components/TableContact.vue'
import store from '../store/auth';
import { ref } from 'vue'

const isPopupVisibleAdd = ref(false)

const table = ref(null)
const contactToEdit = ref({})
const userId = store.getters.currentUser?.id;

function openPopupAdd() {
  isPopupVisibleAdd.value = true
  
}

function loadData() {
  table.value.loadData()
}

function handleEditContact(item) {
  contactToEdit.value = item;
  isPopupVisibleAdd.value = true;
}

</script>

<template>
    <main class="page">
      <div class="container mt-5">

            <Table ref="table"
            @edit-contact="handleEditContact"
            ></Table>

            <div class="flex-wrap btn-block">
              <button type="button" @click="openPopupAdd" id="btn-add" class="btn btn-login py-2">Додати</button>
        </div>
      </div>
    </main>

    

    <PopupAdd
      @update-table="loadData"
      :is-visible="isPopupVisibleAdd"
      :contact="contactToEdit"
      :userId="userId"
      @close="isPopupVisibleAdd = false, contactToEdit = {}"
    />
</template>