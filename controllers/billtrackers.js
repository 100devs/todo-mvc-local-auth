const BillTracker = require('../models/BillTracker')

module.exports = {
    getBillTracker: async (req,res)=>{
        console.log('this is your username',req.user)
        try{
            // Looking for all bills matching specific user id
            const billtrackerItems = await BillTracker.find({userId:req.user.id})
            // Finding the total number of bills for the user based on their user id
            const itemsLeft = await BillTracker.countDocuments({userId:req.user.id, completed: false})
            
            /* 
            **No longer needed as the completed property will be checked for in the totalBills function.
             // Looking for bills that are incomplete
             const billLeft = await BillTracker.find({userId:req.user.id, completed: false})
            */

            // Loops through outstanding bills to provide total left to pay
            // let billSum = 0
            // for (let i=0; i< billLeft.length; i++) {
            //         billSum += billLeft[i].amountDue
            //     }

            // Calculate total bills left to pay by looping through the billTrackItems array and adding up all the amountDue values
            let totalBills = function(billItems) {
                let billSum = 0

                for (billItem of billItems) {
                    // Only calculate the bill items if the completed property is false
                    if (billItem.completed === false) {
                        billSum += billItem.amountDue
                    }
                }
                // Another way of looping and getting the sum using forEach method
                // billtrackerItems.forEach( billItem => {
                //     billSum += billItem.amountDue
                // })
                return billSum
            }
console
            res.render('billtracker.ejs', {billtrackers: billtrackerItems, left: itemsLeft, billSum: totalBills(billtrackerItems).toLocaleString(undefined,
                {'minimumFractionDigits':2,'maximumFractionDigits':2}), user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createBillTracker: async (req, res)=>{
        try{
            await BillTracker.create({companyName: req.body.companyName, description: req.body.description, amountDue: req.body.amountDue, dueDate: req.body.dueDate, completed: false, userId: req.user._id})
            console.log('Bill has been added!')
            res.redirect('/billtracker')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await BillTracker.findOneAndUpdate({_id:req.body.billtrackerIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await BillTracker.findOneAndUpdate({_id:req.body.billtrackerIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
   },
    deleteBillTracker: async (req, res)=>{
       console.log(req.body.billtrackerIdFromJSFile)
        try{
            await BillTracker.findOneAndDelete({_id:req.body.billtrackerIdFromJSFile})
            console.log('Deleted a bill')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    