/* 
    Created by longdq
*/
import { SearchComponent } from './search.component';

export class SearchAdapter {
  private SearchComponent: SearchComponent;

  constructor(Component: SearchComponent) {
    this.SearchComponent = Component;
  }

  onChangeText = (text: string) => {
    console.log(text, 'adapter input');
    this.SearchComponent.props.search(text);
  };
}
