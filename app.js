const express = require('express')
const cors = require('cors');
const fs = require('fs');
const { ECHILD } = require('constants');

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
    if(typeof req.params.data != undefined){
        let startTime=Date.now();
        bsearch(0,a.length-1,req.params.data.toLowerCase())
        quickSort(0,arr.length-1)
        let endTime=Date.now()
        let time=endTime-startTime;
        console.log({time,count,arr})
        res.send({time,count,arr});
    }
    else
        res.send({time:-1,count:-1,arr:[]})
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

function quickSort(low,high){
    let m;
    if(low<high)
        m=partition(low,high);
    quickSort(low,m-1)
    quickSort(m+1,high)
}

function partition(low,high){
    pivot=low,i=low+1,j=high
    while(i<=j){
        while(arr[i]<=arr[pivot])
            i++;
        while(arr[j]>arr[pivot])
            j--;
        if(i<=j)
            swapArr(i,j)
    }
    swapArr(j,pivot)
    return j;
}

function swapArr(i,j){
    let t=arr[i]
    arr[i]=arr[j]
    arr[j]=t
}

if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'))
    
    app.get('*',(req,res)=>{
        res.sendFile('./client/build/index.html')
    })
}

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server running on port ${port}...`))