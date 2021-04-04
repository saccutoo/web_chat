/* 
    Created by longdq
*/
import { HeaderPhotoComponent } from './header-photo.component';
import navigationService from 'routers/navigation-service';

export class HeaderPhotoAdapter {
  private HeaderPhotoComponent: HeaderPhotoComponent;

  constructor(Component: HeaderPhotoComponent) {
    this.HeaderPhotoComponent = Component;
  }

  goBack = () => {
    navigationService.goBack();
  };
}
