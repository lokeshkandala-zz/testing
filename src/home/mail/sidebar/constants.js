import { ReactComponent as DraftIcon } from "./icons/draft.svg";
import { ReactComponent as EnvelopeIcon } from "./icons/envelope.svg";
import { ReactComponent as ImportantIcon } from "./icons/important.svg";
import { ReactComponent as InboxIcon } from "./icons/inbox.svg";
import { ReactComponent as TrashIcon } from "./icons/trash.svg";

export const FOLDER_OPTIONS = [
  {
    id: "inbox",
    label: "Inbox",
    Icon: InboxIcon,
  },
  {
    id: "send",
    label: "Send Mail",
    Icon: EnvelopeIcon,
  },
  {
    id: "important",
    label: "Important",
    Icon: ImportantIcon,
  },
  {
    id: "draft",
    label: "Drafts",
    Icon: DraftIcon,
  },
  {
    id: "trash",
    label: "Trash",
    Icon: TrashIcon,
  },
];
export const CATEGORIES_OPTIONS = [
  {
    id: "work",
    label: "Work",
    color: "green",
  },
  {
    id: "documents",
    label: "Documents",
    color: "red",
  },
  {
    id: "social",
    label: "Social",
    color: "blue",
  },
  {
    id: "advertising",
    label: "Advertising",
    color: "lightblue",
  },
  {
    id: "clients",
    label: "Clients",
    color: "orange",
  },
];
export const LABELS = [
  "Family",
  "Work",
  "Home",
  "Children",
  "Holidays",
  "Music",
  "Photograpy",
  "Film",
];
