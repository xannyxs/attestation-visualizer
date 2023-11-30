import Image from "next/image";
import { LocateFixed } from "lucide-react";
import { useContext } from "react";
import { ModalContext } from "../context/modalContext";
import ShowNodeCard from "../ShowNodeCard";
import { ICardProps as CardInfo } from "@/app/types";

export default function GridCard({
  image,
  card,
  onIconClick,
}: {
  image: string;
  card: CardInfo;
  onIconClick: () => void;
}) {
  const { openModal } = useContext(ModalContext);

  const handleCardClick = () => {
    openModal(<ShowNodeCard cardInfo={card} />);
  };

  const dimensions = 75;

  return (
    <div className="shadow-black bg-gray-100 hover:bg-red-100 rounded-md py-1 transition-all cursor-pointer">
      <button
        className="ml-2 mt-1 p-2 rounded-md self-start hover:bg-red-300 transition-all"
        onClick={onIconClick}
        aria-label="Locate address on map"
      >
        <LocateFixed size={25} />
      </button>
      <div onClick={() => handleCardClick()}>
        <div className="photo-wrapper p-2">
          <Image
            src={image}
            alt={`${card.currentAddress} Avatar`}
            className="rounded-full mx-auto"
            width={dimensions}
            height={dimensions}
          />
        </div>
        <div className="px-2">
          {card.ens ? (
            <>
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                ENS Address
              </h3>
              <div className="text-center text-gray-600 text-xs font-semibold">
                <p className="truncate">{card.ens}</p>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                Address
              </h3>
              <div className="text-center text-gray-600 text-xs font-semibold">
                <p className="truncate">{card.currentAddress}</p>
              </div>
            </>
          )}
          <div className="flex flex-col text-sm my-3">
            <div className="truncate">
              <span className="font-bold">Referred:&nbsp;</span>
              <span className="truncate">{card.referredBy}</span>
            </div>
            <div>
              <span className="font-bold">Referred Method:&nbsp;</span>
              <span>{card.referredMethod}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
