"use client";

import { faker } from "@faker-js/faker";
import Fuse, { FuseResult } from "fuse.js";
import Image from "next/image";
import { useState } from "react";

faker.seed(42);

type User = {
  name: string;
  email: string;
};

const users: User[] = Array.from({ length: 100 }).map(() => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
}));

const fuse = new Fuse(users, {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
  keys: ["name"],
});

/**
 * Search users by name
 * @param {string} query - The query to search users by
 * @return {Promise<{ name: string; email: string; }[]>} Search result
 */
const searchUsersByName = (query: string): Promise<User[]> =>
  new Promise((resolve) =>
    resolve(fuse.search(query).map((result) => result.item))
  );

// ---------------- API:END ---------------

export default function Home() {
  const [text, setText] = useState<string>("");

  const [users, setUsers] = useState<User[]>([]);

  const onChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setText(text);
    setUsers([]);
    searchUsersByName(text).then((result) => {
      setUsers(result);
    });
  };

  const onItemClicked = (name: string) => {
    setText(name);
    setUsers([]);
  };

  return (
    <div className="search-bar">
      <h1 className="search-bar__title">Search Users</h1>
      <input
        className="search-bar__input"
        type="text"
        onChange={onChanged}
        value={text}
      />
      <div className="search-bar__autocomplete-container" />
      {users.map((user) => {
        return <Item user={user} onClicked={onItemClicked} key={user.email} />;
      })}
    </div>
  );
}

const Item = ({
  user,
  onClicked,
}: {
  user: User;
  onClicked: (name: string) => void;
}) => (
  <div
    role="button"
    className="search-bar__autocomplete-item"
    onClick={() => {
      onClicked(user.name);
    }}
  >
    {user.name}
  </div>
);
