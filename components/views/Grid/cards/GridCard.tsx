import Image from "next/image";
import { LocateFixed } from "lucide-react";
import { useContext } from "react";
import { ModalContext } from "@/components/context/modalContext";
import ShowNodeCard from "@/components/ShowNodeCard";
import { ICardProps as CardInfo } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const GridCard = ({
  image,
  card,
  onIconClick,
}: {
  image: string;
  card: CardInfo;
  onIconClick: () => void;
}) => {
  const dimensions = 75;

  return (
    <AlertDialog>
      <Card className="flex flex-col justify-start py-1 bg-gray-100 transition-all hover:bg-red-100 truncate">
        <Button
          className="self-start p-2 mt-1 ml-2 bg-gray-200 rounded-md transition-all hover:bg-red-300"
          onClick={onIconClick}
          aria-label="Locate address on map"
        >
          <LocateFixed size={25} className="text-black" />
        </Button>
        <AlertDialogTrigger>
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
            <div className="flex flex-col my-3 text-sm text-left">
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
        </AlertDialogTrigger>
      </Card>
      <AlertDialogContent>
        <ShowNodeCard cardInfo={card} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GridCard;
