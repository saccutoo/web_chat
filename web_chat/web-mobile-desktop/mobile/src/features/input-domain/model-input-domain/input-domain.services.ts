/* 
    Created by longdq
*/

export default class InputDomainServices {
  private static instance: InputDomainServices;

  static getInstance(): InputDomainServices {
    if (!InputDomainServices.instance) {
      InputDomainServices.instance = new InputDomainServices();
    }
    return InputDomainServices.instance;
  }
}
