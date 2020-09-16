import { observable, action } from 'mobx';

const Types = {
    info: 'info',
    success: 'success',
    warn: 'warn',
    error : 'error'
};

/**
 * [AlertStore InApp Alert Store]
 */
class AlertStore {
    @observable title = '';
    @observable message = '';
    @observable type = '';
    @observable visible = false;
    autoClose = true;

    @action.bound
    show(type, message, title){
        this.type = type;
        this.message = message;
        this.title = title;
        this.visible = true;
    }

    @action.bound
    hide(){
        console.log('hide alert')
        this.visible = false;
    }

    showError(message, title){
        this.show(Types.error, message, title);
    }

    showInfo(message, title){
        this.show(Types.info, message, title);
    }

    showWarn(message, title){
        this.show(Types.warn, message, title);
    }

    showSuccess(message, title, autoClose = true){
        this.autoClose = autoClose
        this.show(Types.success, message, title);
    }
}

export default AlertStore;
