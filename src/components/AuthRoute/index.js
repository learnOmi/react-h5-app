import { Navigate, useLocation } from 'react-router-dom'
import { hasToken } from '@/utils/storage'

export default function AuthRoute({ children: Children }) {
    const location = useLocation();
    // const navigate = useNavigate();

    if (hasToken()) {
        return Children
    }
    else {
        //navigate('/login', {replace:true, state:{from: location.pathname}})
        return <Navigate to='/login'
            state={{ from: location.pathname }}
            replace />
    }

}
