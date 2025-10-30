import type { Character } from "../../../models/profile.model";

interface ProfileProps {
  userData: Character;
}

const Profile = ({ userData }: ProfileProps) => {
  return (
    <div>
      <h2>{userData.name}</h2>
      <img src={userData.image} alt={userData.name} />
      <p>Status: {userData.status}</p>
      <p>Species: {userData.species}</p>
    </div>
  );
};

export default Profile;
