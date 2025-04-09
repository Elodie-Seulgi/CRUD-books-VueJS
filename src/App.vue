<template>
  <nav class="nav-bar">
    <div>
      <span class="logo">My Books</span>
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/books" class="nav-link">List</router-link>
      <router-link to="/admin/books" class="nav-link">Admin</router-link>
    </div>
  </nav>

  <header class="main-header">
    <h1>My Books, an E-library</h1>
    <p>Find your favorite book in this E-library</p>
  </header>

  <main>
    <router-view />
  </main>

  <div class="before-footer">
  </div>

  <footer class="footer">
    <p>&copy; My book library 2025</p>
  </footer>
</template>

<style scoped>
.logo {
  font-weight: bold;
  font-size: 1.5rem;
  margin-right: 1rem;
  color: #ffffff;
}
</style>
