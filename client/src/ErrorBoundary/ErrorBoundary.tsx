import * as Sentry from "@sentry/browser";
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null, eventId: null };
    this.clearState = this.clearState.bind(this);
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error, errorInfo });
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      scope.setTag("Custom-Tag", "ErrorBoundary");
      // scope.setLevel("Error");
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  clearState() {
    this.setState({ error: null, errorInfo: null, eventId: null });
  }

  render() {
    // if (this.state.error) {
    //   return <ErrorPage clearState={this.clearState} />;
    // }
    return this.props.children;
  }
}

// ErrorBoundary.propTypes = {
//   children: PropTypes.any,
// };

export default ErrorBoundary;
