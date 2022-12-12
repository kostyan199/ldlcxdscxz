let tab = function () {
    let label = document.querySelectorAll(".label1");
    let agreeInputs = document.querySelectorAll(".agree-inputs");
    let agreeName;
    label.forEach(function (item) {
        item.addEventListener('click',selectAgree)
        
    })

    function selectAgree(){
        label.forEach(function(item){
            item.classList.remove('is-active')
        })
        this.classList.add('is-active')
        agreeName = this.getAttribute('data-agree')
        selectAgreeName(agreeName)
    }
    function selectAgreeName(agreeName){
        agreeInputs.forEach(function(item){
            item.classList.contains(agreeName)?item.classList.add('is-active'):item.classList.remove('is-active')
            console.log(item)
        })
    }


}
tab()

let select = document.querySelectorAll('.select1');
for(let i = 0; i < select.length; i++){
    select[i].addEventListener('click',function(){
        this.classList.toggle('active');
        let content = this.nextElementSibling;
        if(content.style.display){
            content.style.display = null;
        }else{
            content.style.display = block;
        }
      
    })
}


//Форма отправки

let postContactData = document.querySelector('.contacts-column2-inputs'),
    inputs = document.querySelectorAll('input');


const message = {
    loading:'Загрузка',
    succes:"Спасибо!Скоро мы с вами свяжемся",
    failure:"Что-то пошло не так..."
}

const clearInputs = () =>{
    inputs.forEach(item=>{
        item.value = '';
    })
}


postContactData.addEventListener('submit',(e)=>{
    e.preventDefault();

    let statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    postContactData.appendChild(statusMessage);
   

    const formData = new FormData();

    postData('js/server.php',formData)
        .then(res =>{
            console.log(res)
            statusMessage.textContent = message.succes;
        })
        .catch(()=>{
            statusMessage.textContent = message.failure;
        })
        .finally(()=>{
            clearInputs();
            setTimeout(() => {
                statusMessage.remove()
            }, 5000);
        })



});

const postData = async(url,data) =>{
    document.querySelector('.status').textContent = message.loading;
    let res  = await fetch(url,{
        method: "POST",
        body: data,
    });

    return await res.text();
};




