let comment = [
  {
    user: "/assets/images/user-1.svg",
    name: "Chuks",
    time: "2 hours ago",
    comment: "This looks amazing! Can't wait to contribute.",
  },
  {
    user: "/assets/images/user-2.svg",
    name: "Sarah",
    time: "1 hour ago",
    comment: "Such a thoughtful wishlist! 🎉",
  },
];
let likes = [
  "/assets/images/user-1.svg",
  "/assets/images/user-2.svg",
  "/assets/images/user.svg",
];

comment = [...comment, ...comment, ...comment];

let wishlist = [
  {
    image: "/assets/images/wishlist-1.svg",
    price: "$150",
    name: "Tjaay Birthday wishlist",
    user: "/assets/images/user-1.svg",
    likes,
    description:
      "Join me in celebrating Tjaay's special day! Help us make it memorable by contributing to this wishlist.",
    gift: { progress: 400, target: 1000 },
    comment,
    id: 1,
  },
  {
    image: "/assets/images/wishlist-2.jpg",
    price: "$150",
    name: "Sarah's Dream Wishlist",
    user: "/assets/images/user-2.svg",
    likes,
    description:
      "Help Sarah achieve her dreams! Every contribution counts towards making her wishes come true.",
    gift: { progress: 750, target: 1200 },
    comment,
    id: 2,
  },
];

let events = [
  {
    image: "/assets/images/event.svg",
    days: "10",
    name: "Sarah Birthday",
    user: "/assets/images/user-2.svg",
    date: "April 1, 2025",
    status: "Online",
    RSVP_count: 10,
    description:
      "Sarah's turning another fabulous year older! 🎉 Browse her wishlist, pick a gift she'll love, and help make her day sparkle.",
    tagged: likes,
    gift: { progress: 400, target: 1000 },
    id: 1,
  },
];

wishlist = [...wishlist, ...wishlist, ...wishlist];
events = [...events, ...events, ...events];

const accounts = [
  {
    avatar: "/assets/images/user-1.svg",
    name: "Samuel Ngene",
    username: "cermuel",
  },
  {
    avatar: "/assets/images/friend.svg",
    name: "John Doe",
    username: "john",
  },
  {
    avatar: "/assets/images/user.svg",
    name: "Jane Doe",
    username: "jane",
  },
  {
    avatar: "/assets/images/user-2.svg",
    name: "New User",
    username: "user",
  },
];

const contributions = [
  {
    name: "Tjaay Birthday wishlist",
    gift: {
      progress: 400,
      target: 1000,
    },
  },
  {
    name: "Sandra Birthday wishlist",
    gift: {
      progress: 700,
      target: 900,
    },
  },
];

export const constants = {
  wishlist,
  events,
  accounts,
  contributions,
};
