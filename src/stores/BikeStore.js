import {observable, action} from 'mobx';
import axios from 'axios';
import analytics from '@react-native-firebase/analytics';
import config from '../config/Config';

class BikeStore {
  data = [];
  errorIf = false;
  url = '';
  @observable isLoading = false;
  @observable isLike = false;
  @action
  getData = async (url, referer='', token = '') => {
    console.log('bike referereree=====', config.server+url, token);
    this.url = url;
    this.isLoading = true;
    if (token === '' || token === undefined) {
      try {
        const response = await axios.get
        (config.server+url, {
            headers: {
              'Referer': referer,
            }
          }
        );
        if (response.data.err_code === "ERR_OK") {
          this.data = response.data.content;
          this.errorIf = false;
          referer === '' || this.track(url);
        } else {
          this.errorIf = true;
          console.log('erroror=====')
        }
      } catch (e) {
        console.log('e====: ', e);
        this.errorIf = true;
      } finally {
        this.isLoading = false;
      }
    } else {
      try {
        const response = await axios.get
        (config.server+url, {
            headers: {
              'Referer': referer,
              'Authorization' : `Bearer ${token}`
            }
          }
        );
        if (response.data.err_code === "ERR_OK") {
          this.data = response.data.content;
          this.errorIf = false;
          referer === '' || this.track(url);
        } else {
          this.errorIf = true;
          console.log('erroror=====')
        }
      } catch (e) {
        console.log('e====: ', e);
        this.errorIf = true;
      } finally {
        this.isLoading = false;
      }
    }

  };
  @action
  clearData = () => {
    this.data = []
  };

  track = async (url) => {
    console.log('url========', url);
    const title = url.split('?')[0].slice(7);
    const params = url.split('?')[1].split('&');
    const requestParams = {};
    params.forEach(param => {
      requestParams[param.split('=')[0]] = param.split('=')[1] !== '' ? param.split('=')[1] : null;
    });
    requestParams['page_title'] = title;
    console.log('request======', requestParams);
    // await analytics().setUserProperties({
    //   Gender: 'Maschio',
    //   Age: '25',
    // });
    analytics().logEvent('product', requestParams)
      .then(res=>{
      console.log('result============', res);
    })
      .catch(error => {
        console.log("---------------------------------------Error occured-------------------", error);
      });
  }
  @action
  setIsLike = status => {
    this.isLike = status
  }
}

export default BikeStore;
