import { useContext, useState } from "react";
import { getUser, register } from "../WebApi";
import { setAuthToken } from "../utils";
import { FormCard } from "../components/Form";
import { ErrorMessage } from "../components/ErrorMessage";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { PageCenter } from "../components/Page";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts";

export default function RegisterPage() {
  const { setUser } = useContext(AuthContext);
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();
  const handleOnSubmit = (event) => {
    register(nickname, username, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);
      getUser().then((data) => {
        if (data.ok !== 1) {
          setAuthToken(null);
          return setErrorMessage(JSON.stringify(data));
        }
        setUser(data.data);
        history.push("/");
      });
    });
    event.preventDefault();
  };
  return (
    <PageCenter>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <FormCard onSubmit={handleOnSubmit}>
        <Input
          content="暱稱"
          type="text"
          name="nickname"
          alert={errorMessage ? true : false}
          value={nickname}
          handleOnChange={(value) => setNickname(value)}
        ></Input>
        <Input
          content="帳號"
          type="text"
          name="username"
          alert={errorMessage ? true : false}
          value={username}
          handleOnChange={(value) => setUsername(value)}
        ></Input>
        <Input
          content="密碼"
          type="password"
          name="password"
          alert={errorMessage ? true : false}
          value={password}
          handleOnChange={(value) => setPassword(value)}
        ></Input>
        <Button>{"註冊"}</Button>
      </FormCard>
    </PageCenter>
  );
}
