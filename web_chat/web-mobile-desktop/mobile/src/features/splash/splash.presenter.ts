import { AuthenResponse } from 'features/authen/model';
import commons from 'global/commons';
import AsyncStorageHelpers, { StorageKey } from 'helpers/async-storage-helpers';
import { fetch } from 'core/common/networking/api-helper';
import NavigationService from 'routers/navigation-service';
import { SplashView } from './splash.view';

export class SplashPresenter {
  private view: SplashView;
  constructor(view: SplashView) {
    this.view = view;
  }
}
