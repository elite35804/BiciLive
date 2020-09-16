import { Platform} from 'react-native';
const isIOS = Platform.OS === "ios";
export const Oswald = isIOS ? 'Oswald' : 'oswald';
export const OswaldBold = isIOS ? 'Oswald-Bold' : 'oswald_bold';
export const UniSansBold = isIOS ? 'UniSansBold' : 'uni_sans_bold';
export const UniSansSemiBold = isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold';
export const UniSansHeavy = isIOS ? 'UniSansHeavy' : 'uni_sans_heavy';
export const UniSansRegular = isIOS ? 'UniSansRegular' : 'uni_sans_regular';
export const UniSansBook = isIOS ? 'UniSansBook' : 'uni_sans_book';
