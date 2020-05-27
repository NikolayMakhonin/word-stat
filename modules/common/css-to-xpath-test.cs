[TestClass]
public class CssToXPathConverterTest
{
	private int _counter;
	private Stopwatch _timer;

	private void test(IDictionary<string, string> convertSelectorsDict) {
		foreach(var item in convertSelectorsDict) {
			test(item.Key, @".//" + item.Value);
		}
	}

	private void test(string css, string checkXPath) {
		string xPath;
		try
		{
			_timer.Start();
			xPath = CssToXPathConverter.CssToXPath(css);
			_timer.Stop();
			_counter++;
		}
		catch (Exception ex) {
			throw;
		}
		if (checkXPath != xPath) {
			Assert.AreEqual(checkXPath, xPath);
		}
	}

	private void testSeparator(string css1, string css2, string xPath1, string xPath2, string cssSeparator, string xPathSeparator, Action<string, string> test) {
		test(css1 + cssSeparator + css2, xPath1 + xPathSeparator + xPath2);
		test(css1 + " " + cssSeparator + css2, xPath1 + xPathSeparator + xPath2);
		test(css1 + cssSeparator + " " + css2, xPath1 + xPathSeparator + xPath2);
		test(css1 + " " + cssSeparator + " " + css2, xPath1 + xPathSeparator + xPath2);

		test(css1 + "   " + cssSeparator + css2, xPath1 + xPathSeparator + xPath2);
		test(css1 + cssSeparator + "   " + css2, xPath1 + xPathSeparator + xPath2);
		test(css1 + "   " + cssSeparator + "   " + css2, xPath1 + xPathSeparator + xPath2);
	}

	private void testSeparators(string css1, string css2, string xPath1, string xPath2, IDictionary<string, Tuple<string, string>> convertSeparatorsDict, Action<string, string> test) {
		foreach (var item in convertSeparatorsDict) {
			testSeparator(css1, css2, xPath1, xPath2, item.Key, item.Value.Item1, test);
			testSeparator(css1, css2, xPath1, xPath2, "," + item.Key, "|" + item.Value.Item2, test);
			testSeparator(css1, css2, xPath1, xPath2, ", " + item.Key, "|" + item.Value.Item2, test);
			testSeparator(css1, css2, xPath1, xPath2, ",  " + item.Key, "|" + item.Value.Item2, test);
		}
	}

	private void testSeparators(IDictionary<string, string> convertSelectorsDict, IDictionary<string, Tuple<string, string>> convertSeparatorsDict) {
		foreach (var item1 in convertSelectorsDict) {
			foreach (var item2 in convertSelectorsDict) {
				testSeparators(item1.Key, item2.Key, item1.Value, item2.Value, convertSeparatorsDict, (css, xpath) =>
				{
					test(css, @".//" + xpath);
					foreach (var item3 in convertSelectorsDict) {
						testSeparators(css, item3.Key, xpath, item3.Value, convertSeparatorsDict, (css2, xpath2) => {
							test(css2, @".//" + xpath2);
						});
					}
				});
			}
		}
	}

	private IDictionary<string, string> _convertSelectorsDict = new Dictionary<string, string>();
	private IDictionary<string, Tuple<string, string>> _convertSeparatorsDict = new Dictionary<string, Tuple<string, string>>();

	private static readonly Regex _figureBraces = new Regex(@"\{([^\}]*)\}", RegexOptions.Compiled);

	public static string buildXPath(string pattern) {
		var xPath = _figureBraces.Replace(pattern, match =>
		{
			return CssToXPathConverter.ValueToLowerCase(match.Groups[1].Value);
		});

		return xPath;
	}

	[TestMethod]
	public void SimpleTests() {
		_counter = 0;
		_timer = new Stopwatch();

		//First separator
		test(@">QWe", buildXPath(@"./QWe"));
		test(@" >QWe", buildXPath(@"./QWe"));
		test(@" > QWe", buildXPath(@"./QWe"));
		test(@"+QWe", buildXPath(@"./following-sibling::*[1]/self::QWe"));
		test(@"~QWe", buildXPath(@"./following-sibling::*/self::QWe"));

		_convertSelectorsDict.Add(@"*", buildXPath(@"*"));
		_convertSelectorsDict.Add(@"QWe", buildXPath(@"QWe"));
		_convertSelectorsDict.Add(@"#QWe", buildXPath(@"*[{@id}=""qwe""]"));
		_convertSelectorsDict.Add(@".QWe", buildXPath(@"*[contains(concat("" "",normalize-space({@class}),"" ""),"" qwe "")]"));
		_convertSelectorsDict.Add(@"QWe:first-child", buildXPath(@"*[1]/self::QWe"));
		_convertSelectorsDict.Add(@"QWe:contains(WEr)", buildXPath(@"QWe[contains({text()},""wer"")]"));

		_convertSelectorsDict.Add(@"[QWe]", buildXPath(@"*[@QWe]"));

		_convertSelectorsDict.Add(@"[QWe=WEr]", buildXPath(@"*[{@QWe}=""wer""]"));
		_convertSelectorsDict.Add(@"[QWe='WEr']", buildXPath(@"*[{@QWe}=""wer""]"));
		_convertSelectorsDict.Add(@"[QWe=""WEr""]", buildXPath(@"*[{@QWe}=""wer""]"));

		_convertSelectorsDict.Add(@"[QWe*=WEr]", buildXPath(@"*[contains({@QWe},""wer"")]"));
		_convertSelectorsDict.Add(@"[QWe*='WEr']", buildXPath(@"*[contains({@QWe},""wer"")]"));
		_convertSelectorsDict.Add(@"[QWe*=""WEr""]", buildXPath(@"*[contains({@QWe},""wer"")]"));

		_convertSelectorsDict.Add(@"[-Q-W-e-*=""WEr""]", buildXPath(@"*[contains({@-Q-W-e-},""wer"")]"));

		_convertSelectorsDict.Add(@"[QWe^=WEr]", buildXPath(@"*[starts-with({@QWe},""wer"")]"));
		_convertSelectorsDict.Add(@"[QWe$=WEr]", buildXPath(@"*[substring({@QWe},string-length(@QWe)-string-length(""WEr"")+1)=""wer""]"));

		_convertSelectorsDict.Add(@"QWe1:has(QWe2)", buildXPath(@"QWe1[.//QWe2]"));
		_convertSelectorsDict.Add(@"QWe1:not(:has(QWe2))", buildXPath(@"QWe1[not(.//QWe2)]"));
		_convertSelectorsDict.Add(@"QWe1:has(>QWe2)", buildXPath(@"QWe1[./QWe2]"));
		_convertSelectorsDict.Add(@"QWe1:not([QWe2])", buildXPath(@"QWe1[not(@QWe2)]"));
		_convertSelectorsDict.Add(@"QWe1:not(.QWe2)", buildXPath(@"QWe1[not(contains(concat("" "",normalize-space({@class}),"" ""),"" qwe2 ""))]"));

		test(_convertSelectorsDict);

		test(@"QWe WEr", buildXPath(@".//QWe//WEr"));
		test(@"QWe>WEr", buildXPath(@".//QWe/WEr"));
		test(@"QWe+WEr", buildXPath(@".//QWe/following-sibling::*[1]/self::WEr"));
		test(@"QWe~WEr", buildXPath(@".//QWe/following-sibling::*/self::WEr"));
		test(@"QWe,WEr", buildXPath(@".//QWe|.//WEr"));
		test(@"QWe,>WEr", buildXPath(@".//QWe|./WEr"));
		test(@"QWe,+WEr", buildXPath(@".//QWe|./following-sibling::*[1]/self::WEr"));
		test(@"QWe,~WEr", buildXPath(@".//QWe|./following-sibling::*/self::WEr"));

		test(@"QWe1 > QWe2:has(>QWe3:has(QWe4:not(:has(+QWe5))))", buildXPath(@".//QWe1/QWe2[./QWe3[.//QWe4[not(./following-sibling::*[1]/self::QWe5)]]]"));


		_convertSeparatorsDict.Add(@" ", Tuple.Create(@"//", buildXPath(@".//")));
		_convertSeparatorsDict.Add(@">", Tuple.Create(@"/", buildXPath(@"./")));
		_convertSeparatorsDict.Add(@"+", Tuple.Create(@"/following-sibling::*[1]/self::", buildXPath(@"./following-sibling::*[1]/self::")));
		_convertSeparatorsDict.Add(@"~", Tuple.Create(@"/following-sibling::*/self::", buildXPath(@"./following-sibling::*/self::")));

		testSeparators(_convertSelectorsDict, _convertSeparatorsDict);

		Debug.WriteLine("Count tests: " + _counter);
		Debug.WriteLine("Total time: " + _timer.Elapsed);
		Debug.WriteLine("Operations per second: " + (_counter / _timer.Elapsed.TotalSeconds));
	}
}
