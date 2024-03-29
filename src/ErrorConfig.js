import awsRum  from "./AwsConfig";
import React from "react";

class ErrorBoundary extends React.Component  {
      state = { hasError: false }
    
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
     console.log("Error has occured", error, errorInfo);
     awsRum.recordError(error);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
}
export default ErrorBoundary