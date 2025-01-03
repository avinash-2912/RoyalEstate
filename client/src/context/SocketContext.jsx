import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const newSocket = io("https://royalestate-1.onrender.com", {
        query: { userId: currentUser.id },
      });
      setSocket(newSocket);

      return () => newSocket.disconnect(); // Cleanup
    }
  }, [currentUser]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        currentUser && socket.emit("newUser", currentUser.id);
      });
    }
  }, [socket, currentUser]);

  useEffect(() => {
    if (!currentUser && socket) {
      socket.disconnect();
      setSocket(null);
    }
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};