/** スプレッドシート */
const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(mainSheet);

/**
 * mian process
 */
function doGet() {

	var httpOF = HtmlService.createTemplateFromFile("home");
	httpOF.url = ScriptApp.getService().getUrl();
	httpOF.message = "";
	httpOF.messageType = "";
	httpOF.inputdata = "";
	return httpOF.evaluate();

}

/**
 * mian process
 */
function doPost(e) {

	var httpOF = HtmlService.createTemplateFromFile("home");
	httpOF.url = ScriptApp.getService().getUrl();
	httpOF.inputdata = e.parameter.WalletAddress;
	var endRow = ss.getLastColumn();
	var endoCol = ss.getLastRow();
	var messageType = "alert-danger";
	var message = [];

	// get wallet address
	var wa = e.parameter.WalletAddress;

	// check
	for (i = 2; i <= endRow; i++) {

		if (ss.getRange("C" + i).getValue() != wa) continue;

		for (t = 4; t <= endoCol; t++) {
			if (ss.getRange(1, t).getValue() == "") break;
			message.push(ss.getRange(1, t).getValue() + " : " + ss.getRange(i, t).getValue());
		}

		chFlag = true;
		messageType = "alert-primary";

		break;

	}

	// set message
	httpOF.messageType = messageType;
	httpOF.message = message.length > 0 ? "おめでとうございます！獲得ALは" + message.join(", ") + "です。" : "Walletが登録されていません。入力内容が正しいかご確認ください。";

	// return
	return httpOF.evaluate();

}

/**
 * Web URL
 * @returns URL
 */
function getGasUrl() {
	var url = ScriptApp.getService().getUrl();
	return url;
}
