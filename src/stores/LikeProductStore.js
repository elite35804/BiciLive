import {observable, action} from 'mobx';
import axios from 'axios';
import config from '../config/Config';


class LikeProductStore {
  url = '/api/v1/dashboard/loved_products';
  data = {};
  errorIf = false;
  @observable isLoading = false;
  @action
  getData = (token) => {
    this.isLoading = true;
    try {
      return axios.get(
        config.server + this.url,
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
      }).catch((e) => {
        console.log('eeeeeee', e);
        this.errorIf = true;
      }).finally(() => {
        this.isLoading = false;
      });
    } catch (e) {
      console.log(e);
      this.errorIf = true;
      this.isLoading = false;
    }
  }
}

export default LikeProductStore
