//CSS: http://www.stijit.com/html-css/30-css-selektorov-selectors
//XPath: https://msdn.microsoft.com/ru-ru/library/ms256122(v=vs.120).aspx
//convert: https://en.wikibooks.org/wiki/XPath/CSS_Equivalents
//convert: https://hakre.wordpress.com/2012/03/18/css-selector-to-xpath-conversion/
//convert: http://plasmasturm.org/log/444/
//convert: https://stackoverflow.com/questions/1604471/how-can-i-find-an-element-by-css-class-with-xpath
//convert: https://stackoverflow.com/questions/22436789/xpath-ends-with-does-not-work

/// <summary>
/// Convert CSS to XPath 1.0
/// </summary>
public class CssToXPathConverter
{
    /*

    .navbar-collapse .collapse
    //*[contains(concat(' ', normalize-space(@class), ' '), ' navbar-collapse ')]|//*[contains(concat(' ', normalize-space(@class), ' '), ' collapse ')]

    .navbar-collapse.collapse
    //*[contains(concat(' ', normalize-space(@class), ' '), ' navbar-collapse ')][contains(concat(' ', normalize-space(@class), ' '), ' collapse ')]

    */

    public static readonly CssToXPathConverter IgnoreCase = new CssToXPathConverter(true);
    public static readonly CssToXPathConverter CaseSensitive = new CssToXPathConverter(false);

    public bool UseIgnoreCase { get; set; }

    public CssToXPathConverter(bool ignoreCase = true) {
        UseIgnoreCase = ignoreCase;
    }

    private static Exception error(string message, string text, int index, int exclusiveEndIndex) {
        throw new Exception(string.Format("{0}\r\n{1}\r\n{2}", message, text.Substring(0, index), text.Substring(index, exclusiveEndIndex - index)));
    }

    /// <summary>
    /// Name of class, function or id
    /// </summary>
    private static bool isNameChar(char ch) {
        return ch >= 'a' && ch <= 'z' ||
            ch >= '0' && ch <= '9' ||
            ch >= 'A' && ch <= 'Z' ||
            ch == '_' ||
            ch == '-';
    }

    private static bool isTagFirstChar(char ch) {
        return ch >= 'a' && ch <= 'z' ||
            ch >= 'A' && ch <= 'Z' ||
            ch == '*';
    }

    private static bool isTagChar(char ch) {
        return ch >= 'a' && ch <= 'z' ||
            ch >= '0' && ch <= '9' ||
            ch >= 'A' && ch <= 'Z' ||
            ch == '_' ||
            ch == '-';
    }

    private static bool isNotQuote(char ch) {
        return ch != '\'' && ch != '"';
    }

    private static string readWord(Func<char, bool> charFilter, string text, ref int index, int exclusiveEndIndex) {
        var sb = new StringBuilder();

        var ch = text[index];
        sb.Append(ch);
        index++;

        while (index < exclusiveEndIndex) {
            ch = text[index];
            if (!charFilter(ch)) {
                break;
            }

            sb.Append(ch);

            index++;
        }

        //if (sb.Length == 0)
        //{
        //    throw throwError("Error read name: length == 0", text, index, exclusiveEndIndex);
        //}

        return sb.ToString();
    }

    private static string readToChar(char endChar, string text, ref int index, int exclusiveEndIndex, Func<char, bool> filter = null) {
        var sb = new StringBuilder();

        while (index < exclusiveEndIndex) {
            var ch = text[index];
            if (ch == endChar) {
                break;
            }

            if (filter == null || filter(ch)) {
                sb.Append(ch);
            }

            index++;
        }

        return sb.ToString();
    }

    private const string SEPARATOR_FIRST_DEFAULT = ".//";
    private const string SEPARATOR_DEFAULT = "//";

    //see: http://plasmasturm.org/log/444/
    private static string readSeparator(string text, ref int index, int exclusiveEndIndex, ref bool isStart) {
        var sb = new StringBuilder();

        bool newIsStart = false;
        string result = null;

        while (index < exclusiveEndIndex) {
            var ch = text[index];
            if (ch == ' ') {

            }
            else if (result == null) {
                if (ch == '>') {
                    result = isStart
                        ? "./"
                        : "/";
                }
                else if (ch == '+') {
                    result = isStart
                        ? "./following-sibling::*[1]/self::"
                        : "/following-sibling::*[1]/self::";
                }
                else if (ch == '~') {
                    result = isStart
                        ? "./following-sibling::*/self::"
                        : "/following-sibling::*/self::";
                }
                else if (ch == ',') {
                    result = "|";
                    newIsStart = true;
                }
                else
                {
                    break;
                }
            }
            else
            {
                break;
            }

            index++;
        }

        isStart = newIsStart;

        return result;
    }

    //private static string readBracesContent(char braceCharStart, char braceCharEnd)
    //{
    //    int countBraces = 0;

    //    var sb = new StringBuilder();

    //    for (var i = _index; i < _textLength; i++)
    //    {
    //        var ch = _text[i];
    //        if (ch == braceCharStart)
    //        {
    //            countBraces++;
    //        }
    //        else if (ch == braceCharEnd)
    //        {
    //            countBraces--;
    //            if (countBraces < 0)
    //            {
    //                var content = _text.Substring(_index, i - _index);
    //                _index = i + 1;
    //                return content;
    //            }
    //        }
    //    }

    //    throw throwError("Error read braces content: close brace not found");
    //}

    private static readonly object _locker = new object();
    private static readonly IDictionary<string, string> _cache = new Dictionary<string, string>();

    public string CssToXPath(string css, bool disableCache = false) {
        lock (_locker) {
            string result;
            if (disableCache || !_cache.TryGetValue(css, out result)) {
                var xPath = new StringBuilder();
                int index = 0;
                cssToXPath(xPath, css, ref index, css.Length);
                result = xPath.ToString();
                if (!disableCache) {
                    _cache.Add(css, result);
                }
            }
            return result;
        }
    }

    private const string UPPER_CASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private const string LOWER_CASE_CHARS = "abcdefghijklmnopqrstuvwxyz";

    private static StringBuilder appendLowerCaseValue(StringBuilder sb, string value) {
        sb.Append("translate(");
        sb.Append(value);
        sb.Append(",\"");
        sb.Append(UPPER_CASE_CHARS);
        sb.Append("\",\"");
        sb.Append(LOWER_CASE_CHARS);
        sb.Append("\")");

        return sb;
    }

    private StringBuilder appendValue(StringBuilder sb, string value) {
        if (UseIgnoreCase) {
            return appendLowerCaseValue(sb, value);
        }

        sb.Append(value);

        return sb;
    }

    public static string ValueToLowerCase(string value) {
        var sb = new StringBuilder();
        sb.Append(o => appendLowerCaseValue(o, value));
        return sb.ToString();
    }

    private void cssToXPath(StringBuilder xPath, string text, ref int index, int exclusiveEndIndex, bool writeStartSeparator = true, char braceStart = (char)0, char braceEnd = (char)0) {
        int countBraces = 0;

        bool isStart = true;
        string separator;

        if (writeStartSeparator) {
            //First separator
            separator = readSeparator(text, ref index, exclusiveEndIndex, ref isStart) ?? SEPARATOR_FIRST_DEFAULT;
            xPath.Append(separator);
        }
        else
        {
            isStart = false;
        }

        int selectorStartIndex = -1;

        while (index < exclusiveEndIndex) {
            var ch = text[index];

            //Tag
            if (isTagFirstChar(ch)) {
                if (selectorStartIndex < 0) {
                    selectorStartIndex = xPath.Length;
                }
                var tag = readWord(isTagChar, text, ref index, exclusiveEndIndex);
                xPath.Append(tag);
                continue;
            }

            //Id
            if (ch == '#') {
                if (selectorStartIndex < 0) {
                    selectorStartIndex = xPath.Length;
                    if (writeStartSeparator) xPath.Append("*");
                }
                index++;
                if (!isNameChar(text[index])) {
                    throw error("Error parse class name", text, index, exclusiveEndIndex);
                }
                var name = readWord(isNameChar, text, ref index, exclusiveEndIndex);
                xPath.Append("[")
                    .Append(o => appendValue(o, "@id"))
                    .Append("=\"")
                    .Append(name.ToLower())
                    .Append("\"]");
                continue;
            }

            //Class
            if (ch == '.') {
                if (selectorStartIndex < 0) {
                    selectorStartIndex = xPath.Length;
                    if (writeStartSeparator) xPath.Append("*");
                }
                index++;
                if (!isNameChar(text[index])) {
                    throw error("Error parse class name", text, index, exclusiveEndIndex);
                }
                var name = readWord(isNameChar, text, ref index, exclusiveEndIndex);
                //[contains(concat(' ', normalize-space(@class), ' '), ' navbar-collapse ')]
                xPath.Append("[contains(concat(\" \",normalize-space(")
                    .Append(o => appendValue(o, "@class"))
                    .Append("),\" \"),\" ")
                    .Append(name.ToLower())
                    .Append(" \")]");
                continue;
            }

            //Function
            if (ch == ':') {
                if (selectorStartIndex < 0) {
                    throw error("Function for empty selector", text, index, exclusiveEndIndex);
                }
                index++;
                if (!isNameChar(text[index])) {
                    throw error("Error parse func name", text, index, exclusiveEndIndex);
                }
                var name = readWord(isNameChar, text, ref index, exclusiveEndIndex);
                switch (name) {
                    case "first-child":
                        xPath.Insert(selectorStartIndex, "*[1]/self::");
                        break;
                    case "last-child":
                        xPath.Insert(selectorStartIndex, "*[last()]/self::");
                        break;
                    case "first":
                        xPath.Insert(0, "(");
                        xPath.Append(")[1]");
                        break;
                    case "last":
                        xPath.Insert(0, "(");
                        xPath.Append(")[last()]");
                        break;
                    case "has":
                        if (text[index] != '(') {
                            throw error("Brace not fount for function", text, index, exclusiveEndIndex);
                        }
                        index++;
                        xPath.Append("[");
                        cssToXPath(xPath, text, ref index, exclusiveEndIndex, true, '(', ')');
                        xPath.Append("]");
                        index++;
                        break;
                    case "not":
                        if (text[index] != '(') {
                            throw error("Brace not fount for function", text, index, exclusiveEndIndex);
                        }
                        index++;
                        xPath.Append("[not(");
                        if (text[index] == ':') {
                            index++;
                            var subFunc = readWord(isNameChar, text, ref index, exclusiveEndIndex);
                            if (subFunc != "has") {
                                throw error("Unsopported sub func: " + subFunc, text, index, exclusiveEndIndex);
                            }
                            index++;
                            cssToXPath(xPath, text, ref index, exclusiveEndIndex, true, '(', ')');
                            index++;
                            if (text[index] != ')') {
                                throw error("Close brace not fount", text, index, exclusiveEndIndex);
                            }
                            xPath.Append(")]");
                        }
                        else
                        {
                            xPath.Length--;
                            var contentIndex = xPath.Length;
                            cssToXPath(xPath, text, ref index, exclusiveEndIndex, false, '(', ')');
                            if (xPath[contentIndex] != '[') {
                                throw error("Unsupported not parameters", text, contentIndex, exclusiveEndIndex);
                            }
                            xPath.Length--;
                            xPath[contentIndex] = '(';
                            xPath.Append(")]");
                        }
                        index++;
                        break;
                    case "contains":
                        if (text[index] != '(') {
                            throw error("Brace not fount for function", text, index, exclusiveEndIndex);
                        }
                        index++;
                        var value = readToChar(')', text, ref index, exclusiveEndIndex);
                        xPath.Append("[contains(")
                            .Append(o => appendValue(o, "text()"))
                            .Append(",\"")
                            .Append(value.ToLower())
                            .Append("\")]");
                        index++;
                        break;
                    default:
                        throw error("Unknown func name: " + name, text, index, exclusiveEndIndex);
                }
                continue;
            }

            //Attributes
            if (ch == '[') {
                index++;
                if (selectorStartIndex < 0) {
                    selectorStartIndex = xPath.Length;
                    if (writeStartSeparator) xPath.Append("*");
                }
                if (!isNameChar(text[index])) {
                    throw error("Error parse attribute name", text, index, exclusiveEndIndex);
                }
                var attributeName = readWord(isNameChar, text, ref index, exclusiveEndIndex);
                ch = text[index];
                if (ch == '=') {
                    index++;
                    var value = readToChar(']', text, ref index, exclusiveEndIndex, isNotQuote);
                    xPath.Append("[")
                    .Append(o => appendValue(o, "@" + attributeName))
                    .Append("=\"").Append(value.ToLower()).Append("\"]");
                }
                else if (ch == ']') {
                    xPath.Append("[@").Append(attributeName).Append("]");
                }
                else
                {
                    index++;
                    if (text[index] != '=') {
                        throw error("Error parse attribute operator", text, index, exclusiveEndIndex);
                    }

                    index++;
                    var value = readToChar(']', text, ref index, exclusiveEndIndex, isNotQuote);

                    switch (ch) {
                        case '*':
                            //*[contains(@class, 'nav navbar-nav')]
                            xPath.Append("[contains(")
                                .Append(o => appendValue(o, "@" + attributeName))
                                .Append(",\"").Append(value.ToLower()).Append("\")]");
                            break;
                        case '~':
                            //[contains(concat(' ', normalize-space(@class), ' '), ' navbar-collapse ')]
                            xPath.Append("[contains(concat(\" \",normalize-space(")
                                .Append(o => appendValue(o, "@" + attributeName))
                                .Append("),\" \"),\" ")
                                .Append(value.ToLower())
                                .Append(" \")]");
                            break;
                        case '^':
                            //*[starts-with(@class, 'nav navbar-nav')]
                            xPath.Append("[starts-with(")
                                .Append(o => appendValue(o, "@" + attributeName))
                                .Append(",\"").Append(value.ToLower()).Append("\")]");
                            break;
                        case '$':
                            //*[substring(@class, string-length(@class) - string-length('right') + 1) = 'right']
                            xPath.Append("[substring(")
                                .Append(o => appendValue(o, "@" + attributeName))
                                .Append(",string-length(@")
                                .Append(attributeName)
                                .Append(")-string-length(\"")
                                .Append(value)
                                .Append("\")+1)=\"")
                                .Append(value.ToLower())
                                .Append("\"]");
                            break;
                        default:
                            throw error("Error parse attribute operator", text, index, exclusiveEndIndex);
                    }
                }

                index++;
                continue;
            }

            //Braces (for inner statements)
            if (ch == braceStart) {
                countBraces++;
            }
            else if (ch == braceEnd) {
                countBraces--;
                if (countBraces < 0) {
                    return;
                }
            }

            //Separator
            separator = readSeparator(text, ref index, exclusiveEndIndex, ref isStart);
            if (separator == null) {
                if (ch != ' ') {
                    throw error("Error parse separator", text, index, exclusiveEndIndex);
                }
                separator = SEPARATOR_DEFAULT;
            }
            xPath.Append(separator);

            if (isStart) {
                //First separator
                separator = readSeparator(text, ref index, exclusiveEndIndex, ref isStart) ?? SEPARATOR_FIRST_DEFAULT;
                xPath.Append(separator);
            }


            selectorStartIndex = -1;
        }
    }
}