export interface ColorType {
	bgDefault: string;
	bgCard: string;
	borderDefault: string;
	textPrimary: string;
	textSub: string;
	textSelected: string;
	primary: string;
	highlightOrange: string;
	highlightGray: string;
	highlightPurple: string;
}

export interface FontStyle {
	fontSize: string;
	fontWeight: string;
}

export interface TypographyType {
    header: FontStyle;
    title: FontStyle;
    subTitle: FontStyle;
	subtitleb: FontStyle;
    contentBold: FontStyle;
    contentRegular: FontStyle;
    caption: FontStyle;
};
  
export interface ThemeType {
	color: ColorType;
	typography: TypographyType;
}
