import Image from "next/image";
import { LocateFixed } from "lucide-react";
import ShowNodeCard from "@/components/ShowNodeCard";
import { ICardProps as CardInfo } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ListCard = ({
  image,
  card,
  onIconClick,
}: {
  image: string;
  card: CardInfo;
  onIconClick: () => void;
}) => {
  const dimensions = 55;

  return (
    <Dialog>
      <div className="flex m-2 min-w-max transition-all">
        <DialogTrigger>
          <Card className="flex items-center bg-gray-200 transition-all hover:bg-red-100 hover:shadow-md w-[490px]">
            <Image
              src={image}
              alt={`${card.currentAddress} Avatar`}
              className="rounded-l-md"
              width={dimensions}
              height={dimensions}
            />
            <div className="flex flex-col justify-center px-3 truncate">
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
            </div>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <ShowNodeCard cardInfo={card} />
        </DialogContent>
        <Card
          className="flex justify-center items-center p-2 py-4 ml-2 bg-gray-200 transition-all cursor-pointer hover:bg-red-100"
          onClick={onIconClick}
        >
          <LocateFixed size={25} />
        </Card>
      </div>
    </Dialog>
  );
};

export default ListCard;
