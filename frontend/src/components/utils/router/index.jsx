import SignedInRouter from './SignedInRouter'
import {useSelector,useDispatch} from 'react-redux'
import { loginUser } from '../../../redux/ducks/user';
import SignedOutRouter from './SignedOutRouter';

export default function Router() {
    const dispatch = useDispatch();
    const {isSignedIn} = useSelector(state => state.userReducer);
    if (sessionStorage.getItem('token') && sessionStorage.getItem('user_id')){
        return <SignedInRouter/>
    }
    else{
        return <SignedOutRouter/>
    }
    
}
