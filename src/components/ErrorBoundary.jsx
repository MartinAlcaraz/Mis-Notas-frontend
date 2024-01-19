import { Component } from "react";
import ErrorComponent from "./ErrorComponent";

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        error: { message: "", stack: "" },
        info: { componentStack: "" }
    };

    static getDerivedStateFromError = error => {
        return { hasError: true };
    };

    componentDidCatch = (error, info) => {
        this.setState({ error, info });
    };

    render() {
        const { hasError, error, info } = this.state;
        const { children } = this.props;

        return hasError ?
            <ErrorComponent message={error.message} stack={error.stack} info={info.componentStack}/>
            : children;
    }
}

export default ErrorBoundary;