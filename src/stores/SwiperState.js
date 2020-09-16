import {observable, action} from 'mobx';

class SwiperState {
  @observable position = 0;
  @action.bound
  setPosition = (p) => {
    this.position = p
  }
}

export default SwiperState
