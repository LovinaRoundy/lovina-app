import { useQuery } from "react-query";

const queryKey = "users";

const fetchUsers = async () => {
  const response = await fetch("/api/users");
  const users = await response.json();
  return users;
};

const UsersList = () => {
  const { data, isLoading, error } = useQuery(queryKey, fetchUsers);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const usersList = data.map((user) => user.name).join(", ");

  return <div>{usersList}</div>;
};
