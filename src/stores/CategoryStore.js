import {observable, action} from 'mobx';

class CategoryStore {
  @observable currentId = 4;
  @observable title = "";
  @observable color = "";
  @observable position = 0;
  @action.bound
  setId = (id, title, color) => {
    this.currentId = id;
    this.title = title;
    this.color = color;
  };
  @action.bound
  setPosition = (p) => {
    this.position = p
  }
}

export default CategoryStore

