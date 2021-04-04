import { ListNotificationItemComponent } from "./list-notification-item.component";



export class ListNotificationAdapter {
    private ListnotificationComponent : ListNotificationItemComponent

    constructor(Component: ListNotificationItemComponent){
        this.ListnotificationComponent = Component
    }
}