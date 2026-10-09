import { useState } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  const [emojis, setEmojis] = useState("😍,😘");
  const [notice, setNotice] = useState("");

  const validUrl = /^https:\/\/(www\.)?whatsapp\.com\/channel\/[A-Za-z0-9_-]+(?:\/\d+)?\/?$/.test(url.trim());

  const reactions = emojis
    .split(",")
    .map((emoji) => emoji.trim())
    .filter(Boolean);

  const validEmojis =
    reactions.length >= 1 &&
    reactions.length <= 4 &&
    reactions.every((emoji) => /\p{Extended_Pictographic}/u.test(emoji));

  function handleSubmit(event) {
    event.preventDefault();

    if (!validUrl) {
      setNotice("Masukkan URL WhatsApp Channel yang valid.");
      return;
    }

    if (!validEmojis) {
      setNotice("Masukkan 1–4 emoji, pisahkan dengan koma.");
      return;
    }

    setNotice("Form valid. Backend reaction belum dihubungkan.");
  }

  return (
    <main className="app">
      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-icon">R</span>
          <span>REACTRA</span>
        </a>
        <span className="coin">KOIN: 1</span>
      </header>

      <section className="hero">
        <span className="eyebrow">WHATSAPP CHANNEL TOOLS</span>
        <h1>
          React your
          <br />
          <span>channel.</span>
        </h1>
        <p>Kirim reaction ke WhatsApp Channel dengan mudah.</p>
      </section>

      <form className="reaction-card" onSubmit={handleSubmit}>
        <div className="card-heading">
          <span className="number">01</span>
          <h2>Channel Reaction</h2>
        </div>

        <label htmlFor="channel">URL Channel</label>
        <input
          id="channel"
          type="url"
          placeholder="https://whatsapp.com/channel/..."
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          required
        />

        <label htmlFor="emojis">Emoji Reaction</label>
        <input
          id="emojis"
          type="text"
          placeholder="😍,😘,😭,🥵"
          value={emojis}
          onChange={(event) => setEmojis(event.target.value)}
          required
        />

        <p className="hint">
          Pisahkan dengan koma. Maksimal 4 emoji.
        </p>

        <div className="preview">
          <span>PREVIEW</span>
          <div className="emoji-list">
            {reactions.slice(0, 4).map((emoji, index) => (
              <span className="emoji" key={`${emoji}-${index}`}>
                {emoji}
              </span>
            ))}
          </div>
        </div>

        <button type="submit">VALIDASI FORM ↗</button>

        {notice && (
          <p className="notice" role="status">
            {notice}
          </p>
        )}
      </form>

      <footer>
        <span>REACTRA © 2026</span>
        <span>BY MOONS</span>
      </footer>
    </main>
  );
         }
