/// <reference types="socket.io-client" />
import { Terminal } from "xterm";
export declare function attach(term: Terminal, socket: SocketIOClient.Socket): void;
export declare function detach(term: Terminal, socket?: SocketIOClient.Socket): void;
export declare function apply(terminalConstructor: typeof Terminal): void;
