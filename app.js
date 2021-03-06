const express = require('express')
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors())

fs.readFile('./data-set/english3.txt',{encoding:"UTF-8"},(err,data)=>{
    if(err)
        throw err;
    a=data.split('\n')
    console.log(a)
})

let a=[],count=0,history=[];

app.get('/api/:data',(req,res)=>{
    if(typeof req.params.data != undefined){
        let startTime=Date.now();
        bsearchHistory(0,history.length-1,req.params.data.toLowerCase())
        bsearchIndex(0,a.length-1,req.params.data.toLowerCase())
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

function bsearchIndex(low,high,data){
    let mid,high1,low1;
    if(low<=high && arr.length!=6){
        count++;
        mid=parseInt((low+high)/2)
        high1=mid-1,low1=mid+1
        if(a[mid].toLowerCase().startsWith(data)){
            arr.push(a[mid])
            history.push(a[mid])
            if(mid>0 && !a[mid-1].toLowerCase().startsWith(data))
                high1=low-1
            if(mid<a.length-1 && !a[mid+1].toLowerCase().startsWith(data))
                low1=high+1
        }
        bsearchHistory(low,high1,data)
        bsearchHistory(low1,high,data)
    }
    else
        return
}

function quickSort(low,high){
    let m;
    if(low<high){
        m=partition(low,high);
        console.log(low,m,high,arr)
        quickSort(low,m-1)
        quickSort(m+1,high)
    }
}

function partition(low,high){
    pivot=low,i=low+1,j=high
    while(i<=j){
        while(arr[pivot].localeCompare(arr[i])>=0)
            i++;
        while(arr[pivot].localeCompare(arr[j])<0)
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

function bsearchHistory(low,high,data){
    let mid,high1,low1;
    console.log(low,mid,high)
    if(low<=high && arr.length!=6){
        count++;
        mid=parseInt((low+high)/2)
        high1=mid-1,low1=mid+1
        if(history[mid].toLowerCase().startsWith(data)){
            arr.push(history[mid])
            if(mid>0 && !history[mid-1].toLowerCase().startsWith(data))
                high1=low-1
            if(mid<history.length-1 && !history[mid+1].toLowerCase().startsWith(data))
                low1=high+1
        }
        bsearchHistory(low,high1,data)
        bsearchHistory(low1,high,data)
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