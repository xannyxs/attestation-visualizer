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
  const dimensions = 55;
  const { openModal } = useContext(ModalContext);

  return (
    <div className="flex m-2 transition-all cursor-pointer">
      <div className="shadow-black bg-gray-200 rounded-md flex items-center hover:bg-red-100 hover:shadow-md transition-all">
        <Image
          src={image}
          alt="Avatar"
          className="rounded-md"
          width={dimensions}
          height={dimensions}
        />
        <div
          className="flex-grow border-l-2 pl-3 pr-3 flex flex-col justify-center truncate"
          onClick={() => {
            openModal(<ShowNodeCard cardInfo={card} />);
          }}
        >
          <h2 className="text-md font-semibold truncate">
            Address: {card.currentAddress}
          </h2>
          <p className="text-gray-500 text-base truncate">
            Referred By: {card.referredBy}
          </p>
        </div>
      </div>
      <div
        className="flex justify-center items-center ml-2 p-2 bg-gray-200 rounded-md hover:bg-red-100 transition-all"
        onClick={onIconClick}
      >
        <LocateFixed size={25} />
      </div>
    </div>
  );
}
