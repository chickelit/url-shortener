import { FormEvent, useState } from "react";
import { IShortenedUrl } from "../Models/IShortenedUrl";
import { $axios } from "../utils/axios";
import "/public/styles/home.css";

interface IForm {
  url: string;
}

function Home() {
  const [form, setForm] = useState<IForm>({ url: "" });
  const [data, setData] = useState<IShortenedUrl>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  function onChange(event: FormEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;

    setForm(() => ({ url: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await $axios.post("/shortened-urls", {
        url: form.url,
        redirectUrl: "http://127.0.0.1:5173/",
      });

      setData(data);
    } catch (error: any) {
      setHasError(true);
    } finally {
      setIsLoading(false);
      setForm({ url: "" });
    }
  }

  return (
    <div className="home">
      <h3>URL shortener</h3>
      <form autoComplete="off" className="main-form" onSubmit={onSubmit}>
        <input
          className={hasError ? "has-error" : ""}
          type={"url"}
          name="url"
          onChange={onChange}
          placeholder="Link"
          value={form.url}
          required
        />
        <button type="submit">{isLoading ? "Shortening..." : "Shorten"}</button>
      </form>
      <div className="shortened-url">
        {data && <a href={data.shortenedUrl!} target={"_blank"}>{data.shortenedUrl}</a>}
      </div>
    </div>
  );
}

export default Home;
