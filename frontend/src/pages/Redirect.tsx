import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { $axios } from "../utils/axios";
import "/public/styles/error-page.css";

export function Redirect() {
  const { key } = useParams();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await $axios.get(`/${key}`);

        setTimeout(() => {
          window.location.href = data.originalUrl;
        }, 5000);
      } catch (error) {
        setNotFound(true);
      }
    };

    fetchData();
  });

  return (
    <div className="error-page">
      {notFound ? (
        <div className="not-found-display">
          <h1 className="status-code">404</h1>
          <h3 className="status-text">Not found</h3>
          <p className="error-message">Shortened URL not found.</p>
        </div>
      ) : (
        <div className="loading-display">
          <h2 className="loading-message">Loading...</h2>
        </div>
      )}
    </div>
  );
}
