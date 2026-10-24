import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { expenseActions } from "../../store/expensesSlice";
export default function ProtectedRoute({children, roles}) {
    const {user, role } = useSelector((s) => s.auth);
    if (!user) return <Navigate to="/login" replace />;
    if (roles && !roles.includes(role)) return <Navigate to="/" replace />;
    return children;
}