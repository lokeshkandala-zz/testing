import create from "zustand";
import { devtools } from "zustand/middleware";
import produce from "immer";
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from "../utils/local.storage";

const createWithImmer = (storeCreator) =>
  create(
    devtools((originalSet, originalGet) =>
      storeCreator((fn) => originalSet(produce(fn)), originalGet)
    )
  );
const userDetails = getItemFromLocalStorage("userDetails") || {};
const mockData = getItemFromLocalStorage("mock_data");
const mails = mockData[userDetails.id]?.MAILS || [];
const mailsCount = mails.length || 0;
const unReadMailsCount = mails.filter((mail) => !mail.isRead).length || 0;
const store = {
  userDetails: userDetails || {},
  isLoggedIn: getItemFromLocalStorage("isLoggedIn"),
  mails: mails || [],
  sentMails: mockData[userDetails.id]?.SENT_MAILS || [],
  mailsCount: mailsCount,
  unReadMailsCount: unReadMailsCount,
};
export const [useUserStore, useUserStoreAPI] = createWithImmer(
  (setState, getState) => ({
    ...store,
    setUserDetails(data) {
      setState(() => {
        setItemInLocalStorage("userDetails", data);
        return { userDetails: data };
      });
    },
    setIsLoggedIn(data) {
      setState(() => {
        setItemInLocalStorage("isLoggedIn", data);
        if (!data) {
          setItemInLocalStorage("userDetails", {});
          return {
            isLoggedIn: data,
            userDetails: {},
            mails: [],
            sentMails: [],
          };
        }
        return { isLoggedIn: data };
      });
    },
    setMails(data, userId = userDetails.id) {
      setState((state) => {
        const { userDetails, mails } = getState();
        let mockData = getItemFromLocalStorage("mock_data");
        mockData[userId].MAILS = data;
        setItemInLocalStorage("mock_data", mockData);
        if (userId !== userDetails.id) {
          return { mails };
        } else {
          const mailsCount = data.length;
          const unReadMailsCount = data.filter((mail) => !mail.isRead).length;
          return { mails: data, mailsCount, unReadMailsCount };
        }
      });
    },
    setSentMails(data, userId) {
      setState((state) => {
        if (userId) {
          let mockData = getItemFromLocalStorage("mock_data");
          mockData[userId].SENT_MAILS = data;
          setItemInLocalStorage("mock_data", mockData);
        }
        return { sentMails: data };
      });
    },
  })
);
