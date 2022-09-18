import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props | any, State> {
  constructor(props: ReactNode) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    const { children, fallback } = this.props;

    const { hasError } = this.state;
    if (hasError) {
      return fallback;
    }
    return children;
  }
}

export default ErrorBoundary;
