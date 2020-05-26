import {observable, action} from 'mobx';
import axios from 'axios';

class HomeStore {
  @observable data = {};
  @observable position = 0;
  @action.bound
  getData = async () => {
    try {
      const response = await axios.get('http://biciapp.sepisolutions.com/api/v1/home');
      console.log(response.data, 'homeData =====================');
      this.data = response.data;
    } catch (e) {
      console.log('e: ', e);
    }
  }
  @action.bound
  setPosition = (p) => {
    this.position = p
  }
}

export default HomeStore;
