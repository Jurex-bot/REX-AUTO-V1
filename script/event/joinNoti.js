module.exports.config = {
  name: "join",
  eventType: ['log:subscribe'],
  version: "1.0.0",
  credits: "Mirai-Team", // FIXED BY YAN MAGLINTE
  description: "GROUP UPDATE NOTIFICATION"
};

const ADMIN = 'Brad Jurex Aso';
const FB_LINK = 'https://www.facebook.com/jurex.aso';

const fs = require('fs-extra');
const { loadImage, createCanvas, registerFont } = require("canvas");
const request = require('request');
//const { join } = require('path');
const axios = require('axios');
const jimp = require("jimp")
const fontlink = 'https://drive.google.com/u/0/uc?id=1ZwFqYB-x6S9MjPfYm3t3SP1joohGl4iw&export=download'
let PRFX = `${global.config.PREFIX}`;

module.exports.circle = async (image) => {
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}

let suffix;

module.exports.run = async function({ api, event, Users }) {
  var fullYear = global.client.getTime("fullYear");
  var getHours = await global.client.getTime("hours");
  var session = `${getHours < 3 ? "midnight" : getHours < 8 ? "Early morning" : getHours < 12 ? "noon" : getHours < 17 ? "afternoon" : getHours < 23 ? "evening" : "midnight"}`
  const moment = require("moment-timezone");
  var thu = moment.tz('Asia/Manila').format('dddd');
  if (thu == 'Sunday') thu = 'Sunday'
  if (thu == 'Monday') thu = 'Monday'
  if (thu == 'Tuesday') thu = 'Tuesday'
  if (thu == 'Wednesday') thu = 'Wednesday'
  if (thu == "Thursday") thu = 'Thursday'
  if (thu == 'Friday') thu = 'Friday'
  if (thu == 'Saturday') thu = 'Saturday'
  const time = moment.tz("Asia/Manila").format("HH:mm:ss - DD/MM/YYYY");
  const hours = moment.tz("Asia/Manila").format("HH");
  const { commands } = global.client;
  const { threadID } = event;
  let threadInfo = await api.getThreadInfo(event.threadID);
  let threadName = threadInfo.threadName;
  if (!event.logMessageData.addedParticipants || !Array.isArray(event.logMessageData.addedParticipants)) {
