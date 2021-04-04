/* 
    Created by longdq
*/
import { SearchInputComponent } from './search-input.component';
export class SearchInputAdapter {
  private SearchInputComponent: SearchInputComponent;

  constructor(Component: SearchInputComponent) {
    this.SearchInputComponent = Component;
  }

  onChangeText = (text: string) => {
    console.log(text, 'adapter input');
    this.SearchInputComponent.props.search(text);
  };
}
