<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const title = ref('')
const description = ref('')
const coverUri = ref('')
const firstName = ref('')
const lastName = ref('')

const bookId = route.params.id

onMounted(async () => {
    const res = await fetch(`http://localhost:3000/books/${bookId}`)
    const data = await res.json()

    title.value = data.title
    description.value = data.description
    coverUri.value = data.coverUri
    firstName.value = data.author.firstName
    lastName.value = data.author.lastName
})

const submit = async () => {
    const payload = {
        title: title.value,
        description: description.value,
        coverUri: coverUri.value,
        author: {
            firstName: firstName.value,
            lastName: lastName.value
        }
    }

    await fetch(`http://localhost:3000/books/${bookId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    router.push('/admin/books')
}

const deleteBook = async () => {
    const confirmed = confirm("Es-tu sûr de vouloir supprimer ce livre ?")
    if (!confirmed) return

    await fetch(`http://localhost:3000/books/${bookId}`, {
        method: 'DELETE'
    })

    router.push('/admin/books')
}
</script>

<template>
    <section class="form-section">
        <div class="block-title-button">
            <h2>Modifier le livre</h2>
            <button type="button" class="btn btn-delete" @click="deleteBook"><img src="../../assets/images/effacer.png"
                    alt="effacer" class="bouton-effacer"></button>
        </div>
        <form @submit.prevent="submit">
            <input v-model="title" placeholder="Titre" required />
            <input v-model="firstName" placeholder="Prénom auteur" required />
            <input v-model="lastName" placeholder="Nom auteur" required />
            <input v-model="coverUri" placeholder="Lien de l'image" required />
            <textarea v-model="description" placeholder="Description"></textarea>
            <button type="submit" class="btn">Mettre à jour</button>
        </form>
    </section>
</template>

<style scoped>
.form-section {
    max-width: 700px;
    margin: 2rem auto;
    background: white;
    padding: 2rem;
    border-radius: 8px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

input,
textarea {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 4px;
    cursor: pointer;
}

.btn-delete {
    background-color: white;
    padding: 0;
}

.bouton-effacer {
    width: 1.7rem;
    margin: 0;

}

.block-title-button {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
    padding: 0;
}
</style>
