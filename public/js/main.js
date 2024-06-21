const deleteBtn = document.querySelectorAll('.del')
const billtrackerItem = document.querySelectorAll('span.not')
const billTrackerComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteBillTracker)
})

Array.from(billtrackerItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(billTrackerComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteBillTracker(){
    const billTrackerId = this.parentNode.dataset.id
    console.log(billTrackerId)
    try{
        const response = await fetch('billtracker/deleteBillTracker', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'billtrackerIdFromJSFile': billTrackerId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const billTrackerId = this.parentNode.dataset.id
    console.log(this.parentNode)
    try{
        const response = await fetch('billtracker/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'billtrackerIdFromJSFile': billTrackerId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const billTrackerId = this.parentNode.dataset.id
    console.log(this.parentNode)
    try{
        const response = await fetch('billtracker/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'billtrackerIdFromJSFile': billTrackerId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems);
  });