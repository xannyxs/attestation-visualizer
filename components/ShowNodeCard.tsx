import InfoBar from "./dialogCard/InfoBar";
import EnsBar from "./dialogCard/EnsBox";
import ProfilePicture from "./dialogCard/ProfilePicture";
import { X } from "lucide-react";
import { ICardProps } from "@/lib/types";
import { AlertDialogCancel } from "./ui/alert-dialog";

const ShowNodeCard = ({ cardInfo }: { cardInfo: ICardProps }) => {
  return (
    <div className="h-full bg-white">
      <div className="flex justify-end items-center pr-4">
        <AlertDialogCancel className="text-red-500 border-none">
          <X />
        </AlertDialogCancel>
      </div>
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
