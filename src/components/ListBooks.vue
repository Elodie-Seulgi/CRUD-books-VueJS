<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const apiUrl = 'http://localhost:3000/books'
const books = ref([])
const isLoading = ref(true)

async function fetchAllBooks() {
    const response = await fetch(apiUrl)
    const data = await response.json()
    isLoading.value = false
    books.value = data
    console.log('>> Données reçues :', data)
}

onBeforeMount(async () => {
    await fetchAllBooks()
})

const goToDetailsHandler = (bookId) => {
    router.push({
        name: 'DetailBooks',
        params: { id: bookId }
    })
}
</script>

<template>
    <router-link to="/" class="nav-link"> ← Go back to Home</router-link>
    <section class="book-list-section">
        <h2 class="section-title">Liste des livres</h2>

        <div v-if="isLoading" class="loading">Chargement des livres...</div>

        <table v-else class="book-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Titre</th>
                    <th>Auteur</th>
                    <th>Couverture</th>
                    <th>Détail</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(book, index) in books" :key="book._id">
                    <td class="book-index">{{ index + 1 }}</td>
                    <td>{{ book.title }}</td>
                    <td>{{ book.author.firstName }} {{ book.author.lastName }}</td>
                    <td>
                        <img :src="book.coverUri" :alt="book.title" class="book-cover" />
                    </td>
                    <td>
                        <button class="detail-btn" @click="goToDetailsHandler(book._id)">
                            Voir plus
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<style scoped>
.book-list-section {
    max-width: 1000px;
    margin: 3rem auto;
    padding: 1rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.book-index {
    font-weight: bold;
    color: var(--secondary-color);
    font-size: 1.5rem;
}

.section-title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #CEB5A7;
}

.loading {
    text-align: center;
    font-size: 1.2rem;
    padding: 2rem;
}

.book-table {
    width: 100%;
    border-collapse: collapse;
}

.book-table th,
.book-table td {
    padding: 1rem;
    border-bottom: 1px solid #ccc;
    text-align: left;
}

.book-cover {
    width: 50px;
    height: auto;
    border-radius: 4px;
}

.detail-btn {
    background-color: #8390aa;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.detail-btn:hover {
    background-color: #1e5fa6;
}

.nav-link {
    text-decoration: none;
    color: var(--primary-color);
    padding: 10px;
}
</style>
