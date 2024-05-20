export const formatDate = (dateString) => {
  if (!dateString) {
    return `-`;
  }
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatTime = (dateString) => {
  if (!dateString) {
    return `-`;
  }
  const date = new Date(dateString);
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");
  return `${hour}:${minute}:${second}`;
};

export const formatDateAndTime = (dateString) => {
  return new Date(dateString)
    .toISOString()
    .replace("T", " ")
    .replace("Z", " ")
    .replace(/\.\d{3}/, "");
};

export const hyphenFormatter = (value) => {
  const input = value.replace(/-/g, "").replace(/\D/g, "");
  let formattedInput;

  if (input.length <= 3) {
    formattedInput = input;
  } else if (input.length <= 7) {
    formattedInput = `${input.slice(0, 3)}-${input.slice(3)}`;
  } else if (input.length < 11) {
    formattedInput = `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(
      6,
      11
    )}`;
  } else if (input.length === 11) {
    formattedInput = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(
      7,
      12
    )}`;
  } else {
    formattedInput = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(
      7,
      11
    )}`;
  }

  return formattedInput;
};
