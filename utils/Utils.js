import moment from "moment-timezone";

export const formatToIST = (isoString) => {
    return moment(isoString).tz("Asia/Kolkata").format("MMMM Do YYYY, h:mm:ss A");
  };