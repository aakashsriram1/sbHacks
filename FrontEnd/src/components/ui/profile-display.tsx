import { UserProfile } from "@/types/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface ProfileDisplayProps {
  profile: UserProfile;
}

export function ProfileDisplay({ profile }: ProfileDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Image
          src={profile.avatar}
          alt={profile.name}
          width={100}
          height={100}
          className="rounded-full mb-4"
        />
        <h2 className="text-xl font-semibold">{profile.name}</h2>
        <p className="text-gray-600">{profile.email}</p>
      </CardContent>
    </Card>
  );
}
