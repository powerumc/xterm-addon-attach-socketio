/**
 * Copyright (c) 2019 The xterm-addon-attach-socketio.js. All rights reserved.
 * @license MIT
 *
 * Implements the attach method, that attaches the terminal to a SocketIo.Socket stream.
 */

import { Terminal, IDisposable } from "xterm";
import { IAttachAddonTerminal } from "xterm/lib/addons/attach/Interfaces";

interface IAttachSoketIoAddonTerminal extends IAttachAddonTerminal {
  __socketio: SocketIOClient.Socket;
  __getMessageSocketIo: (data: any) => void;
}


/**
 * Attaches the given terminal to the given socket.
 *
 * @param term The terminal to be attached to the given socket.
 * @param socket The socket to attach the current terminal.
 * @param d Whether the terminal should send data to the socket as well.
 * @param buffered Whether the rendering of incoming data should happen instantly or at a maximum
 * frequency of 1 rendering per 10ms.
 */
export function attach(term: Terminal, socket: SocketIOClient.Socket): void {
  const addonTerminal = <IAttachSoketIoAddonTerminal>term;
  addonTerminal.__socketio = socket;

  addonTerminal.__flushBuffer = () => {
    addonTerminal.write(addonTerminal.__attachSocketBuffer || "");
  };

  addonTerminal.__pushToBuffer = (data: string) => {
    if (addonTerminal.__attachSocketBuffer) {
      addonTerminal.__attachSocketBuffer += data;
    } else {
      addonTerminal.__attachSocketBuffer = data;
      addonTerminal.__flushBuffer && setTimeout(addonTerminal.__flushBuffer, 10);
    }
  };

  addonTerminal.__getMessageSocketIo = function(data: any): void {
    displayData((data || "").toString());
  };

  /**
  * Push data to buffer or write it in the terminal.
  * This is used as a callback for FileReader.onload.
  *
  * @param str String decoded by FileReader.
  * @param data The data of the EventMessage.
  */
  function displayData(str?: string, data?: string): void {
    addonTerminal.write(str || data || "");
  }

  addonTerminal.__sendData = (data: string) => {
    socket.send(data);
  };

  addonTerminal._core.register(addSocketListener(socket, "message", addonTerminal.__getMessageSocketIo));

  addonTerminal.__dataListener = addonTerminal.onData(addonTerminal.__sendData);
  addonTerminal._core.register(addonTerminal.__dataListener);

  addonTerminal._core.register(addSocketListener(socket, "close", () => detach(addonTerminal, socket)));
  addonTerminal._core.register(addSocketListener(socket, "error", () => detach(addonTerminal, socket)));
}

function addSocketListener(socket: SocketIOClient.Socket, type: string, handler: (this: SocketIOClient.Socket, data: string) => any): IDisposable {
  socket.addEventListener(type, handler);
  return {
    dispose: () => {
      if (!handler) {
        // Already disposed
        return;
      }
      socket.removeEventListener(type, handler);
    }
  };
}

/**
 * Detaches the given terminal from the given socket
 *
 * @param term The terminal to be detached from the given socket.
 * @param socket The socket from which to detach the current terminal.
 */
export function detach(term: Terminal, socket?: SocketIOClient.Socket): void {
  const addonTerminal = <IAttachSoketIoAddonTerminal>term;
  addonTerminal.__dataListener && addonTerminal.__dataListener.dispose();
  addonTerminal.__dataListener = undefined;

  socket = (typeof socket === "undefined") ? addonTerminal.__socketio : socket;

  if (socket) {
    addonTerminal.__getMessage && socket.removeEventListener("message", addonTerminal.__getMessage);
  }

  delete addonTerminal.__socket;
}


export function apply(terminalConstructor: typeof Terminal): void {
  /**
   * Attaches the current terminal to the given socket
   *
   * @param socket The socket to attach the current terminal.
   * @param bidirectional Whether the terminal should send data to the socket as well.
   * @param buffered Whether the rendering of incoming data should happen instantly or at a maximum
   * frequency of 1 rendering per 10ms.
   */
  (<any>terminalConstructor.prototype).attach = function (socket: SocketIOClient.Socket): void {
    attach(this, socket);
  };

  /**
   * Detaches the current terminal from the given socket.
   *
   * @param socket The socket from which to detach the current terminal.
   */
  (<any>terminalConstructor.prototype).detach = function (socket: SocketIOClient.Socket): void {
    detach(this, socket);
  };
}
