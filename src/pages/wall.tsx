import React, { useState, useEffect, useRef } from "react";
import "./wall.scss";

type Message = {
  id: number;
  name: string;
  text: string;
  pageIndex: number;
  position: { top: number; left: number };
};

const CARD_WIDTH = 160;
const CARD_HEIGHT = 100;
const PAGE_SIZE = 8; // messages per page
const TRY_LIMIT = 500;
const BASE_PAGE_HEIGHT = 600;
const MARGIN = 16; // margin around each card
const GAP_THRESHOLD = 175; // new card must differ by at least 200 pixels in either top or left


function generateRandomPosition(
  pageIndex: number,
  existingPositions: { top: number; left: number }[]
) {
  const pageTop = pageIndex * BASE_PAGE_HEIGHT;
  let attempts = TRY_LIMIT;
  const minLeft = 33; // strictly > 32
  const maxLeft = 549; // strictly < 550
  const minTop = pageTop + MARGIN;
  const maxTop = pageTop + BASE_PAGE_HEIGHT - CARD_HEIGHT - MARGIN;

  while (attempts > 0) {
    // Generate integer values for left and top.
    const left = Math.floor(Math.random() * (maxLeft - minLeft + 1)) + minLeft;
    const top = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;

    // For each existing card on the same page, check that at least one coordinate
    // differs by at least GAP_THRESHOLD. If both differences are less than GAP_THRESHOLD,
    // the candidate is too close.
    const collision = existingPositions.some(pos => {
      return (Math.abs(top - pos.top) < GAP_THRESHOLD && Math.abs(left - pos.left) < GAP_THRESHOLD);
    });

    if (!collision) {
      return { top, left };
    }
    attempts--;
  }
  // fallbakc position if no valid candidate is found within TRY_LIMIT attempts.
  return { top: minTop, left: minLeft };
}

export default function Wall() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasPosted, setHasPosted] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showSwipeArrow, setShowSwipeArrow] = useState(false);

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [lastAddedId, setLastAddedId] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/messages", { cache: "no-store" });
        if (!res.ok) {
          console.error("GET /api/messages error:", res.status);
          return;
        }
        const { ipPosted, rows } = await res.json();
        setHasPosted(ipPosted);

        if (ipPosted) {
          setStatusMsg("thank you for your message!");
        }

        const loaded = rows.map((row: any) => ({
          id: row.id,
          name: row.name,
          text: row.text,
          pageIndex: row.page_index,
          position: { top: row.top, left: row.left }
        }));
        setMessages(loaded);
      } catch (err) {
        console.error("Failed to load messages:", err);
      } finally {
        setIsLoading(false);
        setShowSwipeArrow(true);
        const timer = setTimeout(() => {
          setShowSwipeArrow(false);
        }, 2500);
        return () => clearTimeout(timer);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (lastAddedId === null) return;
    const msg = messages.find(m => m.id === lastAddedId);
    if (msg && containerRef.current) {
      let scrollTop = msg.position.top - 100;
      let scrollLeft = msg.position.left - 50;
      if (scrollTop < 0) scrollTop = 0;
      if (scrollLeft < 0) scrollLeft = 0;

      const grid = containerRef.current;
      const maxScrollTop = grid.scrollHeight - grid.clientHeight;
      const maxScrollLeft = grid.scrollWidth - grid.clientWidth;
      if (scrollTop > maxScrollTop) scrollTop = maxScrollTop;
      if (scrollLeft > maxScrollLeft) scrollLeft = maxScrollLeft;

      grid.scrollTo({ top: scrollTop, left: scrollLeft, behavior: "smooth" });
    }
    setLastAddedId(null);
  }, [lastAddedId, messages]);

  useEffect(() => {
    const handleScroll = () => {
      setShowSwipeArrow(false);
    };

    const grid = containerRef.current;
    if (grid) {
      grid.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (grid) {
        grid.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  async function handlePost() {
    if (!name.trim() || !text.trim()) return;
    if (!containerRef.current) return;

    const pageIndex = Math.floor(messages.length / PAGE_SIZE);
    // filter to only consider positions on the same page.
    const samePagePositions = messages
      .filter(m => m.pageIndex === pageIndex)
      .map(m => m.position);

    const newPos = generateRandomPosition(pageIndex, samePagePositions);
    const newMsg = { name, text, pageIndex, position: newPos };

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMsg)
      });
      if (!res.ok) {
        if (res.status === 429) {
          console.warn("IP already posted, returning");
          setHasPosted(true);
          setStatusMsg("thank you for your message!");
        } else {
          console.error("POST /api/messages error:", res.status);
        }
        return;
      }
      const saved = await res.json();
      const finalMsg: Message = {
        id: saved.id,
        name: saved.name,
        text: saved.text,
        pageIndex: saved.page_index,
        position: { top: saved.top, left: saved.left }
      };
      setMessages(prev => [...prev, finalMsg]);
      setLastAddedId(finalMsg.id);

      setHasPosted(true);
      setStatusMsg("thank you for your message!");

      setName("");
      setText("");
    } catch (err) {
      console.error("Failed to post message:", err);
    }
  }

  const totalPages = Math.ceil(messages.length / PAGE_SIZE) || 1;
  const containerHeight = totalPages * BASE_PAGE_HEIGHT;

  return (
    <div className="wall-container">
      {isLoading ? (
        <div className="loading-sign">Loading...</div>
      ) : (
        <>
          <div
            className="messages-grid"
            ref={containerRef}
            style={{ height: containerHeight }}
          >
            {messages.map(msg => (
              <div
                key={msg.id}
                className="message-card"
                style={{ top: msg.position.top, left: msg.position.left }}
              >
                <span className="message-name">{msg.name}</span>
                <div className="message-text">{msg.text}</div>
              </div>
            ))}
          </div>
          {showSwipeArrow && <div className="swipe-arrow">→</div>}

          {!hasPosted ? (
            <div className="message-box">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <textarea
                placeholder="Leave a message..."
                value={text}
                onChange={e => setText(e.target.value)}
              />
              <button onClick={handlePost}>Post</button>
            </div>
          ) : (
            <div
              style={{
                fontFamily: "monospace",
                color: "#fff",
                position: "fixed",
                bottom: 20,
                right: 20,
                background: "rgba(0,0,0,0.35)",
                padding: "0.6rem",
                borderRadius: 10,
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
              }}
            >
              {statusMsg || "thank you for your message!"}
            </div>
          )}
        </>
      )}
    </div>
  );
}
