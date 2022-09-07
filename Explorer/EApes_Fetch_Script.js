//recent ape transactions 
function GetRecentApeTransactions(){
  document.getElementById("demo1").innerHTML="Processing request <i style='color:blue; font-size:24px' class = 'fa fa-circle-o-notch fa-spin'></i> Please allow up to <b>10 seconds</b> for this specific request";  
  //var address = String(copyText.value);
  async function GetRecent(){
    const ErdEndpointUrl = "https://api.elrond.com/transactions?size=650&token=EAPES-8f3c1f&withScamInfo=false";
    const responce = await fetch(ErdEndpointUrl);
    const checker = responce.status
    const data = await responce.json();
    console.log('api responce: '+checker)
    //empty arrays
    var Empty_Sender_Array = []
    var Empty_Rec_Array = []
    var Empty_Hash_Array = []
    var Empty_Function_Array = []
    var Empty_Date_Array = []
    var Empty_ID_Array = []
    var Empty_Status_Array = []

    if (checker!=200){
      document.getElementById("hero").innerHTML="Sorry, this request failed"
      document.getElementById("demo1").innerHTML=""; 
    }
    else{
      document.getElementById("hero").innerHTML="Request successful - Ape transactions that do not involve Smart Contracts are highlighted in <span style='color:red'>red</span>";
      document.getElementById("demo1").innerHTML="";  
      LengthOfEndpoint = data.length;
      var LoopCounter = 0;
      while(LoopCounter<LengthOfEndpoint){
        var NewTimeStamp = data[LoopCounter].timestamp
        var newTime = new Date(NewTimeStamp*1000)
        var BestTimeStamp = newTime.toUTCString()
        var OfficialDay = BestTimeStamp.slice(5,17)
        Empty_Date_Array.push(OfficialDay)

        var LengthOfTransfers = data[LoopCounter].action.arguments.transfers.length
        Empty_Hash_Array.push(data[LoopCounter].txHash)
        var FunctionType = data[LoopCounter].function

        if(FunctionType!=undefined){
          Empty_Function_Array.push(FunctionType)
        }
        else{
          Empty_Function_Array.push("<b>No Smart Contract used<b>")
        }

        var TxStatus = data[LoopCounter].status
        Empty_Status_Array.push(TxStatus)

        Empty_Sender_Array.push(data[LoopCounter].sender)
        Empty_Rec_Array.push(data[LoopCounter].action.arguments.receiver)


        var ObjectKeys = Object.values(data[LoopCounter].action.arguments.transfers)


        LoopCounter++
      }


    }

    var table1 = document.getElementById("myTable1");

    var table = document.getElementById("myTable");
    table.innerHTML = ""
    tableHeading.innerHTML = ""

        
    for (var newCounter = 0; newCounter < Empty_Hash_Array.length; newCounter++){
      var StartSlice = Empty_Hash_Array[newCounter].slice(0,10)
      var Dots = "..."
      var EndSlice = Empty_Hash_Array[newCounter].slice(Empty_Hash_Array[newCounter].length - 10)

      var StartSlice1 = Empty_Sender_Array[newCounter].slice(0,10)
      var EndSlice1 = Empty_Sender_Array[newCounter].slice(Empty_Sender_Array[newCounter].length - 10)

      var StartSlice2 = Empty_Rec_Array[newCounter].slice(0,10)
      var EndSlice2 = Empty_Rec_Array[newCounter].slice(Empty_Rec_Array[newCounter].length - 10)

      var tableHeading1 = `
      <th style="color:black; background-color:#D5DBDB; padding:10px; border-radius: 1px !important;">Tx Hash</th>
      <th style="color:black; background-color:#D5DBDB; border-radius: 1px !important;">Tx Date</th>
      <th style="color:black; background-color:#D5DBDB; border-radius: 1px !important;">Sender</th>
      <th style="color:black; background-color:#D5DBDB; border-radius: 1px !important;">Reciever</th>
      <th style="color:black; background-color:#D5DBDB; border-radius: 1px !important;">Function</th>
      <th style="color:black; background-color:#D5DBDB; border-radius: 1px !important;">Status</th>
      `
      document.getElementById("tableHeading1").innerHTML=tableHeading1;



      if (Empty_Function_Array[newCounter]=="<b>No Smart Contract used<b>"){

        var row = `
        <tr style="background-color: #EED0CE;">
          <td style='padding:5px;font-size:15px;color:black'><a href=https://explorer.elrond.com/transactions/${Empty_Hash_Array[newCounter]} target=_blank>${StartSlice+Dots+EndSlice}</a></td>
          <td style='font-size:15px;color:black'>${Empty_Date_Array[newCounter]}</td>
  
          <td style='font-size:15px;color:black'><a href=https://explorer.elrond.com/accounts/${Empty_Sender_Array[newCounter]} target=_blank>${StartSlice1+Dots+EndSlice1}</a></td>
          <td style='font-size:15px;color:black'><a href=https://explorer.elrond.com/accounts/${Empty_Rec_Array[newCounter]} target=_blank>${StartSlice2+Dots+EndSlice2}</a></td>
          <td style='font-size:15px;color:black'>${Empty_Function_Array[newCounter]}</td>
          <td style='font-size:15px;color:black'>${Empty_Status_Array[newCounter]}</td>
  
        </tr>
        `



      }

      else{
      var row = `
      <tr>
        <td style='padding:5px;font-size:15px'><a href=https://explorer.elrond.com/transactions/${Empty_Hash_Array[newCounter]} target=_blank>${StartSlice+Dots+EndSlice}</a></td>
        <td style='font-size:15px'>${Empty_Date_Array[newCounter]}</td>

        <td style='font-size:15px'><a href=https://explorer.elrond.com/accounts/${Empty_Sender_Array[newCounter]} target=_blank>${StartSlice1+Dots+EndSlice1}</a></td>
        <td style='font-size:15px'><a href=https://explorer.elrond.com/accounts/${Empty_Rec_Array[newCounter]} target=_blank>${StartSlice2+Dots+EndSlice2}</a></td>
        <td style='font-size:15px'>${Empty_Function_Array[newCounter]}</td>
        <td style='font-size:15px'>${Empty_Status_Array[newCounter]}</td>

      </tr>
      `
      }

      table1.innerHTML += row;

    }

  }
  GetRecent()
}

//find ape owner function
function FindOwner(){
  document.getElementById("demo1").innerHTML="Processing request <i style='color:blue; font-size:24px' class = 'fa fa-circle-o-notch fa-spin'></i> Please allow up to 5 seconds per request";  
  var copyText = document.getElementById("myInput2");
  navigator.clipboard.writeText(copyText.value);
  async function FindTheOwner(){
    const ErdEndpointURL = "https://api.elrond.com/nfts/"+copyText.value+"/accounts";
    const responce = await fetch(ErdEndpointURL);
    const checker = responce.status
    const data = await responce.json();
    //console.log(checker)
    if (checker!=200){
      document.getElementById("hero").innerHTML="Sorry, this Ape Identifer does not exist"
      document.getElementById("demo1").innerHTML=""; 
    }
    else{
      document.getElementById("hero").innerHTML="Ape identifier: "+copyText.value+" is in "+data[0].address
      document.getElementById("demo1").innerHTML="";  
    }
  }
  FindTheOwner()
}

//hero tag function
function getHeroTag(){
        document.getElementById("demo1").innerHTML="Processing request <i style='color:blue; font-size:24px' class = 'fa fa-circle-o-notch fa-spin'></i> Please allow up to 5 seconds per request";  
        var copyText = document.getElementById("myInput1");
        navigator.clipboard.writeText(copyText.value);
        //var address = String(copyText.value);
        //console.log(copyText.value)
        async function findHT(){
          const ErdEndpointURL = "https://api.elrond.com/usernames/"+copyText.value;
          const responce = await fetch(ErdEndpointURL);
          const checker = responce.status
          const data = await responce.json();
          var HT = data.address
          if (checker===404){
            document.getElementById("hero").innerHTML="Sorry, this HeroTag does not exist"
            document.getElementById("demo1").innerHTML=""; 
          }
          else{
            document.getElementById("hero").innerHTML=copyText.value+"'s address is: "+HT
            document.getElementById("demo1").innerHTML="";  
          }
  
        }
        findHT()
      }

// copy wallet address 
function CopyHeroTag(){
        var copyHT = document.getElementById("hero");
        copyHT.select();
        copyHT.setSelectionRange(0, 99999); 
        navigator.clipboard.writeText(copyHT.value);
        
      }

// peer to peer tx function
function myFunction() {
    var copyText = document.getElementById("myInput");
  
    navigator.clipboard.writeText(copyText.value);
  
    var address = String(copyText.value);
  
  
    if (address.includes('qqqqqq') || !address.includes('erd') ){
      alert("Please only request wallet addresses. Not smart contracts or transaction hashes.")
    }
  
  
    else{
      console.log(`Made with ${'❤️'} by TheChosenOne`)
      document.getElementById("demo1").innerHTML="Processing request <i style='color:blue; font-size:24px' class = 'fa fa-circle-o-notch fa-spin'></i> Please allow up to 5 seconds per request";  
  
  
      var table = document.getElementById("myTable");
  
      var tableHeading = ""
          document.getElementById("tableHeading").innerHTML=tableHeading;
  
  
          var row = ""
          table.innerHTML = row;
      
  
  
// async function calling elrond api 

      async function FindNftTransfers(){
        const ErdEndpointURL = "https://api.elrond.com/accounts/"+copyText.value+"/transactions?size=1000";
        const responce = await fetch(ErdEndpointURL);
        const data = await responce.json();
        console.log("api responce: ",responce.status)
  
        if(responce.status!=200){
          alert("This request failed because this account doesn't exist - Please double check the wallet address and IGNORE the results from the web page")
        }
  
        else{
        // empty array vars
        var counter = 0;
        var emptyTxHashArray = [];
        var emptySenderArray = [];
        var emptyRecArray = [];
        var emptyTimeStampArray = [];
        var emptyIdArray = [];
        var emptyWhichArray = []
        var theLength = data.length; 
  
        //console.log(data)

        //new logic:
        while(counter<theLength){
          DataCounter = data[counter]
          if(!DataCounter.sender.includes('qqqqqqqq') && !DataCounter.receiver.includes('qqqqqqqq')){
            if(DataCounter.sender != "erd1w9mmxz6533m7cf08gehs8phkun2x4e8689ecfk3makk3dgzsgurszhsxk4" && DataCounter.receiver != "erd1w9mmxz6533m7cf08gehs8phkun2x4e8689ecfk3makk3dgzsgurszhsxk4"){
            //console.log("Values: ",Object.values(DataCounter))
            //console.log(Object.values(DataCounter).length)
            NumberLengthOfObj = Object.values(DataCounter).length
            //console.log("Length: ",NumberLengthOfObj)
            if(NumberLengthOfObj>=17){
              MinusOne = NumberLengthOfObj - 1
              TxType = Object.values(DataCounter)[MinusOne]
              //console.log("tyType: ",TxType)
              if(TxType.category==="esdtNft" && !TxType.arguments.receiver.includes('qqqqqqqqq')){
                //console.log("arg: ",TxType.arguments.transfers[0])
                var CollectionId = TxType.arguments.transfers[0].collection
                if (CollectionId==="EAPES-8f3c1f"){
                  //console.log("test: ",TxType.arguments.transfers[0])


                  if(counter == 0 || counter == 1){
                    window.alert("This specific address had an issue because of how new the triggering hash is. For now, I am going to skip over the most frequent trigger so the code can execute.")
                    var counter = 10;
                  }

                  if(data[counter+1].value > 0 || data[counter+2].value > 0 || data[counter-1].value > 0 || data[counter-2].value > 0){


                    var which = [data[counter+1].value > 0, data[counter+2].value > 0, data[counter-1].value > 0, data[counter-2].value > 0] //.indexOf(true)
                                            //0                         1                          2                          3
                    var whichOne = which.indexOf(true)
              
                    if(whichOne===0){

                      if(!data[counter+1].receiver.includes('qqqqqq') && !data[counter+1].sender.includes('qqqqqq')){
                        console.log('-------------')
                        console.log('2 Hashes Before Ape Transfer: ',data[counter-2].txHash) 
                        console.log('1 Hash Before Ape Transfer: ',data[counter-1].txHash) 
                        console.log('Ape Transfer Hash: ',data[counter].txHash) 
                        console.log('1 Hash After Ape Transfer: ',data[counter+1].txHash) 
                        console.log('2 Hashes After Ape Transfer: ',data[counter+2].txHash) 
                        console.log('which: ',which)
                        console.log('triggering hash (egld being sent): ',data[counter+1].txHash)
                        //console.log(whichOne)
                        emptyTxHashArray.push(data[counter].txHash)
                        var TimeStamp = data[counter].timestamp
                        var newTime = new Date(TimeStamp*1000)
                        var BestTimeStamp = newTime.toUTCString()
                        var OfficialDay = BestTimeStamp.slice(5,17)
                        emptyTimeStampArray.push(OfficialDay)
                        emptySenderArray.push(data[counter].sender)
                        emptyRecArray.push(Object.values(data[counter])[MinusOne].arguments.receiver)
                        emptyIdArray.push(TxType.arguments.transfers[0].identifier)
                      
                      }
                    }

                    if(whichOne===1){

                      if(!data[counter+2].receiver.includes('qqqqqq') && !data[counter+2].sender.includes('qqqqqq')){
                        console.log('-------------')
                        console.log('2 Hashes Before Ape Transfer: ',data[counter-2].txHash) 
                        console.log('1 Hash Before Ape Transfer: ',data[counter-1].txHash) 
                        console.log('Ape Transfer Hash: ',data[counter].txHash) 
                        console.log('1 Hash After Ape Transfer: ',data[counter+1].txHash) 
                        console.log('2 Hashes After Ape Transfer: ',data[counter+2].txHash) 
                        console.log('which: ',which)
                        console.log('triggering hash (egld being sent): ', data[counter+2].txHash)
                        //console.log(whichOne)
                        emptyTxHashArray.push(data[counter].txHash)
                        var TimeStamp = data[counter].timestamp
                        var newTime = new Date(TimeStamp*1000)
                        var BestTimeStamp = newTime.toUTCString()
                        var OfficialDay = BestTimeStamp.slice(5,17)
                        emptyTimeStampArray.push(OfficialDay)
                        emptySenderArray.push(data[counter].sender)
                        emptyRecArray.push(Object.values(data[counter])[MinusOne].arguments.receiver)
                        emptyIdArray.push(TxType.arguments.transfers[0].identifier)
                      }
                    }

                    if(whichOne===2){
                
                        if(!data[counter-1].receiver.includes('qqqqqq') && !data[counter-1].sender.includes('qqqqqq')){
                            console.log('-------------')
                            console.log('2 Hashes Before Ape Transfer: ',data[counter-2].txHash) 
                            console.log('1 Hash Before Ape Transfer: ',data[counter-1].txHash) 
                            console.log('Ape Transfer Hash: ',data[counter].txHash) 
                            console.log('1 Hash After Ape Transfer: ',data[counter+1].txHash) 
                            console.log('2 Hashes After Ape Transfer: ',data[counter+2].txHash) 
                            console.log('which: ',which)
                            console.log('triggering hash (egld being sent): ',data[counter-1].txHash)
                            //console.log(whichOne)
                            emptyTxHashArray.push(data[counter].txHash)
                            var TimeStamp = data[counter].timestamp
                            var newTime = new Date(TimeStamp*1000)
                            var BestTimeStamp = newTime.toUTCString()
                            var OfficialDay = BestTimeStamp.slice(5,17)
                            emptyTimeStampArray.push(OfficialDay)
                            emptySenderArray.push(data[counter].sender)
                            emptyRecArray.push(Object.values(data[counter])[MinusOne].arguments.receiver)
                            emptyIdArray.push(TxType.arguments.transfers[0].identifier)

                        }
                      }

                      if(whichOne===3){
                       
                        if(!data[counter-2].receiver.includes('qqqqqq') && !data[counter-2].sender.includes('qqqqqq')){
                            console.log('-------------')
                            console.log('2 Hashes Before Ape Transfer: ',data[counter-2].txHash) 
                            console.log('1 Hash Before Ape Transfer: ',data[counter-1].txHash) 
                            console.log('Ape Transfer Hash: ',data[counter].txHash) 
                            console.log('1 Hash After Ape Transfer: ',data[counter+1].txHash) 
                            console.log('2 Hashes After Ape Transfer: ',data[counter+2].txHash) 
                            console.log('which: ',which)
                            console.log('triggering hash (egld being sent): ',data[counter-2].txHash)
                            //console.log(whichOne)
                            emptyTxHashArray.push(data[counter].txHash)
                            var TimeStamp = data[counter].timestamp
                            var newTime = new Date(TimeStamp*1000)
                            var BestTimeStamp = newTime.toUTCString()
                            var OfficialDay = BestTimeStamp.slice(5,17)
                            emptyTimeStampArray.push(OfficialDay)
                            emptySenderArray.push(data[counter].sender)
                            emptyRecArray.push(Object.values(data[counter])[MinusOne].arguments.receiver)
                            emptyIdArray.push(TxType.arguments.transfers[0].identifier)

                        }
                      }


                  }
                
                  

                  }
                }
              }
            }
          }
          counter++
        }
        //console.log(emptyWhichArray)
      }

       
        var table = document.getElementById("myTable");

        var table1 = document.getElementById("myTable1");
        table1.innerHTML = ""
        tableHeading1.innerHTML = ""
        
        for (var newCounter = 0; newCounter < emptyTxHashArray.length; newCounter++){
          var StartSlice = emptyTxHashArray[newCounter].slice(0,10)
          var Dots = "..."
          var EndSlice = emptyTxHashArray[newCounter].slice(emptyTxHashArray[newCounter].length - 10)
  
          var StartSlice1 = emptySenderArray[newCounter].slice(0,10)
          var EndSlice1 = emptySenderArray[newCounter].slice(emptySenderArray[newCounter].length - 10)
  
          var StartSlice2 = emptyRecArray[newCounter].slice(0,10)
          var EndSlice2 = emptyRecArray[newCounter].slice(emptyRecArray[newCounter].length - 10)
  
          var tableHeading = `
          <th style="color:black; background-color:#D5DBDB; padding:10px; border-radius: 1px !important;">Tx Hash</th>
          <th style="color:black; background-color:#D5DBDB; border-radius: 1px !important;">Tx Date</th>
          <th style="color:black; background-color:#D5DBDB; border-radius: 1px !important;">Sender</th>
          <th style="color:black; background-color:#D5DBDB; border-radius: 1px !important;">Reciever</th>
          <th style="color:black; background-color:#D5DBDB; border-radius: 1px !important;">EA NFT</th>
          `
          document.getElementById("tableHeading").innerHTML=tableHeading;
  
          var row = `
          <tr>
            <td style='padding:10px'><a href=https://explorer.elrond.com/transactions/${emptyTxHashArray[newCounter]} target=_blank>${StartSlice+Dots+EndSlice}</a></td>
            <td>${emptyTimeStampArray[newCounter]}</td>
  
            <td><a href=https://explorer.elrond.com/accounts/${emptySenderArray[newCounter]} target=_blank>${StartSlice1+Dots+EndSlice1}</a></td>
            <td><a href=https://explorer.elrond.com/accounts/${emptyRecArray[newCounter]} target=_blank>${StartSlice2+Dots+EndSlice2}</a></td>
            <td><a href=https://deadrare.io/nft/${emptyIdArray[newCounter]} target=_blank>${emptyIdArray[newCounter]}</a></td>
          </tr>
          `
          table.innerHTML += row;
        }
        if (emptyIdArray.length>0){
          document.getElementById("demo1").innerHTML="This account has performed "+emptyIdArray.length+" transaction(s) that <b>resemble</b> p2p <i class='fa fa-close' style='color:red; font-size:20px'></i>";  
          document.getElementById("hero").innerHTML="";  

        }
        else{
          document.getElementById("demo1").innerHTML="This account has performed 0 peer-to-peer transactions <i class='fa fa-check' style='color:green; font-size:20px'></i>";  
          document.getElementById("hero").innerHTML="";  
        }

      }
      FindNftTransfers();
    } // async function 
  }
