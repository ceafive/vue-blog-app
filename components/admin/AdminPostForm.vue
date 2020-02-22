<template>
  <section class="new-post-form">
    <form @submit.prevent="onSave">
      <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>
      <AppControlInput v-model="editedPost.title">Title</AppControlInput>
      <AppControlInput v-model="editedPost.thumbnail">Thumbnail Link</AppControlInput>
      <AppControlInput control-type="textarea" v-model="editedPost.content">Content</AppControlInput>
      <AppButton type="submit">Save</AppButton>
      <AppButton type="button" style="margin-left: 10px" btn-style="cancel" @click="onCancel">Cancel</AppButton>
    </form>
  </section>
</template>

<script>
export default {
  props: ["post"],
  data() {
    return {
      editedPost: this.post
        ? { ...this.post }
        : {
            author: "",
            title: "",
            thumbnail: "",
            previewText: "",
            content: ""
          }
    };
  },
  methods: {
    onSave() {
      const content =
        this.editedPost.content
          .trim()
          .split(" ")
          .slice(0, 8)
          .join(" ") + " ...";
      this.editedPost.previewText = content;
      this.$emit("submit", this.editedPost);
    },
    onCancel() {
      this.$router.push("/admin");
    }
  }
};
</script>