import { ROLE } from '../constants/roles';
import { Navigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const PrivateRoute = ({
  children,
  roles,
  navigateToRouteIfNotAuthenticated
}: {
  children: JSX.Element;
  roles: Array<ROLE>;
  navigateToRouteIfNotAuthenticated: string;
}) => {
  const getUser = (): any => {
    let decodedToken = null;
    // token = localstorage.getitem --> then pass that token in jwt decode
    let token = localStorage.getItem("token");
    try {
      decodedToken = jwtDecode(token!)
    } catch { }
    const currentUser = decodedToken as any;

    return currentUser;
  }

  const location = useLocation();
  const user = getUser();

  localStorage.setItem("user", JSON.stringify!(user))

  const isAuthenticated: boolean = (user && roles.includes(user?.role)) ? true : false;

  if (!isAuthenticated) {
    return <Navigate to={navigateToRouteIfNotAuthenticated} state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;