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
    if(req.params.data != '**'){
        let startTime=Date.now();
        bsearchHistory(0,history.length-1,req.params.data.toLowerCase())
        bsearchIndex(0,a.length-1,req.params.data.toLowerCase())
        let endTime=Date.now()
        let time=endTime-startTime;
        console.log({time,count,arr,history})
        res.send({time:time,count:count,results:arr});
    }
    else
        res.send({time:-1,count:-1,results:[]})
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
            insertUnique(arr,a[mid])
            insertUnique(history,a[mid])
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
    if(low<high){
        m=partition(low,high,A);
        quickSort(low,m-1,A)
        quickSort(m+1,high,A)
    }
}

function partition(low,high,A){
    let pivot=low,i=low+1,j=high,t
    while(i<=j){
        while(A[pivot].localeCompare(A[i])>=0 && i<=j)
            i++
        while(A[pivot].localeCompare(A[j])<0)
            j--
        if(i<=j){
            t=A[i]
            A[i]=A[j]
            A[j]=t
        }
    }
    t=A[pivot]
    A[pivot]=A[j]
    A[j]=t
    return j;
}

function bsearchHistory(low,high,data){
    let mid,high1,low1;
    if(low<=high && arr.length!=6){
        count++;
        mid=parseInt((low+high)/2)
        high1=mid-1,low1=mid+1
        if(history[mid].toLowerCase().startsWith(data)){
            insertUnique(arr,history[mid])
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

function insertUnique(A,data){
    let i=0,j=A.length-1,mid,flag=1;
    while(i<=j){
        mid=parseInt((i+j)/2);
        if(A[mid].localeCompare(data)==0){
            flag=0
            break
        }
        else if(A[mid].localeCompare(data)>0)
            j=mid-1
        else
            i=mid+1
    }
    if(flag==1)
        A.push(data)
    quickSort(0,A.length-1,A)
}

if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'))
    
    app.get('*',(req,res)=>{
        res.sendFile('./client/build/index.html')
    })
}

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server running on port ${port}...`))