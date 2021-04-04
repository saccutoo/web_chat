/* 
    Created by thaolt
*/

import NavigationService from "routers/navigation-service";
import { ContainerProps } from "../container.props";

const goBack = (props: ContainerProps) => () => {
    if (props.onBack) {
        props.onBack();
        return;
    }
    NavigationService.pop();
};

export { goBack }


