import { useRouteError } from "react-router-dom";
import Footer from './Footer'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  // TODO: make this look better
  return (
    <div id="error-page" style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div style={{ margin: 20 }}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
      <Footer />
    </div>
  );
}
