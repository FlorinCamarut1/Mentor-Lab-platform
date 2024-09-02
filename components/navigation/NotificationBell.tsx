"use client";
import { FaRegBell } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useNotifications } from "@/hooks/notification/useNotifications";
import { Notification, User } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { pusherClient } from "@/lib/pusher";
import { ScrollArea } from "../ui/scroll-area";
import { deleteAllMyNotifications } from "@/actions/notifications/deleteAllMyNotifications";

import NotificationBox from "./NotificationBox";

interface NotificationBellProps {
  currentUserData: User | null;
}

const NotificationBell = ({ currentUserData }: NotificationBellProps) => {
  const [newNotification, setNewNotification] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { data: notificationsData, mutate: mutateNotifications } =
    useNotifications();

  const deleteAllNotifications = () => {
    startTransition(() => {
      deleteAllMyNotifications();
      mutateNotifications();
    });
  };

  useEffect(() => {
    if (currentUserData?.id) {
      pusherClient?.subscribe(currentUserData?.id);
      pusherClient?.bind("notification:new", () => {
        mutateNotifications();
        setNewNotification(true);
      });

      return () => {
        pusherClient?.unsubscribe(currentUserData?.id);
        pusherClient?.unbind("notification:new");
      };
    }
  }, [currentUserData?.id, mutateNotifications]);

  return (
    <Popover>
      <PopoverTrigger onClick={() => setNewNotification(false)}>
        <div className="relative">
          <Button
            asChild
            variant="ghost"
            className="mr-4 rounded-full px-2 py-1"
          >
            <FaRegBell size={40} />
          </Button>
          {newNotification && (
            <div className="absolute left-0 top-0 h-2 w-2 translate-x-1/2 translate-y-1/2 rounded-full bg-red-500"></div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex w-full flex-col gap-2">
        {notificationsData?.length === 0 && (
          <h3 className="text-sm text-gray-500">Nu există notificări</h3>
        )}
        <ScrollArea className="px-2">
          <div className="flex flex-col gap-2 lg:max-h-96">
            {notificationsData?.length > 0 &&
              notificationsData?.map((notification: Notification) => (
                <NotificationBox
                  key={notification.id}
                  notificationData={notification}
                  mutateNotifications={mutateNotifications}
                />
              ))}
          </div>
        </ScrollArea>
        <div className="flex items-center justify-center p-2">
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              deleteAllNotifications();
            }}
          >
            Șterge toate notificările
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
