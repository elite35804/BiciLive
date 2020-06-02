import {observable, action} from 'mobx';
import axios from 'axios';

class StaticStore {
  @observable data = {};
  @action
  getData = async () => {
    console.log('get_static_data');
    try {
      const response = await axios.get('http://biciapp.sepisolutions.com/api/v1/get_statics');
      console.log('Static data =====================');
      this.data = response.data;
    } catch (e) {
      console.log('e: ', e);
    }
  }

}

export default StaticStore
