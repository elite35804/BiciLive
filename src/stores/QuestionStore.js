import {observable, action} from 'mobx';
import axios from 'axios';
import analytics from '@react-native-firebase/analytics';

class QuestionStore {
  data = [];
  errorIf = false;
  requestData = {};
  url = 'http://biciapp.sepisolutions.com/api/v1/onboard_survey'
  @observable isLoading = false;
  @action
  getData = (token) => {
    this.isLoading = true;
    try {
      return axios.get(
        this.url,
        {
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        }
      ).then(res => {
        console.log('======', res.data);
        if (res.data.err_code === "ERR_OK") {
          this.data = res.data.content;
          this.errorIf = false;
        }
      }).catch(() => {
        this.errorIf = true;
      }).finally(() => {
        this.isLoading = false;
      });
    } catch (e) {
      console.log(e);
      this.errorIf = true;
      this.isLoading = false;
    }
  };
  @action
  setRequest = (key, value) => {
    this.requestData[key] = value;
    // console.log('key, value====', key, value, this.requestData);
  }
  @action
  submit = (token) => {
    console.log('reqeustdata ======', this.requestData)
    let bodyFormData = new FormData();
    for (let [key, value] of Object.entries(this.requestData)) {
      if (typeof value === 'object') {
        value.forEach(item => {
          bodyFormData.append(`${key}[]`, item);
        })
      } else {
        bodyFormData.append(key, value);
      }

    }
    console.log('formdata=========', bodyFormData);
    try {
      return axios({
        method: 'post',
        url: this.url,
        data: bodyFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization' : `Bearer ${token}`
        },
      })
        .then(response => {
          console.log('response========', response.data);
          this.errorIf = response.data.err_code !== 'ERR_OK';
          if (response.data.err_code === 'ERR_OK') {
          } else {
          }
        })
        .catch(e => {
          console.log('error==:', e);
        })
    } catch (e) {
      console.log('e==: ', e);
    }
  //
  //   try {
  //     return fetch(this.url, {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         'Authorization' : `Bearer ${token}`
  //       },
  //       body: JSON.stringify(bodyFormData)
  //     })
  //       .then(res => {
  //         console.log('res=========', res);
  //       })
  //       .catch(e => {
  //         console.log('rejected======', e)
  //       })
  //     ;
  //   } catch (e) {
  //     console.log('error======', e);
  //   }
  }
}

export default QuestionStore
