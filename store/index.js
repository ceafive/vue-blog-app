export const state = () => {
  return {
    loadedPosts: [],
    token: null
  }
}

export const mutations = {
  SET_POSTS(state, posts) {
    state.loadedPosts = posts
  },
  ADD_POST(state, newPost) {
    state.loadedPosts.push(newPost)
  },
  EDIT_POST(state, editedPost) {
    const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id)
    state.loadedPosts[postIndex] = editedPost
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  CLEAR_TOKEN(state) {
    state.token = null
  }
}

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts
  },
  isAuthenticated(state) {
    return state.token != null
  }
}

