/**
 * Copyright (c) 2019 The xterm-addon-attach-socketio.js. All rights reserved.
 * @license MIT
 *
 * Implements the attach method, that attaches the terminal to a SocketIo.Socket stream.
 */

import { attach, detach, apply } from "./xterm-addon-attach-socketio";

apply((<any>window).Terminal);
