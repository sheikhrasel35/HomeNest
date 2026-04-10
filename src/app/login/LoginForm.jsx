"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "@/app/firebase/firebase.init";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();

  const redirectPath = params.get("from") || "/";
  const [loading, setLoading] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  // ----------------------------
  // EMAIL LOGIN
  // ----------------------------
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);

      document.cookie = `firebaseToken=${result.user.accessToken}; path=/`;

      toast.success("Welcome back!");
      router.push(redirectPath);
    } catch (err) {
      toast.error("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // GOOGLE SIGN-IN
  // ----------------------------
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      document.cookie = `firebaseToken=${result.user.accessToken}; path=/`;
      router.push(redirectPath);
    } catch (err) {
      toast.error("Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse w-full">

        {/* LEFT TEXT SECTION */}
        <div className="text-center lg:text-left max-w-md">
          <h1 className="text-5xl font-bold text-primary">Welcome Back</h1>
          <p className="py-6 text-gray-500 leading-relaxed">
            Sign in to your{" "}
            <span className="font-semibold text-primary">HomeNest</span> account to manage, post, or explore real estate listings.
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="card bg-base-100 w-full max-w-sm shadow-xl border border-gray-200">
          <div className="card-body">

            {/* EMAIL LOGIN */}
            <form onSubmit={handleEmailLogin}>
              <fieldset className="fieldset space-y-3">

                <div>
                  <label className="label font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input input-bordered w-full"
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                </div>

                <div>
                  <label className="label font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="input input-bordered w-full"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary text-white w-full mt-4"
                  disabled={loading}
                >
                  {loading ? <span className="loading loading-spinner"></span> : "Login"}
                </button>
              </fieldset>
            </form>

            <div className="divider">OR</div>

            {/* GOOGLE LOGIN */}
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full"
              disabled={loading}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </button>

            <p className="mt-4 text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <Link href="/register" className="text-primary underline">
                Register
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
