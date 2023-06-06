import { useDispatch } from 'react-redux';
import { TypedDispatch } from '../redux/redux-store';

export const useAppDispatch = () => useDispatch<TypedDispatch>();
