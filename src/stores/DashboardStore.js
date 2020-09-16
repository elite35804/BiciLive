import {observable, action} from 'mobx';
import axios from 'axios';
import config from '../config/Config';
import analytics from '@react-native-firebase/analytics';


class DashboardStore {
  url = {
    account: '/api/v1/dashboard/account',
    brand: '/api/v1/dashboard/loved_brands',
    product: '/api/v1/dashboard/loved_products'
  };
  data = {};
  errorIf = false;
  @observable isLoading = false;
  @action
  getData = (type, token) => {
    this.isLoading = true;
    try {
      return axios.get(
        config.server + this.url[type],
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

export default DashboardStore
