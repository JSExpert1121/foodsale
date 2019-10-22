const people = [
  { name: 'Nader', age: 36 },
  { name: 'Amanda', age: 24 },
  { name: 'Jason', age: 44 }
]
import * as config from "./config";
import axios from 'axios'

function requestVerificationCode(num){
  
  return fetch(config.SERVICE_API_URL+'/auth/verify_code?account='+num, {
    method: "GET",
    headers:{
      'Accept':'application/json',
      'Conent-Type':'application/x-www-form-urlencoded'
    }
  })
  .then(res => res.json())
  .then(resJson => {
    console.log(resJson)
    return resJson
  })
  .catch((err) => console.log(err))
  
}

function register(account,password,password_confirmation,verify_code){
  
  var params = {
     account:account,
     password:password,
     password_confirmation:password_confirmation,
     verify_code:verify_code
  }

  var formBody = [];
  for (var property in params) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(params[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(config.SERVICE_API_URL+'/auth/register', {
    method: 'POST',
    headers: {
      'accept':'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formBody
  })
  .then((res) => {
    console.log(res)
    return res.json()
  })
  .then((res) => {
    console.log(res)
    return res
  })
  .catch((err) => {
    console.log(err)
    return err
  })
}

function login(account,password){
  
  var params = {
     account:account,
     password:password,
  }

  var formBody = [];
  for (var property in params) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(params[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(config.SERVICE_API_URL+'/auth/login', {
    method: 'POST',
    headers: {
      'accept':'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formBody
  })
  .then((res) => {
    console.log(res)
    return res.json()
  })
  .then((res) => {
    console.log(res)
    return res
  })
  .catch((err) => {
    console.log(err)
    return err
  })
}

function logout(access_token){
  
  return fetch(config.SERVICE_API_URL+'/auth/logout', {
    method: "GET",
    headers:{
      'Accept':'application/json',
      'Conent-Type':'application/x-www-form-urlencoded',
      'Authorization': access_token
    }
  })
  .then(res => res.json())
  .then(resJson => {
    console.log(resJson)
    return resJson
  })
  .catch((err) => console.log(err))
}

function getCurrentUser(access_token){
  
  return fetch(config.SERVICE_API_URL+'/auth/current_user', {
    method: "GET",
    headers:{
      'Accept':'application/json',
      'Conent-Type':'application/x-www-form-urlencoded',
      'Authorization': access_token
    }
  })
  .then(res => res.json())
  .then(resJson => {
    console.log(resJson)
    return resJson
  })
  .catch((err) => console.log(err))
}

function recoverPassword(account){
  //account is phone_number
  return fetch(config.SERVICE_API_URL+'/auth/recover_password&account='+account, {
    method: "GET",
    headers:{
      'Accept':'application/json',
      'Conent-Type':'application/x-www-form-urlencoded',
    }
  })
  .then(res => {
    res.json()
  })
  .then(resJson => {
    console.log(resJson)
    return resJson
  })
  .catch(e => {
    console.log(e)
    return {"Error":"Call Api Error"}
  })
}

function updatePassword(account, password, password_confirmation, verify_code){
  var params = {
     account:account,
     password:password,
     password_confirmation:password_confirmation,
     verify_code: verify_code
  }

  var formBody = [];
  for (var property in params) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(params[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(config.SERVICE_API_URL+'/auth/recover_password', {
    method: 'POST',
    headers: {
      'accept':'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formBody
  })
  .then((res) => {
    console.log(res)
    return res.json()
  })
  .then((res) => {
    console.log(res)
    return res
  })
  .catch((err) => {
    console.log(err)
    return err
  })
}
/*
module.exports = {
  async fetchData(url, request, cb) {
    try {
      let response = await fetch(url, request);
      responseJson = await response.json()
      //cb(null,responseJson)
      return responseJson;
   
    } catch (error) {
      cb(error,null);
    }
  },
  middleware(url, request) {
    return fetch(url, request)
    .then(res => (res.json()))
    .then(res => {
      //console.log(res)
      return res
    }).catch(err => {
      console.log(err)
    })
  },
  baseApi(sub_url, method, json_data) {
    let request = {
      method,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    };
    if (method == "POST" || method == "PUT") {
      request["body"] = JSON.stringify(json_data);
    }else{
      
    }
    return this.middleware(config.SERVICE_API_URL + sub_url, request);
  },

  requestVerificationCode(num){
    var response = {}
    fetch(api.SERVICE_API_URL+`/auth/verify_code?account=${encodeURIComponent(num)}`, {
      method: "GET",
    }).then(res => res.json())
    .then(resJson => {
      response = resJson
      console.log(resJson)
    })
    return response //this.baseApi(`/auth/verify_code?a=32`, 'GET', {account:num})
  },
  login(user,password){
    var data = {
       account:user,
       password
    }
    return this.baseApi(`/api/auth/login`, 'POST', data)
  },
  register(account,password,password_confirmation,verify_code){
    var data = {
       account,
       password,
       password_confirmation,
       verify_code
    }
    return this.baseApi(`/api/auth/login`, 'POST', data)
  },  
  getStudentsData(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(people)
      }, 3000)
    })
  }
};
*/

export {
  requestVerificationCode,
  register,
  login,
  logout,
  getCurrentUser,
  recoverPassword,
  updatePassword,
}