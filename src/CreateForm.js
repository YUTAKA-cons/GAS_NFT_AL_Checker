/**
 * Create Form from Spreadsheet
 */
function createForm() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(formSheet);

  const formTitle = sheet.getRange("B2").getDisplayValue();
  const formDescription = sheet.getRange("B3").getDisplayValue();

  const firstRow = 5;
  const lastRow = sheet.getLastRow();

  const dataRows = lastRow - (firstRow - 1);

  var questionList = sheet.getRange(firstRow, 2, dataRows, 1).getDisplayValues();

  const form = FormApp.create(formTitle);

  form.setDescription(formDescription)
      .setLimitOneResponsePerUser(true);

  form.addMultipleChoiceItem()
      .setTitle(provider)
      .setChoiceValues(questionList.flat())
      .setRequired(true);

  form.addTextItem().setTitle(discordId).setRequired(true);
  form.addTextItem().setTitle(walletAddress).setRequired(true);

  // 作成したフォームの編集用URLをB3セルに書き込み
  sheet.getRange('B4').setValue(form.getEditUrl());
  console.log(form.getEditUrl())

  // メッセージボックスの表示
  Browser.msgBox('「' + formTitle + '」の作成が完了しました');

}