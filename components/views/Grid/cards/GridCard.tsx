import Image from "next/image";
import { LocateFixed } from "lucide-react";
import { useContext } from "react";
import { ModalContext } from "@/components/context/modalContext";
import ShowNodeCard from "@/components/ShowNodeCard";
import { ICardProps as CardInfo } from "@/lib/types";

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
    <div
      onClick={() => handleCardClick()}
      className="py-1 bg-gray-100 rounded-md transition-all cursor-pointer hover:bg-red-100 shadow-black"
    >
      <button
        className="self-start p-2 mt-1 ml-2 bg-gray-200 rounded-md transition-all hover:bg-red-300"
        onClick={onIconClick}
        aria-label="Locate address on map"
      >
        <LocateFixed size={25} />
      </button>
      <div className="p-2 photo-wrapper">
        <Image
          src={image}
          alt={`${card.currentAddress} Avatar`}
          className="mx-auto rounded-full"
          width={dimensions}
          height={dimensions}
        />
      </div>
      <div className="px-2">
        {card.ens ? (
          <>
            <h3 className="font-semibold leading-8 text-center text-gray-900 text-md">
              {card.ens}
            </h3>
          </>
        ) : (
          <>
            <h3 className="font-semibold leading-8 text-center text-gray-900 text-md">
              <p className="truncate">{card.currentAddress}</p>
            </h3>
          </>
        )}
        <div className="flex flex-col my-3 text-sm">
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
  );
}
