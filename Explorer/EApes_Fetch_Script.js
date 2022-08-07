//hero tag function
function getHeroTag(){
        document.getElementById("demo1").innerHTML="Processing request <i style='color:blue; font-size:24px' class = 'fa fa-circle-o-notch fa-spin'></i> Please allow up to 5 seconds per request";  
    
    
        var copyText = document.getElementById("myInput1");
        navigator.clipboard.writeText(copyText.value);
        var address = String(copyText.value);
        console.log(copyText.value)
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
  
        // empty array vars
        var counter = 0;
        var emptyTxHashArray = [];
        var emptySenderArray = [];
        var emptyRecArray = [];
        var emptyTimeStampArray = [];
        var emptyIdArray = [];
        var emptyWhichArray = []
        var theLength = data.length; 
  
          while (counter<theLength){
  
            if (!data[counter].sender.includes('qqqqqqqq') && !data[counter].receiver.includes('qqqqqqqq')){  //&& data[counter].sender != data[counter].receiver){

              var DataKeys = Object.keys(data[counter])
  
              if (DataKeys.includes("action")){
                
                var ValueKey = Object.values(data[counter])
                var LengthOfValues = ValueKey.length
                var Index = ValueKey[LengthOfValues-1]
  
                var DataKeysFromCategory = Object.keys(Index)
  
                if (Index.category === "esdtNft"){
                  var Arguments = Index.arguments
                  var FurtherArgument = Arguments.transfers
                  var FarthestArg = FurtherArgument[0]
                  if(FarthestArg.collection==="EAPES-8f3c1f"){
                    var RealRec = Arguments.receiver
                    var RealSender = data[counter].sender
                    if(!RealRec.includes('qqqqqq') && RealRec!=data[counter].sender){
  
                      if(RealRec!="erd1w9mmxz6533m7cf08gehs8phkun2x4e8689ecfk3makk3dgzsgurszhsxk4" && RealSender!="erd1w9mmxz6533m7cf08gehs8phkun2x4e8689ecfk3makk3dgzsgurszhsxk4"){   
                     

                          if (data[counter-1].value > 0 || data[counter+1].value > 0 || data[counter-2].value > 0 || data[counter+2].value > 0){


  
                            var which = [data[counter-2].value > 0, data[counter-1].value > 0, data[counter+1].value > 0, data[counter+2].value > 0] //.indexOf(true)
                                        //0                         1                          2                          3
                            var whichOne = which.indexOf(true)

  
                            emptyWhichArray.push(whichOne)


  
                            if(whichOne===0){

                              if(!data[counter-2].receiver.includes('qqqqqq') && !data[counter-2].sender.includes('qqqqqq')){
                                console.log('-------------')
                                console.log('2 Hashes Before Ape Transfer: ',data[counter-2].txHash) 
                                console.log('1 Hash Before Ape Transfer: ',data[counter-1].txHash) 
                                console.log('Ape Transfer Hash: ',data[counter].txHash) 
                                console.log('1 Hash After Ape Transfer: ',data[counter+1].txHash) 
                                console.log('2 Hashes After Ape Transfer: ',data[counter+2].txHash) 
                                console.log('which: ',which)
                                console.log('triggering hash (egld being sent): ',data[counter-2].txHash)
                                console.log(whichOne)



                                var Identifier = FarthestArg.identifier
                                emptyIdArray.push(Identifier)
  
                                emptyTxHashArray.push(data[counter].txHash)
  
                                emptyRecArray.push(RealRec)
                                
                                emptySenderArray.push(data[counter].sender)
  
                                var TimeStamp = data[counter].timestamp
                                var newTime = new Date(TimeStamp*1000)
                                var BestTimeStamp = newTime.toUTCString()
                                var OfficialDay = BestTimeStamp.slice(5,17)
                                emptyTimeStampArray.push(OfficialDay)
                              }
                            }
  
                            if(whichOne===1){
    
                              if(!data[counter-1].receiver.includes('qqqqqq') && !data[counter-1].sender.includes('qqqqqq')){
                                console.log('-------------')
                                console.log('2 Hashes Before Ape Transfer: ',data[counter-2].txHash) 
                                console.log('1 Hash Before Ape Transfer: ',data[counter-1].txHash) 
                                console.log('Ape Transfer Hash: ',data[counter].txHash) 
                                console.log('1 Hash After Ape Transfer: ',data[counter+1].txHash) 
                                console.log('2 Hashes After Ape Transfer: ',data[counter+2].txHash) 
                                console.log('which: ',which)
                                console.log('triggering hash (egld being sent): ', data[counter-1].txHash)
                                console.log(whichOne)


                                var Identifier = FarthestArg.identifier
                                emptyIdArray.push(Identifier)
  
  
                                emptyTxHashArray.push(data[counter].txHash)
  
                                emptyRecArray.push(RealRec)
                                
  
                                emptySenderArray.push(data[counter].sender)
  
                                var TimeStamp = data[counter].timestamp
                                var newTime = new Date(TimeStamp*1000)
                                var BestTimeStamp = newTime.toUTCString()
                                var OfficialDay = BestTimeStamp.slice(5,17)
                                emptyTimeStampArray.push(OfficialDay)
                              }
                            }

                            if(whichOne===2){
                        
                                if(!data[counter+1].receiver.includes('qqqqqq') && !data[counter+1].sender.includes('qqqqqq')){
                                    console.log('-------------')
                                    console.log('2 Hashes Before Ape Transfer: ',data[counter-2].txHash) 
                                    console.log('1 Hash Before Ape Transfer: ',data[counter-1].txHash) 
                                    console.log('Ape Transfer Hash: ',data[counter].txHash) 
                                    console.log('1 Hash After Ape Transfer: ',data[counter+1].txHash) 
                                    console.log('2 Hashes After Ape Transfer: ',data[counter+2].txHash) 
                                    console.log('which: ',which)
                                    console.log('triggering hash (egld being sent): ',data[counter+1].txHash)
                                    console.log(whichOne)


                                  var Identifier = FarthestArg.identifier
                                  emptyIdArray.push(Identifier)
    
                                  emptyTxHashArray.push(data[counter].txHash)
    
                                  emptyRecArray.push(RealRec)
                                  
                                  emptySenderArray.push(data[counter].sender)
    
                                  var TimeStamp = data[counter].timestamp
                                  var newTime = new Date(TimeStamp*1000)
                                  var BestTimeStamp = newTime.toUTCString()
                                  var OfficialDay = BestTimeStamp.slice(5,17)
                                  emptyTimeStampArray.push(OfficialDay)
                                }
                              }

                              if(whichOne===3){
                               
                                if(!data[counter+2].receiver.includes('qqqqqq') && !data[counter+2].sender.includes('qqqqqq')){
                                    console.log('-------------')
                                    console.log('2 Hashes Before Ape Transfer: ',data[counter-2].txHash) 
                                    console.log('1 Hash Before Ape Transfer: ',data[counter-1].txHash) 
                                    console.log('Ape Transfer Hash: ',data[counter].txHash) 
                                    console.log('1 Hash After Ape Transfer: ',data[counter+1].txHash) 
                                    console.log('2 Hashes After Ape Transfer: ',data[counter+2].txHash) 
                                    console.log('which: ',which)
                                    console.log('triggering hash (egld being sent): ',data[counter+2].txHash)
                                    console.log(whichOne)


                                  var Identifier = FarthestArg.identifier
                                  emptyIdArray.push(Identifier)
    
                                  emptyTxHashArray.push(data[counter].txHash)
    
                                  emptyRecArray.push(RealRec)
                                  
                                  emptySenderArray.push(data[counter].sender)
    
                                  var TimeStamp = data[counter].timestamp
                                  var newTime = new Date(TimeStamp*1000)
                                  var BestTimeStamp = newTime.toUTCString()
                                  var OfficialDay = BestTimeStamp.slice(5,17)
                                  emptyTimeStampArray.push(OfficialDay)
                                }
                              }
    
                           

                      }
  
                      
                      }
                      
  
                    }
  
                  }
  
                }
  
              }
              counter=counter+1
          }
          
            else{
              counter=counter+1;
          }
        }
  
        var table = document.getElementById("myTable");
        
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
          document.getElementById("demo1").innerHTML="This account has performed "+emptyIdArray.length+" peer-to-peer transaction(s) <i class='fa fa-close' style='color:red; font-size:20px'></i>";  
        }
        else{
          document.getElementById("demo1").innerHTML="This account has performed 0 peer-to-peer transactions <i class='fa fa-check' style='color:green; font-size:20px'></i>";  
        }
      }
      FindNftTransfers();
    } // async function 
  }

