import InfoBar from "./InfoBar";
import EnsBar from "./EnsBox";
import ProfilePicture from "./ProfilePicture";
import { X } from "lucide-react";
import { ICardProps } from "../types";
import { useContext } from "react";
import { ModalContext } from "./context/modalContext";

interface NodeInfoCardProps {
  cardInfo: ICardProps;
}

export default function ShowNodeCard({ cardInfo }: NodeInfoCardProps) {
  const { closeModal } = useContext(ModalContext);

  return (
    <div className="h-full bg-white">
      <div className="flex">
        <button
          className="p-4 text-red-500"
          onClick={() => closeModal()}
        >
          <X />
        </button>
      </div>
      <ProfilePicture url={cardInfo.imageUrl} />
      <EnsBar
        objectName={"Current ENS address"}
        address={cardInfo.currentAddress}
        ens={cardInfo.ens!}
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
