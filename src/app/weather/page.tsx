"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FavoriteCity } from "@/types";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationAndRedirect = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            router.push(`/weather/${latitude}/${longitude}`);
          },
          (error) => {
            console.error("Error getting geolocation:", error);
            setLoading(false);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };

    const fetchDefaultCityAndRedirect = async (userId: string) => {
      try {
        const response = await fetch(`/api/users/${userId}/default-city`);
        const data: FavoriteCity = await response.json();

        if (data) {
          const { latitude, longitude, cityName, address, placeId } = data;
          router.push(
            `/weather/${latitude}/${longitude}?place=${cityName}&address=${address}&id=${placeId}`
          );
        } else {
          fetchLocationAndRedirect();
        }
      } catch (error) {
        console.error("Error fetching default city:", error);
        fetchLocationAndRedirect();
      }
    };

    // Check if the user is logged in
    if (status === "authenticated" && session?.user?.id) {
      // If logged in, fetch the user's default city
      fetchDefaultCityAndRedirect(session.user.id);
    } else if (status === "unauthenticated") {
      // If not logged in, use the user's current location
      fetchLocationAndRedirect();
    }
  }, [router, session, status]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return null;
}
