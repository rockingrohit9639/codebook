export const handleFriendshipStatus = (allFriends) => {
  const userID = JSON.parse(localStorage.getItem("userID"));

  return allFriends?.filter((friend) => friend.userID === userID)[0];
};
