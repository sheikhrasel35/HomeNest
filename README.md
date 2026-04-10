🏡 HomeNest – Real Estate Platform (Next.js + Firebase Auth)
HomeNest is a modern real-estate web application built with Next.js (App Router),
Firebase Authentication, and a custom backend API.
Users can browse properties, view details, add their own listings, and manage them through protected pages.

Live Demo 👉 

🚀 Features


🌐 Public Pages
1.Beautiful Landing Page with 7 sections
2.Responsive Navbar with routes
3.Properties Listing Page (grid of cards)
4.Property Details Page
5.User Reviews & Testimonials
6.Clean Footer with social links

🔐 Authentication
1.Email/Password registration
2.Login with Google (Firebase Auth)
3.Client-side token stored in cookies

🔒 Protected Pages
Accessible only after login:

1.Add Property
2.My Properties
3.My Ratings
4.Delete & Update Properties
5.View individual property details

🛠️ Tech Stack

Frontend:
1.Next.js (App Router)
2.React
3.Firebase Authentication
4.Tailwind CSS
5.DaisyUI
6.SweetAlert2
7.React Hot Toast


Backend:
Custom Node.js server (Hosted on Vercel / Render)




src/
├── app/
│ ├── home/ # Homepage sections
│ ├── login/ # Login page + form
│ ├── register/ # Registration page
│ ├── my-properties/ # Protected page
│ ├── my-ratings/ # Protected page
│ ├── add-property/ # Protected page
│ ├── details/[id]/ # Property details
│ ├── firebase/
│ │ └── firebase.init.js
│ ├── context/AuthProvider.jsx
│ ├── layout.jsx
│ └── page.jsx
├── components/
├── styles/
└── .env.local

```
