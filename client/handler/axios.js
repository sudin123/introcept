import axios from "axios";

const api = {
  setHeaders() {
    const instance = axios.create({
      baseURL: `${window.location.origin}/api`,
      headers: {
        Accept: "application/json",
      },
    });
    return instance;
  },
  async get(target) {
    try {
      let instance = await this.setHeaders();
      let response = await instance.get(target);
      return response.data;
    } catch (e) {
      this.handlerError(e.response.status);
      throw e;
    }
  },

  async getWithPayload(target, payload) {
    try {
      let instance = await this.setHeaders();
      let response = await instance.get(target, { params: payload });
      return response.data;
    } catch (e) {
      this.handlerError(e.response.status);
      throw e;
    }
  },

  async post(target, payload) {
    try {
      let instance = await this.setHeaders();
      let response = await instance.post(target, payload);
      return response.data;
    } catch (e) {
      this.handlerError(e.response.status);
      throw e;
    }
  },

  async patch(target, payload) {
    try {
      let instance = await this.setHeaders();
      let response = await instance.patch(target, payload);
      return response.data;
    } catch (e) {
      this.handlerError(e.response.status);
      throw e;
    }
  },

  async delete(target, payload) {
    try {
      let instance = await this.setHeaders();
      let response = await instance.delete(target);
      return response.data;
    } catch (e) {
      this.handlerError(e.response.status);
      throw e;
    }
  },

  async deleteWithPayload(target, payload) {
    try {
      let instance = await this.setHeaders();
      let response = await instance.delete(target, { params: payload });
      return response.data;
    } catch (e) {
      this.handlerError(e.response.status);
      throw e;
    }
  },

  async handlerError(statusCode) {
    console.log(statusCode)
    if (statusCode == 401) {
      //   localStorage.removeItem("user");
      //   location.reload();
    }
    return;
  },
};

export default api;
