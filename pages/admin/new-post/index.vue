<template>
  <div class="admin-new-post-page">
    <AdminPostForm @submit="onSubmitted" />
  </div>
</template>

<script>
import AdminPostForm from "@/components/admin/AdminPostForm";
export default {
  name: "AdminNewPostPage",
  layout: "admin",
  middleware: ["check-auth", "auth"],
  components: {
    AdminPostForm
  },
  methods: {
    onSubmitted(newPost) {
      const createdPost = {
        ...newPost,
        updatedDate: new Date().toString()
      };
      this.$store.dispatch("addPost", createdPost).then(() => {
        this.$router.push("/admin");
      });
    }
  }
};
</script>

<style >
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>