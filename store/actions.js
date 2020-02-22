import axios from 'axios';
import cookie from 'js-cookie';

export default {
  //initialize SSR of posts from Firebase to store
  async nuxtServerInit({ commit }) {
    try {
      const res = await axios.get("https://nuxt-web-blog.firebaseio.com/posts.json")
      const postArray = []
      for (const key in res.data) {
        postArray.push({ ...res.data[key], id: key })
      }
      commit('SET_POSTS', postArray)
    } catch (e) {
      console.log(e.response)
    }
  },
  //add newPost from Firebase to store
  async addPost({ commit, state }, createdPost) {
    try {
      const res = await axios.post("https://nuxt-web-blog.firebaseio.com/posts.json?auth=" + state.token, createdPost)
      commit("ADD_POST", { ...createdPost, id: res.data.name })
    } catch (e) {
      console.log(e.response)
    }
  },
  //add editedPost from Firebase to store
  async editPost({ commit, state }, editedPost) {
    try {
      const res = await axios.put("https://nuxt-web-blog.firebaseio.com/posts/" + editedPost[1] + ".json?auth=" + state.token, { ...editedPost[0], updatedDate: new Date().toString() })
      commit("EDIT_POST", res.data)
    } catch (e) {
      console.log(e)
    }
  },


  /**USER AUTHENTICATION AND LOGOUT */
  //autheticate user using Firebase API 
  async authUser({ commit }, authData) {
    let authURl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      process.env.firebaseKEY;
    if (!authData[1]) {
      authURl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        process.env.firebaseKEY;
    }
    try {
      const res = await axios.post(authURl, { ...authData[0] });
      commit("SET_TOKEN", res.data.idToken);
      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(res.data.expiresIn) * 1000);
      cookie.set('jwt', res.data.idToken)
      cookie.set('expirationDate', new Date().getTime() + Number.parseInt(res.data.expiresIn) * 1000)
      return await axios.post('http://localhost:3000/api/track-data', {
        data: "I have connected"
      })
    } catch (e) {
      console.log(e.response);
    }
  },
  //clear user session and token
  setLogoutTimer({ commit }, duration) {
    setTimeout(() => {
      commit('CLEAR_TOKEN')
    }, duration)
  },
  //Initialize Authentication
  initAuth({ commit, dispatch }, req) {
    let token;
    let expirationDate;
    if (req) {
      if (!req.headers.cookie) {
        return
      }
      const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith("jwt="))
      if (!jwtCookie) {
        return
      }
      token = jwtCookie.split('=')[1];
      expirationDate = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith("expirationDate="))
        .split("=")[1]
    } else {
      token = localStorage.getItem('token')
      expirationDate = localStorage.getItem('tokenExpiration')
    }
    if (new Date().getTime() > +expirationDate || !token) {
      dispatch("logOut")
      return;
    }
    commit('SET_TOKEN', token)
  },
  //user logout
  logOut({ commit }) {
    commit("CLEAR_TOKEN")
    cookie.remove('jwt')
    cookie.remove('expirationDate')
    if (process.client) {
      localStorage.removeItem("token")
      localStorage.removeItem("tokenExpiration")
    }
  }
}