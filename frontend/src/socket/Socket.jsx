import SocketIO from 'socket.io-client'
export const socket = SocketIO(import.meta.env.VITE_SOCKET_URL)