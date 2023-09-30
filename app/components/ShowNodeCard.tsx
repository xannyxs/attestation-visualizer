import InfoBar from "./InfoBar";
import EnsBar from "./EnsBox";
import ProfilePicture from "./ProfilePicture";
import { ICardProps } from "../types";
import AddressBar from "./AddressBar";

interface NodeInfoCardProps {
  cardInfo: ICardProps;
  onClose: () => void;
}

// TODO: <Button> should be an icon

export default function ShowNodeCard({ cardInfo, onClose }: NodeInfoCardProps) {
  return (
    <div className="fixed right-0 top-3 bottom-3 w-1/4 mr-3 bg-white z-10 rounded h-full">
      <button className="p-4 text-red-500" onClick={onClose}>
        X
      </button>
      <ProfilePicture address={cardInfo.currentAddress} />
      <EnsBar objectName={"ENS address"} address={cardInfo.currentAddress} />
      <AddressBar
        objectName={"Current address"}
        object={cardInfo.currentAddress}
      />
      <AddressBar objectName={"Referred by"} object={cardInfo.referredBy} />
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
