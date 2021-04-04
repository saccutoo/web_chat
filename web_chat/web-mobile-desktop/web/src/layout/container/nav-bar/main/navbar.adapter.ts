import { useEffect, useState } from "react";
import EventBus, { EventBusName, EventBusType } from "../../../../helpers/api/event-bus";
import { Subscription } from "rxjs";
import NavbarServices from "./navbar.services";
const NavbarAdapter = () => {
    const [hasNotification, setHasNotification] = useState<number>(0);
    const [hasMessage, setHasMessage] = useState<number>(0);
    const subscriptions = new Subscription();
    const userId = localStorage.getItem('userId') || '';
    useEffect(() => {
        // quyennq : dem notifi chua doc
        (async () => {
            const countNotReadNotifi = await NavbarServices.counttNotifications({ userId: userId });
            console.log("🚀 ~ file: navbar.adapter.ts ~ line 14 ~ countNotReadNotifi", countNotReadNotifi)
            if (countNotReadNotifi.data?.notifi > 0) {
                console.log("🚀 ~ file: navbar.adapter.ts ~ line 16 ~ countNotReadNotifi", countNotReadNotifi)


                setHasNotification(countNotReadNotifi.data.notifi);
            }
        })()


        // quyennq : Nhận thông báo từ pushStream
        subscriptions.add(
            EventBus.getInstance().events.subscribe((res: EventBusType) => {
                const payload = res?.payload;
                if (payload) {
                    switch (res?.type) {
                        case EventBusName.PUSH_NOTIFICATION: {
                            // quyennq: set có thông báo
                            setHasNotification((prev) => prev + 1);
                            break;
                        }
                        case EventBusName.NEW_MESSENGER: {
                            // quyennq: set có tin nhắn mới
                            setHasMessage((prev) => prev + 1);
                            break;
                        }


                    }
                }
            })
        );
    }, [])
    return {
        hasNotification,
        setHasNotification,
        hasMessage,
        setHasMessage
    }
}

export default NavbarAdapter;


