import { Dimensions } from "react-native";

export const { width: screenWidth, height: screenHeight } = Dimensions.get(
  "window"
);

export const NavNoneButton              = 0;
export const NavBackButton              = 1;
export const NavFilterButton            = 2;
export const NavOfflineButton           = 4;
export const NavCloseButton             = 8;
export const NavCloseTextButton         = 16;
export const NavMenuButton              = 32;
export const NavNotificationButton      = 64;
export const NavPinButton               = 128;
export const buttonTextFont = 14
export const headerHeight = 80;
export const menuHeight = 60;
export const viewHeight = screenHeight - headerHeight - menuHeight;

export const accentFont = {
  color:'#333333',
  // fontFamily:"Courier"
}
export const contentFont = {
  color:'#666666',
  // fontFamily:"Courier"
}

// export const background = require("../../public/images/back.jpg");
// export const logo_black = require("../../public/images/logo.png");
// export const logo_white = require("../../public/images/logo-white.png");
// export const face = require("../../public/images/face.jpg");
// export const face1 = require("../../public/images/face1.jpg");
// export const face2 = require("../../public/images/face2.jpg");
// export const face3 = require("../../public/images/face3.jpg");
// export const path = require("../../public/images/path.png");
// export const noUser = require("../../public/images/noUser.png");
// export const carIcon = require("../../public/images/car.png");