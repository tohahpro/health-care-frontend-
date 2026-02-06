/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const DoctorCard = ({ doctor }: { doctor: any }) => {
  return (
    <Card className="text-center overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-blue-50/50 items-center p-6">
        <Image
          src={doctor.profilePhoto}
          alt={doctor.name}
          width={96}
          height={96}
          className="rounded-full border-4 border-white shadow-md"
        />
      </CardHeader>

      <CardContent className="p-6">
        <CardTitle className="text-lg">{doctor.name}</CardTitle>
        <p className="text-primary font-medium mt-1">{doctor.specialty}</p>

        <div className="flex items-center justify-center my-3 text-sm">
          <Star className="text-yellow-400 fill-current" size={16} />
          <span className="ml-2 font-semibold">
            {doctor.averageRating?.toFixed(1) ?? "0.0"}
          </span>
          <span className="ml-2 text-muted-foreground">
            ({doctor.reviewCount ?? 0} reviews)
          </span>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
        <Button variant="outline">View Profile</Button>
        <Button>Book Now</Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
