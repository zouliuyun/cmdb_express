var db = require('./db');
function User(user){
//注册用户所需的信息
this.name = user.name;
this.password = user.password;
this.email = user.email;
//用户能在后面保存更新的信息
this.address = user.address;
this.company = user.company;
this.school = user.school;
this.info = user.info;
this.imgUrl = user.imgUrl;
};

function Asset(asset){
this.hostname = asset.hostname;
this.project = asset.project;
this.ip = asset.ip;
this.gip = asset.gip;
this.loip = asset.loip;
this.cabinet = asset.cabinet;
this.servertag = asset.servertag;
this.asset = asset.asset;
}


module.exports = User;
User.prototype.save = function(callback){
//callback是执行完保存后的回调函数
var user = {
	name:this.name,
	password:this.password,
	address:"暂无",
	company:"暂无",
	school:"暂无",
	info:"暂无",
	imgUrl:"./public/images/default.jpg"

};
//打开数据库
/*mongodb.open(function(err,db){
if(err){
return callback(err);
}
*/
BS.database.collection('user',function(err,collection){
if(err){
//mongodb.close()
return callback(err);
}
collection.insert(user,{safe:true},function(err,result){
//mongodb.close();
callback(err,user);
})
})
//});

}

User.cgpasswd = function(name,newpassword,callback){
console.log(name);
console.log(newpassword);
BS.database.collection('user',function(err,collection){
collection.update({name:name},{$set:{"password":newpassword}},function(err,result){
callback(err,result)
})
})
}


User.findItem = function(name,callback){
BS.database.collection('asset',function(err,collection){
collection.findOne({hostname:name},function(err,result){
if(result){
asset = 1;
console.log(result);
callback(err,asset);
}
else{
callback(err,null);
}

})
})
}


User.findItembyip = function(ip,callback){
BS.database.collection('asset',function(err,collection){
collection.findOne({ip:ip},function(err,result){
if(result){
asset = 1;
console.log(result);
callback(err,asset); 
}         
else{    
callback(err,null); 
}        
        
})
})           
}

User.findItembyServerTag = function(servertag,callback){
BS.database.collection('asset',function(err,collection){
collection.findOne({servertag:servertag},function(err,result){
if(result){
console.log(result);
callback(err,result);
}
else{
callback(err,null);
}

})
})
}



User.findItembygip = function(gip,callback){
BS.database.collection('asset',function(err,collection){
collection.findOne({gip:gip},function(err,result){
if(result){  
asset = 1;
console.log(result);
callback(err,asset); 
}         
else{    
callback(err,null); 
}
        
})  
})           
}


User.findItembyloip = function(loip,callback){
BS.database.collection('asset',function(err,collection){
collection.findOne({loip:loip},function(err,result){
if(result){  
asset = 1;
console.log(result);
callback(err,asset); 
}         
else{    
callback(err,null); 
}
        
})  
})           
}


User.SearchItem = function(item,callback){
if(item.hostname){
BS.database.collection('asset',function(err,collection){
collection.find({hostname:item.hostname}).toArray(function(err,items){

if(err) throw err;
else{
//console.log(items);
return callback(items);
}
})


})

}
else if(item.ip){
BS.database.collection('asset',function(err,collection){
collection.find({ip:item.ip}).toArray(function(err,items){

if(err) throw err;
else{
console.log(items);
return callback(items);
}
})


})
}

else if(item.gip){
BS.database.collection('asset',function(err,collection){collection.find({gip:item.gip}).toArray(function(err,items){

if(err) throw err;
else{console.log(items);
return callback(items);
}
})


})
}
else if(item.loip){

BS.database.collection('asset',function(err,collection){collection.find({loip:item.loip}).toArray(function(err,items){

if(err) throw err;
else{console.log(items);
return callback(items);

}})


})
}

else if (item.project && !item.asset && !item.cabinet){
BS.database.collection('asset',function(err,collection){collection.find({project:item.project}).toArray(function(err,items){

if(err) throw err;
else{console.log(items);
return callback(items);
}})


})

}
else if(item.asset && !item.project && !item.cabinet){
BS.database.collection('asset',function(err,collection){collection.find({asset:item.asset}).toArray(function(err,items){

if(err) throw err;
else{console.log(items);
return callback(items);

}})


})

}
else if(item.cabinet && !item.asset && !item.project){
BS.database.collection('asset',function(err,collection){collection.find({cabinet:item.cabinet}).toArray(function(err,items){

if(err) throw err;
else{console.log(items);
return callback(items);
}
})


})

}
else if (item.project && item.asset && !item.cabinet){
BS.database.collection('asset',function(err,collection){collection.find({project:item.project,asset:item.asset}).toArray(function(err,items){

if(err) throw err;
else{console.log(items);
return callback(items);

}})


})

}
else if (item.project && item.cabinet && !item.asset){
BS.database.collection('asset',function(err,collection){collection.find({project:item.project,cabinet:item.cabinet}).toArray(function(err,items){

if(err) throw err;
else{console.log(items);
return callback(items);
}
})


})
}

else if(item.asset && item.cabinet && !item.project){

BS.database.collection('asset',function(err,collection){collection.find({asset:item.asset,cabinet:item.cabinet}).toArray(function(err,items){

if(err) throw err;
else{console.log(items);
return callback(items);
}
})


})
}
else if (item.asset && item.cabinet && item.project){
BS.database.collection('asset',function(err,collection){collection.find({asset:item.asset,cabinet:item.cabinet,project:item.project}).toArray(function(err,items){

if(err) throw err;
else{console.log(items);
return callback(items);
}
})


})
}








}

User.Search = function(callback){
BS.database.collection('asset',function(err,collection){
collection.find().toArray(function(err,items){

if(err) throw err;
else{
return callback(items);

}})
})
}






User.addItem = function(item,callback){
BS.database.collection('asset',function(err,collection){
collection.insert(item,{safe:true},function(err,result){
callback(err,item);
})
})
}


User.ask = function(ask,callback){
/*mongodb.open(function(err,db){
if(err){
return callback(err);
}
*/
var date = new Date();
var time = {
date:date,
year:date.getFullYear(),
  month : date.getFullYear() + "-" + (date.getMonth()+1), 
      day : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(), 
      minute : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() 
}
ask.time=time;
ask.hide=true;

BS.database.collection('question',function(err,collection){
if(err){
//mongodb.close();
return callback(err);
}
collection.find().sort({time:-1}).toArray(function(err,items){
if(items.length==0){
ids=0;
}else{
ids=items[0]._id
ids++;
}
ask._id=ids;
collection.insert(ask,{safe:true},function(err,result){
//mongodb.close();
callback(err,ask);
})

})

})
//})


}



User.getQuestion=function(callback){ 
 /* mongodb.open(function(err, db){ 
    if(err){ 
      return callback(err); 
    } 
  */
    BS.database.collection('question', function(err, collection){ 
      if(err){ 
  //      mongodb.close(); 
        return callback(err); 
      } 
     
      collection.find({hide:{$ne:false}}).limit(5).sort({time:-1}).toArray(function(err,items){ 
        if(err) throw err; 
     
        var open=0 
        BS.database.collection('user', function(err, collection){ 
          if(items.length!=0){
            for(var i=0,l=items.length;i<l;i++){
              collection.findOne({name: items[i].name},function(err, doc){
                items[open].imgUrl=doc.imgUrl;
                open++;
                if(open==l){
    //              mongodb.close();
                  return callback(items);
                }
              });
            }
          }else{
      //      mongodb.close();
            return callback(items);
          } 
        }); 
      }); 
    }); 
//  }); 
};



User.getQuestionPage=function(page,callback){
  var num=page*5;
  /*mongodb.open(function(err, db){
    if(err){
      return callback(err);
    }
*/
  BS.database.collection('question', function(err, collection){ 
      if(err){ 
       // mongodb.close(); 
        return callback(err); 
      } 
      collection.find({hide:{$ne:false}}).skip(num).limit(5).sort({time:-1}).toArray(function(err,items){ 
        if(err) throw err; 
        var open=0 
        BS.database.collection('user', function(err, collection){ 
          for(var i=0,l=items.length;i<l;i++){ User.getQuestionPage=function(page,callback){
  var num=page*5;
 /* mongodb.open(function(err, db){
    if(err){
      return callback(err);
    }
*/ 
 BS.database.collection('question', function(err, collection){ 
      if(err){ 
       // mongodb.close(); 
        return callback(err); 
      } 
      collection.find({hide:{$ne:false}}).skip(num).limit(5).sort({time:-1}).toArray(function(err,items){ 
        if(err) throw err; 
        var open=0 
        BS.database.collection('user', function(err, collection){ 
          for(var i=0,l=items.length;i<l;i++){ 
            collection.findOne({name: items[i].name},function(err, doc){ 
              items[open].imgUrl=doc.imgUrl; 
              open++; 
              if(open==l){ 
         //       mongodb.close(); 
                return callback(items); 
              } 
            }); 
          } 
        }); 
      }); 
    });  
 // }); 
};
            collection.findOne({name: items[i].name},function(err, doc){ 
              items[open].imgUrl=doc.imgUrl; 
              open++; 
              if(open==l){ 
           //     mongodb.close(); 
                return callback(items); 
              } 
            }); 
          } 
        }); 
      }); 
    });  
//  }); 
};


User.findQuestion=function(id,callback){
BS.database.collection('question',function(err,collection){
if(err){
return callback(err);
}
collection.find({_id:Number(id)}).toArray(function(err,items){
if(err) throw err;
return callback(err,items);

})

})


}

User.answer=function(questionId,answer,callback){
BS.database.collection('question',function(err,collection){
if(err){
return callback(err);
}
collection.update({_id:Number(questionId)},{$push:{answer:answer}},function(err,items){
if(err) throw err;
return callback(items);
})

})

}



User.cgItem = function(item,callback){
BS.database.collection('asset',function(err,collection){
collection.update({servertag:item.servertag},{$set:{hostname:item.hostname,ip:item.ip,gip:item.gip,loip:item.loip,asset:item.asset,cabinet:item.cabinet,project:item.project,disk:item.disk,cpu:item.cpu,memory:item.memory}},function(err,doc){
if(doc){
console.log(doc);
callback(err,doc);
}
else{
callback(err,null);
}

})
})

}


User.get = function(name,callback){
/*mongodb.open(function(err,db){
if(err){
return callback(err);
}
*/
BS.database.collection('user',function(err,collection){
if(err){
//mongodb.close();
return callback(err);
}

collection.findOne({name:name},function(err,doc){
//mongodb.close();
if(doc){
var user = new User(doc);
callback(err,user);
}
else{
callback(err,null);
}
})
})
//})
}

