import {observable, action} from 'mobx';
import axios from 'axios';

class HomeStore {
  @observable data = {};
  @action
  getData = async () => {
    try {
      const response = await axios.get('http://biciapp.sepisolutions.com/api/v1/home');
      console.log(response.data, 'homeData =====================');
      this.data = response.data;
    } catch (e) {
      console.log('e: ', e);
    }
  }
}

export default HomeStore;
