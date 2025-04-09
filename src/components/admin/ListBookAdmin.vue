<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const books = ref([])

async function fetchBooks() {
  const res = await fetch('http://localhost:3000/books')
  const data = await res.json()
  books.value = data.reverse() // ← les plus récents en haut
}

onMounted(fetchBooks)

const goToEdit = (id) => {
  router.push({ name: 'UpdateBook', params: { id } })
}
const goToCreate = () => {
  router.push({ name: 'CreateBook' })
}
</script>

<template>
  <router-link to="/" class="nav-link">← Go back to Home</router-link>
  <section class="admin-section">
    <div class="admin-header">
      <h2>Gestion des livres</h2>
      <button class="btn btn-ajout" @click="goToCreate">+ Ajouter un livre</button>
    </div>
    <table class="book-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Couverture</th>
          <th>Titre</th>
          <th>Auteur</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in books" :key="book._id">
          <td>{{ index + 1 }}</td>
          <td class="couverture">
            <img :src="book.coverUri" :alt="book.title" class="book-cover" />
          </td>
          <td>{{ book.title }}</td>
          <td>{{ book.author.firstName }} {{ book.author.lastName }}</td>
          <td>
            <button class="btn" @click="goToEdit(book._id)">Modifier</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.admin-section {
  max-width: 900px;
  margin: 2rem auto;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.book-table {
  width: 100%;
  border-collapse: collapse;
}

.book-table th,
.book-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #ccc;
}

.couverture {
  display: flex;
  justify-content: center;
}

.book-cover {
  height: 50px;
}

.btn {
  background-color: var(--fourth-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-ajout {
  background-color: var(--primary-color);
}

.nav-link {
  text-decoration: none;
  color: var(--primary-color);
  padding: 10px;
}
</style>
