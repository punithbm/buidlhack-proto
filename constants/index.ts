export const getStarted = [
  {
    id: 1,
    bg: "bg-blue-400",
    desc: "Instantly gift personalized cards, from 1500+ brands",
  },
  {
    id: 2,
    bg: "bg-green-400",
    desc: "Switch brands in a snap, even after receiving",
  },
  {
    id: 3,
    bg: "bg-yellow-300",
    desc: "Magically merge or split multiple gift cards",
  },
  {
    id: 4,
    bg: "bg-red-500",
    desc: "Switch locations seamlessly, to redeem anywhere",
  },
];
export const regExpression = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  digits: /^-{0,1}\d*\.{0,1}\d+$/,
};

export const errorCode = {
  name: {
    0: "",
    1: "Please enter your name",
    4: "",
  },
  nameObj: {
    requiredFlag: true,
  },

  email: {
    0: "",
    1: "Please enter your work email address",
    4: "Invalid email address, Please try again",
  },
  emailObj: {
    requiredFlag: true,
    regexPattern: regExpression.email,
  },
};

export const productName = "Clink Safe";
export const rainbowKitProjectId = "fb3037b60ba3165d90a7f1bb1a727cc5";
