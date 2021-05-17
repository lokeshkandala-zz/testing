import create from "zustand";
import { devtools } from "zustand/middleware";
import produce from "immer";

const createWithImmer = (storeCreator) =>
  create(
    devtools((originalSet, originalGet) =>
      storeCreator((fn) => originalSet(produce(fn)), originalGet)
    )
  );
const store = {
  showExpandView: false,
  openComposeMail: false,
  mailNavItem: "inbox",
};
export const [useHomeStore, useHomeStoreAPi] = createWithImmer(
  (setState, getState) => ({
    ...store,
    setShowExpandView: () => {
      setState(() => {
        const { showExpandView } = getState();
        return { showExpandView: !showExpandView };
      });
    },
    setOpenComposeMail: (data) => {
      setState(() => {
        return { openComposeMail: data };
      });
    },
    setMailNavItem: (data) => {
      setState(() => {
        return { mailNavItem: data };
      });
    },
    reset: () => {
      setState(() => {
        return { ...store };
      });
    },
  })
);
