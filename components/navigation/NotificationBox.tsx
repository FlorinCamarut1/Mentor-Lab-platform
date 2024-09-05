import { Notification } from "@prisma/client";
import { useRouter } from "next/navigation";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { TbMessage } from "react-icons/tb";
import { FiGitPullRequest } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import axios from "axios";
import toast from "react-hot-toast";

interface NotificationBoxProps {
  notificationData: Notification;
  mutateNotifications: () => void;
}

const NotificationBox = ({
  notificationData,
  mutateNotifications,
}: NotificationBoxProps) => {
  const deleteFunction = async () => {
    await axios
      .delete(
        `/api/notifications/deleteNotificationById/${notificationData?.id}`,
      )
      .then((res) => {
        if (res.status === 200) {
          mutateNotifications();
        }
      })
      .catch((error) => toast.error(error.response.data.error));
  };

  switch (notificationData.notificationType) {
    case "MESSAGE":
      return (
        <NotificationLayout
          icon={TbMessage}
          title={`${notificationData?.notificatorUsername} a trimis un mesaj.`}
          body={notificationData?.body}
          deleteOneFn={deleteFunction}
          redirectUrl={`/conversations?conversation=${notificationData?.targetId}`}
        />
      );
    case "REQUEST":
      return (
        <NotificationLayout
          icon={FiGitPullRequest}
          title={`Ai primit o cerere de la ${notificationData?.notificatorUsername}.`}
          body={`Nume proiect: ${notificationData?.body}`}
          deleteOneFn={deleteFunction}
          redirectUrl={`/requests`}
        />
      );
    case "REQUEST_ACCEPTED":
      return (
        <NotificationLayout
          icon={IoMdCheckmarkCircleOutline}
          title={`${notificationData?.notificatorUsername} a acceptat cererea ta.`}
          body={`Nume proiect: ${notificationData?.body}`}
          deleteOneFn={deleteFunction}
          redirectUrl="/requests"
        />
      );
    case "REQUEST_DECLINED":
      return (
        <NotificationLayout
          icon={IoCloseCircleOutline}
          title={`${notificationData?.notificatorUsername} a refuzat cererea ta.`}
          body={`Nume proiect: ${notificationData?.body}`}
          deleteOneFn={deleteFunction}
          redirectUrl="/requests"
        />
      );
    default:
      return null;
  }
};
export default NotificationBox;

interface NotificationLayoutProps {
  icon: IconType;
  title: string;
  body: string;
  deleteOneFn: () => void;
  redirectUrl: string;
}
const NotificationLayout = ({
  icon: Icon,
  title,
  body,
  deleteOneFn,
  redirectUrl,
}: NotificationLayoutProps) => {
  const router = useRouter();
  return (
    <div
      className="flex cursor-pointer flex-col gap-2 rounded-md border p-2 text-sm shadow-sm"
      onClick={() => {
        router.push(redirectUrl);
        deleteOneFn();
      }}
    >
      <div className="flex justify-between">
        <p className="font-semibold">{title}</p>
      </div>
      <div className="flex gap-2">
        <Icon size={20} />
        <p>{body}</p>
      </div>
    </div>
  );
};
