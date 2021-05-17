import { Fragment } from "react";
import { Sidebar } from "./sidebar";
import { Inbox } from "./inbox";
import { Compose } from "./compose";
import { useHomeStoreAPi, useHomeStore } from "../home.store";
import { useUserStoreAPI } from "../../stores/user.store";
import { getItemFromLocalStorage } from "../../utils/local.storage";
import styles from "./mail.module.css";

export function Mail() {
  const openComposeMail = useHomeStore((state) => state.openComposeMail);
  const sendMessage = ({ to, subject, body }) => {
    const mockData = getItemFromLocalStorage("mock_data");

    let { sentMails, userDetails } = useUserStoreAPI.getState();

    for (let key in mockData) {
      const userData = mockData[key];
      if (userData.USERNAME === to) {
        const message = {
          from: userDetails.name,
          message: body,
          isRead: false,
          time: "10: 1 PM",
          id: `message${Math.random()}`,
          subject,
          type: "recieve",
        };
        const mails = mockData[userData.id].MAILS;
        useUserStoreAPI.getState().setMails([message, ...mails], userData.id);
        message.tye = "sent";
        const newSentItems = [message, ...sentMails];
        useUserStoreAPI.getState().setSentMails(newSentItems, userDetails.id);
        useHomeStoreAPi.getState().setOpenComposeMail(false);
      }
    }
  };

  return (
    <Fragment>
      <div className={styles.container}>
        <Sidebar />
        <Inbox />
      </div>
      <Compose
        isOpen={openComposeMail}
        onClose={() => useHomeStoreAPi.getState().setOpenComposeMail(false)}
        onSend={sendMessage}
      />
    </Fragment>
  );
}

// function MailInfo() {
//   const { mails } = useUserStoreAPI.getState();
//   const { mailId } = useParams();
//   const mailInfo = mails.find((mail) => mail.id === mailId) || {};
//   return (
//     <div>
//       <div>from: {mailInfo.from}</div>
//       <div>subject: {mailInfo.subject}</div>
//       <div>message: {mailInfo.message}</div>
//     </div>
//   );
// }
