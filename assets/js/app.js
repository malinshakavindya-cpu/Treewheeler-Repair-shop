document.getElementById('repairForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const customerName = document.getElementById('customerName').value.trim();
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const paintCost = parseFloat(document.getElementById('paintCost').value) || 0;
  const engineCost = parseFloat(document.getElementById('engineCost').value) || 0;
  const laborCost = parseFloat(document.getElementById('laborCost').value) || 0;

  const partsSelect = document.getElementById('partsSelect');
  let partsCost = 0;
  let selectedParts = [];
  for (let option of partsSelect.selectedOptions) {
    partsCost += parseFloat(option.value);
    selectedParts.push(option.text);
  }

  const total = paintCost + engineCost + laborCost + partsCost;

  const receiptText = `
Malinsha Motors - Bill Receipt
Customer Name: ${customerName}
Repair Period: ${startDate} to ${endDate}
Used Parts: ${selectedParts.join(', ') || 'None'}
Painting Cost: LKR ${paintCost.toFixed(2)}
Engine Repair Cost: LKR ${engineCost.toFixed(2)}
Labour Cost: LKR ${laborCost.toFixed(2)}
Parts Cost: LKR ${partsCost.toFixed(2)}
Total Cost: LKR ${total.toFixed(2)}
Thank you for choosing Malinsha Motors!
  `;

  const receiptHTML = `
    <div class="receipt-box">
      <h2>🧾 Malinsha Motors - Bill Receipt</h2>
      <p><strong>Customer Name:</strong> ${customerName}</p>
      <p><strong>Repair Period:</strong> ${startDate} to ${endDate}</p>
      <p><strong>Used Parts:</strong> ${selectedParts.join(', ') || 'None'}</p>
      <p><strong>Painting Cost:</strong> LKR ${paintCost.toFixed(2)}</p>
      <p><strong>Engine Repair Cost:</strong> LKR ${engineCost.toFixed(2)}</p>
      <p><strong>Labour Cost:</strong> LKR ${laborCost.toFixed(2)}</p>
      <p><strong>Parts Cost:</strong> LKR ${partsCost.toFixed(2)}</p>
      <hr />
      <h3>Total Cost: LKR ${total.toFixed(2)}</h3>
      <p>🙏 Thank you for choosing Malinsha Motors!</p>
    </div>
  `;

  document.getElementById('result').innerHTML = receiptHTML;
  document.getElementById('printBtn').style.display = 'block';
  document.getElementById('copyBtn').style.display = 'block';
  document.getElementById('whatsappShare').href = "https://wa.me/?text=" + encodeURIComponent(receiptText);
  document.getElementById('whatsappShare').style.display = 'inline-block';
});

document.getElementById('printBtn').addEventListener('click', function() {
  const printContent = document.getElementById('result').innerHTML;
  const win = window.open('', '', 'height=600,width=400');
  win.document.write('<html><head><title>Print Bill</title><style>body{font-family:sans-serif;padding:20px;} .receipt-box{border:2px solid #0072ff;padding:20px;border-radius:10px;}</style></head><body>');
  win.document.write(printContent);
  win.document.write('</body></html>');
  win.document.close();
  win.print();
});

document.getElementById('copyBtn').addEventListener('click', function() {
  const text = document.getElementById('result').innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("Bill copied to clipboard!");
  });
});