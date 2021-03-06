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
        quickSort(0,history.length-1,history)
        console.log({data:req.params.data})
        let startTime=Date.now();
            bsearchHistory(0,history.length-1,req.params.data.toLowerCase())
            console.log("History searched",arr)
            bsearchIndex(0,a.length-1,req.params.data.toLowerCase())
            console.log("Index searched",arr)
        let endTime=Date.now()
        quickSort(0,arr.length-1,arr)
        console.log('Results sorted',arr)
        let time=endTime-startTime;
        console.log({time,count,arr,history})
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
        bsearchIndex(low,high1,data)
        bsearchIndex(low1,high,data)
    }
    else
        return
}

function quickSort(low,high,A){
    let m;
    console.log(low,high,A)
    if(low<high){
        m=partition(low,high,A);
        quickSort(low,m-1,A)
        quickSort(m+1,high,A)
    }
}

function partition(low,high,A){
    pivot=low,i=low+1,j=high
    while(i<=j){
        console.log(A[pivot],A[i],A[j])
        while(A[pivot].localeCompare(A[i])>=0)
            i++;
        while(A[pivot].localeCompare(A[j])<0)
            j--;
        if(i<=j)
            swapArr(i,j,A)
    }
    swapArr(j,pivot,A)
    return j;
}

function swapArr(i,j,A){
    let t=A[i]
    A[i]=A[j]
    A[j]=t
}

function bsearchHistory(low,high,data){
    let mid,high1,low1;
    console.log(low,high,history)
    if(low<=high && arr.length!=6){
        count++;
        mid=parseInt((low+high)/2)
        high1=mid-1,low1=mid+1
        console.log(history[mid])
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