import { useState, Suspense, use } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Profile from "./Profile.page";
import { getCachedUser } from "../../../services/auth.service";

const ProfileContainer = () => {
  const [userPromise] = useState(() => {
    const promise = getCachedUser();
    return promise;
  });

  const userData = use(userPromise);

  return (
    <div>
      ProfileContainer
      <ErrorBoundary fallback={<div>Error loading user data</div>}>
        <Suspense fallback={<div>Loading user...</div>}>
          <Profile userData={userData} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ProfileContainer;
