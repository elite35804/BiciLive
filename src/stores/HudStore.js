import { observable, action } from 'mobx';

class HudStore {
    @observable isVisible = false;
    @observable message = undefined;

    @action.bound
    show(message){
        this.isVisible = true;
        this.message = message;
    }

    @action.bound
    hide(){
        this.isVisible = false;
        this.message = undefined;
    }
}

export default HudStore;
