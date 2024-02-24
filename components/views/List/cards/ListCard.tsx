import Image from "next/image";
import { LocateFixed } from "lucide-react";
import { useContext } from "react";
import { ModalContext } from "@/components/context/modalContext";
import ShowNodeCard from "@/components/ShowNodeCard";
import { ICardProps as CardInfo } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card className="flex items-center m-2 transition-all cursor-pointer">
      <div
        className="flex items-center w-full bg-gray-200 rounded-l-md transition-all hover:bg-red-100 hover:shadow-md shadow-black"
        onClick={handleCardClick}
        role="button"
        aria-label={`Details for ${card.currentAddress}`}
        tabIndex={0}
      >
        <CardHeader>
          <Image
            src={image}
            alt={`${card.currentAddress} Avatar`}
            className="rounded-l-md"
            width={dimensions}
            height={dimensions}
          />
        </CardHeader>
        <CardContent className="flex flex-col flex-grow justify-center pr-3 pl-3 border-l-2 truncate">
          {card.ens ? (
            <h2 className="font-semibold text-md truncate">
              ENS Address: {card.ens}
            </h2>
          ) : (
            <h2 className="font-semibold text-md truncate">
              Address: {card.currentAddress}
            </h2>
          )}
          <p className="text-base text-gray-500 truncate">
            Referred By: {card.referredBy}
          </p>
        </CardContent>
      </div>
      <Button
        className="flex justify-center items-center p-2 pt-4 pb-4 ml-2 bg-gray-200 rounded-r-md transition-all hover:bg-red-100"
        onClick={onIconClick}
        aria-label="Locate address on map"
      >
        <LocateFixed size={25} />
      </Button>
    </Card>
  );
}
