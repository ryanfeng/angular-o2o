/**
 * 
 */

function encryptedStr(paramStr, rsaKey) {
	setMaxDigits(130);
	// 第一个参数为加密指数、第二个参数为解密参数、第三个参数为加密系数
	key = new RSAKeyPair("10001", "", rsaKey);
	// 返回加密后的字符串
	return encryptedString(key, encodeURIComponent(paramStr));
}