import {CssToXPathConverter} from "./css-to-xpath";

declare const assert: any

export class CssToXPathConverterTest {
    
    private _counter: number;
    // private _timer: Stopwatch;

    private testMap(convertSelectorsDict: Map<string, string>) {
        for (let item in convertSelectorsDict) {
            this.test(item[0], ".//" + item[1]);
        }

    }

    private test(css: string, checkXPath: string) {
        let xPath: string;
        try {
            // this._timer.Start();
            xPath = CssToXPathConverter.CaseSensitive.cssToXPath(css);
            // this._timer.Stop();
            this._counter++;
        } catch (ex) {
            throw ex
        }
        if (checkXPath != xPath) {
            assert.strictEqual(checkXPath, xPath);
        }
    }

    private testSeparator(css1: string, css2: string, xPath1: string, xPath2: string, cssSeparator: string, xPathSeparator: string, test: (css: string, xpath: string) => void) {
        this.test(css1 + cssSeparator + css2, xPath1 + xPathSeparator + xPath2);
        this.test(css1 + " "  + cssSeparator + css2, xPath1 + xPathSeparator + xPath2);
        this.test(css1 + cssSeparator + " " + css2, xPath1 + xPathSeparator + xPath2);
        this.test(css1 + " " + cssSeparator + " " + css2, xPath1 + xPathSeparator + xPath2);

        this.test(css1 + "   " + cssSeparator + css2, xPath1 + xPathSeparator + xPath2);
        this.test(css1 + cssSeparator + "   " + css2, xPath1 + xPathSeparator + xPath2);
        this.test(css1 + "   " + cssSeparator + "   " + css2, xPath1 + xPathSeparator + xPath2);
    }

    private testSeparators(css1: string, css2: string, xPath1: string, xPath2: string, convertSeparatorsDict: Map<string, [string, string]>, test: (css: string, xpath: string) => void) {
        for (let item in convertSeparatorsDict) {
            this.testSeparator(css1, css2, xPath1, xPath2, item[0], item[1][0], test);
            this.testSeparator(css1, css2, xPath1, xPath2, "," + item[0], "|" + item[1][1], test);
            this.testSeparator(css1, css2, xPath1, xPath2, ", " + item[0], "|" + item[1][1], test);
            this.testSeparator(css1, css2, xPath1, xPath2, ",  " + item[0], "|" + item[1][1], test);
        }
    }

    private testSeparatorsMap(convertSelectorsDict: Map<string, string>, convertSeparatorsDict: Map<string, [string, string]>) {
        for (let item1 in convertSelectorsDict) {
            for (let item2 in convertSelectorsDict) {
				this.testSeparators(item1[0], item2[0], item1[1], item2[1], convertSeparatorsDict, (css, xpath) =>
				{
					this.test(css, ".//" + xpath);
					for (let item3 in convertSelectorsDict) {
						this.testSeparators(css, item3[0], xpath, item3[1], convertSeparatorsDict, (css2, xpath2) => {
							this.test(css2, ".//" + xpath2);
						});
					}
				});
            }
        }
    }

    private _convertSelectorsDict: Map<string, string> = new Map<string, string>();
    private _convertSeparatorsDict: Map<string, [string, string]> = new Map<string, [string, string]>();

    public static buildXPath(pattern: string): string {
        let xPath = pattern.replace(/\{([^\}]*)\}/g, (_, g1) => {
			return CssToXPathConverter.ValueToLowerCase(g1)
		});
        return xPath;
    }

    // @TestMethod()
    public SimpleTests() {
        this._counter = 0;
        // this._timer = new Stopwatch();

        // First separator
        this.test(">QWe", CssToXPathConverterTest.buildXPath("./QWe"));
        this.test(" >QWe", CssToXPathConverterTest.buildXPath("./QWe"));
        this.test(" > QWe", CssToXPathConverterTest.buildXPath("./QWe"));
        this.test("+QWe", CssToXPathConverterTest.buildXPath("./following-sibling::*[1]/self::QWe"));
        this.test("~QWe", CssToXPathConverterTest.buildXPath("./following-sibling::*/self::QWe"));

        this._convertSelectorsDict.set("*", CssToXPathConverterTest.buildXPath("*"));
        this._convertSelectorsDict.set("QWe", CssToXPathConverterTest.buildXPath("QWe"));
        this._convertSelectorsDict.set("#QWe", CssToXPathConverterTest.buildXPath("*[{@id}=\"\"qwe\"\"]"));
        this._convertSelectorsDict.set(".QWe", CssToXPathConverterTest.buildXPath("*[contains(concat(\"\" \"\",normalize-space({@class}),\"\" \"\"),\"\" qwe \"\")]"));
        this._convertSelectorsDict.set("QWe:first-child", CssToXPathConverterTest.buildXPath("*[1]/self::QWe"));
        this._convertSelectorsDict.set("QWe:contains(WEr)", CssToXPathConverterTest.buildXPath("QWe[contains({text()},\"\"wer\"\")]"));

        this._convertSelectorsDict.set("[QWe]", CssToXPathConverterTest.buildXPath("*[@QWe]"));

        this._convertSelectorsDict.set("[QWe=WEr]", CssToXPathConverterTest.buildXPath("*[{@QWe}=\"\"wer\"\"]"));
        this._convertSelectorsDict.set("[QWe='WEr']", CssToXPathConverterTest.buildXPath("*[{@QWe}=\"\"wer\"\"]"));
        this._convertSelectorsDict.set("[QWe=\"\"WEr\"\"]", CssToXPathConverterTest.buildXPath("*[{@QWe}=\"\"wer\"\"]"));

        this._convertSelectorsDict.set("[QWe*=WEr]", CssToXPathConverterTest.buildXPath("*[contains({@QWe},\"\"wer\"\")]"));
        this._convertSelectorsDict.set("[QWe*='WEr']", CssToXPathConverterTest.buildXPath("*[contains({@QWe},\"\"wer\"\")]"));
        this._convertSelectorsDict.set("[QWe*=\"\"WEr\"\"]", CssToXPathConverterTest.buildXPath("*[contains({@QWe},\"\"wer\"\")]"));

        this._convertSelectorsDict.set("[-Q-W-e-*=\"\"WEr\"\"]", CssToXPathConverterTest.buildXPath("*[contains({@-Q-W-e-},\"\"wer\"\")]"));

        this._convertSelectorsDict.set("[QWe^=WEr]", CssToXPathConverterTest.buildXPath("*[starts-with({@QWe},\"\"wer\"\")]"));
        this._convertSelectorsDict.set("[QWe$=WEr]", CssToXPathConverterTest.buildXPath("*[substring({@QWe},string-length(@QWe)-string-length(\"\"WEr\"\")+1)=\"\"wer\"\"]"));

        this._convertSelectorsDict.set("QWe1:has(QWe2)", CssToXPathConverterTest.buildXPath("QWe1[.//QWe2]"));
        this._convertSelectorsDict.set("QWe1:not(:has(QWe2))", CssToXPathConverterTest.buildXPath("QWe1[not(.//QWe2)]"));
        this._convertSelectorsDict.set("QWe1:has(>QWe2)", CssToXPathConverterTest.buildXPath("QWe1[./QWe2]"));
        this._convertSelectorsDict.set("QWe1:not([QWe2])", CssToXPathConverterTest.buildXPath("QWe1[not(@QWe2)]"));
        this._convertSelectorsDict.set("QWe1:not(.QWe2)", CssToXPathConverterTest.buildXPath("QWe1[not(contains(concat(\"\" \"\",normalize-space({@class}),\"\" \"\"),\"\" qwe2 \"\"))]"));

        this.testMap(this._convertSelectorsDict);

        this.test("QWe WEr", CssToXPathConverterTest.buildXPath(".//QWe//WEr"));
        this.test("QWe>WEr", CssToXPathConverterTest.buildXPath(".//QWe/WEr"));
        this.test("QWe+WEr", CssToXPathConverterTest.buildXPath(".//QWe/following-sibling::*[1]/self::WEr"));
        this.test("QWe~WEr", CssToXPathConverterTest.buildXPath(".//QWe/following-sibling::*/self::WEr"));
        this.test("QWe,WEr", CssToXPathConverterTest.buildXPath(".//QWe|.//WEr"));
        this.test("QWe,>WEr", CssToXPathConverterTest.buildXPath(".//QWe|./WEr"));
        this.test("QWe,+WEr", CssToXPathConverterTest.buildXPath(".//QWe|./following-sibling::*[1]/self::WEr"));
        this.test("QWe,~WEr", CssToXPathConverterTest.buildXPath(".//QWe|./following-sibling::*/self::WEr"));

        this.test("QWe1 > QWe2:has(>QWe3:has(QWe4:not(:has(+QWe5))))", CssToXPathConverterTest.buildXPath(".//QWe1/QWe2[./QWe3[.//QWe4[not(./following-sibling::*[1]/self::QWe5)]]]"));


        this._convertSeparatorsDict.set(" ", ["//", CssToXPathConverterTest.buildXPath(".//")]);
        this._convertSeparatorsDict.set(">", ["/", CssToXPathConverterTest.buildXPath("./")]);
        this._convertSeparatorsDict.set("+", ["/following-sibling::*[1]/self::", CssToXPathConverterTest.buildXPath("./following-sibling::*[1]/self::")]);
        this._convertSeparatorsDict.set("~", ["/following-sibling::*/self::", CssToXPathConverterTest.buildXPath("./following-sibling::*/self::")]);

        this.testSeparatorsMap(this._convertSelectorsDict, this._convertSeparatorsDict);

        console.log("Count tests: " + this._counter)
        // console.log("Total time: " + this._timer.Elapsed)
        // console.log("Operations per second: "
        //                 + (this._counter / this._timer.Elapsed.TotalSeconds))
    }
}
