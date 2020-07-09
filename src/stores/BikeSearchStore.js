import {observable, action} from 'mobx';
import axios from 'axios';
import config from '../config/Config';

class BikeSearchStore {
  requestData = {};
  data = [];
  extraData = [];
  listData = [];
  errorIf = false;
  referer = '/api/v1/get_statics';
  @observable isLoading = false;
  @action
  setRequest = (key, data) => {
    this.requestData[key] = data;
    console.log('=======', this.requestData);
  };
  @action
  removeRequest = key => {
    delete this.requestData[key]
    console.log('=======', this.requestData);
  };
  @action
  clearRequest = () => {
    this.requestData = {};
  };
  @action
  getData =  (url) => {
    const data = Object.entries(this.requestData).length ? this.requestData : {filter :null};
    console.log('requestdata=====', data);
    this.isLoading = true;
    let bodyFormData = new FormData();
    for (let [key, value] of Object.entries(data)) {
      bodyFormData.append(key, value);
    }
    try {
      axios({
        method: 'post',
        url: url,
        data: bodyFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Referer': this.referer
        },
      })
        .then(response => {
          if (response.data.err_code === 'ERR_OK') {
            this.data = response.data.content;
            const temp1 = [], temp2 = [];
            let id = 0;
            this.data.map(item => {
              if (item.id === "BIKE_RESUME_BIG" || item.id === "BIKE_RESUME_SMALL") {
                id++;
                item.keyId = id;
                temp1.push(item);
              } else {
                temp2.push(item);
              }
            });
            temp1.sort((a,b) => {
              if (a.prezzo === "€ n.d.") return 1;
              if (b.prezzo === "€ n.d.") return -1;
              return (a.prezzo > b.prezzo) ? -1 : 1
            })
            this.listData = temp1;
            this.extraData = temp2;
            this.errorIf = false;
          } else {
            this.errorIf = true;
          }
        })
        .catch(e => {
          console.log('error:', e);
          this.errorIf = true;
        })
        .finally(() => {
          this.requestData = {};
          this.isLoading = false;
        });
    } catch (e) {
      console.log('e: ', e);
      this.errorIf = true;
    } finally {
      this.requestData = {};
    }
  };
  @action
  clearResult = () => {
    this.data = {};
  }
}

export default BikeSearchStore;
