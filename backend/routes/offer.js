const express = require("express");
const router = express.Router();
const jwt=require("jsonwebtoken");

const SECRET_CODE="sdafsfsddad"
const {offer} = require("../schemas/offer-schema");
const { user } = require("../schemas/user-schema");


const  getUserByToken=(token)=>{
    return new Promise((resolve,reject)=>{
        if(token){
            let userData
            try{
                userData=jwt.verify(token,SECRET_CODE);
                resolve(userData)
            }catch(err) {
                reject("invalid token");
            }
        }else{
            reject("token not found");
        }
    })
}

router.post("/list",async(req,res)=>{
    const validoffer=[];
    offer.find().then((offers)=>{
        // console.log(offers);
        offer.filter((offer)=>{
            const rules=offer.target.split("and")
            rules.forEach((rule)=>{
                let ruleKey=null
                if(rule.includes(">")){
                     ruleKey={key:rule.trim().split(">")[0].trim(),value:parseInt(rule.trim().split(">")[1]),}
                     if(req.body[ruleKey.key]>ruleKey.value){
                        validoffer.push(offer);
                     }
                }else{
                    ruleKey={key:rule.trim().split("<")[0],value:rule.trim().split("<")[1],operator: "<"}
                }
                // const condition=`${req.body[ruleKey.key]} ${rulekey.operator}`
                if(req.body[ruleKey.key]===ruleKey.key){
                    validoffer.push(offer);
                }
                console.log(ruleKey);
            })
            res.status(200).send(validoffer);
            // if(rule[0].contains(">")){

            // }else{

            // }
            // const validAge=rule[0].split(">");
            // const validInstalledDays=
        })
    }).catch(()=>{
        res.status(500).send("internal server err");
    })

})
router.post("/create",async(req,res)=>{
    getUserByToken(req.headers.authorization).then(()=>{
        
        offer.create({...req.body,username:user.username}).then(()=>{
            res.status(200).send(offer);
        }).catch((err)=>{
            res.status(400).send({message:err.message})
        })
        //res.send(200).send(user)
    }).catch((err)=>{
        res.status(400).send(err);
    })
});
router.put("/update",async()=>{
    offer.updateOne("identifier data","new data")   // do by own
});
router.delete("/delete",async()=>{
    offer.deleteOne({_id: req.body.id})
})
module.exports=router