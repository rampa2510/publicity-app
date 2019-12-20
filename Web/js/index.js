M.AutoInit();
let tabsOption = {
  swipeable:true
}
var instance = M.Tabs.init(document.querySelector('.tabs'),tabsOption);
// document.querySelector(".tabs-content").style.height=10%
let selectedCollege;

(async function getEnteredData(){
  let url = "https://pubvit.herokuapp.com/codewdata"
  // console.log(page)
  try {
    
    let response = await fetch(url,{
      method:"GET"
    })
    let data = await response.json()
    
    appendCollegeWData(data)
  } catch (error) {
    // console.log(error)
    throw new Error(error)
  }
})()
  
function appendCollegeWData(data){
  let mainContainer = document.getElementById("collegeCards")
  document.getElementById('loader').style.display="none"
  data.forEach(element => {
    // mainContainer.innerHTML += `
    // <div class="card-panel z-depth-3">
    //   <span class="black-text text-darken-1 ">${element.name}</span>
    // </div>  `
    let newDiv = document.createElement('div')

    newDiv.onclick = function (element){
      instance.select('test2')
      
    }

    newDiv.classList.add("card-panel","z-depth-3",`${element.code}`)
    let spanDiv = document.createElement('span')
    spanDiv.classList.add("black-text","text-darken-1")
    spanDiv.textContent=element.name
    newDiv.appendChild(spanDiv);
    mainContainer.appendChild(newDiv)

  })
}

function getDataToEnterDetails(data){
  instance.select('test2')
  console.log(data)
}

function submit(data){
  console.log(data)
}

// functionGetCollegeData(){

// }