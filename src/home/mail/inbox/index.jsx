import { useUserStore, useUserStoreAPI } from "../../../stores/user.store";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Checkbox } from "../../../components";
import { useHomeStore } from "../../home.store";
import { Toolbar } from "../toolbar";
import styles from "./inbox.module.css";
import { useState, useEffect } from "react";

export function Inbox() {
  const mails = useUserStore((state) => state.mails);
  const sentMails = useUserStore((state) => state.sentMails);
  const mailNavItem = useHomeStore((state) => state.mailNavItem);
  const [selectedIds, setSelectedIds] = useState([]);
  const history = useHistory();
  const { url } = useRouteMatch();
  const onRowclick = (mailId) => {
    // history.push(`${url}/${mailId}`);
  };
  useEffect(() => {
    setSelectedIds([]);
  }, [mailNavItem]);

  console.log(mails, "mails");
  const onRowSelect = (checked, id) => {
    if (checked) {
      selectedIds.push(id);
      setSelectedIds(selectedIds.slice());
    } else {
      const newSelectedIds = selectedIds.filter(
        (selectedId) => selectedId !== id
      );
      setSelectedIds(newSelectedIds);
    }
  };
  const onDelete = () => {
    if (mailNavItem === "inbox") {
      useUserStoreAPI
        .getState()
        .setMails(mails.filter((mail) => !selectedIds.includes(mail.id)));
    } else {
      useUserStoreAPI
        .getState()
        .setSentMails(
          sentMails.filter((mail) => !selectedIds.includes(mail.id))
        );
    }
  };
  return (
    <div className={styles.inbox}>
      <Toolbar onDelete={onDelete} />
      {mailNavItem === "inbox" &&
        mails.map((mail) => (
          <InboxItem
            mail={mail}
            onRowSelect={onRowSelect}
            selectedIds={selectedIds}
            onRowclick={onRowclick}
          />
        ))}
      {mailNavItem === "send" &&
        sentMails.map((mail) => (
          <InboxItem
            mail={mail}
            onRowSelect={onRowSelect}
            selectedIds={selectedIds}
            onRowclick={onRowclick}
          />
        ))}
    </div>
  );
}

function InboxItem({ mail, onRowSelect, selectedIds, onRowclick }) {
  return (
    <div
      onClick={() => onRowclick(mail.id)}
      key={mail.id}
      className={`${styles.inboxItem} ${
        mail.type === "sent" || mail.isRead ? styles.isMessageRead : ""
      } ${selectedIds.includes(mail.id) ? styles.rowSelected : ""}
  `}
    >
      <Checkbox
        onClick={(checked) => {
          onRowSelect(checked, mail.id);
        }}
        checked={selectedIds.includes(mail.id)}
      />
      <span>{mail.name}</span>
      <span>{mail.message}</span>
      <span>{mail.time}</span>
    </div>
  );
}
