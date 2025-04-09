<script setup>

</script>

<template>
    <section class="section-title">
        <h2>Welcome to my book library ~</h2>
        <div class="section-button">
            <router-link to="/admin/books" class="nav-link">You are an admin ? </router-link>
            <router-link to="/books" class="nav-link">Not an admin ? </router-link>
        </div>
    </section>
</template>

<style scoped>
.section-title {
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.section-button {
    display: flex;
    justify-content: space-evenly;
}

.nav-link {
    color: var(--primary-color)
}
</style>