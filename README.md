# CSAT Feedback & Thank You System (React Native + Expo Router)

This project is a **Customer Satisfaction (CSAT) Feedback System** built in **React Native** using **Expo (SDK 54)** and **Expo Router**.

It was developed as an **on-site interview task**, focusing on:
- clean UI
- validation rules
- conditional rendering
- component reuse
- API integration

---

## 🚀 Features

### ✅ Feedback Screen
- 1–5 **Star Rating**
- If rating is **<= 3**, user must select a **feedback reason** (mandatory)
- **Comments** input with **500 characters limit**
- **Tags** multi-select (maximum **3 tags**)
- Submit button enables only when inputs are valid
- Stylish UI with **pink background + card design + customer icon**

### ✅ Thank You Screen
- Shows different message based on rating:
  - **4–5**: Appreciation
  - **1–3**: Apology + Support option
- Displays user rating badge

---

## 🧱 Tech Stack
- React Native (Expo)
- Expo Router (file-based navigation)
- React Hook Form (form handling)
- Zod (validation schema)
- Axios (API calls)

---

## 📂 Folder Structure

```txt
csat-app/
 ┣ app/
 ┃ ┣ _layout.tsx
 ┃ ┣ index.tsx
 ┃ ┣ thankyou.tsx
 ┃ ┗ modal.tsx
 ┣ src/
 ┃ ┣ api/
 ┃ ┃ ┗ client.ts
 ┃ ┣ components/
 ┃ ┃ ┣ StarRating.tsx
 ┃ ┃ ┗ TagChips.tsx
 ┃ ┣ config/
 ┃ ┃ ┗ csatConfig.ts
 ┃ ┣ screens/
 ┃ ┃ ┣ FeedbackScreen.tsx
 ┃ ┃ ┗ ThankYouScreen.tsx
 ┃ ┣ styles/
 ┃ ┃ ┗ theme.ts
 ┃ ┗ validation/
 ┃   ┗ csatSchema.ts
 ┗ package.json

---

## 🔗 Live Demo
[Click here to open the project](https://csat-deepankar.netlify.app/)

