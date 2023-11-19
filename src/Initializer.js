/** init */
function onOpen() {

	// Propertieの確認
	let initFlag = PropertiesService.getScriptProperties().getProperty("initFlag");

	if (initFlag == null) {

		let ss = SpreadsheetApp.getActiveSpreadsheet();
		let sheet = SpreadsheetApp.getActiveSheet();

		// シート名設定
		sheet.setName(mainSheet);

		// ヘッダー・関数設定
		var headerCol = 1;

		sheet.getRange(1, headerCol).setValue("#");
		sheet.getRange(2, headerCol).setFormula('=ARRAYFORMULA(ROW($A2:$A)-1)');
		sheet.setColumnWidth(headerCol, 80);
		headerCol += 1;

		sheet.getRange(1, headerCol).setValue("datetime");
		headerCol += 1;

		sheet.getRange(1, headerCol).setValue("Provider");
		headerCol += 1;

		sheet.getRange(1, headerCol).setValue("Discord ID");
		headerCol += 1;

		sheet.getRange(1, headerCol).setValue("Wallet Address");
		sheet.setColumnWidth(headerCol, 300);
		headerCol += 1;

		sheet.getRange(1, headerCol).setValue("AL1");
		headerCol += 1;

		sheet.getRange(1, headerCol).setValue("AL2");
		headerCol += 1;

		sheet.getRange(1, headerCol).setValue("AL3");
		headerCol += 1;

		// ヘッダー：行固定・背景色設定
		sheet.setFrozenRows(1);
		sheet.getRange(1, 1, 1, sheet.getMaxColumns()).setBackground("#add6ff");
		sheet.getRange(1, 1, sheet.getLastRow(), sheet.getMaxColumns()).setVerticalAlignment("top");

		// シート追加
		ss.insertSheet()
		let sheet2 = SpreadsheetApp.getActiveSheet();
		sheet2.setName(settingSheet);

		// シート追加
		ss.insertSheet();
		let sheet3 = SpreadsheetApp.getActiveSheet();
		sheet3.setName(formSheet);
		sheet3.getRange("A1").setValue("Form Title");

		// Property設定
		PropertiesService.getScriptProperties().setProperty("initFlag", false);

	}

	// メニュー追加
	var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu("AL Menu");
  menu.addItem("認証", "main");
  menu.addItem("フォーム作成", "createForm");
  menu.addToUi(); 

}