import { Module, ActionTree, MutationTree, GetterTree } from "vuex";
import { AuthState, Auth } from "../../types/auth";
import { RootState } from "../../types/rootstate";
import { axiosAuth, axiosRefresh } from '../../axios';
import router from "../../router"
import { AxiosResponse } from "axios";

const state: AuthState = {
    idToken : null
};
const getters: GetterTree<AuthState, RootState> = {
    idToken: state => state.idToken
};

const mutations: MutationTree<AuthState> = {
    updateIdToken(state, idToken) {
        state.idToken = idToken;
    }
};

const actions: ActionTree<AuthState, RootState> = {
    async autoLogin({commit, dispatch}){
        const idToken = localStorage.getItem('idToken')
        //もしidTokenがなかったら何もしない
        if (!idToken) return;
        const now = new Date()
        const expiryTimeMs = localStorage.getItem('expiryTimeMs')
        // 有効期限が切れているとき値を定める
        const isExpired = now.getTime() >= (+expiryTimeMs!);
        const refreshToken = localStorage.getItem('refreshToken');
        if (isExpired) {
          await dispatch('refreshIdToken', refreshToken);
        } else {
          //有効期限の残り時間を計算して、その時間経ったらrefreshTokenを発行させる処理
          const expiresInMs = +expiryTimeMs! - now.getTime();
          setTimeout(() => {
            dispatch('refreshIdToken', refreshToken);
          }, expiresInMs);
          commit('updateIdToken', idToken);
        }
      },
      login({dispatch}, authData: Auth){
        axiosAuth
        .post(
            '/accounts:signInWithPassword?key=AIzaSyB_4rHWZuPdElvwvC3jSCsjZr54H1_0fPg',
            {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }
        )
        .then((response: AxiosResponse)=>{
          dispatch('setAuthData', {
            idToken: response.data.idToken,
            expiresIn: response.data.expiresIn,
            refreshToken: response.data.refreshToken
          });
          router.push('/')
        }) 
      },
      logout({ commit }) {
        commit('updateIdToken', null);
        localStorage.removeItem('idToken');
        localStorage.removeItem('expiryTimeMs');
        localStorage.removeItem('refreshToken');
        router.replace('/login');
      },
      //トークンの有効期限後、リフレッシュトークンを返し、継続的に利用できるようにする関数
      async refreshIdToken({dispatch}, refreshToken){
        await axiosRefresh
        .post('/token?key=AIzaSyB_4rHWZuPdElvwvC3jSCsjZr54H1_0fPg',{
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
        .then((response: AxiosResponse) =>{
          dispatch('setAuthData', {
            idToken: response.data.id_token,
            expiresIn: response.data.expires_in,
            refreshToken: response.data.refresh_token
          });
        })
      },
      register({dispatch}, authData){
        axiosAuth
        .post(
          '/accounts:signUp?key=AIzaSyB_4rHWZuPdElvwvC3jSCsjZr54H1_0fPg',
            {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }
        )
        .then((response: AxiosResponse)=>{
          dispatch('setAuthData', {
            idToken: response.data.idToken,
            expiresIn: response.data.expiresIn,
            refreshToken: response.data.refreshToken
          });
        }) 
      },
      //ローカルステージに必要なデータを保存する処理
      setAuthData({ commit, dispatch }, authData) {
        const now = new Date();
        //有効期限が切れるときの値を設定
        const expiryTimeMs = now.getTime() + authData.expiresIn * 1000;
        commit('updateIdToken', authData.idToken);
        localStorage.setItem('idToken', authData.idToken);
        localStorage.setItem('expiryTimeMs', expiryTimeMs.toString());
        localStorage.setItem('refreshToken', authData.refreshToken);
        //トークンの有効期限後、リフレッシュトークンを返し、継続的に利用できるようにする処理
        setTimeout(() => {
          dispatch('refreshIdToken', authData.refreshToken);
        }, authData.expiresIn * 1000);
      }
}

export const AuthModule: Module<AuthState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};