import { useContext } from 'react';
import { SignalRContext } from '../components/SignalRProvider';

const useSignalR = () => useContext(SignalRContext);

export default useSignalR;
