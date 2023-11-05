import dayjs from "dayjs";
import {
  getNounData,
  getNounSeedFromBlockHash,
  ImageData,
} from "@nouns/assets";
import { buildSVG } from "@nouns/sdk";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezonePlugin from "dayjs/plugin/timezone";
import utcPlugin from "dayjs/plugin/utc";
import { divide, multiply, round, startCase, truncate } from "lodash";
dayjs.extend(AdvancedFormat);
dayjs.extend(relativeTime);
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);
import { ReactNode } from "react";
import { isAddress } from "viem";
import Web3 from "web3";

import { ACTIONS } from "@/store/GlobalContext";
import { getStore } from "@/store/GlobalStore";
import { IToastType } from "@/store/reducers/popupStateReducer";
import { DEFAULT_TOKEN_DECIMALS } from "@/constants";

export const trimAddress = (val: string, charsToKeep: number) => {
  if (!val) {
    return;
  }
  if (val.length <= charsToKeep * 2) {
    return val; // Return the full string if it's shorter than what you want to keep
  }

  const firstChars = val?.substring(0, charsToKeep);
  const lastChars = val?.substring(val.length - charsToKeep, val.length);
  return firstChars + "..." + lastChars;
};

export const shortenAddress = (
  str?: string,
  isLengthier?: boolean,
  addLength = 15
) => {
  if (!str) {
    return "";
  }
  if (str && isLengthier) {
    return (
      str.substring(0, addLength) +
      "..." +
      str.substring(str.length - addLength, str.length)
    );
  } else if (str.length > 20) {
    return (
      str.substring(0, 5) + "..." + str.substring(str.length - 4, str.length)
    );
  } else return str;
};

export const formatDate = (
  str: string | number,
  isWithTime = false,
  isWithSuffix = false
) => {
  let format = "MMM DD, YYYY";
  if (isWithTime && isWithSuffix) {
    format = "MMM DD, YYYY h:mm A";
  } else if (isWithTime) {
    format = "MMM DD, YYYY";
  }
  return dayjs(str).format(format);
};

export const formatDateTime = (str: string) => {
  return dayjs(str).format("MMM DD, YYYY h:mm:ss A");
};

export const getCurrencyFormattedString = (
  val: number | string,
  decimals = 2,
  currency = "USD"
) => {
  if (typeof val === "string") {
    val = Number(val.replace(/[^0-9.-]+/g, ""));
  }

  // let currencyPrefix = "";
  let currencySuffix = "";
  if (val === 0 || !val) {
    return "$0";
  } else if (val < 0 || val < 1) {
    if (val < 0.01) {
      return "<$0.01";
    }
  } else if (val > 999999999) {
    val = val / 1000000000;
    currencySuffix = "B";
  } else if (val > 999999) {
    val = val / 1000000; // convert to M for number from > 1 million
    currencySuffix = "M";
  }
  // Added to round down the number
  const expo = Math.pow(10, decimals);
  val = Math.floor(val * expo) / expo;
  const _val = val.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: decimals,
    currencyDisplay: "symbol",
  });
  if (!_val.includes("$")) {
    return "$" + _val + " " + currencySuffix;
  }
  return _val + " " + currencySuffix;
};

export const isPositiveValue = (val: number) => {
  return val?.toString().includes("-") ? false : true;
};

export const radixFormat = (val: number | string) => {
  if (typeof val === "string") {
    val = Number(parseFloat(val).toFixed(2));
  }
  return val.toLocaleString("en", {
    minimumFractionDigits: 0,
  });
};

export const formatNumAbb = (num: number | string, fraction = 2) => {
  if (typeof num === "string") {
    num = Number(num);
  }
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: fraction,
  }).format(num);
};

export const getCurrentDates = () => {
  const todayDate = dayjs().format("YYYY-MM-DD");
  const yesterdayDate = dayjs().subtract(1, "days").format("YYYY-MM-DD");
  const daysAgo30 = dayjs().subtract(30, "days").format("YYYY-MM-DD");
  const tomorrowDate = dayjs().add(1, "days").format("YYYY-MM-DD");

  // Return the dates
  return {
    todayDate,
    yesterdayDate,
    tomorrowDate,
    daysAgo30,
  };
};

export const getDateFromTimeStamp = (timeStamp: string) => {
  return dayjs(timeStamp).format("MMM-DD-YYYY");
};

export const getUTCFromTimeStamp = (timeStamp: string) => {
  const currentTimezone = dayjs.tz.guess();
  const parsedDate = dayjs(timeStamp).tz(currentTimezone);
  const offsetMinutes = parsedDate.utcOffset();
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
  const offsetMinutesRemainder = Math.abs(offsetMinutes) % 60;
  const utcOffset =
    (offsetMinutes >= 0 ? "+" : "-") +
    offsetHours.toString().padStart(2, "0") +
    ":" +
    offsetMinutesRemainder.toString().padStart(2, "0");
  return dayjs(timeStamp).format("HH:mm:ss A") + ` (${utcOffset} UTC)`;
};

export const truncateText = (text = "", count = 22, separator = " ") => {
  if (text?.length < count) {
    return text;
  } else {
    return truncate(text, { length: count, separator: separator });
  }
};

export const getPercentage = (
  numerator: number,
  denominator: number,
  options = { decimal: 2 }
) => {
  if (denominator === 0) return 0;
  return Number(
    (divide(numerator, denominator) * 100).toFixed(options.decimal)
  );
};

export const tokenValueCalculation = (price: number, amount: number) => {
  return round(multiply(price, amount), 2);
};

export const getTransactionFee = (
  fee: string | number,
  price: string | number
) => {
  if (typeof fee === "string") {
    fee = Number(fee);
  }
  if (typeof price === "string") {
    price = Number(price);
  }
  return (fee / Math.pow(10, 18)) * price;
};

export const relativeTimeFromTimeStamp = (timestamp: string) => {
  return dayjs(timestamp).fromNow();
};

export const getGweiFromWei = (value?: string) => {
  if (!value) {
    return "";
  }
  return Web3.utils.fromWei(value, "gwei");
};

export const getTokenFormattedNumber = (
  value: number,
  decimals = 18,
  roundOff = true,
  fractions = 0
) => {
  const _decimals = decimals || 18;
  const _value = value || 0;
  const _expoValue = Math.pow(10, _decimals);
  let _calculated = _value / _expoValue;
  if (!roundOff) {
    return Number(_calculated);
  }
  let _decimalFixed = fractions;
  if (fractions == 0) {
    _decimalFixed = 2;
    if (_calculated < 100) {
      _decimalFixed = 6;
    }
  }
  const expo = Math.pow(10, _decimalFixed);
  _calculated = Math.floor(_calculated * expo) / expo;
  return Number(_calculated.toFixed(_decimalFixed));
};

export const getRouterStringValue = (val?: string[] | string) => {
  if (val) {
    return Array.isArray(val) ? val[0] : val;
  }
  return "";
};

export const getNounAvatar = (blockhash: string) => {
  const uniqueNumber = hashString(blockhash);
  const seed = getNounSeedFromBlockHash(uniqueNumber, padTo32Bytes(blockhash));
  const { parts, background } = getNounData(seed);
  const { palette } = ImageData; // Used with `buildSVG``
  const svgBinary = buildSVG(parts, palette, background);
  const svgBase64 = btoa(svgBinary);
  return `data:image/svg+xml;base64,${svgBase64}`;
};

function padTo32Bytes(hexAddress: string): string {
  // Remove the '0x' prefix if present
  let cleanHexAddress = hexAddress.startsWith("0x")
    ? hexAddress.substring(2)
    : hexAddress;

  // Check if the address is already 32 bytes (64 hex characters)
  if (cleanHexAddress.length === 64) {
    return "0x" + cleanHexAddress;
  }

  // Pad zeros to make it 32 bytes (64 hex characters)
  const paddingNeeded = 64 - cleanHexAddress.length;
  cleanHexAddress = "0".repeat(paddingNeeded) + cleanHexAddress;

  return "0x" + cleanHexAddress;
}
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  hash = Math.abs(hash);
  hash = hash % 1000000;
  if (hash < 1000) {
    hash += 1000;
  }
  return hash;
}

export const percentageDiff = (a: number, b: number) => {
  if (!a || !b) {
    return 0;
  }
  return round(100 * Math.abs((a - b) / ((a + b) / 2)), 2);
};

export const percentageDiffWithStats = (
  a: number | string,
  b: number | string
) => {
  let compare: "increase" | "decrease" | "same" = "increase";
  if (typeof a === "string") {
    a = Number(a);
  }
  if (typeof b === "string") {
    b = Number(b);
  }
  if (a == b) {
    compare = "same";
  } else if (a > b) {
    compare = "increase";
  } else if (a < b) {
    compare = "decrease";
  }

  return { data: percentageDiff(a, b), compare };
};

export const getTokenUSDValue = (
  tokenPrice = 0,
  value = 0,
  decimals = 18,
  roundOff = true,
  fractions = 0
) => {
  if (isNaN(tokenPrice) || isNaN(value)) {
    return {
      tokenValue: "",
      usdValue: "$0",
    };
  }
  const formattedTokenValue = getTokenFormattedNumber(
    value,
    decimals,
    roundOff,
    fractions
  );
  return {
    tokenValue: formattedTokenValue,
    usdValue: getCurrencyFormattedNumber(
      String(formattedTokenValue * tokenPrice)
    ),
  };
};
export const textHighlighter = (text = "", compareTo = "") => {
  const textParts = text.toString().split(new RegExp(`(${compareTo})`, "gi"));

  return textParts
    .map((part) =>
      part.toLowerCase() === compareTo?.toLowerCase()
        ? `<b class="bg-warning-500">${part}</b>`
        : part
    )
    .join("");
};
export const detectIfMac = () => {
  if (
    typeof window !== "undefined" &&
    window.navigator.userAgent.indexOf("Mac") != -1
  ) {
    return true;
  } else {
    return false;
  }
};

export const isValidEOAAddress = (address: string) => {
  if (!isAddress(address)) {
    return false;
  }
  return true;
};

export const isValidTransactionHash = (hash: string) => {
  const regex = /^0x([A-Fa-f0-9]{64})$/;
  return regex.test(hash);
};

export const isValidENSName = (name: string) => {
  const pattern = new RegExp(
    "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\\.)*" + // domain name
      "([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])\\.eth$", // domain ending with .eth
    "i"
  );
  return pattern.test(name);
};

export const isToday = (_str: string) => {
  const today = dayjs();
  return dayjs(_str).isSame(today, "day");
};

export const isYesterday = (_str: string) => {
  const yesterday = dayjs().subtract(1, "day");
  return dayjs(_str).isSame(yesterday, "day");
};

const CUSTOM_DATE_FORMAT = {
  ["8:02 PM"]: "LT",
  ["8:02:18 PM"]: "LTS",
  ["08/16/2018"]: "L",
  ["August 16, 2018"]: "LL",
  ["August 16, 2018 8:02 PM"]: "LLL",
  ["Aug 16, 2018"]: "ll",
  ["Thu, Aug 16, 2018 8:02 PM"]: "llll",
  ["Aug 2018"]: "MMMM YYYY",
};

export const getCustomFormattedTime = (
  timeStamp: string,
  dateFormat: keyof typeof CUSTOM_DATE_FORMAT
) => {
  return dayjs(timeStamp).format(CUSTOM_DATE_FORMAT[dateFormat]);
};

export const snakeCaseToNormal = (str: string) => {
  return startCase(str);
};

export const capitalizeFirstChar = (input: string): string => {
  if (input.length === 0) return input; // Handle empty string case
  return input.charAt(0).toUpperCase() + input.slice(1);
};

export const createLogoAvatar = (
  text: string,
  type = "medium",
  colorHex?: string
) => {
  let firstLetter = "";
  if (text.length > 0) {
    firstLetter = text.slice(0, 1).toUpperCase();
  }
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const img = document.createElement("img");
  switch (type) {
    case "large":
      canvas.width = 64;
      canvas.height = 64;
      ctx.font = "32px Inter, sans-serif";
      ctx.fillStyle = colorHex ? colorHex : "#64748b";
      ctx.textAlign = "center";
      ctx.fillText(firstLetter, 32, 42);
      img.src = canvas.toDataURL();
      return img.src;
    case "medium":
      canvas.width = 40;
      canvas.height = 40;
      ctx.font = "20px Inter, sans-serif";
      ctx.fillStyle = colorHex ? colorHex : "#64748b";
      ctx.textAlign = "center";
      ctx.fillText(firstLetter, 20, 27);
      img.src = canvas.toDataURL();
      return img.src;
    case "small":
      canvas.width = 24;
      canvas.height = 24;
      ctx.font = "14px Inter, sans-serif";
      ctx.fillStyle = colorHex ? colorHex : "#64748b";
      ctx.textAlign = "center";
      ctx.fillText(firstLetter, 12, 17);
      img.src = canvas.toDataURL();
      return img.src;
    case "xSmall":
      canvas.width = 16;
      canvas.height = 16;
      ctx.font = "10px Inter, sans-serif";
      ctx.fillStyle = colorHex ? colorHex : "#64748b";
      ctx.textAlign = "center";
      ctx.fillText(firstLetter, 8, 12);
      img.src = canvas.toDataURL();
      return img.src;
    default:
      break;
  }
};

export const getFixedValue = (value: number, toFix: number) => {
  return value.toFixed(toFix);
};

export const getCurrencyFormattedNumber = (
  val: number | string,
  decimals = 2,
  currency = "USD",
  ignoreSmallVal = false
) => {
  if (typeof val === "string") {
    val = Number(val);
  }
  // let currencyPrefix = "";
  let currencySuffix = "";
  if (val === 0 || !val) {
    return "$0";
  } else if (val < 0 || val < 1) {
    if (val < 0.01 && !ignoreSmallVal) {
      return "<$0.01";
    }
  } else if (val > 999999999) {
    val = val / 1000000000;
    currencySuffix = "B";
  } else if (val > 999999) {
    val = val / 1000000; // convert to M for number from > 1 million
    currencySuffix = "M";
  }
  // Added to round down the number
  const expo = Math.pow(10, decimals);
  val = Math.floor(val * expo) / expo;
  const _val = val.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: decimals,
    currencyDisplay: "symbol",
  });
  if (!_val.includes("$")) {
    return "$" + _val + currencySuffix;
  }
  if (decimals === 2 && _val.includes(".") && _val.endsWith(".00")) {
    return _val.slice(0, -3) + currencySuffix;
  }
  return _val + currencySuffix;
};

export const toastFlashMessage = (
  message: ReactNode | string,
  toastType: IToastType["toastType"],
  delay = 4000
) => {
  const _store = getStore();
  if (_store) {
    const { dispatch } = _store;

    dispatch({
      type: ACTIONS.SHOW_TOAST,
      payload: {
        message: message,
        toastType,
      },
    });

    setTimeout(function () {
      dispatch({
        type: ACTIONS.CLEAR_TOAST,
      });
    }, delay);
  }
};

export const trucateString = (val: string | undefined, length = 10) => {
  return truncate(val || "", {
    length,
    omission: "...",
  });
};

export const formatTokenAmount = (_amount: number | string | undefined) => {
  if (!_amount) return 0;
  if (typeof _amount === "string") {
    _amount = Number(_amount);
  }
  return Number(_amount.toFixed(DEFAULT_TOKEN_DECIMALS));
};
// // Function to save a list of objects to localStorage
export const saveToLocalStorage = (key: string, list: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

// // Function to retrieve a list of objects from localStorage
export const getFromLocalStorage = (key: string) => {
  try {
    const storedList = localStorage.getItem(key);
    return storedList ? JSON.parse(storedList) : undefined;
  } catch (error) {
    console.error("Error retrieving from localStorage:", error);
    return undefined;
  }
};

export const isVideo = (url: string) => {
  return !url ? false : /\.(mp4|mov|3gp|ogg)$/.test(url);
};
