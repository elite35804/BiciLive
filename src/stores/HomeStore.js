import {observable, action} from 'mobx';
import axios from 'axios';
import analytics from '@react-native-firebase/analytics';
import config from '../config/Config';

class HomeStore {
  data = {};
  errorIf = false;
  url = '/api/v1/home';
  @observable position = 0;
  @observable isLoading = false;
  @action.bound
  getData = async () => {
    this.isLoading = true;
    try {
      const response = await axios.get(`${config.server}/api/v1/home`);
      console.log('homeData =====================');
      if (response.data.err_code === "ERR_OK") {
        this.data = response.data.content;
        this.errorIf = false;
        // analytics().logEvent('openApp',{
        //   url: 'http://biciapp.sepisolutions.com/api/v1/home',
        //   page_title: '/home'
        // }).then(res=>{
        //   console.log('result============', res);
        // })
        //   .catch(error => {
        //     console.log("---------------------------------------Error occured-------------------", error);
        //   });
      } else {
        this.errorIf = true;
      }
    } catch (e) {
      console.log('e: ', e);
      this.errorIf = true;
    } finally {
      this.isLoading = false;
    }
  };
  @action.bound
  setPosition = (p) => {
    this.position = p
  };
  @action
  clearData = () => {
    this.data = {};
  }
}

export default HomeStore;
