<template>
  <div>
    <table class="table table table-hover">
      <thead>
        <tr>
          <th>№</th>
          <th>Ім'я контакту</th>
          <th>Номер контакту</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.number }}</td>
          <td>
            <button @click="editItem(item)" class="btn btn-login py-2"
              style="margin-right: 10px; width: auto">Редагувати</button>
            <button @click="deleteItem(item.id)" class="btn btn-login py-2">Видалити</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../store/auth';

export default {
  data() {
    return {
      items: []
    };
  },
  computed: {
    userId() {
      return store.getters.currentUser?.id;
    }
  },
  methods: {
    loadData() {
      axios.get(`http://localhost:5173/api/contact/${this.userId}`)
        .then(response => {
          this.items = response.data;
        })
        .catch(error => {
          console.error("Ошибка при загрузке данных:", error);
        });
    },
    editItem(item) {
      this.$emit('edit-contact', item);
    },
    deleteItem(id) {
      axios.delete(`http://localhost:5173/api/contact/${id}`)
        .then(() => {
          this.items = this.items.filter(item => item.id !== id);
        })
        .catch(error => {
          console.error("Ошибка при удалении элемента:", error);
        });
    }
  },
  mounted() {
    this.loadData();
  }
}
</script>