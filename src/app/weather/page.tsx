"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
            // Redirect to the URL with the latitude and longitude
            router.push(`/weather/${latitude}/${longitude}`);
          },
          (error) => {
            console.error("Error getting geolocation:", error);
            setLoading(false); // Stop loading in case of error
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLoading(false); // Stop loading if geolocation is not supported
      }
    };

    const fetchDefaultCityAndRedirect = async (userId: string) => {
      try {
        const response = await fetch(`/api/user/${userId}/default-city`);
        const data = await response.json();

        if (data && data.latitude && data.longitude) {
          const { latitude, longitude, placeId } = data;
          // If the user has a default city, redirect to it with cityId as a query
          router.push(`/weather/${latitude}/${longitude}?placeId=${placeId}`);
        } else {
          // If no default city is found, fallback to user's current location
          fetchLocationAndRedirect();
        }
      } catch (error) {
        console.error("Error fetching default city:", error);
        // Fallback to user's current location in case of error
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
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  return null; // Optionally, render nothing once the redirect happens
}
