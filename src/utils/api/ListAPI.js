import axios from 'axios';
import _ from 'lodash';
import Helper from 'helper';

class ListAPI {
  getListProjects = async () => {
    try {
      const response = await axios.get(
        `${
          typeof window !== 'undefined' ? Helper.getAppApi() : Helper.getAppApiPrivate()
        }/list/projects`
      );
      return _.result(response, 'data.data', []);
    } catch (e) {
      return _.result(e, 'response.data.data', []);
    }
  };

  getListAreas = async (area) => {
    try {
      const response = await axios.get(
        `${
          typeof window !== 'undefined' ? Helper.getAppApi() : Helper.getAppApiPrivate()
        }/list/areas/${area}`
      );
      return _.result(response, 'data', {});
    } catch (e) {
      return _.result(e, 'response.data.data', []);
    }
  };

  getListZones = async (area) => {
    try {
      const response = await axios.get(
        `${
          typeof window !== 'undefined' ? Helper.getAppApi() : Helper.getAppApiPrivate()
        }/list/zone/${area}`
      );
      return _.result(response, 'data', {});
    } catch (e) {
      return _.result(e, 'response.data', {});
    }
  };

  getListAlley = async (zone) => {
    try {
      const response = await axios.get(
        `${
          typeof window !== 'undefined' ? Helper.getAppApi() : Helper.getAppApiPrivate()
        }/list/alley/${zone}`
      );
      return _.result(response, 'data', {});
    } catch (e) {
      return _.result(e, 'response.data', {});
    }
  };

  getListLamp = async (alley) => {
    try {
      const response = await axios.get(
        `${
          typeof window !== 'undefined' ? Helper.getAppApi() : Helper.getAppApiPrivate()
        }/list/lamp/${alley}`
      );
      return _.result(response, 'data', {});
    } catch (e) {
      return _.result(e, 'response.data', {});
    }
  };

  getLamp = async (_id) => {
    try {
      const response = await axios.get(
        `${
          typeof window !== 'undefined' ? Helper.getAppApi() : Helper.getAppApiPrivate()
        }/lamp/${_id}`
      );
      return _.result(response, 'data', {});
    } catch (e) {
      return _.result(e, 'response.data', {});
    }
  };
}
const instance = new ListAPI();
export default instance;
