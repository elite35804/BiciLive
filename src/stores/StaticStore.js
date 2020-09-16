import {observable, action} from 'mobx';
import axios from 'axios';
import config from '../config/Config';
import {AsyncStorage} from 'react-native';

class StaticStore {
  @observable data = {};
  @action
  getData = async () => {
    console.log('get_static_data');
    const userData = await AsyncStorage.getItem('biciliveUser');
    const headers = userData !== null ? {Authorization : `Bearer ${userData}`} : {};
    try {
      const response = await axios.get(`${config.server}/api/v1/get_statics`, headers);
      console.log('Static data =====================');
      this.data = response.data;
    } catch (e) {
      console.log('e: ', e);
    }
  }

}

export default StaticStore
