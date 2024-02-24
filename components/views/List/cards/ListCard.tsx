import Image from "next/image";
import { LocateFixed } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    <div className="flex items-center w-full">
      <Card className="flex items-center m-1 bg-gray-200 transition-all w-[85%]">
        <AlertDialog>
          <AlertDialogTrigger className="flex items-center w-full transition-all hover:bg-red-100">
            <CardHeader>
              <Image
                src={image}
                alt={`${card.currentAddress} Avatar`}
                className="rounded-l-md"
                width={dimensions}
                height={dimensions}
              />
            </CardHeader>
            <CardContent className="flex flex-col border-l-2 truncate">
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
          </AlertDialogTrigger>
          <AlertDialogContent>
            <ShowNodeCard cardInfo={card} />
          </AlertDialogContent>
        </AlertDialog>
      </Card>
      <Button
        className="flex items-center justify-center rounded-r-md transition-all mx-1 bg-gray-200 hover:bg-red-100 w-[10%]"
        onClick={onIconClick}
      >
        <LocateFixed size={25} className="text-black" />
      </Button>
    </div>
  );
};

export default ListCard;
