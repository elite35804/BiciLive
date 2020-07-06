import {observable, action} from 'mobx';
import axios from 'axios';
import analytics from '@react-native-firebase/analytics';
import config from '../config/Config';

class AuthStore{
  token : '';
  errorIf = false;
  url = '/api/v1/auth';
  registerUrl = '/api/v1/register';
  forgottenPasswordUrl = '/api/v1/reset-password';
  registerData = {
    email:'',
    password: '',
    nome: '',
    cognome : '',
    provincia: '',
    eta: '',
    sesso: '',
    privacy: 0,
    dem: 0,
    terzi : 0
  };
  loginData = {
    user: '',
    pass: ''
  };
  err_string = '';
  next_page = '';
  referer = '';
  @observable loginState = false;
  @observable isLoading = false;
  @action
  login = async (data = this.loginData) => {
    console.log('login referer=======', this.referer);
    this.loginState = false;
    let bodyFormData = new FormData();
    for (let [key, value] of Object.entries(data)) {
      bodyFormData.append(key, value);
    }
    console.log('requestData =======', data, config.server + this.url);
    try {
      return axios({
        method: 'post',
        url: config.server + this.url,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data', 'Referer': this.referer},
      })
        .then(response => {
          console.log('response========', response.data);
          this.errorIf = response.data.err_code !== 'ERR_OK';
          if (response.data.err_code === 'ERR_OK') {
            this.token = response.data.token;
            this.loginState = true;
            if (response.data.next_page.includes('survey')) {
              this.next_page = 'survey';
            } else {
              this.next_page = 'home';
            }
          } else {
            this.err_string = response.data.err_string;
          }
        })
        .catch(e => {
          console.log('error==:', e);
          this.errorIf = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    } catch (e) {
      console.log('e==: ', e);
      this.errorIf = true;
    }
  };
  @action
  setParam = (key, value) => {
    this.registerData[key] = value;
    console.log('ke=====', this.registerData);
  };

  @action
  setLoginParam = (key, value) => {
    this.loginData[key] = value;
    // console.log('loginData=====', key, value, this.loginData);
  };

  @action
  clearRegisterParam = () => {
    this.registerData = {
      email:'',
      password: '',
      nome: '',
      cognome : '',
      provincia: '',
      eta: '',
      sesso: '',
      privacy: 0,
      dem: 0,
      terzi : 0
    };
  }

  @action
  register = () => {
    console.log('requestdata-======', this.registerData);
    console.log('register referer=======', this.referer);
    let bodyFormData = new FormData();
    for (let [key, value] of Object.entries(this.registerData)) {
      bodyFormData.append(key, value);
    }
    try {
      return axios({
        method: 'post',
        url: config.server + this.registerUrl,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data', 'Referer': this.referer},
      })
        .then(response => {
          // console.log('=======response=======================', response.data.err_code);
          if (response.data.err_code === "ERR_OK") {
            // console.log('after passworkd=====', response.data);
            this.errorIf =  false;
            this.err_string = response.data.err_string;
          } else {
            this.errorIf = true;
            this.err_string = response.data.err_string;
          }
        })
        .catch(e => {
          console.log('error:', e);
          this.errorIf = true
        })
    } catch (e) {
      console.log('e: ', e);
      this.errorIf = true;
    }
  };

  @action
  passwordResetRequest = email => {
    const data = {email: email};
    console.log('datadata======', data);
    let bodyFormData = new FormData();
    for (let [key, value] of Object.entries(data)) {
      bodyFormData.append(key, value);
    }
    try {
      return axios({
        method: 'post',
        url: config.server + this.forgottenPasswordUrl,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(response => {
          console.log('response========', response.data);
          this.errorIf = response.data.err_code !== "ERR_OK";
          this.err_string = response.data.err_string;
        })
        .catch(e => {
          console.log('error:', e);
          this.errorIf = true
        })
    } catch (e) {
      console.log('e: ', e);
      this.errorIf = true;
    }
  };
  @action
  logout = () => {
    this.loginState = false;
    this.token = undefined;
  };
}

export default AuthStore;
