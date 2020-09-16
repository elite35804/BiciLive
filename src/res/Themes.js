/**
 * Define theme for application.
 */
import {StyleSheet, Platform} from 'react-native';
import Colors from './Colors';
import Sizes from './Sizes';

const isIOS = Platform.OS === "ios";
/**
 * Rule
 * fonts start with fonts
 * color starts with color
 * dimensions start with sz
 * starts with szText : Font Size
 * starts with colorText : TextColor
 * height, width suffix
 * starts with name : use some thing starts with name
 * starts with style : Style, rarely used.
 * @type {Object}
 */
const baseTheme = {
    colorPrimary: Colors.primary,
    colorSecondary: Colors.secondary,
    colorThird: Colors.third,

    colorBorder: Colors.border,
    colorDescription: Colors.description,

    colorType: Colors.type,

    // Default font
    // font: 'Helvetica Neue',
    fontPrimary: isIOS ? 'Oswald' : 'oswald',
    fontPrimaryBold: isIOS ? 'Oswald-Bold' : 'oswald_bold',

    fontUniBold: isIOS ? 'UniSansBold' : 'uni_sans_bold',
    fontUniSemiBold: isIOS ? 'UniSansSemiBold' : 'uni_sans_semibold',
    fontUniHeavy: isIOS ? 'UniSansHeavy' : 'uni_sans_heavy',
    fontUniRegular: isIOS ? 'UniSansRegular' : 'uni_sans_regular',
    fontUniBook: isIOS ? 'UniSansBook' : 'uni_sans_book',

    // Default Text Color
    colorText: Colors.black,

    szTextDefault: Sizes.textDefault,

    szTextDescription: Sizes.textDescription,

    // Default Control Color (Icon Buttons)
    colorControl: Colors.black,

    // Icon Button Icon size
    szIconButton: Sizes.iconButton,

    szIconButtonPadding: Sizes.iconButtonPadding,

    // Navigation Bar Text Font Size
    szTextNavBar: Sizes.textNavBar,

    // Font Weight for Nav Bar
    fontWeightNavBar: 'bold',

    // Navigation Bar Text Color
    colorTextNavBar: Colors.black,

    // Navigation Bar Tint color
    colorNavBarTint: Colors.black,

    // Navigation Bar Background Color
    colorBgNavBar: Colors.navBarColor,

    // List View Section Header Color
    colorBgSectionHeader: Colors.bgSectionHeader,

    // List View Section Header Text Color
    colorTextSectionHeader: Colors.textSectionHeader,

    // List Divider color
    colorListDivider: Colors.listDivider,

    // Will be changed later according to react-native-size matters
    szTextSectionHeader: Sizes.textSectionHeader,

    // Will be changed later according to react-native-size matters
    szSectionHeader: Sizes.sectionHeader,

    // Default List View Height
    szListItemHeight: Sizes.listItem,

    // List Divider Height
    szListDivider: StyleSheet.hairlineWidth,

    // Default padding for list, ...
    szPaddingHorizontal: Sizes.hPadding,

    // Theme for TextInput & Text Area
    szInputContainerHeight: Sizes.inputContainerHeight,     // Input Container Height

    // Input Height
    szInputHeight: Sizes.inputHeight,              // Default Input Height

    // Text Area
    szInputAreaContainerHeight: Sizes.inputAreaContainerHeight,

    // Multline Input Area default height
    szInputAreaHeight: Sizes.inputAreaHeight,

    // Input Boxes Bottom Border Color
    colorInputBorder: Colors.inputBorder,            // Input Color Border

    // Text Input Title color
    colorTextInputTitle: Colors.inputTitle,

    // Text Input Title Size
    szTextInputTitle: Sizes.textInputTitle,                           // 12px

    // Avatar Size
    szAvatarSmall: Sizes.avatarSmall,                              // Avatar Size

    // Default Button Height
    szButton: Sizes.button,

    // DropDown Alert Configuration
    szTextDropAlertTitle: 16,               // Title Text Size

    szTextDropAlertMessage: 14,             // Message Text Size

    // Loading HUD Indicator Configuration
    nameHudIndicator: 'default',            // Check /src/components/controls/Indicator.js to check available indicators

    styleHudIndicator: {
        flex: 0
    },
};

export default {
    base: baseTheme
}

// Other themes will be exported later.
