import React, { useState, useEffect, useRef } from 'react';
import './wall.scss';

type Message = {
  id: number;
  name: string;
  text: string;
  position: { top: number; left: number };
  pageIndex: number;  // which page the message belongs to
};

const CARD_WIDTH = 160;
const CARD_HEIGHT = 100;
const PAGE_SIZE = 10;
const OVERLAP_THRESHOLD = 0;
const MARGIN = 12;
const TRY_LIMIT = 300;
const BASE_PAGE_HEIGHT = 600;

// A small helper to get bounding rect for overlap checks
function getRect(top: number, left: number): DOMRect {
  return {
    x: left,
    y: top,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    top,
    bottom: top + CARD_HEIGHT,
    left,
    right: left + CARD_WIDTH,
    toJSON() { return {}; }
  } as DOMRect;
}

function overlapArea(a: DOMRect, b: DOMRect): number {
  const xOverlap = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
  const yOverlap = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  return xOverlap * yOverlap;
}

function overlapsTooMuch(rectA: DOMRect, rectB: DOMRect, threshold: number): boolean {
  const area = overlapArea(rectA, rectB);
  return area > threshold * (CARD_WIDTH * CARD_HEIGHT);
}

function generateRandomPosition(
  pageIndex: number,
  existingPositionsOnPage: { top: number; left: number }[],
  containerWidth: number
) {
  const pageTop = pageIndex * BASE_PAGE_HEIGHT;
  let attempts = TRY_LIMIT;
  
  const effectiveCardWidth = CARD_WIDTH + MARGIN;
  const effectiveCardHeight = CARD_HEIGHT + MARGIN;

  while (attempts > 0) {
    const left = Math.random() * (containerWidth - effectiveCardWidth - 2 * MARGIN) + MARGIN;
    const top = Math.random() * (BASE_PAGE_HEIGHT - effectiveCardHeight - 2 * MARGIN)
             + (pageTop + MARGIN);

    const newRect = getRect(top, left);

    const collision = existingPositionsOnPage.some(pos => {
      const existingRect = getRect(pos.top, pos.left);
      return overlapsTooMuch(newRect, existingRect, OVERLAP_THRESHOLD);
    });

    if (!collision) {
      return { top, left };
    }
    attempts--;
  }
  // fallback if no spot found
  return { top: pageTop + MARGIN, left: MARGIN };
}

const Wall = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  // Track the ID of the newly added message so we can scroll to it
  const [lastAddedId, setLastAddedId] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('messages');
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  // Save to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  // Scroll to the newly added message (if any)
  useEffect(() => {
    if (lastAddedId === null) return;  // no new message
    const msg = messages.find(m => m.id === lastAddedId);
    if (msg && containerRef.current) {
      // Smooth‐scroll so user sees the card
      containerRef.current.scrollTo({
        top: msg.position.top - 50, // a small offset so it’s nicely visible
        left: 0,
        behavior: 'smooth'
      });
    }
    // Clear the ID so we don't keep re‐scrolling
    setLastAddedId(null);
  }, [lastAddedId, messages]);

  const handlePost = () => {
    if (!name.trim() || !text.trim()) return;
    if (!containerRef.current) return;

    // figure out which page the new card belongs to
    const pageIndex = Math.floor(messages.length / PAGE_SIZE);

    // get container width for random left
    const containerWidth = containerRef.current.offsetWidth;

    // gather positions of messages on the same page
    const samePagePositions = messages
      .filter(m => m.pageIndex === pageIndex)
      .map(m => m.position);

    // pick a random (top, left) in that page region
    const newPos = generateRandomPosition(pageIndex, samePagePositions, containerWidth);

    const newMsg: Message = {
      id: messages.length + 1,
      name,
      text,
      pageIndex,
      position: newPos
    };

    setMessages(prev => [...prev, newMsg]);
    setLastAddedId(newMsg.id); // remember the newly added message ID
    setName('');
    setText('');
  };

  // container height for all pages
  const totalPages = Math.ceil(messages.length / PAGE_SIZE) || 1;
  const containerHeight = totalPages * BASE_PAGE_HEIGHT;

  return (
    <div className="wall-container">
      <div 
        className="messages-grid"
        ref={containerRef}
        style={{ height: containerHeight }}
      >
        {messages.map(msg => (
          <div
            key={msg.id}
            className="message-card"
            style={{
              top: msg.position.top,
              left: msg.position.left,
            }}
          >
            <span className="message-name">{msg.name}</span>
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
      </div>

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
    </div>
  );
};

export default Wall;
