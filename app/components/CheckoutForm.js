// components/CheckoutForm.jsx
"use client";

import { useState } from "react";

export default function CheckoutForm({ onSubmit, disabled }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ name, address, email });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>名前<label><input value={name} onChange={e=>setName(e.target.value)} required /></label></label>
      </div>
      <div>
        <label>住所<label><input value={address} onChange={e=>setAddress(e.target.value)} required /></label></label>
      </div>
      <div>
        <label>メール<label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label></label>
      </div>
      <button type="submit" disabled={disabled}>注文を確定する</button>
    </form>
  );
}
