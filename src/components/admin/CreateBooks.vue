<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const title = ref('')
const description = ref('')
const coverUri = ref('')
const firstName = ref('')
const lastName = ref('')

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

    try {
        const res = await fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            const error = await res.json()
            console.error('Erreur API :', error)
            alert('Erreur lors de la création : ' + (error.message || 'inconnue'))
            return
        }

        alert('Livre créé avec succès !')
        router.push('/admin/books')
    } catch (err) {
        console.error('Erreur réseau :', err)
        alert('Erreur réseau : ' + err.message)
    }
}

</script>

<template>
    <router-link to="/admin/books" class="nav-link"> ← Go back to list</router-link>

    <section class="form-section">
        <h2>Créer un nouveau livre</h2>
        <form @submit.prevent="submit">
            <input v-model="title" placeholder="Titre" required />
            <input v-model="firstName" placeholder="Prénom auteur" required />
            <input v-model="lastName" placeholder="Nom auteur" required />
            <input v-model="coverUri" placeholder="Lien de l'image" required />
            <textarea v-model="description" placeholder="Description"></textarea>
            <button type="submit" class="btn">Créer</button>
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
    font-family: 'Athiti';
}

.btn {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 4px;
    cursor: pointer;
}
</style>