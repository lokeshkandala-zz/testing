import { useHistory, useRouteMatch } from "react-router-dom";

import { ReactComponent as MailIcon } from "./icons/mail.svg";
import { ReactComponent as DashboardIcon } from "./icons/dashboard.svg";
import { ReactComponent as ChartIcon } from "./icons/chart.svg";
import { ReactComponent as DiamondIcon } from "./icons/diamond.svg";
import { ReactComponent as LabelIcon } from "./icons/label.svg";
import { ReactComponent as GraphIcon } from "./icons/graph.svg";
import { ReactComponent as ArrowIcon } from "./icons/leftarrow.svg";

import { Badge, BADGE_TYPES } from "../../components";
import { useState, Fragment, useEffect, useRef } from "react";
import { useUserStoreAPI, useUserStore } from "../../stores/user.store";
import { useHomeStore } from "../home.store";
import styles from "./sidebar.module.css";

const SIDEBAR_NAV_ITEMS = [
  { id: "dashboard", icon: DashboardIcon, label: "Dashboards" },
  {
    id: "mail",
    icon: MailIcon,
    label: "Mailbox",
    subNavItems: ["Inbox", "Email view", "Compose email", "Email templates"],
  },

  { id: "graph", icon: GraphIcon, label: "Graphs" },
  { id: "metric", icon: LabelIcon, label: "Metrics" },
  { id: "layout", icon: MailIcon, label: "Layouts" },
  { id: "widget", icon: DiamondIcon, label: "Widgets" },
  { id: "form", icon: ChartIcon, label: "Forms" },
  { id: "appview", icon: MailIcon, label: "App views" },
];

export function Sidebar() {
  const [selectedNavItem, setSelectedNavItem] = useState("");
  const [showExpandView, setShowExpandView] = useState(false);
  const [selectedSubNavItem, setSelectedSubNavItem] = useState("");
  const { userDetails } = useUserStoreAPI.getState();
  const mailsCount = useUserStore((state) => state.mailsCount);
  const unReadMailsCount = useUserStore((state) => state.unReadMailsCount);

  const unSubscribeUserStore = useRef(() => {});

  const history = useHistory();
  const { url } = useRouteMatch();

  useEffect(() => {
    unSubscribeUserStore.current = useHomeStore.subscribe(
      (showExpandView) => {
        setShowExpandView(showExpandView);
      },
      (state) => state.showExpandView
    );

    return () => {
      unSubscribeUserStore?.current();
    };
  }, []);
  return (
    <div
      className={`${styles.sidebarContainer} ${
        showExpandView ? styles.expandedSidebar : ""
      }`}
    >
      {showExpandView && (
        <Fragment>
          <div className={styles.profileInfo}>
            <div className={styles.profilePicBg}>
              <div className={styles.profilePic} />
            </div>
            <div className={styles.userName}>{userDetails.name}</div>
            <div className={styles.role}>{userDetails.role}</div>
          </div>
          <div className={styles.expandedNavItemsContainer}>
            {SIDEBAR_NAV_ITEMS.map((navItem) => (
              <div
                key={navItem.id}
                className={`${styles.expandedNavItemContainer}
              ${
                selectedNavItem === navItem.id
                  ? styles.expandedNavItemSelected
                  : ""
              }`}
              >
                <div
                  className={`${styles.expandedNavItem} `}
                  onClick={() => {
                    setSelectedNavItem(navItem.id);
                    navItem.subNavItems &&
                      setSelectedSubNavItem(navItem.subNavItems[0]);
                    history.push(`${url}/${navItem.id}`);
                  }}
                >
                  <navItem.icon className={styles.sidebarIcon} />
                  <div className={styles.label}>
                    <span>{navItem.label}</span>
                    {navItem.id === "mail" && (
                      <div className={styles.countBadge}>
                        <Badge
                          type={BADGE_TYPES.YELLOW}
                          content={`${unReadMailsCount}/${mailsCount}`}
                        />
                      </div>
                    )}
                  </div>
                  {navItem.subNavItems?.length && (
                    <span className={styles.expandIcon}>
                      <ArrowIcon className={styles.arrowIcon} />
                    </span>
                  )}
                </div>
                {selectedNavItem === navItem.id &&
                  navItem.subNavItems?.map((subNavItem, index) => (
                    <div
                      onClick={() => {
                        setSelectedSubNavItem(subNavItem);
                        history.push(`${url}/${navItem.id}`);
                      }}
                      className={`${styles.expandedNavItemSubItem}
                      ${
                        selectedSubNavItem === subNavItem
                          ? styles.expandedNavItemSubItemSelected
                          : ""
                      }`}
                      key={`${index}-${subNavItem}`}
                    >
                      {subNavItem}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </Fragment>
      )}
      {!showExpandView && (
        <Fragment>
          <div className={styles.name}>IN+</div>
          <nav className={styles.iconsContainer}>
            {SIDEBAR_NAV_ITEMS.map((navItem) => (
              <div
                onClick={() => {
                  setSelectedNavItem(navItem.id);
                  navItem.subNavItems &&
                    setSelectedSubNavItem(navItem.subNavItems[0]);
                  history.push(`${url}/${navItem.id}`);
                }}
                key={navItem.id}
                className={`${styles.iconContainer} ${
                  navItem.id === selectedNavItem ? styles.selected : ""
                }`}
              >
                <navItem.icon className={styles.sidebarIcon} />
              </div>
            ))}
          </nav>
        </Fragment>
      )}
    </div>
  );
}
