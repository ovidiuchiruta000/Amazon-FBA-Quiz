var correct = [];
var wrong = [];

var wrong_answr = [];

var ul = document.getElementById('ul');
var btn = document.getElementsByClassName('hide');
var scoreCard = document.getElementById('scoreCard');
var quizBox = document.getElementById('questionBox');

var op1 = document.getElementById('op1');
var op2 = document.getElementById('op2');
var op3 = document.getElementById('op3');
var op4 = document.getElementById('op4');

var my_dict = {
  "User": "",
  "Score": "",
  "Correct_question_no": [],
  "Wrong question no": []
};

var app = {
  questions: [
            { q: 'On "Barcode Links Wrong Item" CTI we have the following Root Causes:', options: ['BLWI-Amazon fault-Incorrect barcode on the product', '"BLWI-Seller fault-Incorrect barcode on the product" and "BLWI-Seller fault-Item set up with incorrect barcode-Retail/3P"', 'BLWI-Amazon fault-Item set up with incorrect barcode-Retail/3P', 'All of these'], answer: 2 },

            { q: 'If you have stock also in other FCs for different MPs and our investigation confirms that the Detail Page or an Attribute needs to be corrected, you have to:', options: ['Update your MP first and after that you must raise a support ticket for the MPs that also have that issue', 'Update only your MP, because you are not authorized to raise issues on the other MPs too', 'Ask the OPS Team for any other Marketplace', 'Do not take any action'], answer: 1 },

            { q: 'A criteria for a Non-commingle Item could be:', options: ['Item is sold by Amazon and not by a 3P Seller', 'Items which belong to "Baby" ,"Media" and "Consumables" category will be considered as Non-Commingle even-though the condition is "New"', 'Item should be in a New Condition', 'This New Item should belong to a category except Baby products, Media & Consumables'], answer: 2 },

            { q: 'In an "ICQA Title Update" ticket we should go through the following steps after checking the images in RI:', options: ['Check the stock to see if is FBA/Retail => Check  the original EAN => Raise Bin Check => Do the corrections => Notify other MPs through the Email if found the same issue', 'Check  the original EAN => Do the corrections without Bin Check even if the stock is present on other MPs too', 'If the units are miss-labeled, no matching found and the total price of units is less than 50 euro set the stock as unsellable/defective', 'Check the stock to see if is FBA/Retail => Check  the original EAN => Raise Bin Check => Do the corrections => Raise support tt to other MPs if found the same issue'], answer: 3 },

            { q: 'In an "ICQA Title Update" ticket we should go through the following steps after checking the images in RI:', options: ['Check the stock to see if is FBA/Retail => Check  the original EAN => Raise Bin Check => Do the corrections => Notify other MPs through the Email if found the same issue', 'Check  the original EAN => Do the corrections without Bin Check even if the stock is present on other MPs too', 'If the total price of units is more than 50 euro set the stock as unsellable/defective', 'Check the stock to see if is FBA/Retail => Check  the original EAN => Raise Bin Check => Do the corrections => Raise support tt to other MPs if found the same issue'], answer: 4 },

            { q: 'Not On PO ticket and we have X0 label and right PO provided. What should we do?', options: ['Check if units match with DP, check if are expected units under X0, if not, will receive as overage/if the order is complete will receive the units as misship', 'Check if the units match with DP. If matching confirmed, we will receive the units on PO under X0 provided by FC', 'Check if units match with DP, check if are expected units under X0, if the order is complete will receive the units as overage/ if not, will receive as misship', 'Check if the units match with DP. If matching not confirmed but items are similar with a product already received on PO, we will remap with that X0/B0 and will receive the units on PO as sellable'], answer: 3 },

            { q: 'No PO Found ticket. We have X0 and BO provided, but no shipment info. What should we do?', options: ['Check if units match with DP, find seller ID using X0 code, spoof the seller account to find a right PO. Once done check if are expected units under X0, if not, will receive as overage/if the order is complete will receive the units as misship', 'Check if units match with DP, find seller ID using X0 code, spoof the seller account to find a right PO. Receive the units on any random PO found in FBA Shipments list as overage-unsellable', 'Ask the FC if possible to resolve this ticket and to close it as we cannot handle this kind of issue as per our SOP', 'Check if units match with DP, find seller ID using X0 code, spoof the seller account to find a right PO. Once done check if are expected units under X0, if not, will receive as misship/if the order is complete will receive the units as overage'], answer: 4 },

            { q: 'Not PO Found ticket and we have only BO provided and no shipment info. What should we do?', options: ['Check if units match with DP, find seller ID using X0 code, spoof the seller account to find a right PO. Once done check if are expected units under X0, if not, will receive as overage/if the order is complete will receive the units as misship', 'Check if units match with DP, find seller ID using X0 code, spoof the seller account to find a right PO. Receive the units on any random PO found in FBA Shipments list as overage-unsellable', 'If no mapping created, no seller ID found/more seller IDs found – proceed to Add Items App under B0 in Holding Account IOG (IT/ES)', 'Check if units match with DP, find seller ID using X0 code, spoof the seller account to find a right PO. Once done check if are expected units under X0, if not, will receive as misship/if the order is complete will receive the units as overage'], answer: 3 },

            { q: 'C-Ret FBA Wrong Label on item and we have X0, Order ID and stock to raise Bin Check. What should we do?', options: ['Checking images to see the issue, looking for EAN, if not present will do the investigation using information we have. Once done we will provide the resolution to FC', 'Checking images to see the issue, raise Bin Check if possible, look for EAN, if not present will do the investigation using information we have. Once done we will provide the resolution to FC', 'Checking images to see the issue, raise Bin Check if possible (if there is stock), look for EAN, if not present will do the investigation using information we have. Once done we will provide the resolution to FC and to other FCs having the same issue as per BC results.', 'Set the unit/units to unsellable in order to avoid another Customer Returns for the units involved in the ticket you have.'], answer: 3 },

            { q: 'Barcode links wrong item and we have B0, X0 quantity: 1 and Bin Check automatically raised. What should we do?', options: ['If no matching found and the price of item is less than 50 euro, we will set the item to unsellable as the threshold is not reached as per SOP.', 'If no matching found and the price of item is more than 50 euro, we will set the item to unsellable instructing the FCs from Bin Check which have this issue to proceed the same.', 'If no matching found and the price of item is less than 50 euro, we will flip the ticket to Seller Support to contact the seller in order to provide the correct FNSku.', 'If no matching found and the price of item is less than 50 euro, we will set the item to unsellable instructing the FCs from Bin Check which have this issue to proceed the same. If BC’s confirm the defect, we should go to SeSu, meaning that the entire stock is affected and possible that the seller will keep sending defect products if it is not informed.'], answer: 4 },

            { q: 'We have a PS - Barcode not linked ticket with valid EAN, ISD, PO and FC asks to link the Barcode and confirm ASIN and PO for Receive', options: ['If no FBA/Retail offers and shipments found we proceed telling to FC to SideLineApp under B0 which belongs with EAN provided.', 'If no FBA/Retail offers and shipments found we proceed telling to FC Associates to receive the units on a dummy PO we have for the specific FC.', 'No offers found as the units are in Pre-receiving. We check the information in Overview tab and will see the PO already provided even if FC asks to find a PO. The units will be received on PO if has been checked and information is correct.', 'If no FBA offers found we flip the ticket to Retail Team to investigate. As much as possible the units are retail and we are not authorized to take any action as per SOP.'], answer: 3 },

            { q: 'Transship request to move the units to a UK FC. How we proceed?', options: ['We approve the request as the information is clear, also came from a person with a higher level of knowledge than us.', 'We check about seller ID in seller’s account, the countries where the inventory is allowed to be stowed in. If units are allowed in UK only and the seller is related to the pan EU period, we approve the request.', 'We do not approve the request as we found some units in stock in our marketplace meaning the units could remain in that place and no transship needed.', 'We check about seller ID in seller’s account, the countries where the inventory is allowed to be stowed in. If units are allowed in UK only and the seller is not related to the pan EU period, we approve the request.'], answer: 4 },

            { q: 'We have a ticket with a number of units wrongly labeled and FCs where we raised Bin Check have the same issue. Following the Seller Support resolution we are informed the seller is unresponsive. How we proceed?', options: ['Re-assign the parent ticket to TAM and require them to insist on seller’s response.', 'Set the involved units as unsellable on the Marketplace you are working in.', 'Set the involved units as unsellable on the Marketplace you are working in but also on FCs where you raised Bin Check.', 'Set the involved units as unsellable on the Marketplace you are working in but also on FCs where you raised Bin Check, excepting UK Marketplaces.'], answer: 3 },

            { q: 'Which is the first step to follow  in No On PO tickets when we have all Shipment Info provided by FC?', options: ['Proceed with receiving the units on PO provided after checking the item from images if it match with DP.', 'Check with Dr. Sku tool the ASIN provided, to see if is linked or not.', 'Check if the items under X0 or B0 are already expected on PO to prevent receiving them wrongly as misship/overage.', 'Make sure the Shipment ID from images belongs to PO provided by the FC Associate as sometimes it could be wrongly provided in overview.'], answer: 4 },

            { q: 'How should we proceed when units have a barcode that links to a wrong ASIN, also the units have the price printed/labeled on box?', options: ['Relabel the units with the correct FNSku if found and set the items as sellable. It does not matter if price is present on the package as per FBA SOP', 'Relabel the units with the correct FNSku if found and set the items as sellable if the price labeled/printed matches with the offer from DP', 'Relabel the units with the correct FNSku if found and set the items as unsellable. The price labeled/printed is not allowed as per FBA SOP', 'Relabel the units with the correct FNSku if found and tell to FC to stick the X0 label over the price to cover it'], answer: 3 },

            { q: 'Focusing on details. We should update a size for a pair of sneakers and we have original barcode and correct size printed on shoe label:', options: ['We update the correct size as requested in Overview of ticket as per SOP.', 'We should check the entire title and details on Detail Page to find other possible mistakes as well and make corrections. Also check other MP to see if they also need updates.', 'If we found other mistakes too, will instruct the FC to raise a separate ticket for those units.', 'We set the units as unsellable to avoid possible customer returns due to confusing information on DP.'], answer: 2 },

            { q: 'How to proceed when we should make corrections on DP for a lingerie product when the size for specific country is mentioned on label?', options: ['We update as per EU size printed on label', 'We update as per Manufacturer Size we found on the label', 'We update as per size that belongs to specific country in our Marketplace', 'We add the EU size and the specific size for Marketplace we work on'], answer: 4 },

            { q: 'Image Update. You have a ticket where needed to remove the incorrect images that show the wrong volume 250 ml for a bottle', options: ['Check the original barcode, if no relabel needed, remove the incorrect images, once done make sure if the correct images are reflecting on DP', 'Check the images in the right tool, if the image you are looking for was not found, remove all images as all of them are incorrect', 'Check the images in the right tool, delete incorrect images, but if found some wrong images with retail contributions, remove them too', 'Check EAN on the units, delete incorrect FBA images, but if found some wrong images with Retail contributions, flip the ticket to Retail team to remove them and ask the ticket back'], answer: 4 },

            { q: 'Suppose we have a transship request for some units to a different country, but the corresponding ASIN is Manually yanked:', options: ['Approve the request as the units cannot be stowed in FC if the ASIN is Manually yanked', 'Check the seller account to see the countries that can store the units and approve the request while the seller is not enrolled in PAN EU Program', 'Check the seller account to see the countries that can store the units and approve the request while the seller is enrolled in PAN EU Program', 'Do not approve the request even if the units could be stowed in other countries, because of Manually yanked status'], answer: 2 },

            { q: 'An ASIN was merged into another one and we have a request to flip the units to new target ASIN. What are the steps in this case?', options: ['Check the target ASIN to see if published on Amazon website and approve the request.', 'Check the target ASIN, relevant images in Related Item tab and the mappings. If it matches then approve the request.', 'Deny the request as we do not have procedures for this kind of issue from FBA side.', 'Check the target ASIN, the stock, IOGs, relevant images in Related Item tab and the mappings. If it matches then approve the request.'], answer: 4 },

            { q: 'We had a food flag issue in a ticket, the product is food, but it cannot be stowed in FOOD area because of incorrect attribute. What are the correct steps?', options: ['Make the corrections accordingly and confirm that the issue has been fixed.', 'Check the item to see if matches with Detail Page, make the corrections, set the item back in stock if expiration date and ingredients list are accordingly.', 'Check the item to see if matches with Detail Page, make the corrections, check the linking in Dr. SKU and set the item back in stock if expiration date and ingredients list are accordingly.', 'Resolve the ticket as “False Alarm” as the Amazon does not stores the food or beverage products, excepting capsules (Vitamins, Calcium, Magnesium, Zinc etc.) and coffee packages.'], answer: 3 },

            { q: 'Assortment problem. You have a ticket where 2 units (black and blue) with same EAN are about to be received.  EAN links to only 1 ASIN  and on DP it is mentioned “assorted”. FC still cannot receive it. How do you proceed?', options: ['Go to TAM team in order to  provide the correct ASIN for each color.', 'Ask the FC to receive the black units on PO as sellable and the blue ones as unsellable.', 'Add all the units with SideLineApp under ther seller’s IOG.', 'Ask the FC to set all the units as unsellable, as it might be misleading for the customer.'], answer: 3 },

            { q: 'Hazmat issue: You had a tt  with  a smartphone to be received. You provided resolution for FC, but FC flip the tt back, saying that ASIN does not link, though all the flags are correctly set and EAN is linked. How do you proceed?', options: ['Contact OPS team with the specification that there is an issue with the ASIN.', 'Set the units as unsellable, since there is nothing that can be done from FBA team.', 'Check in Dr Sku if Hazmat attribute appears as  YES , after that check the pandash if the asin is classified. If it appears level 0, then go to Hazmat team to classify the item.', 'Ask FC to dispose the units, as FBA is unable to classify Hazmat ASIN. '], answer: 3 },

            { q: 'Hazmat issue: You had a tt with 2 perfumes to be received. You provided resolution for FC, but FC flip the tt back, saying that ASIN does not link, though EAN is linked. In Pandash tool, ASIN is classified with level 6. How do you proceed?', options: ['Contact OPS team with the specification that there is an issue with the ASIN.', 'Ask FC to check again the asin and to receive on PO.', 'Ask FC to destroy the units.', 'Contact SeSu team to inform the seller to create a removal order for the units.'], answer: 3 },

            { q: 'You receive a BC request from SeSu team for 100 units to be set as sellable. The stock is in quarantine status. How do you proceed?', options: ['Instruct FC to set the units as sellable, as they match with Detail Page.', 'Contact OPS team, as there is no SOP to cover this type of situation.', 'Set the blurb for quarantine situation and resolve the tt, since only Product Compliance team is able to change this status.', 'Close the ticket with no resolution, since FBA is not able to change the status of the units.'], answer: 3 },

            { q: 'You receive a Bin Check request from SeSu team for 12 units to be set as sellable, but you see the stock as sellable and FC does not confirm the defect. How do you proceed?', options: ['Open the images attached by FC , check the status of the units in FC research, make sure that units are correctly labelled and match dp, then instruct FC to resolve the tt, as false alarm.', 'Resolve the tt without investigating the tt, as FC mentioned that the units are correct and no need to double check.', 'Inform SeSu team anyway, that the units have no defect and wait for new instructions.', 'Flip the tt to OPS team, as the situation is not covered by SOP.'], answer: 1 },

            { q: 'We received a PS ticket from FC with 1 item that has no EAN/XO/BO label, no PO/ISD available. How you proceed?', options: ['Find a similar ASIN in the catalog, check all the FBA mappings for the ASIN, choose 2 randomly sellers and ask TAM to contact those sellers for confirmation ownership.', 'Find a similar ASIN in the catalog , check all the FBA mappings for the ASIN and ask TAM to contact all the sellers for confirmation ownership.', 'Find a similar ASIN in the catalog and instruct FC to SideLineApp as unsellable under that ASIN, in the FHI.', 'Find a similar ASIN in the catalog and instruct FC to SideLineApp as sellable under that ASIN.'], answer: 3 },

            { q: 'We have a PS ticket from FC with 1 item under 50 Euros that has no EAN/XO/BO label, but we have PO/ISD available. How you proceed?', options: ['Find a similar ASIN in the catalog and instruct FC to SideLineApp as unsellable under that ASIN, in the seller’s IOG.', 'Find a similar ASIN in the catalog and instruct FC to SideLineApp as sellable under that ASIN, in the seller’s IOG.', 'Check all the ASIN on PO/in the seller’s account, find if there is a match to your item in hand and receive under that ASIN; If there is no match, receive under a random ASIN from PO as unsellable.', 'Flip the ticket to TAM and ask to inform the seller about the issue.'], answer: 3 },

            { q: 'FC received 100 items under ASIN as packages of 10 products, but all of them have only 9. How do you proceed?', options: ['Ask FC to complete each package with 1 more unit and the rest of the packages that are not complete, to set as unsellable.', 'Set all the items as unsellable.', 'Set all the items as unsellable and contact Defect Reduction team in a separate ticket explaining the issue.', 'Flip the tt to OPS team, as the number of units is 100.'], answer: 3 },

            { q: 'We have 2 bottles of shampoo that do not have European business address. How do you proceed?', options: ['Ask the FC to set the units as unsellable.', 'Find The European business address on the brand’s site and ask the FC to relabel the units with that address.', 'Contact SeSu team to inform the seller about the issue.', 'Ask the FC to set as sellable, HPC products do not need European Business address, only Food items.'], answer: 1 }
  ],
  index: 0,
  load: function () {
    if (this.index <= this.questions.length - 1) {
      quizBox.innerHTML = this.index + 1 + ". " + this.questions[this.index].q;
      op1.innerHTML = this.questions[this.index].options[0];
      op2.innerHTML = this.questions[this.index].options[1];
      op3.innerHTML = this.questions[this.index].options[2];
      op4.innerHTML = this.questions[this.index].options[3];
      this.scoreCard();
    }
    else {
      quizBox.innerHTML = 'You have ' + this.score + ' correct and ' + wrong_answr.length + ' wrong answers ' + "The quiz answer has been submited! Download CSV only if with app does not have database api setup.";
      op1.style.display = "none";
      op2.style.display = "none";
      op3.style.display = "none";
      op4.style.display = "none";

      for (i = 0; i < btn.length; i++) {
        btn[i].style.display = "none";
      }
      exportData(wrong_answr, user);
    }
  },
  next: function () {
    this.index++;
    this.load();
  },
  check: function (ele) {

    var id = ele.id.split('');

    if (id[id.length - 1] == this.questions[this.index].answer) {
      this.score++;
      ele.className = "correct";
      // ele.innerHTML = "Correct";

      correct.push(id[id.length - 1]);

      this.scoreCard();
    }
    else {
      ele.className = "wrong";
      // ele.innerHTML = "Wrong";

      wrong.push(id[id.length - 1]);
      wrong_answr.push({ question: this.questions[this.index].q, selected: this.questions[this.index].options[id[2] - 1], selected_id: id[2], correct: this.questions[this.index].options[this.questions[this.index].answer - 1], correct_id: this.questions[this.index].answer });
    }
  },
  notClickAble: function () {
    for (let i = 0; i < ul.children.length; i++) {
      ul.children[i].style.pointerEvents = "none";
    }
  },

  clickAble: function () {
    for (let i = 0; i < ul.children.length; i++) {
      ul.children[i].style.pointerEvents = "auto";
      ul.children[i].className = ''

    }
  },
  score: 0,
  scoreCard: function () {
    scoreCard.innerHTML = this.questions.length + "/" + this.score;
  }
}

function button(ele) {
  app.check(ele);
  app.notClickAble();
}

function next() {
  app.next();
  app.clickAble();
}

function reload() {
  init_quiz();
}

function start()
{
  app.load();
}

 setTimeout(function({ start() }), 1000);

