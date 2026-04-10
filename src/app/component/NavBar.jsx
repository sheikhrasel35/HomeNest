"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  // ------------------------------
  // THEME FIX (No Hydration Error)
  // ------------------------------
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // ------------------------------
  // AUTH STATE
  // ------------------------------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    document.cookie = "firebaseToken=; Max-Age=0; path=/;";
    router.push("/");
  };

  // ------------------------------
  // Prevent hydration mismatch
  // ------------------------------
  if (!mounted) {
    return (
      <header className="w-full bg-base-100 shadow-md sticky top-0 z-50 h-16 flex items-center px-6">
        Loading...
      </header>
    );
  }

  return (
    <header className="w-full bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">

        <Link href="/" className="text-2xl font-extrabold text-primary">
          HomeNest
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/all-properties">All Properties</Link>
          <Link href="/add-property">Add Properties</Link>
          <Link href="/my-properties">My Properties</Link>
          <Link href="/my-ratings">My Ratings</Link>
        </nav>

        <div className="flex items-center gap-3">

          {/* THEME SWITCH */}
          <button className="btn btn-sm btn-outline" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* USER MENU */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full ring ring-primary ring-offset-2">
                  <img
                    src={user.photoURL || "https://i.pravatar.cc/100"}
                    alt={user.displayName || user.email}
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-56"
              >
                <li>
                  <div className="px-2 py-1 border-b mb-1">
                    <p className="font-semibold">{user.displayName || "User"}</p>
                    <p className="text-xs opacity-70">{user.email}</p>
                  </div>
                </li>

                <li><Link href="/my-properties">My Properties</Link></li>

                <li>
                  <button onClick={handleLogout} className="text-error">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden lg:flex gap-2">
              <Link className="btn btn-outline btn-sm" href="/login">Login</Link>
              <Link className="btn btn-primary btn-sm text-white" href="/register">Signup</Link>
            </div>
          )}

          {/* MOBILE MENU */}
          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>

            <ul tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56"
            >
              <li><Link href="/">Home</Link></li>
              <li><Link href="/all-properties">All Properties</Link></li>
              <li><Link href="/add-property">Add Properties</Link></li>
              <li><Link href="/my-properties">My Properties</Link></li>
              <li><Link href="/my-ratings">My Ratings</Link></li>

              {!user ? (
                <>
                  <li><Link href="/login">Login</Link></li>
                  <li><Link href="/register">Signup</Link></li>
                </>
              ) : (
                <li><button onClick={handleLogout}>Logout</button></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
