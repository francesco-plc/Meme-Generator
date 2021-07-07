import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import image from '../images/weknowthatfeel.jpg'

/* Page Not Found Placeholder */
function PageNotFound() {
  const routerHistory = useHistory();

  const handleClick = () => {
    routerHistory.push('/');
  };

  return (
    <>
      <h1 className="below-nav text-center">Page Not Found</h1>
      <img src={image} className="notFound"/>
      <h4 className="text-center mt-1">
        I know, that's not what you where looking for...
        <br/>But you can always come back to the<br/>
        <Button variant="warning" className="button mt-1" onClick={handleClick}>Homepage</Button>
      </h4>
    </>
  );
}

export default PageNotFound;
