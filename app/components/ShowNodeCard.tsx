import InfoBar from "./InfoBar";
import EnsBar from "./EnsBox";
import ProfilePicture from "./ProfilePicture";
import { ICardProps } from "../types";

interface NodeInfoCardProps {
  cardInfo: ICardProps
  onClose: () => void;
}

// TODO: <Button> should be an icon
//
// Keep the z-10, otherwise the card will get behind the graph

export default function ShowNodeCard({ cardInfo, onClose }: NodeInfoCardProps) {
  return (
    <div className="fixed right-0 top-3 bottom-3 w-1/4 mr-3 bg-white z-10 rounded h-full">
      <button className="p-4 text-red-500" onClick={onClose}>
        X
      </button>
      <ProfilePicture
        url={
          "https://pbs.twimg.com/profile_images/1637604783996428289/Qcbg0CqT_400x400.jpg"
        }
      />
      <EnsBar objectName={"ENS address"} address={cardInfo.currentAddress.id} />
      <InfoBar objectName={"Current address"} object={cardInfo.currentAddress.id} />
      <InfoBar objectName={"Referred by"} object={cardInfo.referredBy} />
      <InfoBar objectName={"Referred method"} object={cardInfo.referredMethod} />
      <InfoBar objectName={"RetroPGF Round"} object={cardInfo.retroPGFRound} />
    </div>
  );
}
