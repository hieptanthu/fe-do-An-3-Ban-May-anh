import io from "socket.io-client";
import { PORT_Soket } from "../comfig/config";

export const socket= io(PORT_Soket, {
    query: {
      userid: localStorage.getItem("_idUser"),
    },
  });
