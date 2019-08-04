var pageno = 1;
let result = ``;
let check=0;
let totalPage = 0;
let name="";
let tempname=name;


function multipleSearch(){

    document.getElementById("main").style.display="flex";
   // document.getElementById("result-box").style.display="flex";
    tempname=name;
    name=document.getElementById("SearchId").value;
    // var pageinfo;
    // fetch(`https://api.github.com/search/users?q=${name}+in`)
    //     .then(resp => resp.json())
    //     .then(data1 => {
    //         const {total_count} = data1;
    //         pageinfo = total_count;
    //     })
    console.log(name);
    
    if(name != ""){
        if(tempname !=name){
            result=``;
            pageno=1;
        }
        fetch(`https://api.github.com/search/users?q=${name}+in&per_page=20&page=${pageno}`)
        .then(res => { return res.json() })
        .then((data) => {
            const {total_count} = data;
            check = total_count;

            if(pageno!=1){
                result=``;
            }
            totalPage = Math.ceil(check/20);
           
           if(pageno<=totalPage && pageno>=1){

                data.items.forEach((user) => {

                    const {login} = user;
                    fetch(`https://api.github.com/users/${login}`)
                    .then(response => response.json())
                    .then(dataa => {
                        //console.log(dataa.avatar_url);
                        //document.getElementById("UserImg").src=dataa.avatar_url;
                        //document.getElementById("UserName").innerHTML=dataa.name;
                        result+=`
                        <div id="result-box">
                            <img src="${dataa.avatar_url}" alt="" name="UserImg" id="UserImg" />
                            <h2 id="UserName">${dataa.name}</h2>
                            <h3 id="UserInfo"> Account Created On : \n${dataa.created_at}</h3>
                            <a href="${dataa.html_url}" id="UserVisit" target="_blank">Visit</a>
                            <a href="https://github.com/${dataa.login}?tab=repositories" id="UserExp" target="_blank">Explore</a>
                        </div>`;

                        document.getElementById("main").innerHTML=result;
                        document.getElementById("button-div").style.display="flex";
                    })
                })

            }else{
            document.getElementById("main").innerHTML=`<h2>No More Result found. Please Try With other Name</h2>`;
           } 

        })
    }else{
        document.getElementById("main").innerHTML=`<h2>Please enter a name then search.</h2>`;
    }

        

}

function NextPage(){
    pageno+=1;
    result='';
    multipleSearch();
}

function prevPage(){  

    if(pageno > 1){
        pageno-=1;
        result='';
        multipleSearch();
    }else{
        pageno = pageno;
    }
    
}