import InfoBar from "./InfoBar";
import EnsBar from "./EnsBox";
import ProfilePicture from "./ProfilePicture";
import { X } from "lucide-react";
import { ICardProps } from "../types";

interface NodeInfoCardProps {
  cardInfo: ICardProps;
  onClose: () => void;
}

export default function ShowNodeCard({ cardInfo, onClose }: NodeInfoCardProps) {
  return (
    <div className="fixed h-full w-1/4 bg-white z-10 right-0">
      <div className="flex">
        <button className="p-4 text-red-500" onClick={onClose}>
          <X />
        </button>
      </div>
      <ProfilePicture url={cardInfo.imageUrl} />
      <EnsBar
        objectName={"Current ENS address"}
        address={cardInfo.currentAddress}
      />
      <EnsBar objectName={"Referred by"} address={cardInfo.referredBy} />
      <InfoBar
        objectName={"Referred method"}
        object={cardInfo.referredMethod}
      />
      <InfoBar
        objectName={"RetroPGF Round"}
        object={cardInfo.retroPGFRound ?? "N/A"}
      />
    </div>
  );
}
