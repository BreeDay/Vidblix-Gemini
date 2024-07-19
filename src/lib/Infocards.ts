import {
  Sparkles,
  MessagesSquare,
  MousePointerClick,
  LucideIcon,
} from "lucide-react";

interface IInfoCard {
  title: string;
  icon: LucideIcon;
  bodyText: string;
  id: number;
}

const infoCards: IInfoCard[] = [
  {
    title: "Select a 3D Model",
    bodyText:
      "Upload or Select a 3D Model Which Will Act As the Main Model for the Animation.",
    icon: MousePointerClick,
    id: 1,
  },
  {
    title: "Add A Theme",
    bodyText:
      "Use the AI Engine to Select a Theme or Prompt for the Animation.",
    icon: Sparkles,
    id: 2,
  },
  {
    title: "Share and Repeat",
    bodyText: "Share You Blix with Friends and Family.",
    icon: MessagesSquare,
    id: 3,
  },
];

export default infoCards;
