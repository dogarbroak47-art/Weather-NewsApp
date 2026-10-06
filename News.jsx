import { useState, useEffect } from 'react'
import axios from 'axios';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");

  const NEWS_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const newsChange = (event) => {
    setKeyword(event.target.value)
  }

  const fetchApi = () => {
    if (keyword) fetchNews(keyword)
  }

  const fetchNews = async (cat = "general") => {
    let url = "";
    setLoading(true);
    setError("");

    try {
      // 1. General
      if (cat === "general") {
        url = `/news/v2/top-headlines?country=us&pageSize=9&apiKey=${NEWS_KEY}`;
      }
      // 2. Category
      else if (["health", "science", "technology", "business", "sports"].includes(cat)) {
        url = `/news/v2/top-headlines?category=${cat}&country=us&pageSize=9&apiKey=${NEWS_KEY}`;
      }
      // 3. Search
      else {
        url = `/news/v2/everything?q=${cat}&language=en&pageSize=9&apiKey=${NEWS_KEY}`;
      }

      const res = await axios.get(url);
      setNews(res.data.articles);
      console.log(res.data.articles);
    } catch (error) {
      console.log("Error in fetchNews:", error);
      setError("News load nahi ho rahi");
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <div className="news-container" style={{display:'flex'}} >
        <input type="text" placeholder='Enter Keyword(e.g pakistan)' value={keyword} onChange={newsChange} />
        <div style={{ padding:5 }} className="button">
          <button onClick={fetchApi}>Search</button>
        </div>
      </div>

      {loading && <p>Loading News...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <nav className="category-nav">
        <button onClick={() => fetchNews("general")}>General</button>
        <button onClick={() => fetchNews("sports")}>Sports</button>
        <button onClick={() => fetchNews("technology")}>Technology</button>
        <button onClick={() => fetchNews("business")}>Business</button>
        <button onClick={() => fetchNews("health")}>Health</button>
      </nav>

      <div className="news-list">
        {news.length === 0 &&!loading && <p>Not found</p>}
        {news.map((article, index) => (
          <div key={index} className="news-card">
            {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="news-image"
        />
      )}
            <h3>{article.title}</h3>
            <p>{article.description}</p>
             <p><b>Date:</b> {new Date(article.publishedAt).toLocaleDateString()}</p>
            <a href={article.url} target="_blank">Read More</a>
          </div>
        ))}
      </div>
    </>
  )
}

export default News;