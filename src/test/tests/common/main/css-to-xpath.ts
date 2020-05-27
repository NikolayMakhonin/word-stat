// TODO: move to separate module

// /* tslint:disable:no-useless-catch no-duplicate-string forin */
// import {cssToXPath, valueToLowerCase} from '../../../../../modules/common/css-to-xpath'
//
// declare const describe
// declare const it
// declare const xit
// declare const assert
//
// describe('common > main > css-to-xpath', function() {
// 	let _counter: number
//
// 	function testMap(convertSelectorsDict: Map<string, string>) {
// 		for (const item in convertSelectorsDict) {
// 			_test(item[0], './/' + item[1])
// 		}
// 	}
//
// 	function _test(css: string, checkXPath: string) {
// 		let xPath: string
// 		try {
// 			xPath = cssToXPath(css)
// 			_counter++
// 		} catch (ex) {
// 			throw ex
// 		}
// 		if (checkXPath !== xPath) {
// 			assert.strictEqual(checkXPath, xPath)
// 		}
// 	}
//
// 	function testSeparator(
// 		css1: string, css2: string,
// 		xPath1: string, xPath2: string,
// 		cssSeparator: string, xPathSeparator: string,
// 		test: (css: string, xpath: string) => void,
// 	) {
// 		test(css1 + cssSeparator + css2, xPath1 + xPathSeparator + xPath2)
// 		test(css1 + ' '  + cssSeparator + css2, xPath1 + xPathSeparator + xPath2)
// 		test(css1 + cssSeparator + ' ' + css2, xPath1 + xPathSeparator + xPath2)
// 		test(css1 + ' ' + cssSeparator + ' ' + css2, xPath1 + xPathSeparator + xPath2)
//
// 		test(css1 + '   ' + cssSeparator + css2, xPath1 + xPathSeparator + xPath2)
// 		test(css1 + cssSeparator + '   ' + css2, xPath1 + xPathSeparator + xPath2)
// 		test(css1 + '   ' + cssSeparator + '   ' + css2, xPath1 + xPathSeparator + xPath2)
// 	}
//
// 	function testSeparators(
// 		css1: string, css2: string,
// 		xPath1: string, xPath2: string,
// 		convertSeparatorsDict: Map<string, [string, string]>,
// 		test: (css: string, xpath: string) => void,
// 	) {
// 		for (const item in convertSeparatorsDict) {
// 			testSeparator(css1, css2, xPath1, xPath2, item[0], item[1][0], test)
// 			testSeparator(css1, css2, xPath1, xPath2, ',' + item[0], '|' + item[1][1], test)
// 			testSeparator(css1, css2, xPath1, xPath2, ', ' + item[0], '|' + item[1][1], test)
// 			testSeparator(css1, css2, xPath1, xPath2, ',  ' + item[0], '|' + item[1][1], test)
// 		}
// 	}
//
// 	function testSeparatorsMap(
// 		convertSelectorsDict: Map<string, string>,
// 		convertSeparatorsDict: Map<string, [string, string]>,
// 	) {
// 		for (const item1 in convertSelectorsDict) {
// 			for (const item2 in convertSelectorsDict) {
// 				testSeparators(item1[0], item2[0], item1[1], item2[1], convertSeparatorsDict, (css, xpath) =>
// 				{
// 					_test(css, './/' + xpath)
// 					for (const item3 in convertSelectorsDict) {
// 						testSeparators(css, item3[0], xpath, item3[1], convertSeparatorsDict, (css2, xpath2) => {
// 							_test(css2, './/' + xpath2)
// 						})
// 					}
// 				})
// 			}
// 		}
// 	}
//
// 	const _convertSelectorsDict: Map<string, string> = new Map<string, string>()
// 	const _convertSeparatorsDict: Map<string, [string, string]> = new Map<string, [string, string]>()
//
// 	function buildXPath(pattern: string): string {
// 		const xPath = pattern.replace(/{([^}]*)}/g, (_, g1) => {
// 			return valueToLowerCase(g1)
// 		})
// 		return xPath
// 	}
//
// 	it('base', function() {
// 		_counter = 0
//
// 		// First separator
// 		_test('>QWe', buildXPath('./QWe'))
// 		_test(' >QWe', buildXPath('./QWe'))
// 		_test(' > QWe', buildXPath('./QWe'))
// 		_test('+QWe', buildXPath('./following-sibling::*[1]/self::QWe'))
// 		_test('~QWe', buildXPath('./following-sibling::*/self::QWe'))
//
// 		_convertSelectorsDict.set('*', buildXPath('*'))
// 		_convertSelectorsDict.set('QWe', buildXPath('QWe'))
// 		_convertSelectorsDict.set('#QWe', buildXPath('*[{@id}=""qwe""]'))
// 		_convertSelectorsDict.set('.QWe', buildXPath('*[contains(concat("" "",normalize-space({@class}),"" ""),"" qwe "")]'))
// 		_convertSelectorsDict.set('QWe:first-child', buildXPath('*[1]/self::QWe'))
// 		_convertSelectorsDict.set('QWe:contains(WEr)', buildXPath('QWe[contains({text()},""wer"")]'))
//
// 		_convertSelectorsDict.set('[QWe]', buildXPath('*[@QWe]'))
//
// 		_convertSelectorsDict.set('[QWe=WEr]', buildXPath('*[{@QWe}=""wer""]'))
// 		_convertSelectorsDict.set("[QWe='WEr']", buildXPath('*[{@QWe}=""wer""]'))
// 		_convertSelectorsDict.set('[QWe=""WEr""]', buildXPath('*[{@QWe}=""wer""]'))
//
// 		_convertSelectorsDict.set('[QWe*=WEr]', buildXPath('*[contains({@QWe},""wer"")]'))
// 		_convertSelectorsDict.set("[QWe*='WEr']", buildXPath('*[contains({@QWe},""wer"")]'))
// 		_convertSelectorsDict.set('[QWe*=""WEr""]', buildXPath('*[contains({@QWe},""wer"")]'))
//
// 		_convertSelectorsDict.set('[-Q-W-e-*=""WEr""]', buildXPath('*[contains({@-Q-W-e-},""wer"")]'))
//
// 		_convertSelectorsDict.set('[QWe^=WEr]', buildXPath('*[starts-with({@QWe},""wer"")]'))
// 		_convertSelectorsDict.set('[QWe$=WEr]', buildXPath('*[substring({@QWe},string-length(@QWe)-string-length(""WEr"")+1)=""wer""]'))
//
// 		_convertSelectorsDict.set('QWe1:has(QWe2)', buildXPath('QWe1[.//QWe2]'))
// 		_convertSelectorsDict.set('QWe1:not(:has(QWe2))', buildXPath('QWe1[not(.//QWe2)]'))
// 		_convertSelectorsDict.set('QWe1:has(>QWe2)', buildXPath('QWe1[./QWe2]'))
// 		_convertSelectorsDict.set('QWe1:not([QWe2])', buildXPath('QWe1[not(@QWe2)]'))
// 		_convertSelectorsDict.set('QWe1:not(.QWe2)', buildXPath('QWe1[not(contains(concat("" "",normalize-space({@class}),"" ""),"" qwe2 ""))]'))
//
// 		testMap(_convertSelectorsDict)
//
// 		_test('QWe WEr', buildXPath('.//QWe//WEr'))
// 		_test('QWe>WEr', buildXPath('.//QWe/WEr'))
// 		_test('QWe+WEr', buildXPath('.//QWe/following-sibling::*[1]/self::WEr'))
// 		_test('QWe~WEr', buildXPath('.//QWe/following-sibling::*/self::WEr'))
// 		_test('QWe,WEr', buildXPath('.//QWe|.//WEr'))
// 		_test('QWe,>WEr', buildXPath('.//QWe|./WEr'))
// 		_test('QWe,+WEr', buildXPath('.//QWe|./following-sibling::*[1]/self::WEr'))
// 		_test('QWe,~WEr', buildXPath('.//QWe|./following-sibling::*/self::WEr'))
//
// 		_test('QWe1 > QWe2:has(>QWe3:has(QWe4:not(:has(+QWe5))))', buildXPath('.//QWe1/QWe2[./QWe3[.//QWe4[not(./following-sibling::*[1]/self::QWe5)]]]'))
//
// 		_convertSeparatorsDict.set(' ', ['//', buildXPath('.//')])
// 		_convertSeparatorsDict.set('>', ['/', buildXPath('./')])
// 		_convertSeparatorsDict.set('+', ['/following-sibling::*[1]/self::', buildXPath('./following-sibling::*[1]/self::')])
// 		_convertSeparatorsDict.set('~', ['/following-sibling::*/self::', buildXPath('./following-sibling::*/self::')])
//
// 		testSeparatorsMap(_convertSelectorsDict, _convertSeparatorsDict)
//
// 		console.log('Count tests: ' + _counter)
// 	})
//
// 	it('specific', function() {
// 		// assert.strictEqual(
// 		// 	cssToXPath('div:checked'),
// 		// 	'.//div[@checked]',
// 		// )
// 		// assert.strictEqual(
// 		// 	cssToXPath('div:has(input:checked)'),
// 		// 	'.//div[.//input[@checked]]',
// 		// )
// 		// assert.strictEqual(
// 		// 	cssToXPath('div:not(:checked)'),
// 		// 	'.//div[not(@checked)]',
// 		// )
//
// 		assert.strictEqual(
// 			cssToXPath('tr:contains(wer)', false),
// 			'.//tr[contains(text(),"wer")]',
// 		)
//
// 		assert.strictEqual(
// 			cssToXPath('tr:contains("wer")', false),
// 			'.//tr[contains(text(),"wer")]',
// 		)
//
// 		assert.strictEqual(
// 			cssToXPath('tr:not([debug_id=wer])', false),
// 			'.//tr[not(@debug_id="wer")]',
// 		)
//
// 		assert.strictEqual(
// 			cssToXPath('tr:not([debug_id=wer])'),
// 			'.//tr[not(translate(@debug_id,"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz")="wer")]',
// 		)
//
// 		assert.strictEqual(
// 			cssToXPath('tr:not([debug_id="wer"])'),
// 			'.//tr[not(translate(@debug_id,"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz")="wer")]',
// 		)
//
// 		assert.strictEqual(
// 			cssToXPath('tr:not(.class1):has(td:not(.class2))'),
// 			'.//tr[not(contains(concat(" ",normalize-space(translate(@class,"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"))," ")," class1 "))][.//td[not(contains(concat(" ",normalize-space(translate(@class,"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"))," ")," class2 "))]]',
// 		)
// 	})
// })
