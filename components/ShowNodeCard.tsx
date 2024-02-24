import InfoBar from "./InfoBar";
import EnsBar from "./EnsBox";
import ProfilePicture from "./ProfilePicture";
import { X } from "lucide-react";
import { ICardProps } from "@/lib/types";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

const ShowNodeCard = ({ cardInfo }: { cardInfo: ICardProps }) => {
  return (
    <div className="h-full bg-white">
      <AlertDialogCancel className="pb-4 pl-4 text-red-500">
        <X />
      </AlertDialogCancel>
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
