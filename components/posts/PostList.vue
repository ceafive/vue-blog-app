<template>
  <section class="posts-list">
    <PostPreview
      v-for="(post, index) in posts"
      :key="index"
      :id="post.id"
      :isAdmin="isAdmin"
      :title="post.title"
      :previewText="post.previewText"
      :thumbnail="post.thumbnail"
    />
  </section>
</template>

<script>
import PostPreview from "@/components/posts/PostPreview";
export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.posts-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>