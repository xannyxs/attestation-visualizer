import InfoBar from "./InfoBar";
import EnsBar from "./EnsBox";
import ProfilePicture from "./ProfilePicture";
import { X } from "lucide-react";
import { ICardProps } from "@/lib/types";

const ShowNodeCard = ({ cardInfo }: { cardInfo: ICardProps }) => {
  return (
    <div className="h-full bg-white">
      <X />
      <ProfilePicture url={cardInfo.imageUrl} />
      <EnsBar
        objectName={"Current ENS address"}
        address={cardInfo.currentAddress}
        ens={cardInfo.ens!}
      />
      {cardInfo.referredBy !== "Optimism Foundation" && (
        <EnsBar objectName={"Referred by"} address={cardInfo.referredBy} />
      )}
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
};

export default ShowNodeCard;
