import { useAuth, useUser } from '@clerk/clerk-react';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from "../context/AppContext";
import axios from 'axios';
import toast from 'react-hot-toast';

const UserSyncHandler = () => {
  const [synced, setSynced] = useState(false);
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const { baseURL } = useContext(AppContext);

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !isSignedIn || synced) return;

      try {
        const token = await getToken();
        const userData = {
          clerkId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          photoUrl: user.imageUrl,
        };

        await axios.post(`${baseURL}/users/save`, userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSynced(true);
      } catch (err) {
        toast.error("Error syncing user:", err);
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, synced, getToken, user, baseURL]);

  return null;
};

export default UserSyncHandler;
