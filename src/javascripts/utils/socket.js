import io from 'socket.io-client';
import { API_ROOT } from '../constants/ApiRoot';

export default io(API_ROOT);
