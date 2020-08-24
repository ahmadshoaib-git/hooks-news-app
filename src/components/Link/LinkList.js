import React, { useState, useEffect, useContext } from "react";
import FirebaseContext from "../../firebase/context";
import LinkItem from "./LinkItem";
function LinkList() {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  useEffect(() => {
    getLinks();
  }, []);

  const getLinks = () =>
    firebase.db.collection("links").onSnapshot(handleSnapshot);

  function handleSnapshot(snapshot) {
    const Links = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setLinks(Links);
  }
  return (
    <div>
      {links.map((link, index) => {
        return (
          <LinkItem
            key={link.id}
            showCount={true}
            link={link}
            index={index + 1}
          />
        );
      })}
    </div>
  );
}

export default LinkList;
