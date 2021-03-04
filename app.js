const express = require('express')
const cors = require('cors');
const fs = require('fs')

const app = express();
app.use(cors())

fs.readFile('./data-set/english3.txt',{encoding:"UTF-8"},(err,data)=>{
    if(err)
        throw err;
    a=data.split('\n')
    console.log(a)
})

let a=[];

let count=0;

app.get('/api/:data',(req,res)=>{
    let startTime=Date.now();
    bsearch(0,a.length-1,req.params.data.toLowerCase())
    let endTime=Date.now()
    let time=endTime-startTime;
    console.log({time,count,arr})
    res.send({time,count,arr});
    count=0,arr=[];
})

let arr=[]

function bsearch(low,high,data){
    let mid,high1,low1;
    if(low<=high && arr.length!=6){
        count++;
        mid=parseInt((low+high)/2)
        high1=mid-1,low1=mid+1
        if(a[mid].toLowerCase().startsWith(data)){
            arr.push(a[mid])
            if(mid>0 && !a[mid-1].toLowerCase().startsWith(data))
                high1=low-1
            if(mid<a.length-1 && !a[mid+1].toLowerCase().startsWith(data))
                low1=high+1
        }
        bsearch(low,high1,data)
        bsearch(low1,high,data)
    }
    else
        return
}

if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'))
    
    app.get('*',(req,res)=>{
        res.sendFile('./client/build/index.html')
    })
}

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server running on port ${port}...`))