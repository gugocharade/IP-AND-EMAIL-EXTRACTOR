(function(){
    const $ = document.querySelector.bind(document);
    const resultArea = $(".result-list");
    const buttonCopy = $(".copy-all");
    const textArea = $(".text");
    const buttonExtract = $(".button-submit");
    const nav = $(".navbar");
    const textCopied = $(".text-copied");
    
    
    let type;
    let resultArr = [];

// prevent user from writing in the result area :

    //resultArea.readOnly = true;

// permitting the user to copy all the results with one click : 

    buttonCopy.addEventListener("click", (e)=>{
        if(resultArea.value !== ""){
            resultArea.select();
            document.execCommand("copy");
            textCopied.animate([{transform : "translateY(200px)", opacity: 0, visibility: "visible"},{transform : "translateY(0)",opacity: 1},{transform : "translateY(0)",opacity: 1},{transform : "translateY(200px)", opacity:0, visibility:"hidden"}],{duration: 2500,easing:"ease-out"});
            }
    });
    // selecting the type :
    
    nav.addEventListener("click",(e)=>{
        const target = event.target;
        if(target.matches(".ip, .ip *")){
            type = "ip";
            $(".ip").classList.add("focus");
            buttonExtract.textContent = "Extract IPs"
            $(".email").classList.remove("focus");
        }else if(target.matches(".email, .email *")){
            type = "email";
            $(".email").classList.add("focus");
            $(".ip").classList.remove("focus");
            buttonExtract.textContent = "Extract EMAILS"

        }
    });
    
// extract emails and ips :
    const extractIp = (arr)=>{
        resultArr = [];
        arr.forEach(el => {
            if(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(el)){
                if(resultArr.indexOf(el) === -1){
                    resultArr.push(el);
                }
                
            };
        });
        
    };

    const extractEmail = (arr)=>{
        resultArr = [];
        arr.forEach(el => {
            if(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(el.toLowerCase())){
                if(resultArr.indexOf(el) === -1){
                    resultArr.push(el);
                }
            }
        })

    }
    const showRes = (arr)=>{
        let res = "";
        arr.forEach(el => res += `${el} &#013 `);
        return res;
        
    }
    const treat = (text, reg) => {
        let newText = text.replace(reg, " ");
        newText = newText.replace("-", " ");
        return newText.split(" ");
    }
    const extract = (e)=>{
        let text = textArea.value;
        if(text === ""){
           $(".empty").style.visibility = "visible";
        }else{
            $(".empty").style.visibility = "hidden";
        
        if(type === "ip"){
            extractIp(treat(text, /[^0-9-.]/g));
        }else if(type === "email"){
            extractEmail(treat(text, /[{()}]/g));
        }
        textArea.value = "";
        resultArea.innerHTML = showRes(resultArr);
        check(resultArr,type);
        }
    };
    buttonExtract.addEventListener("click", extract);
   
    function check(arr,type){
        if(arr.length === 0 && type === "ip"){
            $(".no-ip").animate([{transform : "translateY(-200px)", opacity: 0, visibility: "visible"},{transform : "translateY(0)",opacity: 1},{transform : "translateY(0)",opacity: 1},{transform : "translateY(-200px)", opacity:0, visibility:"hidden"}],{duration: 2500,easing:"ease-out"});
            }else if(arr.length === 0 && type === "email"){
                $(".no-email").animate([{transform : "translateY(-200px)", opacity: 0, visibility: "visible"},{transform : "translateY(0)",opacity: 1},{transform : "translateY(0)",opacity: 1},{transform : "translateY(-200px)", opacity:0, visibility:"hidden"}],{duration: 2500,easing:"ease-out"});
            }
    };
    $(".delete-all").addEventListener("click",(e)=>{
        resultArea.value = "";
    })

    $(".ip").click();
    $(".ip").focus();
})();
