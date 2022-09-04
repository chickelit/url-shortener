import { FormEvent, useState } from "react";
import "../public/styles/home.css";

interface IForm {
  url: string;
}

function App() {
  const [form, setForm] = useState<IForm>({ url: "" });

  function onChange(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;

    setForm(() => ({ url: value }));
  }

  return (
    <div className="home">
      <h3>URL shortener</h3>
      <form className="main-form">
        <input
          type={"url"}
          name="url"
          onChange={onChange}
          placeholder="Link"
          value={form.url}
          required
        />
        <button type="submit">Shorten</button>
      </form>
    </div>
  );
}

export default App;
