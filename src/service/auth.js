import RestClient from './base';
import * as config from "../config";

const AUTH_API_ROOT = config.SERVICE_API_URL + '/auth/';

export default {
    getVerifyCode: (phone) => RestClient.fetch(AUTH_API_ROOT + 'verify_code', {
        account: phone
    }),
    register: (phone, password, password_confirmation, verify_code) => {
        return RestClient.post(AUTH_API_ROOT + 'register', {
            account: phone,
            password, password_confirmation, verify_code
        });
    },
    getCodeForRecover: (phone) => RestClient.fetch(AUTH_API_ROOT + 'recover_password', {
        account: phone
    }),
    recoverPassword: (phone, password, password_confirmation, verify_code) => {
        return RestClient.post(AUTH_API_ROOT + 'recover_password', {
            account: phone,
            password, password_confirmation, verify_code
        });
    },
    login: (phone, password) => RestClient.post(AUTH_API_ROOT + 'login', {
        account: phone, password
    }),
    quickLogin: (phone, code) => RestClient.post(AUTH_API_ROOT + 'login', {
        account: phone, mode: 'code', verify_code: code
    }),
    refreshToken: (token) => RestClient.authFetch(AUTH_API_ROOT + 'refresh', token),
    logout: (token) => RestClient.authFetch(AUTH_API_ROOT + 'logout', token),
    getUser: (token) => RestClient.authFetch(AUTH_API_ROOT + 'current_user', token)
};