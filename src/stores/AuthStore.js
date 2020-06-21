import {observable, action} from 'mobx';
import axios from 'axios';
import analytics from '@react-native-firebase/analytics';

class AuthStore{
  token : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImlzcyI6ImJpY2lsaXZlLml0In0.eyJ1aWQiOiIxIiwiZW1haWwiOiJhQGIuYyJ9.4SJz8le-RIzeuvDdZXUNpBqtE4MENz6vrA93wEhfqHhuALEsbxYF82bjQa1wq_h17EXw0axaVPHKGuCOo2donA';
  errorIf = false;
  url = 'http://biciapp.sepisolutions.com/api/v1/auth';
  registerUrl = 'http://biciapp.sepisolutions.com/api/v1/register';
  registerData = {
    email:'',
    password: '',
    nome: '',
    cognome : '',
    provincia: '',
    eta: '',
    sesso: '',
    privacy: 0,
    dem: 0
  };
  loginData = {
    user: '',
    pass: ''
  };
  err_string = '';
  next_page = '';
  @observable loginState = false;
  @observable isLoading = false;
  @action
  login = async (data = this.loginData) => {
    this.loginState = false;
    let bodyFormData = new FormData();
    for (let [key, value] of Object.entries(data)) {
      bodyFormData.append(key, value);
    }
    console.log('requestData =======', data);
    try {
      return axios({
        method: 'post',
        url: this.url,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
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
  register = () => {
    console.log('requestdata-======', this.registerData);
    let bodyFormData = new FormData();
    for (let [key, value] of Object.entries(this.registerData)) {
      bodyFormData.append(key, value);
    }
    try {
      return axios({
        method: 'post',
        url: this.registerUrl,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(response => {
          console.log('response========', response.data);
          if (response.data.err_code === "ERR_OK") {
            this.errorIf =  false
          } else {
            this.errorIf = true
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
  }
}

export default AuthStore;
