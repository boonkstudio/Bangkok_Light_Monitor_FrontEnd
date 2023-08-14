export default class Helper {
  static cancelToken;

  static getAppApi() {
    return process.env.NODE_ENV === 'development'
      ? process.env.APP_API_DEV
      : process.env.APP_API_PROD;
  }

  static getAppApiPrivate() {
    return process.env.NODE_ENV === 'development'
      ? process.env.APP_API_DEV_PRIVATE
      : process.env.APP_API_PROD_PRIVATE;
  }
}
