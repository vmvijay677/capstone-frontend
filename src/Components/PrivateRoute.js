import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <div>
            <Route
                {...rest}
                render={(props) => {
                    localStorage.getItem("authToken") ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/login" />
                    )
                }}
            />
        </div>
    );
};

