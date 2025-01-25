function doPost(e) {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Order');
    var imageUrl = saveImageToDrive(data.image);
    var uid = Utilities.getUuid();
    var formattedOrderDetails = data.orderDetails.map(item => 
      `${item.name}(${item.price}฿)-QTY: ${item.quantity}`
    ).join(', ');

    // Append the form data to the sheet
    sheet.appendRow([
      uid,
      data.lineUid,
      data.name,
      "'" + data.telephone,
      data.address,
      imageUrl,
      formattedOrderDetails
    ]);
}

function saveImageToDrive(base64Image) {
  var blob = Utilities.newBlob(Utilities.base64Decode(base64Image.split(',')[1]), 'image/jpeg', 'order-slip.jpg');
  var folder = DriveApp.getFolderById('XXXXXXXXXX');
  var file = folder.createFile(blob);
  return file.getUrl();
}
