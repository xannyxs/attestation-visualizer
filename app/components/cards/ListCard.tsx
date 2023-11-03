import Image from "next/image";
import { LocateFixed } from "lucide-react";
import { useContext } from "react";
import { ModalContext } from "../context/modalContext";
import ShowNodeCard from "../ShowNodeCard";
import { ICardProps as CardInfo } from "@/app/types";

export default function ListCard({
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

  const dimensions = 55;

  return (
    <div className="flex m-2 transition-all cursor-pointer items-center">
      <div
        className="shadow-black bg-gray-200 rounded-l-md flex items-center hover:bg-red-100 hover:shadow-md transition-all w-full"
        onClick={handleCardClick}
        role="button"
        aria-label={`Details for ${card.currentAddress}`}
        tabIndex={0}
      >
        <Image
          src={image}
          alt={`${card.currentAddress} Avatar`}
          className="rounded-l-md"
          width={dimensions}
          height={dimensions}
        />
        <div className="flex-grow border-l-2 pl-3 pr-3 flex flex-col justify-center truncate">
          <h2 className="text-md font-semibold truncate">
            Address: {card.currentAddress}
          </h2>
          <p className="text-gray-500 text-base truncate">
            Referred By: {card.referredBy}
          </p>
        </div>
      </div>
      <button
        className="flex justify-center items-center ml-2 p-2 pt-4 pb-4 bg-gray-200 rounded-r-md hover:bg-red-100 transition-all"
        onClick={onIconClick}
        aria-label="Locate address on map"
      >
        <LocateFixed size={25} />
      </button>
    </div>
  );
}
