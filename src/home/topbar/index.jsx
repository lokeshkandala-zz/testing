import { NotificationBadge, Badge, BADGE_TYPES } from "../../components";

import { ReactComponent as HamburgerIcon } from "./icons/list.svg";
import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as MailIcon } from "./icons/mail.svg";
import { ReactComponent as LogoutIcon } from "./icons/logout.svg";

import styles from "./topbar.module.css";

import { useHomeStoreAPi } from "../home.store";
import { useUserStoreAPI, useUserStore } from "../../stores/user.store";

export function Topbar() {
  const onLogout = () => {
    useUserStoreAPI.getState().setIsLoggedIn(false);
  };
  return (
    <div className={styles.topbar}>
      <div
        className={styles.hamburgerMenu}
        data-testid="hamburger"
        onClick={useHomeStoreAPi.getState().setShowExpandView}
      >
        <HamburgerIcon className={styles.hamburgerMenuIcon} />
      </div>

      <input
        placeholder={"Search for something..."}
        className={styles.searchBox}
      />
      <NotificationBadge Icon={BellIcon} Badge={NotificatioIconComponent} />
      <NotificationBadge Icon={MailIcon} Badge={MailNotification} />
      <div className={styles.logout} onClick={onLogout}>
        <LogoutIcon className={styles.logoutIcon} />
        <span>Log out</span>
      </div>
    </div>
  );
}

function NotificatioIconComponent() {
  return <Badge content={8} type={BADGE_TYPES.GREEN} />;
}
function MailNotification() {
  const unReadMailsCount = useUserStore((state) => state.unReadMailsCount);
  return <Badge content={unReadMailsCount} type={BADGE_TYPES.YELLOW} />;
}
