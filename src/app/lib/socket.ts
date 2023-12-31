import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://localhost:8001';

export const socket = io(URL);