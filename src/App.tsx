import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import throttle from "lodash/throttle";
import { useFetchCharacters } from "./hooks/fetch-characters";
import { Search, CharacterThumbnail } from "./components";

const App = () => {
  const { data, loading, error, fetch } = useFetchCharacters();
  React.useEffect(() => {
    fetch();
  }, [fetch]);

  const throttledFetch = React.useMemo(() => throttle(fetch, 500), [fetch]);

  return (
    <Container className="App">
      <Row className="my-5">
        <Col xs={{ span: 6, offset: 3 }}>
          <Search onChange={throttledFetch} />
        </Col>
        <Col xs={{ span: 6, offset: 3 }}>{loading && "Fetching..."}</Col>
      </Row>
      <div className="text-center">
        {error?.status === 404 ? (
          <Alert variant="danger">{error.data.error}</Alert>
        ) : (
          data.map((character) => (
            <div key={character.id} className="p-3 w-25 d-inline-block">
              <CharacterThumbnail data={character} />
            </div>
          ))
        )}
      </div>
    </Container>
  );
};

export default App;
