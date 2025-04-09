<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const book = ref(null)

onMounted(async () => {
    const res = await fetch(`http://localhost:3000/books/${route.params.id}`)
    book.value = await res.json()
})
</script>

<template>
    <div class="nav-link-block">
        <router-link to="/books" class="nav-link"> ← Go back to List</router-link>
    </div>
    <section v-if="book" class="book-detail-section">
        <div class="book-detail-container">
            <img :src="book.coverUri" :alt="book.title" class="book-detail-cover" />
            <div class="book-detail-info">
                <h2 class="book-title">{{ book.title }}</h2>
                <p class="book-author">
                    <strong>Auteur :</strong> {{ book.author.firstName }} {{ book.author.lastName }}
                </p>
                <p class="book-publication-date"><strong>Date de publication:</strong> {{ book.publicationYear }}</p>
                <p class="book-genre"><strong>Genre:</strong> {{ book.genre }}</p>
                <p class="book-original-title"><strong>Titre original:</strong> {{ book.originalTitle }}</p>
                <p class="book-description"><strong>Synopsis: </strong>{{ book.recap }}</p>


            </div>
        </div>
    </section>

    <div v-else class="loading">Chargement...</div>
</template>

<style scoped>
.book-detail-section {
    max-width: 900px;
    margin: 3rem auto;
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.book-detail-container {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    align-items: flex-start;
}

.book-detail-cover {
    width: 200px;
    height: auto;
    border-radius: 6px;
    object-fit: cover;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.book-detail-info {
    flex: 1;
}

.book-title {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.book-author {
    font-size: 1.1rem;
    /* margin-bottom: 1rem; */
}

.book-description {
    font-size: 1rem;
    line-height: 1.5;
}

.loading {
    text-align: center;
    margin: 4rem auto;
    font-size: 1.2rem;
}

.nav-link {
    text-decoration: none;
    color: var(--primary-color);
    padding: 10px;
}

.nav-link-block {
    display: flex;
}
</style>
